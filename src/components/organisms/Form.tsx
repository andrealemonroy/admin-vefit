import React, { useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../atoms/theme';
import { Input } from '../atoms/Input';
import { CustomSelect as Select } from '../atoms/Select';
import { ButtonOutline, Button } from '../atoms/Button';
import { TextArea } from '../atoms/TextArea';
import { formErrorMessage } from '../../utils/formError';
import { UseFormReturn } from 'react-hook-form';
import { InputDate } from '../molecules/InputDate';
import { InputRadio } from '../atoms/InputRadio';

interface FormWrapperProps {
  filter?: boolean;
}

interface InputContainerProps {
  filter?: boolean;
}

const FormWrapper = styled.div<FormWrapperProps>`
  background: #fff;
  width: 100%;
  min-width: ${({ style }) => style?.minWidth};
  height: fit-content;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: ${({ style }) => style?.boxShadow || Theme.shadows.dropshadow_m};
  box-sizing: border-box;
  margin-bottom: ${({ style }) => style?.marginBottom || '5.625rem'};
`;

const FormContainer = styled.form`
  display: flex;
  width: 100%;
`;

const FormColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }: { width?: string }) => width || '100%'};
`;

const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  margin-bottom: 2.25rem;
  align-items: center;
`;

const DivideLine = styled.div`
  display: flex;
  border: 2px solid ${Theme.colors.neutrals_400};
  border-radius: 9999px;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
`;

const DivideNoLine = styled.div`
  display: flex;
  margin-left: 1rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ align }: { align?: string }) =>
    align || 'space-evenly'};
  padding: 0;
`;

const CopyButtonWrapper = styled.div`
  display: flex;
  margin-left: 0.5rem;
  margin-top: auto;
  height: 2.875rem;
`;

const AddNewButtonWrapper = styled.div`
  display: flex;
  margin-left: 0.5rem;
  ${({ autoMargin }: { autoMargin?: any }) => {
    if (!autoMargin['patient'] && !autoMargin['provider']) {
      return 'margin-top: auto;';
    }
  }}
  height: 2.875rem;
  width: 10rem;
`;

interface IRenderInputConfig {
  input: any;
  index: number;
  errors: any;
  setValue: any;
  register: any;
  getValues: any;
  control: any;
  onFileDelete: any;
  watch: any;
  loading: boolean;
}
const RenderInput = (config: IRenderInputConfig) => {
  const {
    input,
    index,
    errors,
    setValue,
    register,
    getValues,
    control,
    onFileDelete,
    watch,
    loading,
  } = config;
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const ssnPattern = /(^\d{4}$)|(^\d{5}-\d{4}$)/;
  const zipcodePattern = /^\d{5}(?:[-\s]\d{4})?$/;
  const phoneNumberPattern =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*/;

  if (input.link) {
    return (
      <div key={index}>
        <p className="!m-0 text-[9px] text-davisGray font-bold">
          {input.label}
        </p>
        <div className="flex w-full items-center gap-1">
          <p className="!m-0 text-primary text-sm underline break-words w-11/12 font-bold">
            {input.url}
          </p>
          <img
            className="w-full cursor-pointer"
            src="/icons/copy.svg"
            onClick={() => {
              navigator.clipboard.writeText(input.url);
            }}
          />
        </div>
      </div>
    );
  }
  if (input.select) {
    return (
      <div key={index} className="w-full">
        <Select
          {...register(input.id, {
            required: input.required,
          })}
          label={input.label}
          id={input.id}
          name={input.id}
          required={input.required}
          options={input.options}
          isSearchable={input.isSearchable}
          placeholderText={input.placeholder ?? input.placeholder}
          setFormValue={(value: any) => {
            setValue(input.id, value);
          }}
        />
      </div>
    );
  }
  if (input.textArea) {
    return (
      <div className="h-full" key={index}>
        <TextArea
          {...register(input.id, {
            required: input.required,
            maxLength: 250,
          })}
          noLabel={input.noLabel}
          labelText={input.label}
          errorText={`Please enter ${input.label?.toLowerCase()}`}
          required={input.required}
          placeholderText={
            input.placeholder ? input.placeholder : input.label || ''
          }
          disabled={input.disabled}
          setFormValue={(value: any) => {
            setValue(input.id, value);
          }}
          rows={input.rows}
        />
      </div>
    );
  }
  if (input.inputDate) {
    return (
      <div key={index} className="w-full">
        <InputDate
          {...register(input.id, {
            required: input.required,
          })}
          label={input.label}
          placeholder={input.placeholder}
          setFormValue={(value) => {
            setValue(input.id, value);
          }}
          value={
            watch(input.id) !== undefined ? watch(input.id) : input.defaultValue
          }
        ></InputDate>
      </div>
    );
  }

  if (input.inputRadio) {
    return (
      <div key={index} className="w-full">
        <InputRadio
          options={input.options}
          labelText={input.label}
          placeholderText={input.placeholder}
          setFormValue={(value) => {
            setValue(input.id, value);
          }}
          value={
            watch(input.id) !== undefined ? watch(input.id) : input.defaultValue
          }
          {...register(input.id)}
        ></InputRadio>
      </div>
    );
  }

  return (
    <div key={index} className="w-full">
      <Input
        {...register(input.id, {
          required: input.required,
          maxLength: 50,
          pattern:
            input?.type === 'email'
              ? emailPattern
              : input?.type === 'zip'
              ? zipcodePattern
              : input?.type === 'ssn'
              ? ssnPattern
              : input?.type === 'phoneNumber'
              ? phoneNumberPattern
              : null,
        })}
        noLabel={true}
        labelText={input.label}
        error={errors[input.id]}
        errorText={formErrorMessage(
          errors[input.id]?.type,
          input.label,
          input.message
        )}
        required={input.required}
        icon={input.icon}
        img={input.img}
        width={'100%'}
        type={input.type}
        placeholderText={input.placeholder ? input.placeholder : input.label}
        {...(input.initialValue ? setValue(input.id, input.initialValue) : '')}
        setFormValue={(value) => {
          setValue(input.id, value);
        }}
        isInnerTooltip={input.isInnerTooltip}
        tooltipText={input.tooltipText}
        disabled={input.disabled}
      />
    </div>
  );
};

