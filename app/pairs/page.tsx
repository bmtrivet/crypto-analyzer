import { GET as getPairs } from "@/app/api/pairs/route";
import { PairList } from "./PairList";

const PairsPage = async () => {
    const res = await getPairs();
    const pairs = await res.json();

    return <PairList pairs={pairs} />;
};

export default PairsPage;
