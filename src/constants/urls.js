import { isLocalhost } from "../utils";

const URL_API_LOCAL = "http://localhost:3000/api/paintings";
const URL_API_PROD = "https://milo-paintings-backend.vercel.app/api/paintings";

const URL_API = isLocalhost ? URL_API_LOCAL : URL_API_PROD;

export { URL_API };
