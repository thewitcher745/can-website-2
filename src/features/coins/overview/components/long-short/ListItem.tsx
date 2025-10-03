import Image from "next/image";

import { longShortExchangeItem } from "@src/types";
import Bar from "./Bar";
import Details from "./Details";
import { reduceNumber } from "@src/utils";

const ListItem = ({
  exchange,
  longShortData,
}: {
  exchange: { id: string; name: string; logo: string };
  longShortData: longShortExchangeItem;
}) => {
  return (
    <tr key={exchange.id} className="w-full justify-evenly flex py-3">
      <td className="w-1/3 sm:w-1/4 flex gap-2 items-center">
        <div className="w-10 h-10 aspect-square rounded-full overflow-hidden">
          <Image
            className="size-full object-cover"
            src={exchange.logo}
            alt={exchange.name}
            width={128}
            height={128}
          />
        </div>
        <span className="text-xl text-text-main font-semibold">
          {exchange.name}
        </span>
      </td>
      <td className="w-2/3 md:w-1/4">
        <Bar longPercentage={longShortData?.longPercentage} />
      </td>
      <td className="hidden md:block md:w-1/4">
        <Details type="long" volume={reduceNumber(longShortData?.long)} />
      </td>
      <td className="hidden md:block md:w-1/4">
        <Details type="short" volume={reduceNumber(longShortData?.short)} />
      </td>
    </tr>
  );
};

export default ListItem;
