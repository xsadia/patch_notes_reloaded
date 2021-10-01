import { createContext, ReactNode, useContext, useState } from 'react';

type User = {
  _id: string;
  username: string;
  role: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthState = {
  token: string;
  user: User;
};

type AuthContexData = {
  user: User;
  token: string;
  isAuthenticated: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContexData>({} as AuthContexData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@patchNotes:token');
    const user = localStorage.getItem('@patchNotes:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const isAuthenticated = !!data.token;

  async function signIn({ email, password }: SignInCredentials) {
    const response = await fetch(
      'https://patch-notes-erin.herokuapp.com/sessions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    const data = await response.json();

    const { token, user } = data;

    localStorage.setItem('@patchNotes:token', token);
    localStorage.setItem('@patchNotes:user', JSON.stringify(user));

    setData({ token, user });
  }

  function signOut() {
    localStorage.removeItem('@patchNotes:token');
    localStorage.removeItem('@patchNotes:user');

    setData({} as AuthState);
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        token: data.token,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContexData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Use this within an AuthProvider');
  }

  return context;
}
