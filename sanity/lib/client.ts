import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // ab true kr doiya taaki ab vo cache karey cheeze like last time isliye false kiya deikhane ke liye
  useCdn: true, 
})
