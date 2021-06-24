/**
 * Gets total time in minutes and returns
 * total time as string.
 *
 * exp:
 * totalTime: 90
 * returns: 1h 30min
 *
 * @param totalTime - total time in minutes.
 * @returns
 */
export const getTotalTimeString = (totalTime: number): string => {
  const totalTimeHours = Math.floor(totalTime / 60);
  const totalTimeMinutes = totalTime % 60;
  return `${totalTimeHours ? `${totalTimeHours}h ` : ''}${totalTimeMinutes}min`;
};
