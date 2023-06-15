import { config } from './types'

const { VITE_GLOB_API_URL, VITE_GLOB_API_URL_PREFIX } = import.meta.env

const config: config = {
	baseURL: VITE_GLOB_API_URL + VITE_GLOB_API_URL_PREFIX,
	timeout: 10 * 1000,
}

export default config
