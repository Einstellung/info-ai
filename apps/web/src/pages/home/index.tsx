import React from 'react'
import { Button, Typography, Card, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography

/**
 * Home page component
 * Provides introduction and navigation to Canvas
 */
const Home: React.FC = () => {
  const navigate = useNavigate()

  // Function to navigate to a new canvas
  const goToNewCanvas = () => {
    // Generate a random ID for the new canvas
    const canvasId = `canvas-${Date.now()}`
    navigate(`/canvas/${canvasId}`)
  }

  return (
    <div className="flex h-full flex-col items-center justify-center p-8">
      <div className="max-w-3xl text-center">
        <Title level={1}>Welcome to Info AI</Title>
        <Paragraph className="text-lg">
          A powerful canvas-based AI workspace for your creative projects
        </Paragraph>

        <Space direction="vertical" size="large" className="mt-8 w-full">
          <Button type="primary" size="large" onClick={goToNewCanvas}>
            Create New Canvas
          </Button>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card title="Recent Canvases" className="text-left">
              <p>Your recent canvases will appear here</p>
              {/* Add recent canvases list here */}
            </Card>

            <Card title="Getting Started" className="text-left">
              <p>Learn how to use the canvas with these quick tips:</p>
              <ul className="ml-4 mt-2 list-disc">
                <li>Drag and drop elements onto the canvas</li>
                <li>Connect nodes to create workflows</li>
                <li>Use the sidebar tools to add new components</li>
              </ul>
            </Card>
          </div>
        </Space>
      </div>
    </div>
  )
}

export default Home 