import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import { inputs, LinkBtn } from '@constants/constants';
import { LinkText, TitleText } from '@constants/text/text';
import { Inputs } from '@interfaces/interfaces';
import { Form } from './Form';

const onSubmit = jest.fn();
const authInputs = [{ ...inputs.email }, { ...inputs.password }];

describe('Form component', () => {
  it('Form renders', () => {
    render(
      <Form
        inputs={authInputs}
        link={LinkBtn.authPage}
        onSubmitHandler={(data: Inputs) => onSubmit(data)}
        titleText={TitleText.auth}
        submitBtnText={LinkText.start}
      />,
      { wrapper: MemoryRouter }
    );
    expect(screen.getByText(/authorization/i)).toBeInTheDocument();
  });

  it('onSubmit works correctly', async () => {
    render(
      <Form
        inputs={authInputs}
        link={LinkBtn.authPage}
        onSubmitHandler={(data: Inputs) => onSubmit(data)}
        titleText={TitleText.auth}
        submitBtnText={LinkText.start}
      />,
      { wrapper: MemoryRouter }
    );

    userEvent.click(screen.getByRole('button', { name: /Let`s start/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
    userEvent.type(
      screen.getByRole('textbox', { name: /email/i }),
      'test@mail.ru'
    );
    userEvent.type(screen.getByLabelText(/password/i), '111111');
    userEvent.click(screen.getByRole('button', { name: /Let`s start/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
  });

  it('email input onChange works', async () => {
    render(
      <Form
        inputs={authInputs}
        link={LinkBtn.authPage}
        onSubmitHandler={(data: Inputs) => onSubmit(data)}
        titleText={TitleText.auth}
        submitBtnText={LinkText.start}
      />,
      { wrapper: MemoryRouter }
    );

    userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'test');
    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
        'test'
      );
    });
  });

  it('password input onChange works', async () => {
    render(
      <Form
        inputs={authInputs}
        link={LinkBtn.authPage}
        onSubmitHandler={(data: Inputs) => onSubmit(data)}
        titleText={TitleText.auth}
        submitBtnText={LinkText.start}
      />,
      { wrapper: MemoryRouter }
    );

    userEvent.type(screen.getByLabelText(/password/i), 'test');
    await waitFor(() => {
      expect(screen.getByLabelText(/password/i)).toHaveValue('test');
    });
  });

  it('span with error works', async () => {
    render(
      <Form
        inputs={authInputs}
        link={LinkBtn.authPage}
        onSubmitHandler={(data: Inputs) => onSubmit(data)}
        titleText={TitleText.auth}
        submitBtnText={LinkText.start}
      />,
      { wrapper: MemoryRouter }
    );

    userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'test');
    await waitFor(() => {
      expect(screen.getByText(/Enter valid email/i)).toBeInTheDocument();
    });
  });
});
