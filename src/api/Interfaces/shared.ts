import * as e from "express";

//import { ISessionUser } from "@src/routes/middlware/adminMw";

export interface IReq<T = void> extends e.Request {
  body: T;
}

export interface ICUDResult<T = void> {
  success: boolean;
  data: { message: string } | T | null;
}

export interface IAuthPayload {
  id: string;
  username: string;
  email: string;
}
