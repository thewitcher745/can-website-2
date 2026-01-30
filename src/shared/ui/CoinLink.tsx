import Link from "next/link";

export default function CoinLink({
  symbol,
  children,
}: {
  symbol: string;
  children: React.ReactNode;
}) {
  if (symbol === "USDT") {
    return children;
  }
  return <Link href={`/coin/${symbol}`}>{children}</Link>;
}
