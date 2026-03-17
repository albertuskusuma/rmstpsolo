type ButtonProps = {
  title: string;
  onClick?: () => void;
  color?: string; 
  isDisabled?: boolean;
};

const GowButton = ({ title, onClick, color = "bg-indigo-600", isDisabled = false }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`${color} text-white font-semibold px-4 py-2 rounded-md shadow hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {title}
    </button>
  );
};

export default GowButton;