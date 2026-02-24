import { useAppSession } from "@/hooks/useAppSession";
import api from 'axios'
import { axiosConfig } from "@/lib/constants/axios";
import { api_routes } from "@/lib/constants/api_routes";
import type { SessionManager } from "node_modules/@tanstack/start-server-core/dist/esm/session";
import type { SessionData } from "@/hooks/useAppSession";

let refreshPromise: Promise<string | null> | null = null

async function createAxiosInstanceFromSession() {
  const session = await useAppSession()

  const axiosInstance = api.create({
    ...axiosConfig,
  })

  // 🔥 REQUEST INTERCEPTOR
  axiosInstance.interceptors.request.use((config) => {
    if (session.data?.token) {
      config.headers.Authorization = `Bearer ${session.data.token}`
    }
    return config
  })

  // 🔥 RESPONSE INTERCEPTOR (Auto Refresh)
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status !== 401) {
        return Promise.reject(error)
      }

      // If no refresh token → logout
      if (!session.data?.refresh_token) {
        await session.clear()
        return Promise.reject(error)
      }

      try {
        // 🔥 Deduplication: if refresh already happening, wait
        if (!refreshPromise) {
          refreshPromise = refreshToken(session)
        }
        const newAccessToken = await refreshPromise
        refreshPromise = null

        if (!newAccessToken) {
          throw new Error('Refresh failed')
        }

        // Retry original request
        error.config.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(error.config)

      } catch (refreshError) {
        // Refresh failed → clear session
        await session.clear()
        return Promise.reject(refreshError)
      }
    }
  )

  return axiosInstance
}

async function refreshToken(session: SessionManager<SessionData>): Promise<string | null> {
  try {
    const refreshResponse = await api.post(
      api_routes.account.get,
      { refreshToken: session.data.refresh_token }
    )

    const newAccessToken = refreshResponse.data.token ?? null;

    if (!newAccessToken) {
      await session.clear()
      return null
    }

    await session.update({
      ...session.data,
      token: newAccessToken,
    })

    return newAccessToken

  } catch {
    return null
  }
}

export async function getAxiosContext() {
  const axios = await createAxiosInstanceFromSession()
  return {
    axios,
  }
}