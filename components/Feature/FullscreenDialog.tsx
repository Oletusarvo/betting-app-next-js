import { Close } from '@mui/icons-material';
import { AppBar, IconButton, Slide, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';

type FullScreenDialogProps = React.PropsWithChildren & {
  title: string;
  open: boolean;
  handleClose: () => void;
};

export const FullScreenDialog = ({ children, title, open, handleClose }: FullScreenDialogProps) => {
  return (
    <Dialog
      TransitionComponent={Slide}
      open={open}
      onClose={handleClose}
      fullScreen>
      <AppBar sx={{ position: 'static' }}>
        <div className='flex items-center gap-2 text-white'>
          <IconButton
            onClick={handleClose}
            sx={{ color: 'white' }}>
            <Close />
          </IconButton>
          <Typography variant='h6'>{title}</Typography>
        </div>
      </AppBar>
      <div className='p-2 h-full flex flex-col'>{children}</div>
    </Dialog>
  );
};
