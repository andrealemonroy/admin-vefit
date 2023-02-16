import React from "react";
import styled from "styled-components";
import { SheetButton } from "../atoms/Button";
import { Theme } from "../atoms/theme";

interface SheetProps {
  options: { action: () => void; text: string }[];
  badge?: JSX.Element;
}

const OptionsWrapper = styled.div`
  width: 18.75rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.neutrals_500};
  box-shadow: ${({ theme }) => theme.shadows.dropshadow_l};
  border-radius: 0.75rem;
`;
export const Sheet = ({ options, badge }: SheetProps) => {
  return (
    <OptionsWrapper>
      {options.map((option, idx) =>
        badge ? (
          <SheetButton
            color={Theme.colors.primaries_000}
            width="100%"
            hoverColor={Theme.colors.primaries_000}
            badge={badge}
            id={`option_${option.text}_${idx}`}
          />
        ) : (
          <SheetButton
            color={Theme.colors.primaries_000}
            width="100%"
            hoverColor={Theme.colors.primaries_000}
            buttonText={option.text}
            onClick={option.action}
            id={`option_${option.text}_${idx}`}
          />
        )
      )}
    </OptionsWrapper>
  );
};
