import React, { useEffect } from "react";
import Select from "react-select";
import styled from "styled-components";
import { SheetButton } from "../../components/atoms/Button";
import { Theme } from "./theme";
import { ParagraphS, SubtitlesM } from "./Typography";
import Async from "react-select/async";

interface SelectWrapperProps {
  isFocused: boolean;
  width: string;
}

const customStyles = {
  container: (provided) => {
    return {
      ...provided,
      width: "100%",
    };
  },
  placeholder: (provided) => {
    return {
      ...provided,
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: ".875rem",
      textAlign: "left",
      lineHeight: "1.25rem",
      color: "#ADB5BD",
    };
  },
  indicatorSeparator: () => ({}),
  dropdownIndicator: (provided) => ({
    provided,
    padding: 0,
    lineHeight: 0,
    color: "#ADB5BD",
  }),
  singleValue: (provided) => {
    return {
      ...provided,
      fontFamily: "Poppins",
      fontWeight: 400,
      fontSize: ".875rem",
      textAlign: "left",
    };
  },
  valueContainer: (provided) => {
    return {
      ...provided,
      padding: 0,
    };
  },
  input: (provided) => {
    return {
      ...provided,
      margin: 0,
      padding: 0,
    };
  },
  menu: (provided) => {
    return {
      ...provided,
      width: "100%",
      padding: "1rem",
      background: "white",
      boxShadow: "0rem 0.75rem 1.5rem 0rem rgba(176, 184, 192, 0.2)",
      borderRadius: ".75rem",
      marginTop: ".25rem",
    };
  },
};

const Label = styled.label`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
`;

const SelectWrapper = styled.div<SelectWrapperProps>`
  display: flex;
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid #ced4da;
  box-sizing: border-box;
  background-color: #f1f3f5;
  font-family: Poppins;
  font-size: 14px;
  line-height: 20px;
  ${({ isFocused }) => {
    if (isFocused) {
      return `
      border: 1px solid #AE3EC9;
      box-shadow: 0rem 0rem 0rem 0.25rem rgba(243, 218, 250, 1);
      outline: none;
      box-sizing: border-box;
      svg {
        transform: scaleY(-1)
      }
      `;
    }
  }}
`;
const customSelectContainer = (props) => {
  return <SelectWrapper {...props} />;
};

const customOption = (props) => {
  return (
    <SheetButton
      {...props}
      width={"100%"}
      icon={false}
      color={"#AE3EC9"}
      onClick={() => props.innerProps.onClick()}
      buttonText={props.children}
    />
  );
};

const customOptionWithBadge = (props) => {
  return (
    <SheetButton
      {...props}
      width={"100%"}
      icon={false}
      color={"#AE3EC9"}
      badge={true}
      onClick={() => props.innerProps.onClick()}
      buttonText={props.children}
    />
  );
};

export const CustomSelect = (props) => {
  const SelectComponent = props.asyncConfig ? Async : Select;
  console.log(props);

  useEffect(() => {
    if (typeof props.value === "string") {
      const foundOption = (props.options || []).find(
        (opt) => opt.value === props.value
      );
      if (foundOption) props.setFormValue(foundOption);
      else {
        const newOption = [{ label: props.value, value: props.value }];
        props.setFormValue(newOption);
      }
    } else if (props.value === undefined) {
      props.setFormValue(null);
    }
  }, [props.value, props]);
  return (
    <Label className="flex w-full">
      <SubtitlesM
        style={{ margin: "0 0 .5rem 0" }}
        color={Theme.colors.neutrals_000}
      >
        {props.label}
        {props.required && (
          <SubtitlesM
            color={Theme.colors.danger_000}
            style={{ display: "inline" }}
          >
            {" "}
            *
          </SubtitlesM>
        )}
      </SubtitlesM>
      <SelectComponent
        {...props}
        width="100%"
        name={props.name}
        options={props.options}
        styles={customStyles}
        placeholder={props.placeholderText}
        components={{
          Control: customSelectContainer,
          Option: props.withBadge ? customOptionWithBadge : customOption,
          ...(props.components || {}),
        }}
        onChange={props.setFormValue}
        value={props.value}
        openMenuOnFocus={true}
        isDisabled={props.disabled}
        {...(props.asyncConfig || {})}
      />
    </Label>
  );
};
