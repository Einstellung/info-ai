import { Node, Edge, Connection } from '@xyflow/react';

/**
 * Canvas data model
 */
export interface Canvas {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  nodes: Node[];
  edges: Edge[];
}

/**
 * Canvas node types
 */
export enum NodeType {
  DEFAULT = 'default',
  INPUT = 'input',
  OUTPUT = 'output',
  CUSTOM = 'custom',
}

/**
 * Canvas state
 */
export interface CanvasState {
  canvases: Record<string, Canvas>;
  activeCanvasId: string | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Canvas store actions
 */
export interface CanvasActions {
  // Canvas management
  createCanvas: (name: string, description?: string) => Promise<string>;
  loadCanvas: (id: string) => Promise<void>;
  updateCanvas: (id: string, data: Partial<Canvas>) => Promise<void>;
  deleteCanvas: (id: string) => Promise<void>;
  
  // Node and edge management
  addNode: (canvasId: string, node: Node) => void;
  updateNode: (canvasId: string, nodeId: string, data: Partial<Node>) => void;
  removeNode: (canvasId: string, nodeId: string) => void;
  
  addEdge: (canvasId: string, params: Connection | Edge) => void;
  updateEdge: (canvasId: string, edgeId: string, data: Partial<Edge>) => void;
  removeEdge: (canvasId: string, edgeId: string) => void;
  
  // Canvas operations
  clearCanvas: (canvasId: string) => void;
  setActiveCanvas: (canvasId: string | null) => void;
}

/**
 * Combined canvas store type
 */
export type CanvasStore = CanvasState & CanvasActions; 