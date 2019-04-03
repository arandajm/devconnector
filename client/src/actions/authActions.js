import { TEST_DISPATCH } from "./types";

export const authActions = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
