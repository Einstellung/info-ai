import { useCallback, useEffect } from 'react';
import { Node, Connection, useNodesState, useEdgesState, addEdge, NodeChange, EdgeChange } from '@xyflow/react';
import { useCanvasStoreShallow } from '../../stores/canvasStore';

/**
 * Custom hook for canvas operations
 * Provides a unified interface for working with a specific canvas
 */
export const useCanvas = (canvasId: string) => {
  // Get canvas data and actions from store
  const { 
    canvases, 
    loadCanvas, 
    addNode: storeAddNode,
    updateNode: storeUpdateNode,
    removeNode: storeRemoveNode,
    addEdge: storeAddEdge,
    removeEdge: storeRemoveEdge,
    clearCanvas,
    isLoading,
    error
  } = useCanvasStoreShallow((state) => ({
    canvases: state.canvases,
    loadCanvas: state.loadCanvas,
    addNode: state.addNode,
    updateNode: state.updateNode,
    removeNode: state.removeNode,
    addEdge: state.addEdge,
    updateEdge: state.updateEdge,
    removeEdge: state.removeEdge,
    clearCanvas: state.clearCanvas,
    isLoading: state.isLoading,
    error: state.error
  }));

  // Get current canvas data
  const canvas = canvases[canvasId];
  
  // Set up ReactFlow state
  const [nodes, setNodes, onNodesChange] = useNodesState(canvas?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(canvas?.edges || []);

  // Load canvas data when canvasId changes
  useEffect(() => {
    if (canvasId) {
      loadCanvas(canvasId);
    }
  }, [canvasId, loadCanvas]);

  // Update local state when canvas data changes
  useEffect(() => {
    if (canvas) {
      setNodes(canvas.nodes);
      setEdges(canvas.edges);
    }
  }, [canvas, setNodes, setEdges]);

  // Handle node changes
  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    onNodesChange(changes);
    
    // Sync changes to store
    // This is simplified - in a real app you'd want to batch these updates
    changes.forEach((change) => {
      if (change.type === 'remove') {
        storeRemoveNode(canvasId, change.id);
      } else if (change.type === 'position' && change.position) {
        storeUpdateNode(canvasId, change.id, { position: change.position });
      }
    });
  }, [canvasId, onNodesChange, storeRemoveNode, storeUpdateNode]);

  // Handle edge changes
  const handleEdgesChange = useCallback((changes: EdgeChange[]) => {
    onEdgesChange(changes);
    
    // Sync changes to store
    changes.forEach((change) => {
      if (change.type === 'remove') {
        storeRemoveEdge(canvasId, change.id);
      }
    });
  }, [canvasId, onEdgesChange, storeRemoveEdge]);

  // Handle connections between nodes
  const handleConnect = useCallback(
    (connection: Connection) => {
      const newEdge = addEdge(connection, edges);
      setEdges(newEdge);
      storeAddEdge(canvasId, connection);
    },
    [canvasId, edges, setEdges, storeAddEdge]
  );

  // Add a new node
  const addNode = useCallback(
    (node: Node) => {
      setNodes((nds) => [...nds, node]);
      storeAddNode(canvasId, node);
    },
    [canvasId, setNodes, storeAddNode]
  );

  // Clear the canvas
  const handleClearCanvas = useCallback(() => {
    clearCanvas(canvasId);
    setNodes([]);
    setEdges([]);
  }, [canvasId, clearCanvas, setNodes, setEdges]);

  return {
    // Canvas data
    canvas,
    nodes,
    edges,
    isLoading,
    error,
    
    // ReactFlow handlers
    onNodesChange: handleNodesChange,
    onEdgesChange: handleEdgesChange,
    onConnect: handleConnect,
    
    // Custom operations
    addNode,
    clearCanvas: handleClearCanvas,
  };
}; 