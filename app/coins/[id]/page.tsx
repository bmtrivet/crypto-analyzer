import { CoinPageProps } from "./types";

const CoinPage = async (props: CoinPageProps) => {
    const { id } = await props.params;

    return <div>Coins: {id}</div>;
};

export default CoinPage;
