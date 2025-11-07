export interface ApiResponse<T> {
  is_successful: boolean;
  data?: T | null;
  error_code?: string | null;
  error_msg?: string | null;
}

export interface SystemComponentStatus {
  component: string;
  status: "healthy" | "degraded" | "warning" | "error" | "unknown";
  message?: string;
  lastCheckedAt?: string;
}

export interface SystemStatusResponse {
  status: "healthy" | "degraded" | "maintenance" | "unknown";
  components: SystemComponentStatus[];
  version: string;
  lastUpdated: string;
}

export interface SystemActionResponse {
  status: "accepted" | "in_progress" | "completed" | "failed";
  requestedAt: string;
  message?: string;
}

export interface BackupResponse extends SystemActionResponse {
  backupId: string;
  location?: string;
}

export interface ResyncResponse extends SystemActionResponse {
  resyncId: string;
}
