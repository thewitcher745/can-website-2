import React from "react";

const StatBox: React.FC<{
  className?: string;
  icon: React.ReactElement<{ className?: string }>;
  stat: string;
  caption: string;
}> = ({ className, icon, stat, caption }) => {
  const renderedIcon = React.isValidElement(icon)
    ? React.cloneElement(icon, {
        className: `h-16 w-16 text-primary ${
          icon.props.className ?? ""
        }`.trim(),
      })
    : icon;

  return (
    <div
      className={`w-full h-full max-w-sm flex flex-col items-center gap-4 flex-nowrap border border-highlight rounded-3xl p-6 py-10 ${
        className ?? ""
      }`}
    >
      {renderedIcon}
      <span className="text-text-main text-4xl font-bold">{stat}</span>
      <span className="text-text-muted text-md text-center">{caption}</span>
    </div>
  );
};

export default StatBox;
