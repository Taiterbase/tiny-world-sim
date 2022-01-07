type StatsType = {
    data: number | string,
    label: string,
}

// StatCard produces a card (everyone loves cards) for displaying simple statistics
const StatCard = (props: StatsType) => {
    const { data, label } = props;
    return (<div className="flex place-items-center flex-col rounded-md p-2 bg-slate-100">
        <p className="text-slate-800 text-3xl">
            {data}
        </p>
        <p className="text-slate-700 text-xs">
            {label}
        </p>
    </div>)
}

export default StatCard;