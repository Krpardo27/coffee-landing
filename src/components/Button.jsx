
const Button = ({
  id,
  title,
  onClick,
  type = "button",
  rightIcon,
  leftIcon,
  containerClass,
}) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`
        group relative z-80 max-w-max justify-center items-center flex cursor-pointer overflow-hidden
        rounded-full bg-white px-6 py-3 text-black
        ${containerClass || ""}
      `}
    >
      {leftIcon}
      <span className="relative flex overflow-hidden font-general text-xs uppercase">
        <span className="block translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[160%] group-hover:skew-y-12">
          {title}
        </span>
        <span className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </span>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
