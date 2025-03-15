import React, { useState } from 'react';
import { Button, Space, Typography, Drawer } from 'antd';
import SplitLayout from '../layouts/SplitLayout';
import Chat from '../components/Chat';
import SimulationForm from '../components/Chat/SimulationForm';

// 使用函数组件和 Tailwind 类名替代 styled-components
const Canvas = () => (
  <div className="h-full w-full bg-gray-100 flex items-center justify-center text-2xl text-gray-500">
    画布区域
  </div>
);

const { Title } = Typography;

const CanvasPage: React.FC = () => {
  const [formVisible, setFormVisible] = useState(false);
  
  const showForm = () => {
    setFormVisible(true);
  };
  
  const hideForm = () => {
    setFormVisible(false);
  };
  
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <div className="p-4 md:p-6 border-b border-gray-200 bg-white">
        <Space>
          <Title level={4} style={{ margin: 0 }}>画布与模拟</Title>
          <Button type="primary" onClick={showForm}>
            创建新模拟
          </Button>
        </Space>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <SplitLayout
          leftComponent={<Canvas />}
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
  );
};

export default CanvasPage; 