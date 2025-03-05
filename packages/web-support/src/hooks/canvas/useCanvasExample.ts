import { useCallback } from 'react';
import { Node, Edge, Connection, useNodesState, useEdgesState, addEdge } from '@xyflow/react';

// 初始节点数据
const initialNodes: Node[] = [
  { 
    id: '1', 
    position: { x: 100, y: 100 }, 
    data: { label: 'Node 1' },
    type: 'input'
  },
  { 
    id: '2', 
    position: { x: 250, y: 200 }, 
    data: { label: 'Node 2' } 
  },
  { 
    id: '3', 
    position: { x: 400, y: 300 }, 
    data: { label: 'Node 3' },
    type: 'output'
  },
];

// 初始边数据
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
];

/**
 * Hook for providing example canvas data for debugging
 * Returns nodes, edges, and handlers for a simple example flow
 */
export const useCanvasExample = () => {
  // 使用 ReactFlow 的状态钩子管理节点和边
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // 处理连接事件
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // 添加新节点
  const addNewNode = useCallback(() => {
    const newId = `${nodes.length + 1}`;
    const newNode: Node = {
      id: newId,
      position: {
        x: Math.random() * 400 + 50,
        y: Math.random() * 400 + 50,
      },
      data: { label: `Node ${newId}` },
    };
    
    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNewNode,
    isLoading: false,
    error: null,
  };
}; 