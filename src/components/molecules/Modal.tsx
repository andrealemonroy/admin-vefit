import React from "react";
import styled from "styled-components";
import { CloudIcon } from "@heroicons/react/outline";

import { TitleS, ParagraphM } from "../atoms/Typography";
import { Button, ButtonOutline } from "../atoms/Button";
import { Theme } from "../atoms/theme";

interface ModalProps {
  title: string;
  content: string;
  buttonText?: string;
  img?: JSX.Element;
  buttonColor?: string;
  hoverColor?: string;
  icon?: boolean;
  onClick?: () => void;
  children?: JSX.Element;
}

interface ModalWithTwoButtonProps extends ModalProps {
  button1Text: string;
  button2Text: string;
  onClick1: () => void;
  onClick2: () => void;
  children?: JSX.Element;
  loader?: boolean;
}

const OverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(73, 80, 87, 0.5);
  width: 100%;
  height: 100%;
  z-index: 99;
`;
const CenterModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const ModalWrapper = styled.div`
  width: 37.5rem;
  border-radius: ${({ theme }) => theme.radii.corner_radius_l};
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.neutrals_500};
  box-shadow: ${({ theme }) => theme.shadows.dropshadow_l};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export const ModalWithOneButton = ({
  title,
  content,
  buttonText = "Button Text",
  img = (
    <CloudIcon width={"0.938rem"} color={Theme.colors.neutrals_500} id="icon" />
  ),
  buttonColor = Theme.colors.primaries_000,
  hoverColor = Theme.colors.primaries_neg100,
  onClick,
  icon = true,
  children,
}: ModalProps) => {
  return (
    <OverLay>
      <CenterModal>
        <ModalWrapper>
          <TitleS style={{ margin: "0 0 1.5rem 0" }}>{title}</TitleS>
          <Content>
            <ParagraphM style={{ margin: "0 0 1.5rem 0" }}>
              {content}
            </ParagraphM>
          </Content>
          {children}
          <Button
            buttonText={buttonText}
            icon={icon}
            color={buttonColor}
            hoverColor={hoverColor}
            noText={true}
            width="100%"
            img={img}
            onClick={onClick}
          />
        </ModalWrapper>
      </CenterModal>
    </OverLay>
  );
};

export const ModalWithTwoButtons = ({
  title,
  content,
  button1Text = "Button Text",
  button2Text = "Button Text",
  img = (
    <CloudIcon width={"0.938rem"} color={Theme.colors.neutrals_500} id="icon" />
  ),
  buttonColor = Theme.colors.primaries_000,
  hoverColor = Theme.colors.primaries_neg100,
  onClick1,
  onClick2,
  children,
  loader,
}: ModalWithTwoButtonProps) => {
  return (
    <OverLay>
      <CenterModal>
        <ModalWrapper>
          <TitleS style={{ margin: "0 0 1.5rem 0" }}>{title}</TitleS>
          <Content>
            <ParagraphM style={{ margin: "0 0 1.5rem 0" }}>
              {content}
            </ParagraphM>
          </Content>
          {children}
          <ButtonsWrapper>
            <ButtonOutline
              buttonText={button1Text}
              icon={false}
              color={buttonColor}
              hoverColor={hoverColor}
              noText={true}
              width="48%"
              loader={loader}
              onClick={onClick1}
            />
            <Button
              buttonText={button2Text}
              icon={false}
              color={buttonColor}
              hoverColor={hoverColor}
              noText={true}
              width="48%"
              img={img}
              loader={loader}
              onClick={onClick2}
            />
          </ButtonsWrapper>
        </ModalWrapper>
      </CenterModal>
    </OverLay>
  );
};
