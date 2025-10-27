export interface OkxTicker {
    instType: "SPOT" | "SWAP" | "FUTURES" | "OPTION"; // Type of instrument: spot trading, swap, futures, or options
    instId: string; // Unique identifier for the trading pair, e.g., "BTC-USDT"
    last: string; // Last traded price
    lastSz: string; // Size/amount of the last trade
    askPx: string; // Best ask (sell) price
    askSz: string; // Size at best ask price
    bidPx: string; // Best bid (buy) price
    bidSz: string; // Size at best bid price
    open24h: string; // Opening price in the last 24 hours
    high24h: string; // Highest price in the last 24 hours
    low24h: string; // Lowest price in the last 24 hours
    volCcy24h: string; // 24h trading volume in base currency (the first currency in the pair)
    vol24h: string; // 24h trading volume in quote currency (the second currency in the pair)
    ts: string; // Timestamp of the last update in milliseconds
    sodUtc0?: string; // Start-of-day price at UTC+0
    sodUtc8?: string; // Start-of-day price at UTC+8
}

export interface OkxTickerResponse {
    code: string; // API response code ("0" means success)
    msg: string; // Message from API, usually empty if success
    data: OkxTicker[]; // Array of ticker objects for all trading pairs
}

export interface CoinGeckoCoin {
    id: string; // Unique CoinGecko ID (used for API queries), e.g., "bitcoin"
    symbol: string; // Ticker symbol, e.g., "btc"
    name: string; // Full name of the coin, e.g., "Bitcoin"
    image: string; // URL to the coin's icon or logo
    current_price: number; // Current price in the selected currency (e.g., USD)
    market_cap: number; // Market capitalization
    market_cap_rank: number; // Rank by market capitalization
    fully_diluted_valuation: number | null; // Market cap if the max supply were in circulation
    total_volume: number; // 24h trading volume
    high_24h: number; // Highest price in the last 24h
    low_24h: number; // Lowest price in the last 24h
    price_change_24h: number; // Absolute price change over the last 24 hours
    price_change_percentage_24h: number; // Percentage price change over the last 24 hours
    market_cap_change_24h: number; // Absolute market cap change over the last 24 hours
    market_cap_change_percentage_24h: number; // Percentage market cap change over the last 24 hours
    circulating_supply: number; // Number of coins currently circulating
    total_supply: number | null; // Total supply of coins that currently exist
    max_supply: number | null; // Maximum number of coins that will ever exist
    ath: number; // All-time high price
    ath_change_percentage: number; // Percentage change from the all-time high
    ath_date: string; // Date of the all-time high (ISO 8601 format)
    atl: number; // All-time low price
    atl_change_percentage: number; // Percentage change from the all-time low
    atl_date: string; // Date of the all-time low (ISO 8601 format)
    roi: {
        times: number;
        currency: string;
        percentage: number;
    } | null; // Return on investment info (for ICO coins), may be null
    last_updated: string; // Timestamp of last data update (ISO 8601 format)
}

export interface PairData extends OkxTicker {
    mainCoinName: string;
    relativeCoinName: string;
    imageUrl: string;
}
