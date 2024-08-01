import { VisibilityProvider } from '../Util/VisibilityProvider';

const Backdrop = ({ children }: ChildrenRequired) => {
  return (
    <div className='absolute top-0 left-0 z-10 backdrop-blur-md bg-blue-700 bg-opacity-50 flex items-center justify-center w-full h-full py-2 animate-fade-in-slow'>
      {children}
    </div>
  );
};

type ModalProps = ChildrenRequired & {
  hidden?: boolean;
};

export function Modal({ hidden, children }: ModalProps) {
  return (
    <div hidden={hidden}>
      <Backdrop>{children}</Backdrop>
    </div>
  );
}

Modal.Header = ({ children }: ChildrenRequired) => {
  return (
    <div className='flex items-center p-2 justify-between border-b border-slate-200'>
      {children}
    </div>
  );
};

type HeaderWithIconProps = {
  icon: string;
  title: string;
};

Modal.HeaderWithIconAndTitle = ({ icon, title }: HeaderWithIconProps) => {
  return (
    <Modal.Header>
      <div className='flex items-center gap-2'>
        <i className={`fa ${icon} text-slate-500`} />
        <h1 className='text-lg text-black '>{title}</h1>
      </div>

      <VisibilityProvider.Trigger>
        <i className='fa fa-times text-xl text-slate-500' />
      </VisibilityProvider.Trigger>
    </Modal.Header>
  );
};

Modal.DefaultContentContainer = ({ children }: ChildrenRequired) => (
  <div className='flex flex-col text-black bg-white rounded-lg shadow-lg max-h-full overflow-y-scroll xs:w-full lg:w-[700px] xs:mx-2 overflow-hidden animate-slide-in-from-bottom'>
    {children}
  </div>
);

Modal.Footer = ({ children }: ChildrenRequired) => {
  return (
    <div className='w-full flex items-center justify-end border-t border-slate-200 p-2'>
      {children}
    </div>
  );
};
