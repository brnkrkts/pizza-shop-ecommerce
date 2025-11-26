export function dbTime(str) {
  return str.replace('T', ' ').substring(5, 19);
}