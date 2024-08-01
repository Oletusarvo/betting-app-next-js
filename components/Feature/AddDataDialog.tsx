'use client';

import { useSubmitData } from '@/hooks/useSubmitData';
import { Casino, Check } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  useMediaQuery,
} from '@mui/material';
import { Spinner } from '../UI/Spinner';
import { theme } from 'theme';
import toast from 'react-hot-toast';

type AddDataDialogProps = DialogProps & {
  title: string;
  submitText?: string;
  cancelText?: string;
  open: boolean;
  handleClose: () => void;
  submitMethod: <T>(data: T) => Promise<void>;
};
export const AddDataDialog = ({
  children,
  submitMethod,
  title,
  submitText,
  cancelText,
  open,
  handleClose,
}: AddDataDialogProps) => {
  const { data, status, updateData, submit } = useSubmitData({}, submitMethod);
  const isMobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  const loading = status === 'loading';

  return (
    <Dialog
      maxWidth='lg'
      fullWidth
      fullScreen={isMobileDevice}
      open={open}
      onClose={handleClose}
      component='form'
      onSubmit={async e => {
        try {
          await submit(e);
          handleClose();
        } catch (err: any) {
          toast.error(err.message);
        }
      }}
      onChange={updateData}>
      <DialogTitle className='flex items-center gap-2'>
        <Casino className='text-purple-800' />
        {title}
      </DialogTitle>
      <div className='flex flex-col gap-2 p-5 flex-1'>{children}</div>
      <DialogActions>
        <Button
          variant='text'
          type='button'
          onClick={handleClose}>
          {cancelText || 'Cancel'}
        </Button>
        <Button
          startIcon={loading ? <Spinner /> : <Check />}
          variant='contained'
          type='submit'>
          {submitText || 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
