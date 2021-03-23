import config from "../config";

//https://dmitripavlutin.com/timeout-fetch-request/
export default async function fetchApi(url, options) {
  try {
    const response = await fetchWithTimeout(config.baseUrl + url, {
      timeout: 3000,
      ...options,
    });

    const result = await response.json();

    return result;
  } catch (error) {
    // Timeouts
    return { error: "Yhteys epäonnistui" };
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

  return response;
}
