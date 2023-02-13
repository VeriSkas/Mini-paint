import { FC } from 'react';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ButtonTypes, ErrorMessages, InputLabels } from '@constants/text/text';
import { FormProps, IInput, Inputs } from '@interfaces/interfaces';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import classes from './Form.module.scss';

export const Form: FC<FormProps> = ({
  inputs,
  onSubmitHandler,
  link,
  titleText,
  submitBtnText,
}) => {
  const { t } = useTranslation();
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'all',
  });

  const renderInputs = () => {
    const isPassword2 = !!inputs.filter(
      (input) => input.label === InputLabels.password2
    ).length;
    const passwordValue = watch(InputLabels.password);
    const password2Value = isPassword2 ? watch(InputLabels.password2) : null;

    return inputs.map((input: IInput) => {
      const error =
        password2Value === passwordValue &&
        input.label === InputLabels.password2
          ? ''
          : errors[input.label]?.message;

      if (isPassword2 && input.label === InputLabels.password2) {
        input.validation.validate = (value) =>
          value === passwordValue || ErrorMessages.inputPassword2;
      }
      return (
        <Input
          key={input.label}
          type={input.type}
          value={input.value}
          label={input.label}
          labelName={input.labelName}
          validation={input.validation}
          register={register}
          error={error}
        />
      );
    });
  };

  const onSubmit = (data: Inputs) => {
    onSubmitHandler(data);
    reset();
  };

  return (
    <div className={classes.Form}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.AuthForm}>
        <h1>{t(titleText)}</h1>
        {renderInputs()}
        <div className={classes.AuthFormBtns}>
          <Button type={ButtonTypes.success} disabled={!isValid}>
            {t(submitBtnText)}
          </Button>
          <Link to={link.to}>
            <Button>{t(link.text)}</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};
