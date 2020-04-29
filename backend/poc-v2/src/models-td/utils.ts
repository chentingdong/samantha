export function tomorrow() {
  let today = new Date();
  let tomorrow = new Date(today.setDate(today.getDate() + 1) * 1000);
  return tomorrow;
}
