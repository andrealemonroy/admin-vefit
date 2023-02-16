import React, { FC } from 'react';
import { Sizes } from '../../utils/constants';
import { ParagraphS } from './Typography';

export type IInputRadio = {
  value: string;
  name: string;
  description?: string;
};
interface InputRadioProps {
  options: IInputRadio[];
  setFormValue?: (value: string) => void;
  value?: string;
  labelText?: string;
}

export const InputRadio: FC<InputRadioProps> = ({ options, setFormValue, value, labelText }) => {
  return (
    <>
      <label className='w-full'>
        {labelText && (
          <div className='mb-1'>
            <ParagraphS color='black'>{labelText}</ParagraphS>
          </div>
        )}
        {options.map((option, index) => (
          <fieldset key={index} className={'flex mb-3 justify-between'}>
            <div className={'flex items-center w-[45%]'}>
              <div className='border-2 border-primary rounded-full w-fit h-fit flex justify-center items-center mr-1.5'>
                <input
                  className='checked:bg-primary accent-white border-white border-[2.5px]'
                  type='radio'
                  id={index.toString()}
                  name={option.name}
                  value={option.value}
                  onChange={(e) => {
                    setFormValue && setFormValue(e.target.value);
                  }}
                  checked={value === option.value}
                />
              </div>
              <label htmlFor={index.toString()} className='text-primary font-bold text-xs'>
                {option.value}
              </label>
            </div>

            {option.description && (
              <div className='w-4/6 items-center flex mb-0'>
                <ParagraphS color='black'>{option.description}</ParagraphS>
              </div>
            )}
          </fieldset>
        ))}
      </label>
    </>
  );
};
