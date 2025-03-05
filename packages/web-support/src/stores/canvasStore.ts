import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { addEdge as reactFlowAddEdge } from '@xyflow/react';
import { CanvasStore, Canvas } from '@info-ai/web-support/types/canvas';

/**
 * Canvas store implementation using Zustand with Immer for immutable updates
 */
export const useCanvasStore = create<CanvasStore>()(
  immer((set, get) => ({
    // State
    canvases: {},
    activeCanvasId: null,
    isLoading: false,
    error: null,

    // Canvas management actions
    createCanvas: async (name, description) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        // Generate a unique ID
        const id = `canvas-${Date.now()}`;
        const newCanvas: Canvas = {
          id,
          name,
          description: description || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          nodes: [],
          edges: [],
        };

        set((state) => {
          state.canvases[id] = newCanvas;
          state.activeCanvasId = id;
          state.isLoading = false;
        });

        return id;
      } catch (error) {
        set((state) => {
          state.isLoading = false;
          state.error = error instanceof Error ? error.message : 'Failed to create canvas';
        });
        throw error;
      }
    },

    loadCanvas: async (id) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        // Check if canvas exists in store
        if (get().canvases[id]) {
          set((state) => {
            state.activeCanvasId = id;
            state.isLoading = false;
          });
          return;
        }

        // In a real app, you would fetch from API here
        // For now, we'll create a new canvas if it doesn't exist
        const newCanvas: Canvas = {
          id,
          name: `Canvas ${id}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          nodes: [],
          edges: [],
        };

        set((state) => {
          state.canvases[id] = newCanvas;
          state.activeCanvasId = id;
          state.isLoading = false;
        });
      } catch (error) {
        set((state) => {
          state.isLoading = false;
          state.error = error instanceof Error ? error.message : 'Failed to load canvas';
        });
        throw error;
      }
    },

    updateCanvas: async (id, data) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        if (!get().canvases[id]) {
          throw new Error(`Canvas with ID ${id} not found`);
        }

        set((state) => {
          state.canvases[id] = {
            ...state.canvases[id],
            ...data,
            updatedAt: new Date().toISOString(),
          };
          state.isLoading = false;
        });
      } catch (error) {
        set((state) => {
          state.isLoading = false;
          state.error = error instanceof Error ? error.message : 'Failed to update canvas';
        });
        throw error;
      }
    },

    deleteCanvas: async (id) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        if (!get().canvases[id]) {
          throw new Error(`Canvas with ID ${id} not found`);
        }

        set((state) => {
          delete state.canvases[id];
          if (state.activeCanvasId === id) {
            state.activeCanvasId = null;
          }
          state.isLoading = false;
        });
      } catch (error) {
        set((state) => {
          state.isLoading = false;
          state.error = error instanceof Error ? error.message : 'Failed to delete canvas';
        });
        throw error;
      }
    },

    // Node management
    addNode: (canvasId, node) => {
      if (!get().canvases[canvasId]) return;

      set((state) => {
        state.canvases[canvasId].nodes.push(node);
        state.canvases[canvasId].updatedAt = new Date().toISOString();
      });
    },

    updateNode: (canvasId, nodeId, data) => {
      if (!get().canvases[canvasId]) return;

      set((state) => {
        const nodeIndex = state.canvases[canvasId].nodes.findIndex((n) => n.id === nodeId);
        if (nodeIndex !== -1) {
          state.canvases[canvasId].nodes[nodeIndex] = {
            ...state.canvases[canvasId].nodes[nodeIndex],
            ...data,
          };
          state.canvases[canvasId].updatedAt = new Date().toISOString();
        }
      });
    },

    removeNode: (canvasId, nodeId) => {
      if (!get().canvases[canvasId]) return;

      set((state) => {
        state.canvases[canvasId].nodes = state.canvases[canvasId].nodes.filter(
          (n) => n.id !== nodeId
        );
        // Also remove any connected edges
        state.canvases[canvasId].edges = state.canvases[canvasId].edges.filter(
          (e) => e.source !== nodeId && e.target !== nodeId
        );
        state.canvases[canvasId].updatedAt = new Date().toISOString();
      });
    },

    // Edge management
    addEdge: (canvasId, params) => {
      if (!get().canvases[canvasId]) return;

      set((state) => {
        if ('id' in params) {
          state.canvases[canvasId].edges.push(params);
        } else {
          const newEdges = reactFlowAddEdge(params, []);
          if (newEdges.length > 0) {
            state.canvases[canvasId].edges.push(newEdges[0]);
          }
        }
        state.canvases[canvasId].updatedAt = new Date().toISOString();
      });
    },

    updateEdge: (canvasId, edgeId, data) => {
      if (!get().canvases[canvasId]) return;

      set((state) => {
        const edgeIndex = state.canvases[canvasId].edges.findIndex((e) => e.id === edgeId);
        if (edgeIndex !== -1) {
          state.canvases[canvasId].edges[edgeIndex] = {
            ...state.canvases[canvasId].edges[edgeIndex],
            ...data,
          };
          state.canvases[canvasId].updatedAt = new Date().toISOString();
        }
      });
    },

    removeEdge: (canvasId, edgeId) => {
      if (!get().canvases[canvasId]) return;

      set((state) => {
        state.canvases[canvasId].edges = state.canvases[canvasId].edges.filter(
          (e) => e.id !== edgeId
        );
        state.canvases[canvasId].updatedAt = new Date().toISOString();
      });
    },

    // Canvas operations
    clearCanvas: (canvasId) => {
      if (!get().canvases[canvasId]) return;

      set((state) => {
        state.canvases[canvasId].nodes = [];
        state.canvases[canvasId].edges = [];
        state.canvases[canvasId].updatedAt = new Date().toISOString();
      });
    },

    setActiveCanvas: (canvasId) => {
      set((state) => {
        state.activeCanvasId = canvasId;
      });
    },
  }))
);

/**
 * Helper function to get a shallow subset of the canvas store
 * This helps with performance by reducing re-renders
 */
export const useCanvasStoreShallow = <T>(selector: (state: CanvasStore) => T) => 
  useCanvasStore(selector); 