import { useState } from "react"
import { test } from "vitest"

export default function PokemonInput({ searchPokemon }){
    const [inputName, setInputName] = useState('')

    function handleClick(){
        const name  = inputName
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/[^a-zA-Z0-9 ]/g, "")
                        .trim()
                        .replace(/\s+/g, "-")
                        .toLowerCase();
        setInputName('')
        searchPokemon(name)
    }

    return(
        <div className="flex items-end gap-4">
            <div className="flex flex-col items-start gap-2">
                <label htmlFor="pokemon">Find Pokemon</label>
                <input 
                    className="bg-black/50 h-[50px] px-4 rounded-md min-w-[300px]"
                    id="pokemon" 
                    type="text" 
                    value={inputName}
                    onInput={(e) => setInputName(e.target.value)}
                    placeholder="Type a pokemon name or id"/>
            </div>
            <button 
                disabled={ inputName == '' } 
                onClick={handleClick} 
                className="bg-red-500 w-[50px] cursor-pointer aspect-square rounded-md grid place-content-center hover:bg-red-600 disabled:opacity-50 disabled:cursor-auto"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="2"/>
                    <path d="M10 10L13 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
        </div>
        
    )
}