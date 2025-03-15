import React, { useState } from 'react';
import { Card, Input, Button, Typography, Spin } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { Bubble, BubbleProps } from '@ant-design/x';
import { useChatStore, Message } from '@info-ai/web-support/store/chatStore';
import { useWebSocket } from '@info-ai/web-support/hooks/useWebSocket';

const { Text } = Typography;

// Define the correct type for Bubble items based on Ant Design X documentation
type BubbleItem = BubbleProps<string> & {
  key: string | number;
  role: string;
};

const Chat: React.FC = () => {
  const { 
    simulationId, 
    messages, 
    loading, 
    progress, 
    addMessage 
  } = useChatStore();
  
  const [inputValue, setInputValue] = useState('');
  const { sendMessage } = useWebSocket(simulationId);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // 添加用户消息
    const userMessage: Message = {
      id: Date.now(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    
    addMessage(userMessage);
    sendMessage(inputValue);
    setInputValue('');
  };
  
  // 转换消息格式以适应Bubble.List
  const bubbleItems: BubbleItem[] = messages.map((message: Message) => ({
    key: message.id.toString(),
    content: message.content,
    placement: message.isUser ? 'end' : 'start',
    role: message.isUser ? 'user' : 'ai',
    avatar: message.isUser ? undefined : <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Felix" alt="AI" style={{ width: 32, height: 32, borderRadius: '50%' }} />,
  }));
  
  return (
    <Card 
      title="模拟对话" 
      variant="borderless"
      className="h-full flex flex-col"
      styles={{ 
        body: { 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          padding: '16px', 
          overflow: 'hidden' 
        }
      }}
    >
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.length === 0 && !loading ? (
          <div className="text-center py-10">
            <Text type="secondary">暂无消息，开始一个新的模拟吧</Text>
          </div>
        ) : (
          <Bubble.List 
            items={bubbleItems}
            autoScroll
            roles={{
              user: {
                placement: 'end',
                variant: 'filled',
              },
              ai: {
                placement: 'start',
                variant: 'outlined',
              }
            }}
          />
        )}
        
        {loading && (
          <div className="text-center py-5">
            <Spin />
            <div className="mt-2">
              <Text type="secondary">正在生成回复...</Text>
            </div>
          </div>
        )}
        
        {progress > 0 && progress < 100 && (
          <div className="py-3 text-center">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-blue-500 transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <Text type="secondary">{progress}% 完成</Text>
          </div>
        )}
      </div>
      
      <div className="flex mt-auto">
        <Input
          placeholder="输入消息..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onPressEnter={handleSendMessage}
          disabled={loading || !simulationId}
          className="rounded-full pr-12"
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          disabled={loading || !simulationId || !inputValue.trim()}
          className="ml-[-40px] z-10 border-none bg-transparent text-blue-500 hover:text-blue-400 hover:bg-transparent"
        />
      </div>
    </Card>
  );
};

export default Chat; 