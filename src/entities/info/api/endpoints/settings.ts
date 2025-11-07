import { useCallback, useState } from "react";
import { useFetch, type UseFetchOptions } from "../../../../shared/hooks/useFetch";
import { API_BASE_PATH } from "../../../../shared/api/constants";
import { request } from "../../../../shared/api/http";
import type { InfoSetting } from "../../model/types";
import type { ApiResponse } from "../../../system/api/types";

const SETTINGS_URL = `${API_BASE_PATH}/info/settings`;

/**
 * Fetch current Info settings.
 */
export const fetchSettings = () =>
  request<ApiResponse<InfoSetting>>({
    method: "GET",
    url: SETTINGS_URL,
  });

/**
 * Upsert Info settings.
 */
export const upsertSettings = (payload: InfoSetting) =>
  request<ApiResponse<unknown>>({
    method: "POST",
    url: SETTINGS_URL,
    data: payload,
  });

/**
 * React hook to read Info settings with cache.
 */
export const useSettings = (options?: UseFetchOptions) =>
  useFetch<ApiResponse<InfoSetting>>(
    JSON.stringify({ scope: "info", resource: "settings" }),
    fetchSettings,
    options
  );

/**
 * Imperative hook to upsert Info settings.
 */
export const useUpsertSettings = () => {
  const [data, setData] = useState<ApiResponse<unknown> | undefined>();
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);

  const trigger = useCallback(async (payload: InfoSetting) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await upsertSettings(payload);
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { trigger, data, error, isLoading };
};
