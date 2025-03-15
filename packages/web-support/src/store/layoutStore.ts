import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LayoutState {
  splitRatio: number;
  setSplitRatio: (ratio: number) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      splitRatio: 60, // 默认左侧占60%
      setSplitRatio: (ratio) => set({ splitRatio: ratio }),
    }),
    {
      name: 'layout-storage',
    }
  )
); 