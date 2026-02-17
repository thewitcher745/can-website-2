import { AnalysisPost } from "@src/types";

const Update = ({ update, idx }: { update: AnalysisPost; idx: number }) => {
  return (
    <div key={idx} className="border-l-4 border-primary px-6 py-3 relative">
      <div className="text-xs text-text-muted mb-1">
        Update at{" "}
        {new Date(update.meta.time).toLocaleDateString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}{" "}
        {new Date(update.meta.time).toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </div>
      {/* <article
        className="analysis-article text-text-main"
        dangerouslySetInnerHTML={{
          __html: update.content_html,
        }}
      /> */}
    </div>
  );
};

export default Update;
