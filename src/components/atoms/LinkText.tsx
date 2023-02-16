import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { SubtitlesS } from "./Typography";

interface NavigationTextProps {
  isSelected?: boolean;
}
interface LinkProps extends NavigationTextProps {
  name: string;
  path?: string;
  onClick?: () => void;
}

const NavigationText = styled(SubtitlesS)<NavigationTextProps>`
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primaries_000 : theme.colors.white};
  border-bottom: 0.125rem solid transparent;
  margin: 0;
  &:hover {
    border-bottom: 0.125rem solid ${({ theme }) => theme.colors.neutrals_000};
    color: ${({ theme }) => theme.colors.neutrals_000};
  }
  &:active {
    border-bottom: 0.125rem solid transparent;
    color: ${({ theme }) => theme.colors.primaries_000};
  }
`;

const LinkBox = styled(NavLink)`
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
  color: black;
`;
const ClickBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: black;
`;
const LinkWrapper = styled.div`
  margin-right: 0.75rem;
  margin-left: 0.75rem;
`;

export const LinkText = ({ name, path, isSelected, onClick }: LinkProps) => {
  return onClick ? (
    <LinkWrapper>
      <ClickBox onClick={onClick}>
        <NavigationText isSelected={isSelected}>{name}</NavigationText>
      </ClickBox>
    </LinkWrapper>
  ) : (
    <LinkWrapper>
      <LinkBox to={path ? path : ""}>
        <NavigationText isSelected={isSelected}>{name}</NavigationText>
      </LinkBox>
    </LinkWrapper>
  );
};
