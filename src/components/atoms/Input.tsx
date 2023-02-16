import React, { useState } from "react";
import styled from "styled-components";
import { useAsyncDebounce } from "react-table";
import { Tooltip } from "./Tooltip";
import { ParagraphS, SubtitlesM } from "./Typography";
import { Theme } from "./theme";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";

export interface InputProps {
  required?: boolean;
  error?: boolean;
  noLabel?: boolean;
  icon?: boolean;
  width?: string | number;
  img: React.ReactElement;
  labelText?: string;
  placeholderText: string;
  errorText?: string;
  filter?: string;
  setFilter?: any;
  setFormValue?: (arg: string) => string;
  type: string;
  isInnerTooltip?: boolean;
  tooltipText?: string;
  disabled?: boolean;
}

interface CustomInputProps {
  error?: boolean;
  icon?: boolean;
  img?: React.ReactElement;
}

interface LabelProps {
  width?: string | number;
}

interface IconProps {
  setIcon: HTMLElement & SVGAElement;
}

const CustomInput = styled.input<CustomInputProps>`
  padding: ${({ theme }) => theme.spacing.spacing_xs};
  border-radius: ${({ theme }) => theme.spacing.spacing_xs};
  border: ${({ error, theme }) =>
    error
      ? `1px solid ${theme.colors.danger_000}`
      : `1px solid ${theme.colors.neutrals_400}`};
  background-color: ${({ theme }) => theme.colors.neutrals_400};
  box-sizing: border-box
  font-family: Poppins;
  font-size: 14px;
  line-height: 20px;
  ::placeholder {
    color: ${({ theme }) => theme.colors.neutrals_200};
    font-family: Poppins;
    font-size: 14px;
    line-height: 20px;
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primaries_000};
    box-shadow: ${({ theme }) => theme.shadows.dropshadow_accent};
    outline: none;
  }
  ${({ icon, img }) => {
    if (icon) {
      return `background-image: url(${img}); background-repeat: no-repeat; background-position: 98% 50%;`;
    }
  }}
`;
export const Label = styled.label<LabelProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: ${({ width }) => width || "18.75rem"};
`;
const PasswordIcon = styled.div<IconProps>`
  background-image: ${({ setIcon }) => `url(${setIcon})`};
  background-repeat: no-repeat;
  height: 20px;
  width: 20px;
  position: absolute;
  right: 2%;
  top: 60%;
`;
const InputInnerActionSection = styled.div`
  position: absolute;
  z-index: 2;
  right: 1%;
  top: 20%;
  width: 20px
  height: 20px;
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      required,
      error,
      noLabel,
      icon,
      width = 0,
      img,
      labelText = "label text",
      placeholderText = "Field Text",
      errorText = "Error Text",
      filter,
      setFilter,
      setFormValue,
      type = "text",
      isInnerTooltip,
      tooltipText = "",
      disabled,
    },
    ref
  ) => {
    const onChange = useAsyncDebounce((value) => {
      if (setFilter) {
        setFilter(value || undefined);
      }
    }, 1000);

    return (
      <Label width={width}>
        {noLabel && (
          <SubtitlesM
            style={{ margin: "0 0 .5rem 0" }}
            color={Theme.colors.neutrals_000}
          >
            {labelText}
            {required && (
              <SubtitlesM
                color={Theme.colors.danger_000}
                style={{ display: "inline" }}
              >
                {" "}
                *
              </SubtitlesM>
            )}
          </SubtitlesM>
        )}
        <div style={{ position: "relative", width: "inherit" }}>
          <CustomInput
            style={{
              width: `98%`,
              paddingTop: 12,
              paddingBottom: 12,
              paddingRight: 0,
              paddingLeft: 12,
            }}
            ref={ref}
            type={"text"}
            placeholder={placeholderText}
            error={error}
            icon={icon}
            img={img}
            onChange={(e) => {
              if (setFormValue) {
                setFormValue(e.target.value);
              } else {
                onChange(e.target.value);
              }
            }}
            disabled={disabled}
            theme={Theme}
          />
          {isInnerTooltip && (
            <InputInnerActionSection>
              <Tooltip
                text={tooltipText}
                position="top"
                background="black"
                style={{ position: "absolute" }}
              >
                <QuestionMarkCircleIcon
                  style={{
                    width: "20px",
                    height: "20px",
                    color: `${Theme.colors.neutrals_200}`,
                  }}
                />
              </Tooltip>
            </InputInnerActionSection>
          )}
        </div>

        {error && (
          <ParagraphS
            style={{ margin: ".5rem 0 0 0" }}
            color={Theme.colors.danger_000}
          >
            {errorText}
          </ParagraphS>
        )}
      </Label>
    );
  }
);
