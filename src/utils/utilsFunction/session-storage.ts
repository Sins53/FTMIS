import { decodeData, encodeData } from './encode-decode';

export const getSessionStorage = async (itemName: string) => {
  const sessionData = sessionStorage.getItem(itemName);
  if (sessionData) {
    const parsedData = await JSON.parse(decodeData(sessionData));
    return parsedData;
  }
  return null;
};

export const destroySessionStorage = (itemName: string) => {
  sessionStorage.removeItem(itemName);
};

const setSessionStorage = (itemName: string, value: any) => {
  sessionStorage.setItem(itemName, encodeData(JSON.stringify(value)));
};

export default setSessionStorage;
