/*
  Returns a new copy of the provided function debounced by the provided delay.
  A debounced function will cancel previous repeated calls within the delay period
  resulting in only the last call being processed.
*/
function debounce(func: Function, delay: number) {
  const context = this;
  let id: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(id);
    id = setTimeout(() => func.apply(context, args), delay);
  };
}

export { debounce };
