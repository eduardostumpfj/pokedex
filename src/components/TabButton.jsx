export default function TabButton({ children, activateTab, isActive }){
    return (
        <button
            disabled={isActive}
            className={`rounded-full w-full py-2 ${isActive ? 'bg-black/50 border-[1px] border-red-500 text-red-500 cursor-default' : 'bg-red-500 cursor-pointer hover:bg-red-600 ' }`} 
            onClick={ activateTab }
        >
            {children}
        </button>
    )
}