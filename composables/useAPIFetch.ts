import { useFetch } from "#app"

type useFetchType = typeof useFetch

// wrap useFetch with configuration needed to talk to our API
export const useAPIFetch: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig()

  // baseURL is configured in nuxt.config.ts 
  options.baseURL = config.public.baseUrl + '/api'
  return useFetch(path, options)
}