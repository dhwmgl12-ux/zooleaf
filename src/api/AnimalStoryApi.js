import { apiClient } from './client';

export async function fetchAnimalStories(signal) {
  const result = await apiClient('/animals?page=1&limit=50', {signal})
  return result.data.animals ?? [];
}

