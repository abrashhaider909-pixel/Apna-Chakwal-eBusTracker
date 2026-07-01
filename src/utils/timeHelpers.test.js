// Regression tests for: React/Vite package upgrades
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ROUTES } from '../data/busData';
import {
    findStopIndex,
    getAllTimesForStop,
    getRouteTime,
    getUpcoming,
    minToStr,
    parseTime,
} from './timeHelpers';

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe('timeHelpers', () => {
    it('parses and formats clock values consistently', () => {
        expect(parseTime('06:00')).toBe(360);
        expect(minToStr(360)).toBe('6:00 AM');
    });

    it('resolves stop aliases and returns the next weekday departure', () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2026, 6, 1, 9, 15, 0));

        expect(findStopIndex(ROUTES.balkasar, 'fwd', 'Oderwal Chowk')).toBe(8);
        expect(getRouteTime(ROUTES.balkasar, 'fwd', 'firstBus')).toBe('06:00');

        const upcoming = getUpcoming(ROUTES.balkasar, 'fwd', 0, 9 * 60 + 15, 1);
        expect(upcoming).toHaveLength(1);
        expect(upcoming[0].time).toBe('9:25 AM');
    });

    it('switches to weekend operating hours', () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2026, 6, 4, 12, 0, 0));

        expect(getRouteTime(ROUTES.balkasar, 'fwd', 'firstBus')).toBe('19:30');
        expect(getAllTimesForStop(ROUTES.balkasar, 'fwd', 0)).toHaveLength(3);
    });
});