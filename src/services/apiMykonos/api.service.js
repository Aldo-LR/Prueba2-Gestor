import axios from "axios";
// const API = "https://inmobiliariaontario.com/api_mykonos/";
const API = "http://localhost:3015/api_mykonos/";

async function send({ method, url, data }) {
  try {
    const res = await axios({
      headers: {
        "Content-Type": "application/json",
      },
      method,
      baseURL: `${API}`,
      url,
      data,
    });

    return new Promise((resolve) => resolve(res.data));
  } catch (error) {
    return error.response.data;
  }
}

function post({ url, data }) {
  return send({ method: "POST", url, data });
}

function put({ url, data }) {
  return send({ method: "PUT", url, data });
}

function del({ url, data }) {
  return send({ method: "DELETE", url, data });
}

function get({ url, data = {} }) {
  const params = Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join("&");

  return send({
    method: "GET",
    url: `${url}${params ? "?" + params : ""}`,
  });
}

export { get, post, put, del };
