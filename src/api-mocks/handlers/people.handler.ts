// import { rest } from "msw";
// import { API_RESOURCE } from "../../app/shared/constant";
// import { PEOPLE } from "../fixtures";
// import { delayedResponse } from "../utils";

// const BASE_URL = `/mock-api/${API_RESOURCE.PEOPLE}*`;

// export const getPeople = rest.get(BASE_URL, (_req, _res, ctx) =>
//   delayedResponse(ctx.status(200), ctx.json(PEOPLE))
// );

// export const handlers = [getPeople];

import { rest } from "msw";
import { PEOPLE } from "../fixtures";

export const getPeople = {
  info: {
    path: "/mock-api/people",
  },
  handler: rest.get("/mock-api/people", async (req, res, ctx) => {
    // Add proper headers and delay
    return res(
      ctx.delay(100),
      ctx.set("Content-Type", "application/json"),
      ctx.status(200),
      ctx.json(PEOPLE)
    );
  }),
};

export const handlers = [getPeople.handler];
