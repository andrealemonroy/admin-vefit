import { FC, PropsWithChildren } from 'react';
import { Sizes } from '../../utils/constants';
import React from 'react';

interface Props extends PropsWithChildren {
  color?: string;
  weight?: string;
  variant: Sizes | string;
  readonly?: boolean;
  underline?: boolean;
}

const getColor = (color: string | undefined) => {
  switch (color) {
    case 'black':
      return 'text-black';
    case 'white':
      return 'text-white';
    case 'red':
      return 'text-red';
    case 'green':
      return 'text-green';
    case 'alternative':
      return 'text-alternative';
    case 'primary':
      return 'text-primary';
    case 'secondary':
      return 'text-secondary';
    case 'lightGray':
      return 'text-lightGray';
  }
};

const getVariant = (variant: string) => {
  switch (variant) {
    case Sizes.XS:
      return 'text-xs';
    case Sizes.S:
      return 'text-sm';
    case Sizes.SM:
      return 'text-base';
    case Sizes.M:
      return 'text-lg';
    case Sizes.XL:
      return 'text-xl';
    case Sizes.XL2:
      return 'text-2xl';
    case Sizes.XL3:
      return 'text-3xl';
    case Sizes.XL4:
      return 'text-4xl';
    case Sizes.XL5:
      return 'sm:text-5xl text-2xl';
    default:
      return 'text-base';
  }
};

const getClass = (variant: string, color: string | undefined, weight: string | undefined) => {
  if (variant === 'md' || variant === 'sm') {
    weight = weight || 'bold';
    color = color || 'black';
  }
  return `${getVariant(variant)} ${color ? `${getColor(color)}` : ''} ${weight ? `font-${weight}` : ''}`;
};

export const Text: FC<Props> = ({ children, color, weight, variant, readonly, underline }) => {
  switch (variant) {
    case Sizes.XXS:
      return <p className={`font-medium text-[9px] ${getColor(color)}`}>{children}</p>;
    case Sizes.XS:
      return (
        <p
          className={`${
            readonly ? 'text-[9px] text-alternative font-semibold' : `text-xs mb-2.5 ${getColor(color)} font-medium`
          } ${underline && 'underline cursor-pointer font-bold'}`}>
          {children}
        </p>
      );
    case Sizes.SM:
      return <h2 className={getClass(variant, color, weight)}>{children}</h2>;
    case Sizes.M:
      return <h1 className={getClass(variant, color, weight)}>{children}</h1>;
    default:
      return <p className={getClass(variant, color, weight)}>{children}</p>;
  }
};