interface RaynaForm extends UseFormReturn<any, any> {
  formInputs: any;
  numberOfColumns: any;
  cancelAction?: any;
  submitButtonText?: any;
  customSubmit?: boolean;
  onSubmit?: any;
  setValue: any;
  getValues: any;
  control: any;
  style?: any;
  buttonsAlignment?: any;
  onFileDelete?: any;
  filter?: boolean;
  buttonWidth?: string;
  resetFilters?: any;
  loading?: any;
}

function Form({
  formInputs,
  numberOfColumns,
  cancelAction,
  submitButtonText,
  customSubmit,
  register,
  onSubmit,
  setValue,
  getValues,
  control,
  style = {},
  watch,
  buttonsAlignment = 'start',
  onFileDelete,
  filter,
  reset,
  buttonWidth = '100%',
  resetFilters,
  setFocus,
  loading,
  ...rest
}: RaynaForm) {
  const [isProcessing, setIsProcessing] = useState(false);
  const errors = rest.formState.errors;

  const FormInput: React.FC<any> = ({ input, index }) => {
    return (
      <InputContainer key={`form-${input.id}`} filter={filter}>
        {RenderInput({
          input: input,
          index: index,
          register: register,
          errors: errors,
          setValue: setValue,
          getValues: getValues,
          control: control,
          onFileDelete: onFileDelete,
          watch: watch,
          loading: loading,
          // defaultValues: defaultValues,
        })}
      </InputContainer>
    );
  };

  return (
    <FormWrapper style={style} filter={filter}>
      <FormContainer>
        {numberOfColumns === 1 && (
          <FormColumnContainer>
            <FormColumn width={'100%'}>
              {formInputs.map((input, index) => {
                return <FormInput input={input} index={index} />;
              })}
              {!customSubmit && (
                <ButtonsWrapper>
                  <ButtonOutline
                    buttonText={'Cancel'}
                    icon={false}
                    color={Theme.colors.primaries_000}
                    hoverColor={Theme.colors.primaries_neg100}
                    noText={true}
                    width={buttonWidth}
                    onClick={cancelAction}
                  />
                  <Button
                    buttonText={submitButtonText}
                    icon={false}
                    color={Theme.colors.primaries_000}
                    hoverColor={Theme.colors.primaries_neg100}
                    noText={true}
                    type={'submit'}
                    width={buttonWidth}
                    loader={isProcessing}
                  />
                </ButtonsWrapper>
              )}
            </FormColumn>
          </FormColumnContainer>
        )}
        {numberOfColumns === 2 && (
          <FormColumnContainer>
            <FormColumn width={'50%'}>
              {formInputs[0].map((input, index) => {
                return <FormInput input={input} index={index} />;
              })}
            </FormColumn>
            <DivideLine />
            <FormColumn width={'50%'}>
              {formInputs[1].map((input) => {
                return <FormInput input={input} />;
              })}
              {!customSubmit && (
                <ButtonsWrapper align={buttonsAlignment}>
                  <ButtonOutline
                    style={{ margin: 0 }}
                    buttonText={'Cancel'}
                    icon={false}
                    color={Theme.colors.primaries_000}
                    hoverColor={Theme.colors.primaries_neg100}
                    noText={true}
                    onClick={cancelAction}
                  />
                  <Button
                    buttonText={submitButtonText}
                    icon={false}
                    color={Theme.colors.primaries_000}
                    hoverColor={Theme.colors.primaries_neg100}
                    noText={true}
                    width="48%"
                    loader={isProcessing}
                    type={'submit'}
                  />
                </ButtonsWrapper>
              )}
            </FormColumn>
          </FormColumnContainer>
        )}
        {numberOfColumns === 3 && (
          <FormColumnContainer>
            <FormColumn width={'50%'}>
              {formInputs[0].map((input, index) => {
                return <FormInput input={input} index={index} />;
              })}
            </FormColumn>
            <DivideLine />
            <FormColumn width={'25%'}>
              {formInputs[1].map((input, index) => {
                return <FormInput input={input} index={index} />;
              })}
              {!customSubmit && (
                <ButtonsWrapper>
                  <ButtonOutline
                    buttonText={'Cancel'}
                    icon={false}
                    color={Theme.colors.primaries_000}
                    hoverColor={Theme.colors.primaries_neg100}
                    noText={true}
                    onClick={cancelAction}
                  />
                  <div style={{ marginRight: '1rem' }} />
                  <Button
                    buttonText={submitButtonText}
                    icon={false}
                    color={Theme.colors.primaries_000}
                    hoverColor={Theme.colors.primaries_neg100}
                    noText={true}
                    loader={isProcessing}
                    width="48%"
                    type={'submit'}
                  />
                </ButtonsWrapper>
              )}
            </FormColumn>
            <DivideNoLine />
            <FormColumn width={'25%'}>
              {formInputs[2].map((input, index) => {
                return <FormInput input={input} index={index} />;
              })}
            </FormColumn>
          </FormColumnContainer>
        )}
      </FormContainer>
    </FormWrapper>
  );
}

export default Form;
