export function shuffle<T>(array: T[]): T[] {
  const shallowCopy = [...array];
  for (let i = shallowCopy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shallowCopy[i], shallowCopy[j]] = [shallowCopy[j], shallowCopy[i]];
  }
  return shallowCopy;
}

export function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}
