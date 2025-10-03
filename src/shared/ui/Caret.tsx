import { ChevronDown, ChevronUp } from "lucide-react";

const Caret = ({
  change,
  color = "",
  size = 4,
}: {
  change: number;
  color?: string;
  size?: number;
}) => {
  const isPositive = change >= 0;
  const colorClass = color ? color : isPositive ? "text-success" : "text-error";
  return (
    <div className={`h-${size} w-${size} ${colorClass}`}>
      {isPositive ? (
        <ChevronUp className={`h-${size} w-${size}`} />
      ) : (
        <ChevronDown className={`h-${size} w-${size}`} />
      )}
    </div>
  );
};

export default Caret;
