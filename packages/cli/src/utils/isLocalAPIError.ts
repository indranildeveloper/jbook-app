import { ILocalAPIError } from "../interfaces";

export const isLocalAPIError = (error: unknown): error is ILocalAPIError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code: string }).code === "string"
  );
};
