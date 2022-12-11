export const setToLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string, isEncoded?: boolean) => {
  const value = window.localStorage.getItem(key);
  if (value && isEncoded) {
    return JSON.parse(atob(value ?? btoa('')));
  } else {
    if (value) {
      return JSON.parse(value);
    }
  }
};

export const removeFromLocalStorage = (key: string) => {
  window.localStorage.removeItem(key);
};
