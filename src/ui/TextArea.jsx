const Textarea = ({
  name,
  placeholder,
  value,
  onChange,
  required = false,
  rows = 5,
  className = '',
  ...rest
}) => {
  return (
    <textarea
      name={name}
      rows={rows}
      placeholder={placeholder}
      className={`
        w-full p-4 rounded-xl bg-white/40 border border-blue-100 text-gray-800 shadow
        placeholder-gray-600 focus:outline-none focus:border-[#4e6ef2] backdrop-blur resize-y
        ${className}
      `}
      value={value}
      onChange={onChange}
      required={required}
      {...rest}
    ></textarea>
  );
};

export default Textarea;
