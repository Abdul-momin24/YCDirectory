// 🔧 FIXED: writeClient.ts
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, token } from '../env';

export function getWriteClient() {
  if (!token) {
    throw new Error('Token not found');
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });
}
