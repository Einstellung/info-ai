import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCanvasStoreShallow } from '@info-ai/web-support/stores/canvasStore';
import { debounce } from '@info-ai/web-support/utils/debounce';

/**
 * Hook for creating new canvases with debounce functionality
 */
export const useCreateCanvas = () => {
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  
  const { createCanvas } = useCanvasStoreShallow((state) => ({
    createCanvas: state.createCanvas,
  }));

  const createNewCanvas = useCallback(async () => {
    try {
      setIsCreating(true);
      const canvasId = await createCanvas('New Canvas');
      navigate(`/canvas/${canvasId}`);
    } catch (error) {
      console.error('Failed to create canvas:', error);
    } finally {
      setIsCreating(false);
    }
  }, [createCanvas, navigate]);

  // Debounce the create function to prevent multiple rapid creations
  const debouncedCreateCanvas = debounce(createNewCanvas, 300);

  return {
    createCanvas: createNewCanvas,
    debouncedCreateCanvas,
    isCreating,
  };
}; 