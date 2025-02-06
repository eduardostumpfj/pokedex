export default function TabAbilities({stats}){
    return(
        <div className="w-full max-w-[1002px] m-auto grid gap-4">
            {
                stats.map(item =>             
                    <div key={item} className="w-full flex justify-between bg-black/50 py-4 px-8 rounded-full text-xl">
                        <p className="font-black uppercase">{item}</p>
                    </div> 
                )
            }
        </div>
    )
}