// import type { Request, Response } from "express";

// import type { IHttpError } from "../types/http-error.type.ts";

// import { ApiResponse } from "./api-response.util.ts";

// const catchHandler = (error: unknown) => {
//   const logoutUser = (_req: Request, res: Response) => {
//     const err = error as IHttpError;
//     const status = err.statusCode ?? 500;
//     return res.status(status).json(new ApiResponse(status, "", err.message));
//   };
//   logoutUser();
// };

// export { catchHandler };
