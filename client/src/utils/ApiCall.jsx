import axios from "axios";

export const makeApiCall = async (method, baseUrl, endpoint, requestData) => {
  try {
    if (method === "GET") {
      const { data } = await axios.get(baseUrl + endpoint, { params: requestData });
      return data;
    } else if (method === "POST") {
      const { data } = await axios.post(baseUrl + endpoint, requestData);
      return data;
    }
  } catch (error) {
    return error.response.data;
  }
};

export default makeApiCall;
