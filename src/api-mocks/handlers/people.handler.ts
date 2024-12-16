import { http, HttpResponse } from "msw";
import { API_RESOURCE } from "../../app/shared/constant";
import { PEOPLE } from "../fixtures";
import { delayedResponse } from "../utils";

const BASE_URL = `/mock-api/${API_RESOURCE.PEOPLE}`;

export const getPeople = {
  info: {
    path: BASE_URL,
  },
  handler: http.get(BASE_URL, async () => {
    const response = HttpResponse.json(PEOPLE);
    return delayedResponse(response);
  }),
};

export const handlers = [getPeople.handler];
