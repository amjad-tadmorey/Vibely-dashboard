import React from 'react';

const Button = ({
  type = 'button',
  onClick,
  children,
  className = '',
  disabled = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full p-4 bg-[#4e6ef2] hover:bg-[#3b55d4] text-white font-semibold rounded-xl
        transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
