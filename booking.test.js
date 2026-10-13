import { test, expect } from 'vitest';
import { canBook } from './booking.js';

const getFixture = () => ({
  now: 540,
  blocked: false,
  bookings: [{ start: 600, end: 660 }]
});

test('T01: touching after is available', () => {
  const input = { ...getFixture(), start: 660, end: 720 };
  expect(canBook(input)).toBe(true);
});

test('T02: starts now is rejected', () => {
  const input = { ...getFixture(), start: 540, end: 570 };
  expect(canBook(input)).toBe(false);
});

test('T03: zero duration is rejected', () => {
  const input = { ...getFixture(), start: 720, end: 720 };
  expect(canBook(input)).toBe(false);
});

test('T04: reversed time is rejected', () => {
  const input = { ...getFixture(), start: 750, end: 720 };
  expect(canBook(input)).toBe(false);
});

test('T05: past day end is rejected', () => {
  const input = { ...getFixture(), start: 1380, end: 1441 };
  expect(canBook(input)).toBe(false);
});

test('T06: exactly 120 minutes is available', () => {
  const input = { ...getFixture(), start: 720, end: 840 };
  expect(canBook(input)).toBe(true);
});

test('T07: 121 minutes is rejected', () => {
  const input = { ...getFixture(), start: 720, end: 841 };
  expect(canBook(input)).toBe(false);
});

test('T08: touching before is available', () => {
  const input = { ...getFixture(), start: 570, end: 600 };
  expect(canBook(input)).toBe(true);
});

test('T09: partial overlap is rejected', () => {
  const input = { ...getFixture(), start: 630, end: 690 };
  expect(canBook(input)).toBe(false);
});

test('T10: contains booking is rejected', () => {
  const input = { ...getFixture(), start: 570, end: 690 };
  expect(canBook(input)).toBe(false);
});

test('T11: inside booking is rejected', () => {
  const input = { ...getFixture(), start: 615, end: 645 };
  expect(canBook(input)).toBe(false);
});

test('T12: identical interval is rejected', () => {
  const input = { ...getFixture(), start: 600, end: 660 };
  expect(canBook(input)).toBe(false);
});

test('T13: blocked room is rejected', () => {
  const input = { ...getFixture(), start: 660, end: 720, blocked: true };
  expect(canBook(input)).toBe(false);
});

test('T14: available when bookings array is empty', () => {
  const input = { ...getFixture(), start: 630, end: 690, bookings: [] };
  expect(canBook(input)).toBe(true);
});

test('AC5: booking data is preserved and not mutated', () => {
  const input = { start: 660, end: 720, now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] };
  const beforeStr = JSON.stringify(input.bookings);
  canBook(input);
  expect(JSON.stringify(input.bookings)).toBe(beforeStr);
});

test('Custom 1: booking ending exactly at day end is valid', () => {
  const input = { now: 1200, blocked: false, bookings: [], start: 1320, end: 1440 };
  expect(canBook(input)).toBe(true);
});

test('Custom 2: booking starting way before now is rejected', () => {
  const input = { ...getFixture(), start: 100, end: 160 };
  expect(canBook(input)).toBe(false);
});