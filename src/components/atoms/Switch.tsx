import React from "react";
import styled from "styled-components";

import { ParagraphS } from "./Typography";
import { Tooltip } from "./Tooltip";
interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  tooltipText?: string;
  disabled?: boolean;
}

const SwitchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const SwitchLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  margin-top: 0.188rem;
  background: ${({ theme }) => theme.colors.neutrals_400};
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    transition: 0.2s;
  }
`;
const Switch = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${SwitchLabel} {
    background: ${({ theme }) => theme.colors.primaries_000};
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

export const SwitchComponent = ({
  label,
  checked,
  onChange,
  tooltipText = "",
  disabled = false,
  ...props
}: SwitchProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {tooltipText ? (
        <Tooltip
          text={tooltipText}
          position="right"
          background="black"
          style={{ position: "absolute" }}
        >
          <ParagraphS style={{ margin: 0, marginRight: 10 }}>
            {label}
          </ParagraphS>
        </Tooltip>
      ) : (
        <ParagraphS style={{ margin: 0, marginRight: 10 }}>{label}</ParagraphS>
      )}
      <SwitchWrapper>
        <Switch
          disabled={disabled}
          type="checkbox"
          checked={checked}
          {...props}
          onChange={onChange}
        />
        <SwitchLabel htmlFor="switch" />
      </SwitchWrapper>
    </div>
  );
};
