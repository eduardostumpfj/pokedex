export default function TabAbout({stats}){
    return(
        <div className="w-full max-w-[1002px] m-auto grid gap-4">
            <div className="w-full flex justify-between bg-black/50 py-4 px-8 rounded-full text-xl">
                <h3 className="capitalize text-red-500">type:</h3>
                <p className="font-black uppercase">
                    {
                        stats.type.map( (type, index) => {
                            if(index == stats.type.length - 1 ){
                                return `${type}`
                            } else {
                                return `${type} / `
                            }
                        })
                    }
                </p>
            </div>
            <div className="w-full flex justify-between bg-black/50 py-4 px-8 rounded-full text-xl">
                <h3 className="capitalize text-red-500">weight:</h3>
                <p className="font-black uppercase">{stats.weight}</p>
            </div>
            <div className="w-full flex justify-between bg-black/50 py-4 px-8 rounded-full text-xl">
                <h3 className="capitalize text-red-500">height:</h3>
                <p className="font-black uppercase">{stats.height}</p>
            </div>
        </div>
    )
}