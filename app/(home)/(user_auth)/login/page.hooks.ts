import { SubmitStatus, useSubmitData } from 'hooks/useSubmitData';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function useLoginForm() {
  const router = useRouter();
  const { status, submit, updateData, updateStatus } = useSubmitData({}, async (data: any) => {
    const credentials = {
      ...data,
      redirect: false,
    };

    updateStatus(SubmitStatus.LOADING);

    await signIn('credentials', credentials)
      .then((res: TODO) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          router.replace('/dashboard/games');
        }
      })
      .catch(err => toast.error(err.message))
      .finally(() => updateStatus(SubmitStatus.IDLE));
  });

  return {
    status,
    submit,
    updateData,
  };
}
