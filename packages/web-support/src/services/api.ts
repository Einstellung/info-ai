const API_BASE_URL = 'http://localhost:8000';

export interface SimulationParams {
  personality: string;
  background: string;
  rounds: number;
}

export interface SimulationResponse {
  id: string;
  status: string;
  progress: number;
  chapters: Array<{
    number: number;
    content: string;
  }>;
  error: string | null;
}

export const createSimulation = async (params: SimulationParams): Promise<SimulationResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/simulations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const getSimulation = async (id: string): Promise<SimulationResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/simulations/${id}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}; 