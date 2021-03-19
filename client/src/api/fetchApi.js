import config from "../config";

//https://dmitripavlutin.com/timeout-fetch-request/
export default async function fetchApi(url, options) {
  try {
    const response = await fetchWithTimeout(config.baseUrl + url, {
      timeout: 3000,
      ...options,
    });

    //console.log("fetchApi_result");
    //console.log(response);
    //return response;
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    // Timeouts if the request takes
    // longer than 6 seconds

    console.log("fetchAPi_error__: " + error);
    console.log(error);
    return { error: "Yhteys epäonnistui" };
    return error;
  }
}

async function fetchWithTimeout(resource, options) {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  console.log("fetchWithTimeout");
  console.log(response);
  return response;
}
