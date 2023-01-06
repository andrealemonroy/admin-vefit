import React, { FC } from 'react';
import { Sizes } from '../../utils/constants';

import { Text } from './Text';
import { InputProps } from './../interfaces/input';

export const Input: FC<InputProps> = ({
    required,
    error,
    labelText,
    placeholderText,
    errorText = 'Error Text',
    setFormValue,
    disabled,
    type,
    max,
    value,
  }) => {
    return (
      <label className='w-full'>
        {labelText && (
          <div className='mb-1 flex'>
            <Text readonly={disabled} variant={Sizes.XS} color='black'>
              {labelText}
            </Text>
            {required && (
              <Text variant={Sizes.XS} color='black'>
                {' '}
                *
              </Text>
            )}
          </div>
        )}
        <div style={{ width: 'inherit' }}>
          <input
            className={`${
              disabled ? 'bg-white' : 'py-2 px-3  focus:outline-none focus:border-primary hover:border-primary h-[38px]'
            } disabled:border-transparent transition duration-150 appearance-none border border-lightGray rounded-xl w-full  text-gray-700 leading-tight  hover:outline-none placeholder:text-lightGray `}
            type={type}
            placeholder={placeholderText}
            onChange={(e) => {
              setFormValue && setFormValue(e.target.value);
            }}
            disabled={disabled}
            min={1}
            step={1}
            onInput={(e) => {
              e.currentTarget.validity.valid || (e.currentTarget.value = '');
            }}
            max={max}
            // value={value && value}
            defaultValue={value && value}
          />
        </div>
  
        {error && (
          <Text variant={Sizes.S} color='red'>
            {errorText}
          </Text>
        )}
      </label>
    );
  };
  