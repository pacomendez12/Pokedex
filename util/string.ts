export const capitalize = (input: string) =>
  input[0].toUpperCase() + input.slice(1);

export const padLeft = (n: string | number, len: number) => {
  n = n + "";
  return n.length >= len ? n : new Array(len - n.length + 1).join("0") + n;
};
