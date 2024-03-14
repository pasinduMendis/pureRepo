import axios from "axios";
import { ApiEndpoint } from "./APIConstants";

export default function api(URL, method, token, params, data) {
  try {
    let options;
    options = {
      headers: {
        "Content-Type": "application/json"
        // Accept: "*/*",
        // "x-jwt": `${token}`
      },
      ...(params && { params: params }),
      ...(data && { data: data })
    };
    const apiInstance = axios.create({
      baseURL: ApiEndpoint.BASE_URL,
      method: method,
      url: URL,
      ...options
    });
    return apiInstance;
  } catch (e) {
    console.log(e, "ERROR FROM API");
  }
}
