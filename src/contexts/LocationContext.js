// LocationContext.js
import React, { createContext, useState } from 'react';

export const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [locationObj, setLocationObj] = useState(null);

  return (
    <LocationContext.Provider value={{ locationObj, setLocationObj }}>
      {children}
    </LocationContext.Provider>
  );
}
