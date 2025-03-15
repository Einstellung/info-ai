import { useEffect, useRef, useCallback } from 'react';
import { useChatStore } from '../store/chatStore';

export const useWebSocket = (simulationId: string | null) => {
  const wsRef = useRef<WebSocket | null>(null);
  const { setLoading, setProgress, setMessages, setError, batchUpdate } = useChatStore();
  
  // 使用 useCallback 包装 sendMessage 函数
  const sendMessage = useCallback((message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    } else {
      console.error('WebSocket is not connected');
    }
  }, []);
  
  useEffect(() => {
    if (!simulationId) {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      return;
    }
    
    // 创建WebSocket连接
    wsRef.current = new WebSocket(`ws://localhost:8000/ws/simulations/${simulationId}`);
    setLoading(true);
    
    wsRef.current.onopen = () => {
      console.log('WebSocket connected');
    };
    
    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // 使用批量更新，减少状态更新次数
        const updates: Record<string, any> = {};
        
        // 更新进度
        if (typeof data.progress === 'number') {
          updates.progress = data.progress;
        }
        
        // 更新消息
        if (data.chapters && Array.isArray(data.chapters)) {
          const messages = data.chapters.map((chapter: any) => ({
            id: chapter.number,
            content: chapter.content,
            isUser: false,
            timestamp: new Date()
          }));
          
          updates.messages = messages;
          updates.loading = false;
        }
        
        // 处理错误
        if (data.error) {
          updates.error = data.error;
          updates.loading = false;
        }
        
        // 批量应用所有更新
        if (Object.keys(updates).length > 0) {
          if (batchUpdate) {
            batchUpdate(updates);
          } else {
            // 如果没有批量更新函数，则单独更新
            if ('progress' in updates) setProgress(updates.progress);
            if ('messages' in updates) setMessages(updates.messages);
            if ('loading' in updates) setLoading(updates.loading);
            if ('error' in updates) setError(updates.error);
          }
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('WebSocket connection error');
      setLoading(false);
    };
    
    wsRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [simulationId, setLoading, setProgress, setMessages, setError, batchUpdate]);
  
  return { sendMessage };
}; 