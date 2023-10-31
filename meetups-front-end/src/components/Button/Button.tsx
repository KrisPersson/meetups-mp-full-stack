import "./Button.scss";

interface ButtonProps {
  children?: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  radius?: string;
  border?: string;
  fontFamily?: string;
  fontWeight?: string;
  padding?: string;
  onClick: () => void;
  isFullyBooked?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  backgroundColor,
  width,
  height,
  radius,
  border,
  fontFamily,
  fontWeight,
  padding,
  onClick,
  isFullyBooked,
}) => {
  return (
    <button
      className="button"
      style={{
        backgroundColor: backgroundColor,
        color: color,
        width: width,
        height: height,
        borderRadius: radius,
        border: border,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        padding: padding,
      }}
      onClick={onClick}
      disabled={isFullyBooked || false}
    >
      {children}
    </button>
  );
};

export default Button;
