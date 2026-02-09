export type ArticleType = "blog" | "analysis" | "news" | "high_potential";

export interface EditorMetadata {
  type: ArticleType;
  title: string;
  slug: string;
  author: string;
  tags: string;
  date: string;
  time: string;
  status: string;
  // Blog & News & Analysis
  description?: string;
  thumbnail?: string;
  // Analysis
  isVip?: boolean;
  image?: string;
  coins?: string;
  // High Potential
  tokenName?: string;
  symbol?: string;
  category?: string;
  logo?: string;
}

export interface MonthResult {
  label: string;
  winrate?: number;
  grossProfit?: number;
  drawdown?: number;
}

export interface longShortExchangeItem {
  longPercentage: number;
  ratio: number;
  long: number;
  short: number;
}

export interface longShortItem {
  [key: string]: longShortExchangeItem;
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
  image: string;
  author: string;
  time: string;
  tags: string[];
  coins: string[];
  title: string;
  description: string;
}

export interface ListedAnalysisPost {
  slug: string;
  meta: AnalysisPostMeta;
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

export interface HighPotentialArticleMeta {
  author: string;
  category: string;
  description: string;
  image: string;
  logo: string;
  status: string;
  symbol: string;
  tags: string[];
  time: string;
  title: string;
}

export interface ListedHighPotentialArticle {
  meta: HighPotentialArticleMeta;
  slug: string;
}

export interface DesktopSidebarProps {
  allYears: string[];
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  monthsForSelectedYear: string[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

export interface SelectorsProps {
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
  isVip?: boolean;
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

export interface ResultsMonthData {
  date: string;
  symbol: string;
  status: string;
  leverage: string;
  used_dollars: number;
  type: string;
  last_target: number;
  profit_percent: number;
  net_profit: string;
}

export interface GainerLoser {
  change: number;
  name: string;
  price: number;
  symbol: string;
  volume: number;
}

export interface ArticleMeta {
  author: string;
  description: string;
  tags: string[];
  time: string;
  title: string;
  thumbnail?: string;
}

export interface ListedArticle {
  slug: string;
  meta: ArticleMeta;
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

interface CoinUrls {
  announcements: string[];
  chat: string[];
  explorer: string[];
  facebook: string[];
  message_board: string[];
  reddit: string[];
  source_code: string[];
  technical_doc: string[];
  twitter: string[];
  website: string[];
}

export interface CoinMetaInfo {
  description: string;
  logo: string;
  name: string;
  symbol: string;
  urls: CoinUrls;
}

export interface CoinCMCInfo {
  change_1h: number;
  change_24h: number;
  change_30d: number;
  change_7d: number;
  diluted_market_cap: number;
  dominance: number;
  market_cap: number;
  name: string;
  rank: number;
  symbol: string;
  volume_24h: number;
}
