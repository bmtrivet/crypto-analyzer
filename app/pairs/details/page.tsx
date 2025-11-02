"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { useSearchParams } from "next/navigation";
import { MAX_DIGITS, PAIR_PARAM_NAME, UPDATE_INTERVAL } from "./constants";
import { getChartData, getChartOptions } from "./helpers";
import { type HistoricalKline, type PriceData } from "./types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

export default function Details() {
    const [priceData, setPriceData] = useState<PriceData[]>([]);
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [priceChange, setPriceChange] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "error">(
        "connecting",
    );

    const socketRef = useRef<WebSocket | null>(null);
    const initialPriceRef = useRef<number | null>(null);
    const priceDataRef = useRef<PriceData[]>([]);

    const searchParams = useSearchParams();
    const pair = useMemo(() => searchParams.get(PAIR_PARAM_NAME), [searchParams]);
    const pairRequestParam = useMemo(() => pair?.replace("-", "").toLowerCase(), [pair]);
    const pairName = useMemo(() => pair?.toUpperCase().replace("-", "/"), [pair]);

    // Function to handle new price updates
    const handleNewPrice = useCallback((price: number, timestamp: number) => {
        setCurrentPrice(price);

        setPriceData(prev => {
            const newData = [...prev, { timestamp, price }];

            // Limit the number of data points
            if (newData.length > MAX_DIGITS) {
                return newData.slice(-MAX_DIGITS);
            }
            return newData;
        });

        // Calculate price change relative to historical data
        if (initialPriceRef.current !== null) {
            const change = ((price - initialPriceRef.current) / initialPriceRef.current) * 100;
            setPriceChange(change);
        }
    }, []);

    // Function to fetch historical data
    const fetchHistoricalData = useCallback(async (symbol: string) => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=1m&limit=${MAX_DIGITS}`,
            );

            if (!response.ok) throw new Error("Failed to fetch historical data");

            const data: HistoricalKline[] = await response.json();
            const historicalData: PriceData[] = data.map(item => ({
                timestamp: item[0],
                price: parseFloat(item[4]),
            }));

            priceDataRef.current = historicalData;
            setPriceData(historicalData);

            if (historicalData.length > 0) {
                initialPriceRef.current = historicalData[0].price;
            }
        } catch (error) {
            console.error("Error fetching historical data:", error);
            setConnectionStatus("error");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const initializeWebSocketConnection = useCallback(
        async (symbol: string) => {
            await fetchHistoricalData(symbol);

            try {
                setConnectionStatus("connecting");
                socketRef.current = new WebSocket(
                    `wss://stream.binance.com:9443/ws/${symbol}@trade`,
                );

                let lastProcessedTime = 0;

                socketRef.current.onopen = () => {
                    setConnectionStatus("connected");
                };

                socketRef.current.onmessage = event => {
                    const now = Date.now();

                    // Skip messages if less than UPDATE_INTERVAL has passed
                    if (now - lastProcessedTime < UPDATE_INTERVAL) {
                        return;
                    }

                    lastProcessedTime = now;

                    try {
                        const data = JSON.parse(event.data);
                        const price = parseFloat(data.p);
                        const timestamp = data.T;
                        handleNewPrice(price, timestamp);
                    } catch (error) {
                        console.error("Error parsing WebSocket message:", error);
                    }
                };

                socketRef.current.onerror = error => {
                    console.error("WebSocket error:", error);
                    setConnectionStatus("error");
                };

                socketRef.current.onclose = event => {
                    if (event.code !== 1000) {
                        console.log("WebSocket closed unexpectedly:", event);
                        setConnectionStatus("error");
                    }
                };
            } catch (error) {
                console.error("Failed to create WebSocket:", error);
                setConnectionStatus("error");
            }
        },
        [fetchHistoricalData, handleNewPrice],
    );

    // Main WebSocket effect
    useEffect(() => {
        if (!pairRequestParam) return;

        initializeWebSocketConnection(pairRequestParam);

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [pairRequestParam, initializeWebSocketConnection]);

    const chartData = useMemo(
        () =>
            getChartData({
                pairName,
                priceChange,
                priceData,
            }),
        [priceData, pairName, priceChange],
    );

    if (!pair) {
        return null;
    }

    return (
        <div className='bg-card border border-default rounded-lg p-6'>
            {/* Header with connection status */}
            <div className='flex justify-between items-center mb-6'>
                <div>
                    <h2 className='text-xl font-semibold text-primary'>{pairName}</h2>
                    <p className='text-secondary text-sm'>Real-time {pairName} price</p>
                </div>
                <div className='text-right'>
                    <div className='flex items-center justify-end space-x-2 mb-2'>
                        <div
                            className={`w-2 h-2 rounded-full ${
                                connectionStatus === "connected"
                                    ? "bg-trade-buy"
                                    : connectionStatus === "error"
                                    ? "bg-trade-sell"
                                    : "bg-accent animate-pulse"
                            }`}
                        />
                        <span className='text-xs text-text-secondary'>
                            {connectionStatus === "connected"
                                ? "Live"
                                : connectionStatus === "error"
                                ? "Connection Error"
                                : "Connecting..."}
                        </span>
                    </div>
                    <div className='text-2xl font-bold text-primary'>
                        $
                        {currentPrice.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 8,
                        })}
                    </div>
                    <div
                        className={`text-sm font-medium ${
                            priceChange >= 0 ? "text-trade-buy" : "text-trade-sell"
                        }`}
                    >
                        {priceChange >= 0 ? "↗" : "↘"} {Math.abs(priceChange).toFixed(2)}%
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className='h-80'>
                {isLoading ? (
                    <div className='h-full flex items-center justify-center'>
                        <div className='text-center'>
                            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-2'></div>
                            <p className='text-secondary'>Loading historical data...</p>
                        </div>
                    </div>
                ) : priceData.length > 0 ? (
                    <Line data={chartData} options={getChartOptions()} redraw={false} />
                ) : (
                    <div className='h-full flex items-center justify-center'>
                        <p className='text-secondary'>No data available</p>
                    </div>
                )}
            </div>

            {/* Statistics */}
            <div className='grid grid-cols-3 gap-4 mt-6'>
                <div className='text-center'>
                    <div className='text-secondary text-sm'>24H High</div>
                    <div className='text-primary font-medium'>
                        $
                        {Math.max(...priceData.map(d => d.price)).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 8,
                        })}
                    </div>
                </div>
                <div className='text-center'>
                    <div className='text-secondary text-sm'>24H Low</div>
                    <div className='text-primary font-medium'>
                        $
                        {Math.min(...priceData.map(d => d.price)).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 8,
                        })}
                    </div>
                </div>
                <div className='text-center'>
                    <div className='text-secondary text-sm'>Data Points</div>
                    <div className='text-primary font-medium'>{priceData.length}</div>
                </div>
            </div>
        </div>
    );
}
