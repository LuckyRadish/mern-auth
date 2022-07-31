import axios from "axios";

import { ILoginDetails } from "../pages/Auth/Login";
import { IRegistrationDetails } from "../pages/Auth/Registration";

const API_URL = process.env.REACT_APP_API_URL;

const AUTH_URL = `${API_URL}/auth`;
const PREVIEW_URL = `${API_URL}/linkpreview`;
const LOG_URL = `${API_URL}/log`;

export const requestLogin = (data: ILoginDetails) =>
  axios.post<{ accessToken: string }>(`${AUTH_URL}/login`, data);

export const requestRegister = (data: IRegistrationDetails) =>
  axios.post(`${AUTH_URL}/register`, data);

export const requestMetadata = (url: string) =>
  axios.get(`${PREVIEW_URL}/`, { params: { url } });

export const requestLogs = () => axios.get<{ logs: any[] }>(`${LOG_URL}/`);
