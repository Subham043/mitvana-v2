import api from 'axios'
import { axiosConfig } from "@/lib/constants/axios";
import { api_routes } from "@/lib/constants/api_routes";
import type { SessionManager } from "node_modules/@tanstack/start-server-core/dist/esm/session";
import type { SessionData } from "@/lib/integrations/session/useAppSession";
import type { ProfileType, TokenType } from '@/lib/type';


async function createAxiosInstanceFromSession(session: SessionManager<SessionData>, request: Request) {
  let refreshPromise: Promise<string | null> | null = null;

  const axiosInstance = api.create({
    ...axiosConfig,
  })

  // 🔥 REQUEST INTERCEPTOR
  axiosInstance.interceptors.request.use((config) => {
    if (session.data?.access_token) {
      config.headers.Authorization = `Bearer ${session.data.access_token}`
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
          refreshPromise = refreshToken(session, request)
        }
        const newAccessToken = await refreshPromise
        refreshPromise = null

        if (!newAccessToken) {
          await session.clear()
          return Promise.reject(error)
        }

        // Retry original request
        error.config.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(error.config)

      } catch {
        // Refresh failed → clear session
        await session.clear()
        return Promise.reject(error)
      }
    }
  )

  return axiosInstance
}

async function refreshToken(session: SessionManager<SessionData>, request: Request): Promise<string | null> {
  try {
    const res = await api.get<{ data: ProfileType & TokenType }>(
      api_routes.account.refresh,
      {
        ...axiosConfig,
        headers: {
          ...axiosConfig.headers,
          Cookie: request.headers.get("cookie") ?? ""
        }
      }
    )
    const newAccessToken = res.data.data.access_token ?? null;

    if (!newAccessToken) {
      await session.clear()
      return null;
    }

    await session.update(res.data.data)

    return newAccessToken

  } catch {
    await session.clear();
    return null;
  }
}

export async function getAxiosContext(session: SessionManager<SessionData>, request: Request) {
  const axios = await createAxiosInstanceFromSession(session, request)
  return {
    axios,
  }
}