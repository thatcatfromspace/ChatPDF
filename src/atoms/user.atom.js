import { atom } from "jotai";
import { v4 as uuid } from "uuid";

export const userAtom = atom({
  userId: localStorage.getItem("user_id") || uuid(),
});
