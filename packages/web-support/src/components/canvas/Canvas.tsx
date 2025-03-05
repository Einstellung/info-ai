import * as React from 'react';
import { 
  ReactFlow, 
  ReactFlowProvider,
} from '@xyflow/react';
import { useCanvas } from '@info-ai/web-support/hooks/canvas/useCanvas';

// Import ReactFlow styles
import '@xyflow/react/dist/style.css';

interface CanvasProps {
  canvasId: string;
  className?: string;
}

/**
 * Canvas component that renders the ReactFlow instance
 * This is the main component that applications will use
 */
export const CanvasFlow = ({ canvasId, className }: CanvasProps): JSX.Element => {
    const {
      nodes,
      edges,
      onNodesChange,
      onEdgesChange,
      onConnect,
      isLoading,
      error,
    } = useCanvas(canvasId);

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