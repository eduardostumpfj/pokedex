export default function TabStats({stats}){
    return (
        <div className="w-full max-w-[1002px] m-auto grid gap-4">
            <div className="w-full flex justify-between bg-black/50 py-4 px-8 rounded-full text-xl">
                <h3 className="capitalize text-red-500">hp:</h3>
                <p className="font-black uppercase">{stats.hp}</p>
            </div>
            <div className="w-full flex justify-between bg-black/50 py-4 px-8 rounded-full text-xl">
                <h3 className="capitalize text-red-500">attack:</h3>
                <p className="font-black uppercase">{stats.attack}</p>
            </div>
            <div className="w-full flex justify-between bg-black/50 py-4 px-8 rounded-full text-xl">
                <h3 className="capitalize text-red-500">defense:</h3>
                <p className="font-black uppercase">{stats.defense}</p>
            </div>
            <div className="w-full flex justify-between bg-black/50 py-4 px-8 rounded-full text-xl">
                <h3 className="capitalize text-red-500">speed:</h3>
                <p className="font-black uppercase">{stats.speed}</p>
            </div>
        </div>
    )
}