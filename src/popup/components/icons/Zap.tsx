import { Zap } from "lucide-react";

interface ZapIconProps {
  color?: string;
  size?: number;
  className?: string;
}

const ZapIcon: React.FC<ZapIconProps> = ({
  color,
  size,
  className = "text-white rounded-full bg-green-800 p-1 ring-1 ring-white shadow-md w-[20px] h-[20px] text-center",
}) => {
  return <Zap className={className} color={color} size={size} />;
};

export default ZapIcon;
