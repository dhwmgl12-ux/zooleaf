import { apiClient } from "./client";

export async function getMainData(signal) {
  const result = await apiClient("/main", {
    signal,
  });

  return result.data;
}