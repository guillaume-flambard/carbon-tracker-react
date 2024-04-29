import { Download } from "lucide-react";

interface DownloadIconProps {
  color?: string;
  size?: number;
  className?: string;
}

const DownloadIcon: React.FC<DownloadIconProps> = ({
  color,
  size,
  className = "text-white rounded-full bg-green-800 p-1 ring-1 ring-white shadow-md w-[20px] h-[20px] text-center",
}) => {
  return <Download className={className} color={color} size={size} />;
};

export default DownloadIcon;
