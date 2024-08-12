import { ARegisterUser } from 'actions/userActions';
import { UserError } from 'actions/utils/enums/UserError';
import { SubmitStatus, useSubmitData } from 'hooks/useSubmitData';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function useRegisterForm() {
  const router = useRouter();

  const { submit, updateData, status, updateStatus } = useSubmitData(
    {},
    async (credentials: TODO) => {
      if (
        credentials.password1 &&
        credentials.password2 &&
        credentials.password1 !== credentials.password2
      ) {
        updateStatus(UserError.PASSWORD_MISMATCH);
        toast.error('Salasanat eivät täsmää!');
      } else {
        updateStatus(SubmitStatus.LOADING);
        await ARegisterUser(credentials).then(result => {
          if (result == 0) {
            toast.success('Account registered successfully!');
            router.push('/login');
          } else if (result == UserError.DUPLICATE) {
            toast.error('An account with the provided email already exists!');
          } else {
            toast.error('An unexpected error occured!');
          }
          updateStatus(SubmitStatus.IDLE);
        });
      }
    }
  );

  return {
    submit,
    updateData,
    status,
  };
}
