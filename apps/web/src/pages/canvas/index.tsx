import { useParams } from 'react-router-dom'
import { Canvas as CanvasComponent, useCreateCanvas } from '@info-ai/web-support'
import { Button, Empty, Drawer } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useState, memo } from 'react'
import SplitLayout from '../../layouts/SplitLayout'
import Chat from '../../components/Chat'
import SimulationForm from '../../components/Chat/SimulationForm'

// 将 CanvasWithId 组件移到渲染函数外部并使用 memo 包装
const CanvasWithId = memo(({ canvasId }: { canvasId: string }) => (
  <CanvasComponent canvasId={canvasId} useExample={true} />
));

/**
 * Canvas page component
 * Handles routing and displays the appropriate canvas or empty state
 */
const CanvasPage = () => {
  const { canvasId } = useParams<{ canvasId: string }>()
  const { debouncedCreateCanvas, isCreating } = useCreateCanvas()
  const [formVisible, setFormVisible] = useState(false)
  
  const showForm = () => {
    setFormVisible(true)
  }
  
  const hideForm = () => {
    setFormVisible(false)
  }

  // If we have a canvasId, render the canvas with chat
  if (canvasId) {
    return (
      <div className="h-[calc(100vh-64px)] flex flex-col">
        <div className="p-4 md:p-6 border-b border-gray-200 bg-white flex justify-between items-center">
          <h4 className="text-lg font-medium m-0">画布 - {canvasId}</h4>
          <Button type="primary" onClick={showForm}>
            创建新模拟
          </Button>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <SplitLayout
            leftComponent={<CanvasWithId canvasId={canvasId} />}
            rightComponent={<Chat />}
          />
        </div>
        
        <Drawer
          title="创建新的生命模拟"
          placement="right"
          onClose={hideForm}
          open={formVisible}
          width={400}
        >
          <SimulationForm onSuccess={hideForm} />
        </Drawer>
      </div>
    )
  }

  // Otherwise, show an empty state with a button to create a new canvas
  return (
    <div className="flex h-full w-full flex-col">
      <Empty
        className="m-0 flex w-full flex-grow flex-col items-center justify-center"
        description="No canvas selected"
      >
        <Button
          type="primary"
          onClick={debouncedCreateCanvas}
          loading={isCreating}
          icon={<PlusOutlined />}
        >
          Create New Canvas
        </Button>
      </Empty>
    </div>
  )
}

export default CanvasPage 