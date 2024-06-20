// "use client";

// import { createContext, useState, useEffect, ReactNode } from "react";

// export const AuthContext = createContext({});

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [auth, setAuth] = useState(() => {
//     const savedAuth = localStorage.getItem("auth");
//     return savedAuth ? JSON.parse(savedAuth) : {};
//   });

//   useEffect(() => {
//     localStorage.setItem("auth", JSON.stringify(auth));
//   }, [auth]);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
