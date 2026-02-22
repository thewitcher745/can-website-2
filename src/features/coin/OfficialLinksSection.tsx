import type { ReactNode } from "react";
import { Code2, FileText, Globe2, Megaphone, Users } from "lucide-react";

import { CoinMetaInfo } from "@src/types";

import { buildLinkGroups, getHostname } from "./utils";

type OfficialLinksSectionProps = {
  meta: CoinMetaInfo | null;
};

const OfficialLinksSection = ({ meta }: OfficialLinksSectionProps) => {
  const linkGroups = buildLinkGroups(meta);
  const iconMap: Record<string, ReactNode> = {
    Website: <Globe2 className="h-4 w-4 text-primary" />,
    Explorer: <Globe2 className="h-4 w-4 text-primary" />,
    "Source Code": <Code2 className="h-4 w-4 text-primary" />,
    Whitepaper: <FileText className="h-4 w-4 text-primary" />,
    Community: <Users className="h-4 w-4 text-primary" />,
    Announcements: <Megaphone className="h-4 w-4 text-primary" />,
  };
  const hasLinks = linkGroups.some(
    (group) => group.values && group.values.length > 0
  );

  if (!hasLinks) return null;

  return (
    <section className="bg-background border border-border rounded-xl p-6 shadow-inner space-y-4">
      <h2 className="text-2xl font-semibold text-white">Official Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {linkGroups.map(
          (group) =>
            group.values &&
            group.values.length > 0 && (
              <div
                key={group.label}
                className="border border-border rounded-2xl p-4 bg-background/50"
              >
                <div className="flex items-center gap-2 text-text-muted mb-2">
                  <span className="inline-flex items-center justify-center rounded-full bg-background py-1">
                    {iconMap[group.label] ?? (
                      <Globe2 className="h-4 w-4 text-primary" />
                    )}
                  </span>
                  <p className="text-sm">{group.label}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.values.slice(0, 4).map((url) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 rounded-full bg-background text-primary text-sm border border-border hover:border-primary transition-colors truncate max-w-full"
                    >
                      {getHostname(url)}
                    </a>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default OfficialLinksSection;
