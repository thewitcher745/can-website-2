import { CoinMetaInfo } from "@src/types";

type CoinDescriptionSectionProps = {
  meta: CoinMetaInfo | null;
};

const CoinDescriptionSection = ({ meta }: CoinDescriptionSectionProps) => {
  if (!meta?.description) return null;

  return (
    <section className="bg-background border border-border rounded-xl p-6 shadow-inner space-y-3">
      <h2 className="text-2xl font-semibold text-white">About {meta.name}</h2>
      <p className="text-base leading-relaxed text-text-muted whitespace-pre-line">
        {meta.description}
      </p>
    </section>
  );
};

export default CoinDescriptionSection;
