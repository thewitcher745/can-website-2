export interface MonthResult {
  label: string;
  img: string;
  winrate?: number;
  grossProfit?: number;
  drawdown?: number;
};

export interface longShortExchangeItem {
    longPercentage: number,
    ratio: number,
    long: number,
    short: number
}

export interface longShortItem {
       [key: string]: longShortExchangeItem,
}

export interface Video {
  channel_link: string;
  id: string;
  link: string;
  published: string;
  thumbnail: string;
  description: string;
  title: string;
}

export interface AnalysisPostMeta {
  thumbnail: string;
  image: string;
  author: string;
  time: string;
  slug: string;
  tags: string[];
  coins: string[];
  title: string;
  desc: string;
}

export interface TopCoin {
  change: number;
  change_24h: number;
  name: string;
  price: number;
  symbol: string;
  volume: number;
}

export interface TopCoinLists {
  top_gainers: TopCoin[];
  top_losers: TopCoin[];
  trending: TopCoin[];
  top_volume: TopCoin[];
}

export interface HighPotentialTokenMeta {
  name: string;
  symbol: string;
  category: string;
  slug: string;
  logo: string;
}

export interface DesktopSidebarProps {
  allYears: string[];
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  monthsForSelectedYear: string[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

export interface MobileSelectorsProps {
  allYears: string[];
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  monthsForSelectedYear: string[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

export interface ResultsDisplayProps {
  currentResult: MonthResult | undefined;
  allYears: string[];
  selectedYear: string;
}

export interface PostDescriptionProps {
  description: string;
  className?: string;
}

export interface PostLogoProps {
  thumbnail: string;
  altText: string;
  className?: string;
  hiddenOnMobile?: boolean;
}

export interface PostTagsProps {
  tags: string[];
  hiddenOnMobile?: boolean;
  className?: string;
}

export interface PostTimeProps {
  time: string;
  className?: string;
  hiddenOnMobile?: boolean;
}

export interface PostTitleProps {
  title: string;
  slug: string;
  className?: string;
}

export interface ChartItemProps {
  name: string;
  market_cap: number;
  price: number;
  symbol: string;
  total_volume: number;
}

export interface MarketData {
  activeCurrencies: number;
  activeExchanges: number;
  marketCapChangePercentage24h: number;
  totalMarketCap: number;
  totalVolume24h: number;
  volumeChangePercentage24h: number;
}

export interface ResultsMonthData{ 
    date: string, 
    symbol: string, 
    status: string, 
    leverage: string, 
    used_dollars: number, 
    type: string, 
    last_target: number, 
    profit_percent: number, 
    net_profit: string 
  }

  export interface GainerLoser {
    change: number;
    name: string;
    price: number;
    symbol: string;
    volume: number;
  }

  export interface ArticleItemRaw {
    slug: string;
    thumbnail: string;
    title: string;
    publishedAt: string;
    time: string;
    timestamp: string;
    date: string;
  }
  
  export interface ArticleItem {
    slug: string;
    thumbnail: string;
    title: string;
    publishedAt: Date;
  }

  export interface ArticleMeta {
    author: string;
    time: string;
    slug: string;
    tags: string[];
    title: string;
    desc: string;
    thumbnail?: string;
  }
  
  export interface Article {
    author: string;
    content_html: string;
    time: string;
    slug: string;
    tags: string[];
    title: string;
  }

  export interface TopMarketCapCoin {
    change_24h: number;
    change_7d: number;
    name: string;
    price: number;
    symbol: string;
    volume_24h: number;
    market_cap: number;
  }

  export interface MarketDominanceData {
    btcDominance: number;
    ethDominance: number;
    btcDominanceChange: number;
    ethDominanceChange: number;
  }