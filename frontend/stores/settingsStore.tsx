import { createContext, useContext, useReducer, ReactNode } from 'react';
import { SettingsState, BackendOption } from '../types/settings';

// Mock backend options for demonstration
const defaultBackendOptions: BackendOption[] = [
  {
    id: 'openai-gpt4',
    name: 'OpenAI GPT-4',
    description: 'Advanced large language model by OpenAI',
    type: 'LLM',
    provider: 'OpenAI',
    endpoint: 'https://api.openai.com/v1',
    isAvailable: true,
  },
  {
    id: 'anthropic-claude',
    name: 'Anthropic Claude',
    description: 'Constitutional AI large language model',
    type: 'LLM',
    provider: 'Anthropic',
    endpoint: 'https://api.anthropic.com/v1',
    isAvailable: true,
  },
  {
    id: 'local-slm',
    name: 'Local Small Language Model',
    description: 'Lightweight model running locally',
    type: 'SLM',
    provider: 'Local',
    endpoint: 'http://localhost:8080',
    isAvailable: false,
  },
  {
    id: 'huggingface-slm',
    name: 'HuggingFace Small Model',
    description: 'Efficient small language model',
    type: 'SLM',
    provider: 'HuggingFace',
    endpoint: 'https://api-inference.huggingface.co',
    isAvailable: true,
  },
];

const initialState: SettingsState = {
  selectedBackend: null,
  backendOptions: defaultBackendOptions,
};

type SettingsAction =
  | { type: 'SELECT_BACKEND'; payload: string }
  | { type: 'UPDATE_BACKEND_OPTIONS'; payload: BackendOption[] };

function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case 'SELECT_BACKEND':
      return {
        ...state,
        selectedBackend: action.payload,
      };
    case 'UPDATE_BACKEND_OPTIONS':
      return {
        ...state,
        backendOptions: action.payload,
      };
    default:
      return state;
  }
}

interface SettingsContextType {
  state: SettingsState;
  selectBackend: (backendId: string) => void;
  updateBackendOptions: (options: BackendOption[]) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  const selectBackend = (backendId: string) => {
    dispatch({ type: 'SELECT_BACKEND', payload: backendId });
  };

  const updateBackendOptions = (options: BackendOption[]) => {
    dispatch({ type: 'UPDATE_BACKEND_OPTIONS', payload: options });
  };

  const value = {
    state,
    selectBackend,
    updateBackendOptions,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}