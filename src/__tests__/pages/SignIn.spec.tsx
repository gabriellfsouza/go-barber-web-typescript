import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignIn from '../../pages/Signin';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to}>{children}</a>
    ),
  };
});

const mockedSignIn = jest.fn();
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    signIn: mockedSignIn,
  }),
}));

const mockedAddToast = jest.fn();

jest.mock('../../context/ToastContext', () => ({
  useToast: () => ({
    addToast: mockedAddToast,
  }),
}));

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to signin', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.submit(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to signin with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.submit(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });
    fireEvent.submit(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
