import { useParams } from 'react-router-dom'
import { Canvas, useCreateCanvas } from '@info-ai/web-support'
import { Button, Empty } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

/**
 * Canvas page component
 * Handles routing and displays the appropriate canvas or empty state
 */
const CanvasPage = () => {
  const { canvasId } = useParams<{ canvasId: string }>()
  const { debouncedCreateCanvas, isCreating } = useCreateCanvas()

  // If we have a canvasId, render the canvas
  if (canvasId) {
    // 使用示例数据进行调试
    return <Canvas canvasId={canvasId} useExample={true} />
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