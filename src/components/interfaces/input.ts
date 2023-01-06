export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    required?: boolean;
    error?: boolean;
    labelText?: string;
    placeholderText?: string;
    errorText?: string;
    setFormValue?: (arg: string) => void;
    type?: string;
    disabled?: boolean;
    max?: number; 
    value?: string;
  }