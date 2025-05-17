import axios from "axios";
import { config } from "../config/enviroment.config";

const axiosClient = axios.create({
  baseURL: config.jsonDomain,
  timeout: 10000,
  params: {
    api_key: config.apiKey,
    language: "en-US",
  },
});

export default axiosClient;
