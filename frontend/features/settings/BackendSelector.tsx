import React from 'react';
import { useSettings } from '../../stores/settingsStore';
import { BackendOption } from '../../types/settings';

const BackendCard: React.FC<{ option: BackendOption; isSelected: boolean; onSelect: () => void }> = ({
  option,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      } ${!option.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={option.isAvailable ? onSelect : undefined}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{option.name}</h3>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              option.type === 'LLM'
                ? 'bg-purple-100 text-purple-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {option.type}
          </span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              option.isAvailable
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {option.isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-2">{option.description}</p>
      {option.provider && (
        <p className="text-gray-500 text-xs">Provider: {option.provider}</p>
      )}
      {option.endpoint && (
        <p className="text-gray-500 text-xs">Endpoint: {option.endpoint}</p>
      )}
      {isSelected && (
        <div className="mt-3 flex items-center">
          <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-blue-600 text-sm font-medium">Selected</span>
        </div>
      )}
    </div>
  );
};

export const BackendSelector: React.FC = () => {
  const { state, selectBackend } = useSettings();

  const llmOptions = state.backendOptions.filter(option => option.type === 'LLM');
  const slmOptions = state.backendOptions.filter(option => option.type === 'SLM');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Backend Configuration</h2>
        <p className="text-gray-600">
          Select the backend infrastructure for your SLM/LLM processing needs.
        </p>
      </div>

      {state.selectedBackend && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-blue-800 font-medium">
              Currently selected: {state.backendOptions.find(opt => opt.id === state.selectedBackend)?.name}
            </span>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Large Language Models (LLM)</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {llmOptions.map((option) => (
            <BackendCard
              key={option.id}
              option={option}
              isSelected={state.selectedBackend === option.id}
              onSelect={() => selectBackend(option.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Small Language Models (SLM)</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {slmOptions.map((option) => (
            <BackendCard
              key={option.id}
              option={option}
              isSelected={state.selectedBackend === option.id}
              onSelect={() => selectBackend(option.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};