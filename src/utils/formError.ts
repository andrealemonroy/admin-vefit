export const formErrorMessage = (
    type: string,
    label: string,
    message: string,
    itemSelected?: string
  ): string => {
    switch (type) {
      case "maxLength":
        return "You have exceeded the maximum characters";
      case "required":
        return message ? message : `Please enter ${label.toLowerCase()}`;
      case "pattern":
        return `Please enter a valid ${
          itemSelected
            ? itemSelected.toLocaleLowerCase().includes("fax")
              ? "fax number"
              : itemSelected.toLocaleLowerCase()
            : label.toLowerCase()
        }`;
      default:
        return "";
    }
  };
  