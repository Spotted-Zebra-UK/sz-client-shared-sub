export const equalizeElementsHeight = (className: string) => {
  const collection = document.querySelectorAll<HTMLElement>(className);
  let biggestElementHeight = 0;

  setTimeout(() => {
    collection.forEach(element => {
      element.style.height = 'auto';

      if (element.clientHeight > biggestElementHeight) {
        biggestElementHeight = element.clientHeight;
      }
    });

    collection.forEach(element => {
      element.style.height = biggestElementHeight + 'px';
    });
  }, 100);
};
