import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { CloudIcon, DotsHorizontalIcon } from '@heroicons/react/outline';
import { TailSpin } from 'react-loader-spinner';

import { Theme } from './theme';
import { SubtitlesM } from './Typography';

interface OptionWrapperProps {
  bottomOffset: number;
}

interface ButtonProps {
  icon?: boolean;
  color?: string;
  hoverColor?: string;
  noText?: boolean;
  contentColor?: string;
  width?: string;
  buttonText?: string;
  onClick?: () => void;
  img?: JSX.Element;
  badge?: JSX.Element;
  noBorder?: boolean;
  active?: boolean;
  type?: string;
  loader?: boolean;
  alignButtonContents?: boolean;
  style?: object;
  filter?: boolean;
  disabled?: boolean;
  id?: string;
}
interface ButtonWrapperProps {
  hovered?: string;
  width?: string;
  icon?: boolean;
  type?: string;
  height?: string;
  filter?: boolean;
  disabled?: boolean;
}
interface SheetButtonWrapperProps {
  width?: string;
}
interface ContentWrapperProps {
  badge?: JSX.Element;
  alignButtonContents?: boolean;
}
interface ButtonWrapperFocusProps {
  active?: boolean;
  noBorder?: boolean;
  focused?: string;
  hovered?: string;
}

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  width: ${({ width }) => width || 'fit-content'};
  padding: ${({ icon }) => (icon ? '0.75rem 1rem' : '0.75rem')};
  background: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.spacing.spacing_xs};
  margin: ${({ filter }) => (filter ? '0' : '0px 8px')};
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  &:hover {
    background: ${({ hovered }) => hovered};
  }
`;
const ButtonWrapperOutline = styled(ButtonWrapper)`
  padding: ${({ icon }) => (icon ? '0.625rem 0.875rem' : '0.625rem')};
  background: none;
  border: 0.125rem solid ${({ color }) => color};
  height: ${({ height }) => height || '2.75rem'};
  &:hover {
    border: 0.125rem solid ${({ hovered }) => hovered};
    background: none;
    svg {
      color: ${({ hovered }) => hovered};
    }
  }
`;
const SheetButtonWrapper = styled.button<SheetButtonWrapperProps>`
  width: ${({ width }) => width || 'fit-content'};
  padding: 0.75rem 1rem;
  background: none;
  border-radius: ${({ theme }) => theme.spacing.spacing_xs};
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  #text {
    color: ${({ theme }) => theme.colors.neutrals_000};
  }
  &:hover,
  :hover #text,
  :hover svg {
    background: ${({ color }) => color};
    color: ${({ theme }) => theme.colors.neutrals_500};
  }
`;
const ButtonWrapperFocus = styled.button<ButtonWrapperFocusProps>`
  width: fit-content;
  padding: 0.625rem 0.875rem;
  background: ${({ theme }) => theme.colors.neutrals_500};
  border-radius: ${({ theme }) => theme.spacing.spacing_xs};
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 0.125rem solid transparent;
  ${({ active }) => {
    if (active) {
      return `border: 0.125rem solid ${Theme.colors.primaries_000};
      color:${Theme.colors.primaries_000} !Important;
    svg{
      color:${Theme.colors.primaries_000};
    }
    #fill {
      fill: ${Theme.colors.primaries_000};
    }
    `;
    }
  }}
  &:active {
    ${({ noBorder, focused }) => {
      if (!noBorder) {
        return `border: 0.125rem solid ${focused};`;
      }
    }}
    color: ${({ focused }) => focused};
    svg {
      color: ${({ focused }) => focused};
    }
  }
  &:hover:not(:active) h2 {
    ${({ noBorder, hovered }) => {
      if (noBorder) {
        return 'border-bottom: 0.125rem solid #000; padding-bottom: 0.188rem';
      } else {
        return `color: ${hovered};`;
      }
    }}
  }
  &:hover:not(:active) svg {
    ${({ noBorder, hovered }) => {
      if (noBorder) {
        return 'border-bottom: 0.125rem solid transparent; padding-bottom: 0.188rem;';
      } else {
        return `color: ${hovered};`;
      }
    }}
  }
  &:hover:not(:active) #fill {
    ${({ noBorder, hovered }) => {
      if (noBorder) {
        return 'border-bottom: 0.125rem solid transparent; padding-bottom: 0.188rem;';
      } else {
        return `fill: ${hovered};`;
      }
    }}
  }
`;
const ContentWrapper = styled.div<ContentWrapperProps>`
  display: flex;
  flex-direction: row;
  ${({ badge }) => {
    if (badge) {
      return 'justify-content: space-between; width: 100%; align-items: center;';
    }
  }}
  ${({ alignButtonContents }) => {
    return alignButtonContents ? 'align-items: center;' : '';
  }}
`;
const Spacer = styled.div`
  margin-right: 0.656rem;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const OptionWrapper = styled.div<OptionWrapperProps>`
  position: absolute;
  background-color: ${Theme.colors.neutrals_500};  
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 99;
  border-radius: .75rem;
  padding: 1rem;
  width: 18.75rem;
  bottom: ${({ bottomOffset }) => bottomOffset || 0}rem;
  right: 0rem;
  animation: ${fadeIn} .5s linear;
  box-shadow: 0rem 0.75rem 1.5rem 0.25rem rgba(69, 72, 75, 0.2);
}
`;

