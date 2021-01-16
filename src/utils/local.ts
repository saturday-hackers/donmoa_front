export enum ELocalItemKeys {
  access_token = "access_token",
}

export const getLocalItem = (key: ELocalItemKeys) => {
  return window.localStorage.getItem(key);
};
