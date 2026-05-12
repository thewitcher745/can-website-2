import { LucideIcon } from "lucide-react";

const SummaryItem = ({
  title,
  valueStr,
  valueColor = "var(--color-primary)",
  icon: Icon,
  iconColor = "white",
}: {
  title: string;
  valueStr: string;
  valueColor?: string;
  icon: LucideIcon;
  iconColor?: string;
}) => {
  return (
    <div
      className={`flex justify-between items-center min-w-xxs xs:min-w-sm w-full p-6`}
    >
      <div className="flex flex-col">
        <span className="text-text-main text-lg ">{title}</span>
        <span style={{ color: valueColor }} className="font-bold text-4xl">
          {valueStr}
        </span>
      </div>
      <Icon width={80} height={80} color={iconColor} />
    </div>
  );
};

export default SummaryItem;
