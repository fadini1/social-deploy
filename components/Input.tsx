interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type,
  disabled,
  onChange
}) => {
  return (
    <input
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
      className="
        w-full
        py-2
        px-4  
        text-lg
        bg-[#1e1e1e]
        hover:bg-[#2c2c2c]
        rounded-xl
        outline-none
        transition
        duration-500 
        disabled:bg-teal-600
        disabled:opacity-70
        disabled:cursor-not-allowed
      "
    />
  );
}

export default Input