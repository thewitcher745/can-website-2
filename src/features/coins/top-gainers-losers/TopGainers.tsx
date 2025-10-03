import { GainerLoser } from "@src/types";
import { useEffect, useState } from "react";

import { buildApiUrl } from "@src/config";
import Table from "./Table";

const TopGainers = () => {
  const [topGainers, setTopGainers] = useState<GainerLoser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(buildApiUrl(`/api/top_gainers`))
      .then((res) => res.json())
      .then((data) => {
        setTopGainers(data);
      })
      .catch((error) => {
        setError("Error getting top gainers data!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <Table allData={topGainers} loading={loading} error={error} />;
};

export default TopGainers;
