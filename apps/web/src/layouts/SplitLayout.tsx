import React, { useCallback } from 'react';
import { EnhancedSplitter } from '@info-ai/web-support/components/enhanced/StyledSplitter';
import { useLayoutStore } from '@info-ai/web-support/store/layoutStore';

interface SplitLayoutProps {
  leftComponent: React.ReactNode;
  rightComponent: React.ReactNode;
}

const SplitLayout: React.FC<SplitLayoutProps> = ({
  leftComponent,
  rightComponent,
}) => {
  const { splitRatio, setSplitRatio } = useLayoutStore();
  // optimize render performance by limiting the number of re-renders
  const handleResizeEnd = useCallback((sizes: number[]) => {
    if (Math.abs(sizes[0] - splitRatio) > 0.1) {
      setSplitRatio(sizes[0]);
    }
  }, [splitRatio, setSplitRatio]);

  return (
    <div className="h-full w-full">
      <EnhancedSplitter
        layout="horizontal"
        onResizeEnd={handleResizeEnd}
      >
        <EnhancedSplitter.Panel defaultSize={`${splitRatio}%`} min="30%">
          {leftComponent}
        </EnhancedSplitter.Panel>
        <EnhancedSplitter.Panel min="30%">
          {rightComponent}
        </EnhancedSplitter.Panel>
      </EnhancedSplitter>
    </div>
  );
};

export default React.memo(SplitLayout); 