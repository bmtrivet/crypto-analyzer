import { MAX_TICKS } from "./constants";
import { type PriceData } from "./types";

export const getChartOptions = () => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        animation: false as const,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: "index" as const,
                intersect: false,
                backgroundColor: "#1E2329",
                titleColor: "#EAECEF",
                bodyColor: "#EAECEF",
                borderColor: "#2B3139",
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                display: true,
                grid: {
                    color: "rgba(43, 49, 57, 0.5)",
                },
                ticks: {
                    color: "#808A9D",
                    maxTicksLimit: MAX_TICKS,
                },
            },
            y: {
                display: true,
                grid: {
                    color: "rgba(43, 49, 57, 0.5)",
                },
                ticks: {
                    color: "#808A9D",
                    callback: function (value: string | number) {
                        if (typeof value === "number") {
                            return (
                                "$" +
                                value.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 8,
                                })
                            );
                        }
                        return value;
                    },
                },
            },
        },
        interaction: {
            mode: "nearest" as const,
            axis: "x" as const,
            intersect: false,
        },
        transitions: {
            active: {
                animation: {
                    duration: 0,
                },
            },
        },
    };
};

export const getChartData = ({
    priceData,
    pairName,
    priceChange,
}: {
    priceData: Array<PriceData>;
    pairName?: string;
    priceChange: number;
}) => {
    const labels = priceData.map((_, index) => {
        if (index === 0 || index === priceData.length - 1 || index % 20 === 0) {
            return new Date(priceData[index]?.timestamp).toLocaleTimeString();
        }
        return "";
    });

    return {
        labels,
        datasets: [
            {
                label: pairName ?? "",
                data: priceData.map(data => data.price),
                borderColor: priceChange >= 0 ? "#02C076" : "#F84960",
                backgroundColor:
                    priceChange >= 0 ? "rgba(2, 192, 118, 0.1)" : "rgba(248, 73, 96, 0.1)",
                borderWidth: 2,
                fill: true,
                pointRadius: 1,
                pointHoverRadius: 4,
                pointBackgroundColor: priceChange >= 0 ? "#02C076" : "#F84960",
            },
        ],
    };
};
