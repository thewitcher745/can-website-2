const GlassCard = ({
  children,
  className,
  angle = 135,
}: {
  children: React.ReactNode;
  className?: string;
  angle?: number;
}) => {
  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(${angle}deg, rgba(255, 255, 255, 0.2), rgba(40, 40, 40, 0), color-mix(in srgb, var(--color-primary) 15%, transparent))`,
        // backdropFilter: "blur(10px) saturate(150%)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.3)",
      }}
    >
      {children}
    </div>
  );
};

export default GlassCard;
