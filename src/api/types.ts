import { AxiosRequestConfig } from 'axios'

export interface config {
	baseURL: string
	timeout: number
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
	headers: {
		token: string
	}
}