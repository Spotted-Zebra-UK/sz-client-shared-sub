export const colorResolver = (color: string, opacity: number) => {
  switch (true) {
    case color === 'green':
      return `rgba(0, 211, 173, ${opacity})`;

    case color === 'blue':
      return `rgba(16, 183, 255, ${opacity})`;

    case color === 'purple':
      return `rgba(183, 91, 255, ${opacity})`;

    default:
      return 'transparent';
  }
};
