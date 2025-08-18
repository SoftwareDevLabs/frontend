export interface BackendOption {
  id: string;
  name: string;
  description: string;
  type: 'SLM' | 'LLM';
  provider?: string;
  endpoint?: string;
  isAvailable: boolean;
}

export interface SettingsState {
  selectedBackend: string | null;
  backendOptions: BackendOption[];
}

export interface AppSettings {
  backend: SettingsState;
}