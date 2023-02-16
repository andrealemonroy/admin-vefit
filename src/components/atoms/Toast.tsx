import styled from "styled-components/macro";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { Theme } from "./theme";
import { ToastVariants } from "../../constants/variants";

interface ToastProps {
  variant: string,
  withIcon: boolean,
  children: string
}

interface ToastWrapperProps {
  background: string
}

const ToastWrapper = styled.div<ToastWrapperProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  width: 37.5rem;
  position: fixed;
  top: 92px;
  left: calc(50vw - 20rem);
  z-index: 1;
  background-color: ${({ background }) => background};
  border-radius: ${(props) => props.theme.radii.corner_radius_l};
  box-shadow: ${(props) => props.theme.shadows.dropshadow_l};
  color: ${(props) => props.theme.colors.neutrals_100};
  animation: fadeIn .5s;
  @keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }
`;

const ToastContentContainer = styled.div`
  padding-right: 1.5rem;
  flex: 1;
`;

const IconContainer = styled.div``;

export const Toast = ({ variant, withIcon, children }: ToastProps) => {
  const backgroundColor = () => {
    switch (variant) {
      case ToastVariants.DANGER:
        return Theme.colors.danger_300;
      case ToastVariants.WARNING:
        return Theme.colors.warning_300;
      case ToastVariants.SUCCESS:
      default:
        return Theme.colors.success_300;
    }
  };

  const iconProps = {
    width: 18,
    height: 18,
  };

  const Icon = () => {
    switch (variant) {
      case ToastVariants.DANGER:
        return <XCircleIcon color={Theme.colors.danger_000} {...iconProps} />;
      case ToastVariants.WARNING:
        return (
          <ExclamationCircleIcon
            color={Theme.colors.warning_000}
            {...iconProps}
          />
        );
      case ToastVariants.SUCCESS:
      default:
        return (
          <CheckCircleIcon color={Theme.colors.success_000} {...iconProps} />
        );
    }
  };
  return (
    <ToastWrapper background={backgroundColor()}>
      <ToastContentContainer>{children}</ToastContentContainer>
      {withIcon && (
        <IconContainer>
          <Icon />
        </IconContainer>
      )}
    </ToastWrapper>
  );
};
