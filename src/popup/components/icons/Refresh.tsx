import { RefreshCcw } from "lucide-react";

interface RefreshIconProps {
  color?: string;
  size?: string;
  className?: string;
}

const RefreshIcon: React.FC<RefreshIconProps> = ({
  color,
  size,
  className,
}) => {
  return <RefreshCcw className={className} color={color} size={size} />;
};

export default RefreshIcon;
