import { REACT_APP_BASE_URL } from "../constants";

export const Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};
export const ApiEndpoint = {
  BASE_URL: getURL(),
};

function getURL() {
  var url = REACT_APP_BASE_URL;
  return url;
}
