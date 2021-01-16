import { atom } from "recoil";

export const authState = atom({
  key: "auth_state", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});
