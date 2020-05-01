import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer, {
  ToastContainerProps,
} from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastContainerProps, 'id'>): string;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastContainerProps[]>([]);
  const addToast = useCallback((message: Omit<ToastContainerProps, 'id'>) => {
    const id = uuid();
    const toast = {
      id,
      ...message,
    };
    setMessages(prev => [...prev, toast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  }, []);

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      {children}

      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);

  if (!context) throw new Error('useToast must be used within a ToastProvider');

  return context;
};

export default ToastContext;
