import React from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import Toast from './Toast';

export interface ToastContainerProps {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

const ToastContainer: React.FC<{ messages: ToastContainerProps[] }> = ({
  messages,
}) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0, transform: 'rotateZ(180deg)' },
      enter: { right: '0%', opacity: 1, transform: 'rotateZ(0deg)' },
      leave: { right: '-120%', opacity: 0, transform: 'rotateZ(180deg)' },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} {...item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
