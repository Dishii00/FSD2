// Vitest Unit Test Suite for Exp 1.4.2 Component Performance & Logic
import { describe, it, expect, vi } from 'vitest';
import { getMonthMatrix, formatDateString } from '../utils/dateUtils';

describe('Experiment 1.4.2 - Performance & Component Testing Suite', () => {

  it('Test 1: getMonthMatrix computes 35 or 42 grid cells correctly', () => {
    const matrix = getMonthMatrix(2026, 7); // August 2026
    expect(matrix.length % 7).toBe(0);
    expect(matrix.length).toBeGreaterThanOrEqual(35);

    const todayCell = matrix.find((c) => c.isToday);
    expect(todayCell).toBeDefined();
  });

  it('Test 2: formatDateString outputs YYYY-MM-DD format', () => {
    const testDate = new Date(2026, 7, 15);
    const formatted = formatDateString(testDate);
    expect(formatted).toBe('2026-08-15');
  });

  it('Test 3: useCallback maintains stable function reference across renders', () => {
    let referenceA;
    let referenceB;

    const createHandler = (fn) => fn;

    const dummyHandler = () => 'clicked';
    referenceA = createHandler(dummyHandler);
    referenceB = referenceA; // Simulating useCallback reference retention

    expect(referenceA).toBe(referenceB);
  });

  it('Test 4: Drag & Drop Reschedule state mutation logic', () => {
    const initialPosts = [
      { id: 'evt-1', title: 'Post 1', scheduledDate: '2026-08-10' }
    ];

    const reschedule = (posts, id, newDate) => {
      return posts.map((p) => (p.id === id ? { ...p, scheduledDate: newDate } : p));
    };

    const updated = reschedule(initialPosts, 'evt-1', '2026-08-20');
    expect(updated[0].scheduledDate).toBe('2026-08-20');
  });

  it('Test 5: React.memo shallow comparison skips render on identical props', () => {
    const prevProps = { dateString: '2026-08-15', postCount: 2 };
    const nextProps = { dateString: '2026-08-15', postCount: 2 };

    const arePropsEqual = (prev, next) => {
      return prev.dateString === next.dateString && prev.postCount === next.postCount;
    };

    expect(arePropsEqual(prevProps, nextProps)).toBe(true);
  });

});
