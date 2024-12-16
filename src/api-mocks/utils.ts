import { delay } from "msw";

export const delayedResponse = async (response: Response) => {
  if (process.env.NODE_ENV !== "test") {
    await delay(500);
  }
  return response;
};
