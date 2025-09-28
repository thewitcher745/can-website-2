export interface longShortExchangeItem {
    longPercentage: number,
    ratio: number,
    long: number,
    short: number
}

export interface longShortItem {
       binance: longShortExchangeItem,
       bybit: longShortExchangeItem,
       okx: longShortExchangeItem,
       bitget: longShortExchangeItem,
       kraken: longShortExchangeItem
}