import { useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

interface TooltipTargetProp {
  showOnFocus: boolean;
}
interface CenterContainerProps {
  position: string;
}
interface TooltipBoxProps extends CenterContainerProps {
  background?: string;
}
interface ToolTipProps {
  position: string;
  text: string | JSX.Element;
  background?: string;
  children?: string | JSX.Element;
  style?: any;
}

export const TooltipWrapper = styled.div`
  position: relative;
  width: 100%;
  display: inline-flex;
`;

export const TooltipTarget = styled.button<TooltipTargetProp>`
  border: none;
  background: inherit;
  padding: 5px;
  margin: -1px;
  font-size: inherit;
  color: inherit;
  cursor: inherit;
  display: flex;
  width: 100%;
  ${({ showOnFocus }) =>
    !showOnFocus &&
    css`
      outline: none;
    `};
`;

export const CenterContainer = styled.div<CenterContainerProps>`
  position: absolute;
  width: 200px;
  margin-left: -100px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  bottom: calc(100% + 5px);
  pointer-events: none;
  ${({ position }) => {
    switch (position) {
      case "bottom":
        return css`
          bottom: unset !important;
          top: calc(100% + 5px);
        `;
      case "left":
        return css`
          margin-right: 0;
          width: 100%;
          left: unset;
          top: 50%;
          right: calc(100% + 5px);
          width: max-content;
        `;
      case "right":
        return css`
          margin-left: 0;
          width: 100%;
          top: 50%;
          left: calc(100% + 5px);
          width: max-content;
        `;
      default:
        return css`
          bottom: calc(100% + 5px);
        `;
    }
  }}
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const TooltipBox = styled.span<TooltipBoxProps>`
  position: fixed;
  background-color: ${(props) => props.background};
  color: #fff;
  display: flex;
  justify-content: flex-start;
  text-align: left;
  z-index: 99;
  border-radius: 0.75rem;
  padding: 1rem;
  animation: ${fadeIn} 0.5s linear;
  &:after {
    content: "";
    position: fixed;
    width: 1px;
    height: 1px;
    border-width: 5px;
    border-style: solid;
    border-color: ${(props) => props.background} transparent transparent
      transparent;
    left: calc(50% - 4.5px);
    top: 100%;
  }
  ${({ position }) => {
    switch (position) {
      case "bottom":
        return `
          &:after {
            border-color: transparent transparent ${(props) =>
              props.background} transparent;
            top: unset;
            width: 1px;
            bottom: 100%;
            left: calc(50% - 5px);
          }
        `;
      case "left":
        return `
          &:after {
            border-color: transparent transparent transparent ${(props) =>
              props.background};
            left: 100%;
            top: calc(50% - 5px);
          }
        `;
      case "right":
        return `
          &:after {
            border-color: transparent ${(props) => props.background} transparent
              transparent;
            right: 100%;
            left: unset;
            top: calc(50% - 5px);
          }
        `;
      default:
        return css``;
    }
  }}
`;

export const Tooltip = ({
  position,
  text,
  children,
  background,
  style,
}: ToolTipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const targetRef = useRef(null);
  const showTooltip = isHovered || isFocused;

  const handleClick = (e) => {
    e.preventDefault();
    if (targetRef.current) {
      (targetRef.current as HTMLElement).blur();
    }
  };

  return (
    <TooltipWrapper>
      <TooltipTarget
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClick={handleClick}
        ref={targetRef}
        showOnFocus={isFocused}
      >
        {children}
      </TooltipTarget>
      {showTooltip && (
        <CenterContainer position={position}>
          <TooltipBox background={background} position={position} style={style}>
            {text}
          </TooltipBox>
        </CenterContainer>
      )}
    </TooltipWrapper>
  );
};
