import { GainerLoser } from "@src/types";
import { useEffect, useState } from "react";

import { buildApiUrl } from "@src/config";
import Table from "./Table";

const TopLosers = () => {
  const [topLosers, setTopLosers] = useState<GainerLoser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(buildApiUrl(`/api/top_losers`))
      .then((res) => res.json())
      .then((data) => {
        setTopLosers(data);
      })
      .catch((error) => {
        setError("Error getting top losers data!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <Table allData={topLosers} loading={loading} error={error} />;
};

export default TopLosers;
