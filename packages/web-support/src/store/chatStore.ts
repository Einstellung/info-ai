import { create } from 'zustand';

export interface Message {
  id: string | number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatState {
  simulationId: string | null;
  messages: Message[];
  loading: boolean;
  progress: number;
  error: string | null;
  
  setSimulationId: (id: string | null) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  batchUpdate: (updates: Partial<Pick<ChatState, 'messages' | 'loading' | 'progress' | 'error'>>) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  simulationId: null,
  messages: [],
  loading: false,
  progress: 0,
  error: null,
  
  setSimulationId: (id) => set({ simulationId: id }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setMessages: (messages) => set({ messages }),
  setLoading: (loading) => set({ loading }),
  setProgress: (progress) => set({ progress }),
  setError: (error) => set({ error }),
  reset: () => set({ 
    messages: [], 
    loading: false, 
    progress: 0, 
    error: null 
  }),
  batchUpdate: (updates) => set(updates),
})); 