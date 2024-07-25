import { API_METHOD_TYPES, BACKEND_URL } from "./constant";
import { HeaderType } from "./types";

// write your all api calls here

// User API's
export const getUserProfile = async (headers: HeaderType) => {
  const response = await fetch(`${BACKEND_URL}/users/profile`, {
    method: API_METHOD_TYPES.GET,
    ...headers,
  });

  const body = await response.json();

  if (response.status !== 200) {
    throw new Error(body);
  }

  return body;
};
