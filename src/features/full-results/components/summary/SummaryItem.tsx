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
    <div className={`flex w-full justify-between items-center p-6`}>
      <div className="flex flex-col">
        <span className="text-text-main text-lg ">{title}</span>
        <span
          style={{ color: valueColor }}
          className="font-bold text-2xl sm:text-4xl"
        >
          {valueStr}
        </span>
      </div>
      <div className="max-w-20">
        <Icon width={60} height={60} color={iconColor} />
      </div>
    </div>
  );
};

export default SummaryItem;
