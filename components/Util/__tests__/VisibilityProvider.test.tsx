import { screen, render, fireEvent } from '@testing-library/react';
import { VisibilityProvider } from '../VisibilityProvider';

test('Toggles the hidden-attribute of the target when the trigger is pressed.', () => {
  const vp = (
    <VisibilityProvider>
      <VisibilityProvider.Trigger>
        <button data-testid='trigger'>Trigger</button>
      </VisibilityProvider.Trigger>

      <VisibilityProvider.Target>
        <div
          data-testid='target'
          hidden={true}
        />
      </VisibilityProvider.Target>
    </VisibilityProvider>
  );

  render(vp);
  const trigger = screen.getByTestId('trigger');
  const target = screen.getByTestId('target');
  expect(target).toHaveAttribute('hidden');

  fireEvent.click(trigger);
  expect(target).toBeInTheDocument();
  expect(target).not.toHaveAttribute('hidden');
});
