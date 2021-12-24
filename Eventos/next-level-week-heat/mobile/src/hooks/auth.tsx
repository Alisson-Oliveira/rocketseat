import React, { createContext, useContext, useEffect, useState } from "react";
import * as AuthSessions from 'expo-auth-session';
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLIENT_ID = '65983c91b1fb2967eeb6';
const SCOPE = 'read:user';
const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

type User = {
  id: string,
  avatar_url: string,
  name: string,
  login: string
}

type AuthContextData = {
  user: User | null,
  isSigningIn: boolean,
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthResponse = {
  token: string,
  user: User
}

type AuthorizationResponse = {
  params: {
    code?: string,
    error?: string
  },
  type?: string
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  async function signIn() {
    try {
      setIsSigningIn(true);

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`
      const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;
      
      if(authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
        const authResponse = await api.post('/authenticate', { code: authSessionResponse.params.code });

        const { token, user } = authResponse.data as AuthResponse;

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, token);

        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigningIn(false);
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem(USER_STORAGE);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  }

  useEffect(() => {
    async function loaduserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);
      
      if(userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;

        setUser(JSON.parse(userStorage));
      }

      setIsSigningIn(false);
    }

    loaduserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isSigningIn,
        signIn,
        signOut
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };