export default function Button({ children, onClick, variant = 'primary', className = '', ...props }){
  const baseStyle = "px-6 py-2.5 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const BRAND_COLOR = "bg-red-700";
const BRAND_TEXT = "text-red-700";
const BRAND_BORDER = "border-red-700";
const HOVER_COLOR = "hover:bg-red-800";
  const variants = {
    primary: `${BRAND_COLOR} text-white ${HOVER_COLOR} shadow-lg shadow-red-900/20`,
    secondary: "bg-gray-800 text-white hover:bg-gray-900",
    outline: `border-2 ${BRAND_BORDER} ${BRAND_TEXT} hover:bg-red-50`,
    ghost: "text-gray-600 hover:bg-gray-100",
    white: "bg-white text-gray-900 hover:bg-gray-100"
  };
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
