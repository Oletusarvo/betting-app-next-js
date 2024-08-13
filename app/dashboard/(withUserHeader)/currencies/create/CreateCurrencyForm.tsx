'use client';

import { CreateDataForm } from '@/components/Feature/CreateDataForm';
import { Fieldset, FormControl, Input, InputSubLabel } from '@/components/UI/FormUtils';
import { ACreateCurrency } from 'actions/currencyActions';
import toast from 'react-hot-toast';

export function CreateCurrencyForm() {
  return (
    <CreateDataForm
      initialData={{}}
      createMethod={async data => {
        return await ACreateCurrency(data).then(res => {
          if (res != 0) {
            toast.error('Error while creating currency!');
          } else {
            toast.success('Currency created successfully!');
          }

          return res;
        });
      }}>
      <Fieldset legend='Main'>
        <FormControl
          label='Name'
          control={
            <Input
              name='name'
              required
              placeholder='Type a name...'
            />
          }
        />

        <FormControl
          label='Symbol'
          required
          control={
            <Input
              name='symbol'
              placeholder='Type a symbol...'
              maxLength={5}
            />
          }
          helper={<InputSubLabel>A unique symbol for the currency.</InputSubLabel>}
        />
      </Fieldset>
    </CreateDataForm>
  );
}
