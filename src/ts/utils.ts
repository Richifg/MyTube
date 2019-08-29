/*
  Returns a new copy of the provided function debounced by the provided delay.
  A debounced function will cancel previous repeated calls within the delay period
  resulting in only the last call being processed.
*/
export function debounce(func: Function, delay: number, context: any) {
  let id: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(id);
    id = setTimeout(() => func.apply(context, args), delay);
  };
}
/*
  Returns a string no longer than the provided length
  cut strings have added elipsis to indicate it was truncated (...)
*/
export function elipsis(str: string, maxLength: number) {
  return (str.length > maxLength
  ? `${str.substr(0, 122)}...`
  : str);
}

/*
  Returns a short format number similar to the one shown on youtube stats
  with units as needed (k, M, B) and at most 3 significant numbers
*/
export function shortFormat(num: string) {
  // leave at most the first 3 significant numbers
  const signiLength = num.length % 3 === 0 ? 3 : num.length % 3;
  const significantNum = num.substr(0, signiLength);
  const rest = num.slice(signiLength);

  // check if decimals are needed
  let decimals = '';
  if (rest && significantNum.length !== 3) {
    decimals = rest.substr(0, 3 - significantNum.length);
    // cut unwanted zeroes
    while (decimals.charAt(decimals.length - 1) === '0') {
      decimals = decimals.substring(0, decimals.length - 1);
    }
    if (decimals) { decimals = `.${decimals}`; }
  }
  // get the correponding units out of the cut string
  const multiplier = Math.ceil(rest.length / 3);
  let unit;
  switch (multiplier) {
    case 0: unit = ''; break;
    case 1: unit = 'K'; break;
    case 2: unit = 'M'; break;
    case 3: unit = 'B'; break;
    case 4: unit = 'T'; break;
    default: unit = '?';
  }
  return significantNum + decimals + unit;
}

/*
  Returns a string with points in each thousandth of 12.456.789
*/
export function pointFormat(num: number) {
  const numStr = String(num);
  let result = numStr;
  if (numStr.length > 3) {
    const initialCut = numStr.length % 3 === 0 ? 3 : numStr.length % 3;
    result = numStr.substr(0, initialCut);
    let remainingNum = numStr.substring(initialCut);
    while (remainingNum) {
      result = result + '.' + remainingNum.substr(0, 3);
      remainingNum = remainingNum.substring(3);
    }
  }
  return result;
}

/*
  Return a string where the HTML reserverd characters are replaced by their corresponding symbol
*/

export function replaceReserverdChars(str: string) {
  const newStr = str
    .replace('&quot;', '"')
    .replace('&apos;', '\'')
    .replace('&amp;', '&')
    .replace('&lt;', '<')
    .replace('&gt;', '>');
  return newStr;
}
