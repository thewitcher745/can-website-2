type CoinNotFoundProps = {
  symbol?: string;
};

const CoinNotFound = ({ symbol }: CoinNotFoundProps) => {
  return (
    <main className="bg-background min-h-screen flex items-center justify-center text-text-muted">
      <div className="text-center space-y-4">
        <span className="text-2xl font-semibold">Coin not found</span>
        <p className="text-sm text-text-muted">
          We could not find any data for {symbol?.toUpperCase() ?? "this coin"}.
        </p>
      </div>
    </main>
  );
};

export default CoinNotFound;
