export interface InfoResponse<T> {
  resource: string;
  data: T;
  fetchedAt: string;
}

export interface NodeMetadata {
  id: string;
  name: string;
  role?: string;
  region?: string;
  zone?: string;
  labels?: Record<string, string>;
  status: "ready" | "not_ready" | "cordoned" | "unknown";
}

export interface NodeConfiguration {
  kubernetesVersion: string;
  capacityCores: number;
  capacityMemoryBytes: number;
  operatingSystem: string;
  kernelVersion?: string;
}

export interface PodMetadata {
  id: string;
  name: string;
  namespace: string;
  nodeName: string;
  status: string;
  labels?: Record<string, string>;
}

export interface PodConfiguration {
  qosClass: string;
  containers: Array<{
    name: string;
    image: string;
    requests: { cpu?: number; memoryBytes?: number };
    limits: { cpu?: number; memoryBytes?: number };
  }>;
}

export interface ContainerMetadata {
  id: string;
  name: string;
  image: string;
  runtime: string;
  restartCount: number;
  podUid: string;
}

export interface ContainerConfiguration {
  resources: {
    requests: { cpu?: number; memoryBytes?: number };
    limits: { cpu?: number; memoryBytes?: number };
  };
  env?: Record<string, string>;
}

export interface SettingsMetadata {
  featureFlags: Record<string, boolean>;
  defaultCurrency: string;
  defaultDateRangeDays: number;
  notificationsEnabled: boolean;
}

export interface SettingsConfiguration {
  alerts: {
    costThreshold: number;
    efficiencyThreshold: number;
  };
  sampling: {
    intervalSeconds: number;
    retentionDays: number;
  };
}

export type InfoQueryParams = Record<string, string | number | boolean | undefined>;

// Mirrors backend InfoSettingEntity (snake_case fields)
export interface InfoSetting {
  // General & UI
  is_dark_mode: boolean;
  language: string;

  // Retention
  minute_retention_days: number;
  hour_retention_months: number;
  day_retention_years: number;
  retention_policy: string; // "delete" | "archive"

  // File-based Persistence Options
  enable_line_num_tracking: boolean;
  enable_index_file: boolean;
  max_storage_gb: number;
  compression_enabled: boolean;

  // Metrics Collection
  scrape_interval_sec: number;
  metrics_batch_size: number;
  enable_gpu_metrics: boolean;
  enable_network_metrics: boolean;

  // Alerts & Notifications
  enable_cluster_health_alert: boolean;
  enable_rustcost_health_alert: boolean;
  global_alert_subject: string;
  linkback_url?: string | null;
  email_recipients: string[];
  slack_webhook_url?: string | null;
  teams_webhook_url?: string | null;

  // LLM Integration
  llm_url?: string | null;
  llm_token?: string | null;
  llm_model?: string | null;

  // Metadata
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  version: string;
}
