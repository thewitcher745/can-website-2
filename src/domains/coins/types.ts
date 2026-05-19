export interface WidgetTopCoin {
  name: string;
  symbol: string;
  price: number;
  change: number;
}

export interface TopCoinsListsWidget {
  topGainers: WidgetTopCoin[];
  topLosers: WidgetTopCoin[];
  trending: WidgetTopCoin[];
}
