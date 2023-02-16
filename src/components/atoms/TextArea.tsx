import React from "react";
import styled from "styled-components";
import { ParagraphS, SubtitlesM } from "./Typography";
import { Theme } from "./theme";

interface LabelProps {
  width?: string;
}

const CustomTextarea = styled.textarea<any>`
  width: ${({ width }) => width || "18.75rem"};
  padding: ${({ theme }) => theme.spacing.spacing_xs};
  border-radius: ${({ theme }) => theme.spacing.spacing_xs};
  border: ${({ error, theme }) =>
    error
      ? `1px solid ${theme.colors.danger_000}`
      : `1px solid ${theme.colors.neutrals_400}`};
  background-color: ${({ theme }) => theme.colors.neutrals_400};
  font-family: Poppins;
  font-size: 14px;
  line-height: 20px;
  resize: none;
  ::placeholder {
    color: ${({ theme }) => theme.colors.neutrals_200};
    font-family: Poppins;
    font-size: 14px;
    line-height: 20px;
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primaries_000};
    box-shadow: 0px 0px 0px 4px #f3dafa;
    outline: none;
  }
`;
const Label = styled.label<LabelProps>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};
`;

export const TextArea = (props: any) => {
  return (
    <Label width={props.width}>
      <SubtitlesM
        style={{ margin: "0 0 .5rem 0" }}
        color={Theme.colors.neutrals_000}
      >
        {props.labelText}
        {props.required && (
          <SubtitlesM
            color={Theme.colors.danger_000}
            style={{ display: "inline" }}
          >
            {" "}
            *
          </SubtitlesM>
        )}
      </SubtitlesM>
      <CustomTextarea
        placeholder={props.placeholderText}
        error={props.error}
        rows={4}
        width={props.width}
        style={props.style}
        disabled={props.disabled}
        {...props.register}
      />
      {props.error && (
        <ParagraphS
          style={{ margin: ".5rem 0 0 0" }}
          color={Theme.colors.danger_000}
        >
          {props.errorText}
        </ParagraphS>
      )}
    </Label>
  );
};
