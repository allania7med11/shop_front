import { FC, ReactNode } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Loading } from "./loading";
import { Warning } from "./warning";

export const FetchWrap: FC<{
  data: unknown;
  error: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
  children: ReactNode;
}> = ({ data, error, isLoading, children }) => (
  <>
    {isLoading && <Loading />}
    {error && <Warning />}
    {data && children}
  </>
);
