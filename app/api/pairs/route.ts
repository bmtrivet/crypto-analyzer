import { getImageMap, getPairsWithCoinsName, sortPairsBy24hVolume } from "./helpers";
import { PairData, CoinGeckoCoin, OkxTickerResponse } from "./types";

export async function GET() {
    const okxRes = await fetch("https://www.okx.com/api/v5/market/tickers?instType=SPOT");
    const okxData: OkxTickerResponse = await okxRes.json();

    const pairs = getPairsWithCoinsName(okxData.data);

    const cgRes = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    const cgData: CoinGeckoCoin[] = await cgRes.json();

    const imageMap: Map<string, string> = getImageMap(cgData);

    const result: Array<PairData> = pairs
        .map(pair => {
            return {
                ...pair,
                imageUrl: imageMap.get(pair.mainCoinName.toLowerCase()) ?? "",
            };
        })
        .filter(pair => pair.imageUrl);

    return Response.json(sortPairsBy24hVolume(result));
}
