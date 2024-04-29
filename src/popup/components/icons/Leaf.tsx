import { Leaf } from "lucide-react";

interface LeafIconProps {
  color?: string;
  size?: number;
  className?: string;
}

const LeafIcon: React.FC<LeafIconProps> = ({ color, size, className }) => {
  return <Leaf className={className} color={color} size={size} />;
};

export default LeafIcon;
