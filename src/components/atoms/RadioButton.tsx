import styled from "styled-components";
import { Controller } from "react-hook-form";

import { Theme } from "./theme";
import { ParagraphS } from "./Typography";

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-right: 1.563rem;
`;
const CustomRadio = styled.div`
  width: 1.25em;
  height: 1.25em;
  border: 0.125rem solid #e5e5e5;
  border-radius: 50%;
  margin-right: 0.625rem;
  box-sizing: border-box;
  padding: 2px;
  position: relative;
  &:after {
    position: absolute;
    content: "";
    top: -0.125rem;
    left: -0.125rem;
    bottom: -0.125rem;
    right: -0.125rem;
    display: block;
    border: 0.25rem solid ${({ theme }) => theme.colors.primaries_000};
    border-radius: 50%;
    transform: scale(0);
  }
`;
const NativeRadio = styled.input`
  display: none;
  &:checked + ${CustomRadio}::after {
    transform: scale(1);
  }
`;

interface RadioGroupProps {
  noLabels?: boolean;
  options: any;
  topMargin: any;
  control: any;
  values: string[];
}

export const RadioGroup = ({
  options = [],
  noLabels = false,
  topMargin,
  control,
  values,
}: RadioGroupProps) => {
  return (
    <>
      {options.map((option, index) => (
        <Label
          htmlFor={`${option}${index}`}
          key={index}
          style={{ marginTop: topMargin ? topMargin : null }}
        >
          <Controller
            control={control}
            name={"roles"}
            render={({ field: { onChange, value } }) => {
              return (
                <NativeRadio
                  type="radio"
                  onChange={onChange}
                  id={`${option}${index}`}
                  value={values[index]}
                  checked={value === values[index]}
                />
              );
            }}
          />
          <CustomRadio />
          {noLabels ? null : (
            <ParagraphS color={Theme.colors.neutrals_000} style={{ margin: 0 }}>
              {option}
            </ParagraphS>
          )}
        </Label>
      ))}
    </>
  );
};
