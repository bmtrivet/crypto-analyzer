import { CoinGeckoCoin, OkxTicker, PairData } from "./types";

export const sortPairsBy24hVolume = (pairs: Array<PairData>) => {
    return pairs.sort((pairA, pairB) => {
        const volume24hA = +pairA.volCcy24h;
        const volume24hB = +pairB.volCcy24h;

        return volume24hB - volume24hA;
    });
};

export const getPairsWithCoinsName = (pairs: Array<OkxTicker>) => {
    return pairs.map(pair => {
        const splittedInstId = pair.instId.split("-");

        const mainCoinName = splittedInstId[0];
        const relativeCoinName = splittedInstId[1];

        return {
            mainCoinName,
            relativeCoinName,
            ...pair,
        };
    });
};

export const getImageMap = (cgData: CoinGeckoCoin[]) => {
    return cgData.reduce((map, coin) => {
        const key = coin.symbol.toLowerCase();
        if (!map.has(key)) {
            map.set(key, coin.image);
        }

        return map;
    }, new Map<string, string>());
};
