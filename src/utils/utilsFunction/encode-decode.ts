export const encodeData = (data: string) => {
  if (data) {
    return btoa(JSON.stringify(data));
  } else return '';
};

export const decodeData = (data: any) => {
  if (data) {
    return JSON.parse(atob(data));
  } else return null;
};
