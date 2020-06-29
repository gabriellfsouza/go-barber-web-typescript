import React, { useEffect } from 'react';
import {
  FiXCircle,
  FiInfo,
  FiAlertCircle,
  FiCheckCircle,
} from 'react-icons/fi';
import { ToastContainerProps } from '..';
import { Container } from './styles';
import { useToast } from '../../../context/ToastContext';

interface MessageProps extends ToastContainerProps {
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<MessageProps> = ({
  id,
  title,
  description,
  type,
  style,
}) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <Container
      key={id}
      type={type}
      hasDescription={Number(!!description)}
      style={style}
    >
      {icons[type || 'info']}
      <div>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>
      <button onClick={() => removeToast(id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
