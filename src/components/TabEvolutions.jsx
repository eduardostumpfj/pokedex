export default function TabEvolutions({stats, name, searchPokemon}){
    function handleClick(name){
        searchPokemon(name)
    }
    
    return(
        <div className={`w-full max-w-[1002px] m-auto grid gap-4 ${stats.length > 4 && 'overflow-y-scroll max-h-[330px]'}`}>
            {
                stats.map(item => 
                    <button key={item} disabled={name == item} onClick={() => handleClick(item)} className={` cursor-pointer w-full flex justify-between bg-black/50 py-4 px-8 rounded-full text-xl ${name == item && 'border-[1px] border-red-500'} `}>
                        <p className={`font-black uppercase relative
                                        ${name == item 
                                        ?  'text-red-500'
                                        : 'pl-[30px] after:absolute after:bg-red-500 after:w-[20px] after:aspect-square after:rounded-full after:left-0 after:top-[50%] after:translate-y-[-50%]'}`}
                        >{item}</p>
                    </button>
                )
            }       
        </div>
    )
}