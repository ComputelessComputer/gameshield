export interface ScoreState {
  score: number;
  level: number;
  lines: number;
}

const LINE_POINTS = [0, 100, 300, 500, 800];

export function calculateScore(linesCleared: number, level: number): number {
  return (LINE_POINTS[linesCleared] || 0) * (level + 1);
}

export function calculateLevel(totalLines: number): number {
  return Math.floor(totalLines / 10);
}

export function getDropInterval(level: number): number {
  // Speed increases with level
  const baseInterval = 1000;
  const minInterval = 100;
  return Math.max(minInterval, baseInterval - level * 50);
}
