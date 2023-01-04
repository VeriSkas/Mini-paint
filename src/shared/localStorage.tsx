export function localStorageHandler(func: string, key?: string, body?: any) {
  switch (func) {
    case 'setItem':
      if (key && body) {
        localStorage.setItem(key, JSON.stringify(body));
      }
      break;
    case 'getItem':
      if (key) {
        const data = localStorage.getItem(key) || '';

        return data ? JSON.parse(data) : '';
      }
      break;
    case 'removeItem':
      if (key) {
        localStorage.removeItem(key);
      }
      break;
    case 'clear':
      localStorage.clear();
      break;
    default:
      break;
  }
}
