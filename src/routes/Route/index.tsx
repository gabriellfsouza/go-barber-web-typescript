import React, { useCallback } from 'react';
import {
  RouteProps as ReactDomRouteProps,
  Route as ReactDomRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface RouteProps extends ReactDomRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  function handleRender({ location }: { location: unknown }): JSX.Element {
    return isPrivate === !!user ? (
      <Component />
    ) : (
      <Redirect
        to={{
          pathname: isPrivate ? '/' : '/dashboard',
          state: { from: location },
        }}
      />
    );
  }

  return <ReactDomRoute {...rest} render={handleRender} />;
};

export default Route;
