interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  unfollow?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  large,
  onClick,
  disabled,
  unfollow
}) => {
  return (
    <button 
    disabled={disabled}
    onClick={onClick}
    className={`
      disabled:opacity-100 disabled:cursor-not-allowed rounded-2xl font-medium
      hover:opacity-100 transition duration-500 border-2 hover:bg-white
      px-4 py-1
      ${fullWidth ? 'w-full' : 'w-fit'}
      ${secondary ? 'bg-emerald-400' : 'bg-teal-200'}
      ${secondary ? 'text-black' : 'text-white'}
      ${secondary ? 'border-black' : 'border-teal-300'}
      ${large ? 'text-md' : 'text-md'}
      ${large ? 'px-3' : 'px-3'}
      ${large ? 'py-1' : 'py-1'}
      ${unfollow ? 'bg-transparent' : ''}
      ${unfollow ? 'border-white' : ''}
      ${unfollow ? 'text-white' : ''}
      ${unfollow ? 'hover:text-black' : ''}
    `}>
      {label}
    </button>
  )
}

export default Button