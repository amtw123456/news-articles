import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [checkedIds, setCheckedIds] = useState([]);

  return (
    <AppContext.Provider value={{ checkedIds, setCheckedIds }}>
      {children}
    </AppContext.Provider>
  );
};