import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // 获取初始值
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // 状态保存实际值
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // 返回一个包装版本的 useState 的 setter 函数，它会同时更新 localStorage
  const setValue = (value: T) => {
    if (typeof window === 'undefined') {
      console.warn(`Tried setting localStorage key "${key}" even though environment is not a client`);
    }

    try {
      // 允许值是一个函数，就像 useState 的 setter 一样
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // 保存到 state
      setStoredValue(valueToStore);
      
      // 保存到 localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // 监听其他窗口的 storage 事件
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue));
      }
    };

    // 添加事件监听
    window.addEventListener('storage', handleStorageChange);
    
    // 清理事件监听
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
} 