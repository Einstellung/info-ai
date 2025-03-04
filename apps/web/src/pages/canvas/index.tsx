import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  Node,
  Edge,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection
} from 'reactflow'

// Import ReactFlow styles
import 'reactflow/dist/style.css'

// Initial nodes and edges for a new canvas
const initialNodes: Node[] = [
  {
    id: 'node-1',
    type: 'default',
    position: { x: 250, y: 100 },
    data: { label: 'Node 1' },
  },
  {
    id: 'node-2',
    type: 'default',
    position: { x: 250, y: 300 },
    data: { label: 'Node 2' },
  },
]

const initialEdges: Edge[] = [
  { id: 'edge-1', source: 'node-1', target: 'node-2', animated: true },
]

/**
 * Canvas Flow component that handles the ReactFlow instance
 */
const CanvasFlow: React.FC = () => {
  const { canvasId } = useParams<{ canvasId: string }>()
  
  // State for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // Handle connections between nodes
  const onConnect = React.useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds))
    },
    [setEdges]
  )

  // Load canvas data based on canvasId
  useEffect(() => {
    // In the future, load canvas data from API or local storage
    console.log(`Loading canvas with ID: ${canvasId}`)
    
    // For now, just use initial data
    setNodes(initialNodes)
    setEdges(initialEdges)
  }, [canvasId, setNodes, setEdges])

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}

/**
 * Canvas page component that wraps the ReactFlow provider
 */
const Canvas: React.FC = () => {
  return (
    <div className="h-full w-full">
      <ReactFlowProvider>
        <CanvasFlow />
      </ReactFlowProvider>
    </div>
  )
}

export default Canvas
