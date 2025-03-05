import React from 'react'
import { Layout, Menu, Button, theme } from 'antd'
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  DashboardOutlined,
  ProjectOutlined,
  FileOutlined,
  SettingOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons'

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
  const { token } = theme.useToken()

  return (
    <Layout className="min-h-screen">
      {/* Header */}
      <Header className="flex items-center justify-between bg-white px-6 shadow-sm z-10">
        <div className="flex items-center">
          <div className="text-xl font-bold text-[#1890ff]">Info AI</div>
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
          width={250}
          style={{
            background: token.colorBgContainer,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            zIndex: 5,
            height: 'calc(100vh - 64px)',
            position: 'sticky',
            top: 64,
            left: 0,
            overflow: 'auto'
          }}
          trigger={null}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="my-4 ml-6"
            style={{ width: 'fit-content' }}
          />
          
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ borderRight: 0 }}
            items={[
              {
                key: '1',
                icon: <DashboardOutlined />,
                label: 'Dashboard',
              },
              {
                key: '2',
                icon: <ProjectOutlined />,
                label: 'Projects',
                children: [
                  {
                    key: '2-1',
                    label: 'Recent Projects',
                  },
                  {
                    key: '2-2',
                    label: 'All Projects',
                  },
                ],
              },
              {
                key: '3',
                icon: <FileOutlined />,
                label: 'Templates',
              },
              {
                key: '4',
                icon: <SettingOutlined />,
                label: 'Settings',
              },
            ]}
          />
          
          {!collapsed && (
            <div className="absolute bottom-6 left-0 right-0 px-6">
              <div className="rounded-lg bg-[#f0f5ff] p-4 border border-[#d6e4ff]">
                <h4 className="text-sm font-medium text-[#1890ff] mb-2">Need Help?</h4>
                <p className="text-xs text-gray-600 mb-3">Check our documentation for guides and tips.</p>
                <Button 
                  type="primary" 
                  size="small" 
                  icon={<QuestionCircleOutlined />}
                  className="w-full"
                  style={{ background: '#1890ff' }}
                >
                  Help Center
                </Button>
              </div>
            </div>
          )}
        </Sider>

        {/* Main Content */}
        <Content 
          className="bg-gray-50 p-6"
          style={{ 
            minHeight: 'calc(100vh - 64px)',
            overflow: 'auto'
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
} 