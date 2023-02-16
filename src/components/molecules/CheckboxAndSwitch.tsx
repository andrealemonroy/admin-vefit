import React from "react";
import styled from "styled-components";
import { Controller } from "react-hook-form";

import { CustomCheckbox } from "../atoms/Checkbox";
import { SwitchComponent } from "../atoms/Switch";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CheckboxAndSwitch = ({
  checkLabels,
  switchLabel,
  control,
  setValue,
  tooltipText = "",
  disabled = false,
}) => {
  return checkLabels.map((checkLabel) => (
    <Wrapper>
      <Controller
        control={control}
        name={checkLabel}
        render={({ field: { value } }) => (
          <CustomCheckbox
            label={checkLabel}
            onChange={() => {
              if (value) {
                setValue(`${checkLabel} ${switchLabel}`, !value);
              }
              setValue(checkLabel, !value);
            }}
            checked={value}
            disabled={disabled}
          />
        )}
      />
      <Controller
        control={control}
        name={`${checkLabel} ${switchLabel}`}
        render={({ field: { value } }) => {
          return (
            <SwitchComponent
              onChange={() => {
                if (!value) {
                  setValue(checkLabel, !value);
                }
                setValue(`${checkLabel} ${switchLabel}`, !value);
              }}
              checked={value}
              label={switchLabel}
              tooltipText={tooltipText}
              disabled={disabled}
            />
          );
        }}
      />
    </Wrapper>
  ));
};
