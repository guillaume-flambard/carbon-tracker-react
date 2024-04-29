import { LeafyGreen } from "lucide-react";

interface LeafyIconProps {
  color?: string;
  size?: number;
  className?: string;
}

const LeafyIcon: React.FC<LeafyIconProps> = ({
  color,
  size,
  className = "text-white rounded-full bg-green-800 p-1 ring-1 ring-white shadow-md w-[20px] h-[20px] text-center",
}) => {
  return <LeafyGreen className={className} color={color} size={size} />;
};

export default LeafyIcon;
