import { createContext, useState } from "react";
import { supabase } from "../client";
import type { User } from "@supabase/supabase-js";

// 👉 Auth input type-ları
type AuthInput = {
  email: string;
  password: string;
};

type RegisterInput = AuthInput & {
  name: string;
  surname: string;
  phone: string;
};

// 👉 Context tipini təyin edirik
interface GlobalContextType {
  user: User | null;
  register: (data: RegisterInput) => Promise<{ data?: any; error?: string }>;
  login: (data: AuthInput) => Promise<{ data?: any; error?: string }>;
  logout: () => Promise<void>;
}

// 👉 Default dəyərlərlə context yaradılır
export const GlobalContext = createContext<GlobalContextType>({
  user: null,
  register: async () => ({ data: null }),
  login: async () => ({ data: null }),
  logout: async () => {},
});

// 👉 Provider komponenti
export const GlobalProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);

  const register = async ({
    name,
    surname,
    phone,
    email,
    password,
  }: RegisterInput): Promise<{ data?: any; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, surname, phone },
        },
      });

      if (error)
         return { error: error.message };
      return { data };
    } catch (err: any) {
      return { error: err.message };
    }
  };

  const login = async ({
    email,
    password,
  }: AuthInput): Promise<{ data?: any; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error: error.message };

      setUser(data.user);
      return { data };
    } catch (err: any) {
      return { error: "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin." };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

//   const checkSession = async () => {
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();
//     setUser(session?.user || null);
//   };

//   useEffect(() => {
//     checkSession();

//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setUser(session?.user || null);
//       }
//     );

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

