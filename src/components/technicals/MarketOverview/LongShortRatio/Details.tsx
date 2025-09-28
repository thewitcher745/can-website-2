const Details = ({
  type,
  volume,
}: {
  type: "long" | "short";
  volume: number;
}) => {
  return (
    <div className="flex gap-4 px-8">
      <div className="flex gap-2 text-xl">
        <span className="text-text-muted">
          {type.charAt(0).toUpperCase() + type.slice(1)}:
        </span>
        <span className="text-text-main">{volume}</span>
      </div>
    </div>
  );
};

export default Details;
