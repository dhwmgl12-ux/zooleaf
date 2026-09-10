import { apiClient } from './client';

export async function getExperiences(signal) {
  const result = await apiClient('/experiences', { signal });

  return result.data?.experiences ?? [];
}
