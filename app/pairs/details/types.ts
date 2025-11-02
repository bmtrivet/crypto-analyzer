export interface PriceData {
    timestamp: number;
    price: number;
}

export interface HistoricalKline {
    0: number; // Open time
    4: string; // Close price
}
