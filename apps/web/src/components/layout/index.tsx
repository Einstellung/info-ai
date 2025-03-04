import React from 'react'
import { Layout } from 'antd'

const { Header, Sider, Content } = Layout

interface AppLayoutProps {
  children: React.ReactNode
}

/**
 * Main application layout component
 * Provides header, sidebar, and content areas
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <Layout className="min-h-screen">
      {/* Header */}
      <Header className="flex items-center justify-between bg-white px-6 shadow-sm">
        <div className="flex items-center">
          <div className="text-xl font-bold">Info AI</div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Add header controls here */}
        </div>
      </Header>

      <Layout>
        {/* Sidebar */}
        <Sider 
          collapsible 
          collapsed={collapsed} 
          onCollapse={setCollapsed}
          className="bg-white"
          width={250}
        >
          <div className="p-4">
            {/* Add sidebar content here */}
          </div>
        </Sider>

        {/* Main Content */}
        <Content className="bg-gray-50 p-6">
          {children}
        </Content>
      </Layout>
    </Layout>
  )
} 