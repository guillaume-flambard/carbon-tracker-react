import { useEffect, useState } from "react";

interface CounterCircleProps {
  id: string;
  value?: number | string;
  unit?: string;
  icon?: JSX.Element;
}

const CounterCircle: React.FC<CounterCircleProps> = ({
  id,
  value,
  icon,
  unit,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div id={id} className="flex flex-col justify-center items-center gap-2">
      <div
        className="data-field p-4 bg-white rounded-full min-w-[80px] min-h-[80px] shadow-md ring-1
       flex flex-col items-center justify-center relative"
      >
        <div className="absolute top-0 transform -translate-y-1/2">{icon}</div>
        <p className="text-xl font-medium text-gray-700 flex flex-col justify-center items-center">
          <span id="data-transferred">{value}</span>
          <span className="text-xs text-gray-500">{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default CounterCircle;
