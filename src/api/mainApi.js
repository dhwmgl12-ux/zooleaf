import { apiClient } from "./client";
import { toProductListItem } from "./productApi";

export async function getMainData(signal) {
  const result = await apiClient("/main", {
    signal,
  });

  const data = result.data ?? {};

  return {
    ...data,
    recommendedProducts: (
      data.recommendedProducts ?? []
    ).map(toProductListItem),
  };
}