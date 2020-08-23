import axios from "axios";

import { apiPrefix } from '../../etc/config.json';

export default axios.create({
  baseURL: `${apiPrefix}`,
});