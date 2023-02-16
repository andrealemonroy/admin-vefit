import React from "react";
import styled from "styled-components";
import { ChevronRightIcon } from "@heroicons/react/outline";

import { LinkText } from "../atoms/LinkText";

interface BreadcrumbProps {
  crumbs: { text: string; path?: string; onClick?: () => void }[];
  buttons?: JSX.Element[];
}

const Breadcrumbs = styled.div`
  display: flex;
  cursor: pointer;
`;
const BreadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.neutrals_500};
  box-shadow: ${({ theme }) => theme.shadows.dropshadow_m};
`;
const CrumbSection = styled.div``;
const ButtonsSection = styled.div`
  display: flex;
`;
const ActiveText = styled.p`
  color: ${({ theme }) => theme.colors.primaries_000};
  border-bottom: 0.125rem solid transparent;
  margin-left: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: default;
`;

export const Breadcrumb = ({ crumbs = [], buttons = [] }: BreadcrumbProps) => {
  const lastLink = crumbs.length - 1;
  return (
    <BreadWrapper>
      <CrumbSection>
        <Breadcrumbs>
          {crumbs.map((crumb, index) =>
            crumb.path ? (
              <>
                <LinkText
                  name={crumb.text}
                  isSelected={lastLink === index}
                  path={crumb.path}
                />
                {crumb[index] === 1 || crumbs.length - 1 === index ? null : (
                  <ChevronRightIcon width={18} />
                )}
              </>
            ) : !crumb.path && !crumb.onClick ? (
              <ActiveText>{crumb.text}</ActiveText>
            ) : (
              <>
                <LinkText
                  name={crumb.text}
                  isSelected={lastLink === index}
                  onClick={crumb.onClick}
                />
                {crumb[index] === 1 || crumbs.length - 1 === index ? null : (
                  <ChevronRightIcon width={18} />
                )}
              </>
            )
          )}
        </Breadcrumbs>
      </CrumbSection>
      <ButtonsSection>
        {buttons.map((button, index) => (
          <div style={{ display: "flex" }}>
            {button}
            {buttons.length === index + 1 ? null : (
              <div style={{ marginRight: "1rem" }} />
            )}
          </div>
        ))}
      </ButtonsSection>
    </BreadWrapper>
  );
};
