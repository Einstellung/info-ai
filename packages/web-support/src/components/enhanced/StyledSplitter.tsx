import React from 'react';
import { Splitter } from 'antd';
import './splitter.css';

export interface EnhancedSplitterProps {
  children: React.ReactNode;
  layout?: 'horizontal' | 'vertical';
  onResizeEnd?: (sizes: number[]) => void;
}

// 创建基础组件
const BaseEnhancedSplitter: React.FC<EnhancedSplitterProps> = ({ 
  children, 
  layout = 'horizontal', 
  onResizeEnd, 
  ...props 
}) => {
  return (
    <div className="enhanced-splitter-wrapper">
      <Splitter
        layout={layout}
        onResizeEnd={onResizeEnd}
        className={`enhanced-splitter ${layout === 'horizontal' ? 'horizontal' : 'vertical'}`}
        {...props}
      >
        {children}
      </Splitter>
    </div>
  );
};

// 使用 React.memo 包装组件
export const EnhancedSplitter = React.memo(BaseEnhancedSplitter) as React.MemoExoticComponent<React.FC<EnhancedSplitterProps>> & {
  Panel: typeof Splitter.Panel;
};

// 添加 Panel 属性
EnhancedSplitter.Panel = Splitter.Panel;

export default EnhancedSplitter; 