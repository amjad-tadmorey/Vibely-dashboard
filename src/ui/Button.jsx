const Button = ({
  type = 'button',
  onClick,
  children,
  className = '',
  disabled = false,
  variant = 'primary',
  size = 'md',
  ...rest
}) => {
  const baseStyle = `
    font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-[#4e6ef2] hover:bg-[#3b55d4] text-white',
    secondary: 'bg-gray-300 hover:bg-gray-300 text-black',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyle}
        ${sizeClasses[size] || sizeClasses.md}
        ${variantClasses[variant] || variantClasses.primary}
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
