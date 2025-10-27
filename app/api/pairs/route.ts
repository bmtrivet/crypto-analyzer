import { PairData, CoinGeckoCoin, OkxTickerResponse } from "./types";

export async function GET() {
    const okxRes = await fetch("https://www.okx.com/api/v5/market/tickers?instType=SPOT");
    const okxData: OkxTickerResponse = await okxRes.json();

    const pairs = okxData.data;

    const pairsMap = pairs.map(pair => {
        const splittedInstId = pair.instId.split("-");

        const mainCoinName = splittedInstId[0];
        const relativeCoinName = splittedInstId[1];

        return {
            mainCoinName,
            relativeCoinName,
            ...pair,
        };
    });

    const cgRes = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    const cgData: CoinGeckoCoin[] = await cgRes.json();

    const imageMap: Map<string, string> = cgData.reduce((map, coin) => {
        const key = coin.symbol.toLowerCase();
        if (!map.has(key)) {
            map.set(key, coin.image);
        }

        return map;
    }, new Map<string, string>());

    const result: Array<PairData> = pairsMap
        .map(pair => {
            return {
                ...pair,
                imageUrl: imageMap.get(pair.mainCoinName.toLowerCase()) ?? "",
            };
        })
        .filter(pair => pair.imageUrl)
        .sort((pairA, pairB) => {
            const volumeA = +pairA.volCcy24h;
            const volumeB = +pairB.volCcy24h;

            return volumeB - volumeA;
        });

    return Response.json(result);
}
