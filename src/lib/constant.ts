// write all constants here

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log(BACKEND_URL);
export const STORAGE_KEYS = {
  TOKEN: "token",
};

export const API_METHOD_TYPES = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};
