export async function GET() {
    const res = await fetch("https://www.okx.com/api/v5/public/instruments?instType=SPOT");
    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const coins = data.data.map((i: any) => i.baseCcy);
    const uniqueCoins = [...new Set(coins)];

    return Response.json(uniqueCoins);
}
