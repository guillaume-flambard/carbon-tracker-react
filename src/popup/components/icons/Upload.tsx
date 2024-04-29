import { Upload } from "lucide-react";

interface UploadIconProps {
  color?: string;
  size?: number;
  className?: string;
}

const UploadIcon: React.FC<UploadIconProps> = ({
  color,
  size,
  className = "text-white rounded-full bg-green-800 p-1 ring-1 ring-white shadow-md w-[20px] h-[20px] text-center",
}) => {
  return <Upload className={className} color={color} size={size} />;
};

export default UploadIcon;
