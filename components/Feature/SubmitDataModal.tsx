import { Modal } from '../UI/Modal';
import { VisibilityProvider } from '../Util/VisibilityProvider';
import {
  MutableRefObject,
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useId,
  useRef,
} from 'react';

import { useSubmitData } from 'hooks/useSubmitData';
import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import { ButtonWithLoading } from '../UI/Button';
import { Check } from '@mui/icons-material';

const SubmitDataModalProviderContext = createContext<{
  formId: string;
  formRef: MutableRefObject<HTMLFormElement | null>;
  status: number;
  updateData: (e: any) => void;
  submit: (e: any) => void;
  onInput: (e: any) => void;
} | null>(null);

type SubmitDataModalProviderProps = ChildrenRequired & {
  hidden?: boolean;
  submitMethod: (data: any) => Promise<void>;
  inputValidator?: (e: TODO) => void;
};

/**A preset for creating modals containing a form that submits data to the server. */
export function SubmitDataModalProvider({
  children,
  hidden,
  submitMethod,
  inputValidator,
}: SubmitDataModalProviderProps) {
  const { updateData, submit, status } = useSubmitData({}, submitMethod);
  const formRef = useRef<HTMLFormElement>(null);
  const formId = useId();

  const onInput = (e: TODO) => {
    if (inputValidator) {
      inputValidator(e);
    }

    updateData(e);
  };

  return (
    <Modal hidden={hidden}>
      <SubmitDataModalProviderContext.Provider
        value={{ formId, formRef, submit, onInput, updateData, status }}>
        {children}
      </SubmitDataModalProviderContext.Provider>
    </Modal>
  );
}

SubmitDataModalProvider.Form = ({ children }: ChildrenRequired) => {
  const { formId, onInput, formRef, submit } = useSubmitDataModalProviderContext();

  return (
    <form
      id={formId}
      className='xs:p-2 flex flex-col gap-4 overflow-y-scroll'
      onInput={onInput}
      ref={formRef}
      onSubmit={submit}>
      {children}
    </form>
  );
};

type FooterProps = {
  cancelText?: string;
  SubmitButton?: typeof Button;
  submitText?: string;
};

SubmitDataModalProvider.Footer = ({
  SubmitButton,
  submitText = 'Submit',
  cancelText = 'Cancel',
}: FooterProps) => {
  const { formId, status } = useSubmitDataModalProviderContext();
  const loading = status == 1;

  return (
    <Modal.Footer>
      <div className='flex gap-2 items-center'>
        <VisibilityProvider.Trigger>
          <Button
            variant='outlined'
            type='button'>
            {cancelText}
          </Button>
        </VisibilityProvider.Trigger>

        {SubmitButton ? (
          <SubmitButton
            variant='contained'
            type='submit'
            form={formId}
            startIcon={loading ? <CircularProgress size='1rem' /> : <Check />}>
            {submitText}
          </SubmitButton>
        ) : (
          <ButtonWithLoading
            variant='contained'
            loading={loading}
            type='submit'
            startIcon={<Check />}
            form={formId}>
            {submitText}
          </ButtonWithLoading>
        )}
      </div>
    </Modal.Footer>
  );
};

function useSubmitDataModalProviderContext() {
  const ctx = useContext(SubmitDataModalProviderContext);
  if (!ctx)
    throw new Error(
      'useSubmitDataModalProviderContext can only be used within the scope of a SubmitDataModalProviderContext!'
    );
  return ctx;
}
