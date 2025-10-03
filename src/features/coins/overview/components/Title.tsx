const Title = ({
  title,
  sub = false,
  className = "",
  center = false,
}: {
  title: string;
  sub?: boolean;
  className?: string;
  center?: boolean;
}) => {
  return (
    <div
      className={`w-full mb-2 text-text-main flex ${
        center ? "justify-center" : "justify-center lg:justify-start"
      } ${sub ? "font-semibold text-xl" : "font-bold text-2xl"} ${className}`}
    >
      <span>{title}</span>
    </div>
  );
};

export default Title;
