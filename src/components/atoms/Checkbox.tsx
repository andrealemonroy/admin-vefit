import React from "react";
import styled from "styled-components";
import { CheckIcon } from "@heroicons/react/outline";

import { ParagraphS } from "./Typography";

interface CheckboxProps {
    className?: string;
    checked: boolean;
    disabled?: boolean;
    [props: string]: any;
  }
  interface StyledCheckboxProps {
    checked: boolean;
  }

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  border: 2px solid ${({ theme }) => theme.colors.neutrals_300};
  width: 16px;
  height: 16px;
  border-radius: 4px;
`;

const Icon = styled(CheckIcon)`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  width: 14px;
`;
const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  display: inline-flex;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: ${({ checked, theme }) =>
    checked ? theme.colors.primaries_000 : "transparent"};
  border-radius: 3px;
  transition: all 150ms;
  margin-left: -2px;
  margin-top: -2px;

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

export const CustomCheckbox = ({
  className,
  checked,
  onChange,
  disabled = false,
  ...props
}: CheckboxProps) => (
  <label style={{ display: "flex" }}>
    <CheckboxContainer className={className}>
      <HiddenCheckbox
        {...props}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <StyledCheckbox checked={checked}>
        <Icon />
      </StyledCheckbox>
    </CheckboxContainer>
    <ParagraphS style={{ margin: "0 0 0 8px" }}>{props.label}</ParagraphS>
  </label>
);
