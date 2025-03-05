import { 
  ReactFlow, 
  ReactFlowProvider,
} from '@xyflow/react';
import { useCanvas } from '@info-ai/web-support/hooks/canvas/useCanvas';
import { useCanvasExample } from '@info-ai/web-support/hooks/canvas/useCanvasExample';

// Import ReactFlow styles
import '@xyflow/react/dist/style.css';

interface CanvasProps {
  canvasId: string;
  className?: string;
  useExample?: boolean;
}

/**
 * Canvas component that renders the ReactFlow instance
 * This is the main component that applications will use
 */
export const CanvasFlow = ({ canvasId, className, useExample = false }: CanvasProps): JSX.Element => {
  // 根据 useExample 参数决定使用哪个 hook
  const exampleData = useCanvasExample();
  const canvasData = useCanvas(canvasId);
  
  // 选择使用示例数据还是实际数据
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    isLoading,
    error,
  } = useExample ? exampleData : canvasData;

  if (isLoading) {
    return <div className="flex h-full w-full items-center justify-center">Loading canvas...</div>;
  }

  if (error) {
    return <div className="flex h-full w-full items-center justify-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className={`h-full w-full ${className || ''}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        defaultEdgeOptions={{ animated: true }}
      />
    </div>
  );
};

/**
 * Canvas component with ReactFlow provider
 * This is a wrapper that ensures the ReactFlow context is available
 */
export const Canvas = (props: CanvasProps): JSX.Element => {
  return (
    <ReactFlowProvider>
      <CanvasFlow {...props} />
    </ReactFlowProvider>
  );
}; 