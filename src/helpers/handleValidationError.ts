import { TErrorSources } from "../types/error";

export const handleValidationError = (err: any) => {
  const errorSources: TErrorSources = Object.values(err.errors).map((val: any) => ({
    path: val.path,
    message: val.message,
  }));

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};
