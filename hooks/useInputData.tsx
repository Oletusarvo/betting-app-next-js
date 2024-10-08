'use client';

import { useState } from 'react';

/**
 * A hook to store the data of inputs as they are changed.
 * @param initialData
 * @returns
 */
export function useInputData<T extends {}>(initialData: T) {
  const [data, setData] = useState<T>(initialData);

  /**Updates the property with the name of the event in the stored data.*/
  const updateData = (e: TODO) => {
    console.log(e.target.type);
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.type == 'number' ? e.target.valueAsNumber : e.target.value,
    }));
  };

  /**Resets the stored data back to what was passed as the initial data. */
  const resetData = () => {
    setData(initialData);
  };

  return {
    data,
    updateData,
    resetData,
  };
}
