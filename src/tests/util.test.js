const { getRoundWinner } = require('../scripts/util');

test('null to return null', () => {
    expect(getRoundWinner(null, null)).toBeNull();
});

test('paper and rock to return user as winner', () => {
    expect(getRoundWinner('paper', 'rock')).toBe('user');
});

test('scissors and paper to return computer as winner', () => {
    expect(getRoundWinner('scissors', 'paper')).toBe('user');
});

test('rock and scissors to return computer as winner', () => {
    expect(getRoundWinner('rock', 'scissors')).toBe('user');
});

test('rock and paper to return computer as winner', () => {
    expect(getRoundWinner('rock', 'paper')).toBe('computer');
});

test('paper and scissors to return computer as winner', () => {
    expect(getRoundWinner('paper', 'scissors')).toBe('computer');
});

test('scissors and rock to return computer as winner', () => {
    expect(getRoundWinner('scissors', 'rock')).toBe('computer');
});

test('rock and rock to return draft', () => {
    expect(getRoundWinner('rock', 'rock')).toBe('draft');
});

test('paper and paper to return draft', () => {
    expect(getRoundWinner('paper', 'paper')).toBe('draft');
});

test('scissors and scissors to return draft', () => {
    expect(getRoundWinner('scissors', 'scissors')).toBe('draft');
});