export const Button = ({
  icon,
  color,
  hoverColor,
  noText,
  contentColor,
  width,
  buttonText = 'Button Text',
  onClick,
  img = <CloudIcon width={'0.938rem'} color={Theme.colors.neutrals_500} />,
  type,
  loader,
  alignButtonContents = false,
  disabled,
  style = {},
}: ButtonProps) => {
  const iconTextColor = contentColor || Theme.colors.neutrals_500;
  return (
    <ButtonWrapper
      style={style}
      color={color}
      hovered={hoverColor}
      width={width}
      onClick={(e) => {
        if (type !== 'submit') {
          e.preventDefault();
        }
        if (onClick) {
          onClick();
          return;
        }
      }}
      disabled={disabled || loader}
    >
      <ContentWrapper alignButtonContents={alignButtonContents}>
        {loader ? (
          <div>
            <TailSpin color="#FFFFFF" height={20} width={20} />
          </div>
        ) : (
          <>
            {icon && (
              <>
                {img}
                {noText && <Spacer />}
              </>
            )}
            {noText && (
              <SubtitlesM
                color={iconTextColor}
                style={{ margin: 0, whiteSpace: 'nowrap' }}
              >
                {buttonText}
              </SubtitlesM>
            )}
          </>
        )}
      </ContentWrapper>
    </ButtonWrapper>
  );
};

export const SheetButton = ({
  icon,
  color,
  width,
  badge,
  img = <CloudIcon width={'0.938rem'} color={color} />,
  buttonText = 'Button Text',
  onClick,
  id,
}: ButtonProps) => {
  return (
    <SheetButtonWrapper color={color} onClick={onClick} width={width} id={id}>
      <ContentWrapper badge={badge}>
        {icon && (
          <>
            {img}
            <Spacer />
          </>
        )}
        <SubtitlesM style={{ margin: 0 }} id="text">
          {buttonText}
        </SubtitlesM>
        {badge}
      </ContentWrapper>
    </SheetButtonWrapper>
  );
};

export const ButtonOutline = ({
  icon,
  color,
  hoverColor,
  noText,
  img = <CloudIcon width={'0.938rem'} color={color} />,
  buttonText = 'Button Text',
  width,
  loader,
  onClick,
  style = {},
  filter,
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoveredColor = isHovered ? hoverColor : color;

  return (
    <ButtonWrapperOutline
      style={style}
      color={color}
      width={width}
      hovered={hoverColor}
      filter={filter}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={loader}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
          return;
        }
      }}
    >
      <ContentWrapper>
        {loader ? (
          <div>
            <TailSpin color={color} height={20} width={20} />
          </div>
        ) : (
          <>
            {icon && (
              <>
                {img}
                {noText && <Spacer />}
              </>
            )}
            {noText && (
              <SubtitlesM
                color={hoveredColor}
                style={{ margin: 0, whiteSpace: 'nowrap' }}
              >
                {buttonText}
              </SubtitlesM>
            )}
          </>
        )}
      </ContentWrapper>
    </ButtonWrapperOutline>
  );
};

export const FocusOutlineButton = ({
  icon,
  color,
  hoverColor,
  noText,
  noBorder,
  img = <CloudIcon width={'0.938rem'} color={Theme.colors.neutrals_000} />,
  buttonText = 'Button Text',
  onClick,
  active,
}: ButtonProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusedColor = isFocused ? color : Theme.colors.neutrals_000;
  const activeColor = active
    ? Theme.colors.primaries_000
    : Theme.colors.neutrals_000;

  return (
    <ButtonWrapperFocus
      focused={focusedColor}
      hovered={hoverColor}
      noBorder={noBorder}
      active={active}
      onMouseDown={() => setIsFocused(true)}
      onMouseUp={() => setIsFocused(false)}
      onClick={() => {
        if (onClick) {
          onClick();
          return;
        }
      }}
    >
      <ContentWrapper>
        {icon && (
          <>
            {img}
            {noText && <Spacer />}
          </>
        )}
        {noText && (
          <SubtitlesM
            color={activeColor}
            style={{ margin: 0, whiteSpace: 'nowrap' }}
          >
            {buttonText}
          </SubtitlesM>
        )}
      </ContentWrapper>
    </ButtonWrapperFocus>
  );
};

interface IDotButtonProps extends ButtonProps {
  options: { label: string; function: () => any }[];
  keyValue: string;
}

export const DotButton = ({
  icon,
  color,
  hoverColor,
  width,
  options,
  keyValue,
  img = (
    <DotsHorizontalIcon width={'0.938rem'} color={Theme.colors.primaries_000} />
  ),
}: IDotButtonProps) => {
  const [openOptions, setOpenOptions] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        if (openOptions) {
          setOpenOptions(false);
        }
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [buttonRef, keyValue, openOptions]);
  return (
    <ButtonWrapper
      key={`${keyValue}-button`}
      ref={buttonRef}
      color={color}
      hovered={hoverColor}
      width={width}
      onClick={() => {
        setOpenOptions(!openOptions);
      }}
    >
      <ContentWrapper>{icon && <>{img}</>}</ContentWrapper>
      {openOptions && (
        <OptionWrapper bottomOffset={-(options.length * 2.75 + 2.5)}>
          {options &&
            options.map((option) => {
              return (
                <SheetButton
                  key={`${keyValue}-button-${option.label.replace(/\s/g, '')}`}
                  width={'100%'}
                  icon={false}
                  color={Theme.colors.primaries_000}
                  onClick={option.function}
                  buttonText={option.label}
                ></SheetButton>
              );
            })}
        </OptionWrapper>
      )}
    </ButtonWrapper>
  );
};
