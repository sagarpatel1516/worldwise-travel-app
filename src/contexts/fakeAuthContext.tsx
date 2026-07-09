import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from "react";

interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

type AuthAction =
  | { type: "login"; payload: User }
  | { type: "logout" };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new Error("Unknown action type");
  }
}

const FAKE_USER: User = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({
  children,
}: AuthProviderProps): React.JSX.Element {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function login({ email, password }: LoginCredentials): void {
    if (
      email === FAKE_USER.email &&
      password === FAKE_USER.password
    ) {
      dispatch({
        type: "login",
        payload: FAKE_USER,
      });
      return;
    }

    throw new Error("Invalid email or password");
  }

  function logout(): void {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext was used outside AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };