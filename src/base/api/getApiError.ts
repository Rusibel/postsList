import { AxiosError } from 'axios';

interface IResponseErrorData {
  error: string;
}

export const getApiErrorMessage = (e: unknown): string => {
  return (e as AxiosError)?.response
    ? ((e as AxiosError).response?.data as IResponseErrorData)?.error ||
        (e as AxiosError)?.message
    : (e as Error)?.message || 'Unknown error';
};
