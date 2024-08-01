import { useState } from 'react';
import { useInputData } from './useInputData';
import toast from 'react-hot-toast';

export enum SubmitStatus {
  UNEXPECTED = -1,
  IDLE = -2,
  LOADING = -3,
}

export function useSubmitData<DataT extends {}>(
  initialData: DataT,
  submitMethod: (data: DataT) => Promise<void>
) {
  const [status, setStatus] = useState<number>(SubmitStatus.IDLE);
  const { data, updateData } = useInputData(initialData);

  const submit = async (e: TODO) => {
    e.preventDefault();
    setStatus(SubmitStatus.LOADING);
    await submitMethod(data).finally(() => setStatus(SubmitStatus.IDLE));
  };

  return {
    updateData,
    updateStatus: setStatus,
    submit,
    data,
    status,
  };
}
