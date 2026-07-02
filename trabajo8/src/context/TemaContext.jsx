import { createContext, useContext, useState } from "react";

const TemaContext = createContext();

export function TemaProvider({ children }) {
  const [tema, setTema] = useState("claro");

  const alternarTema = () => {
    setTema(tema === "claro" ? "oscuro" : "claro");
  };

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  return useContext(TemaContext);
}