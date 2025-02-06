import { useState } from "react";
import TabButton from "./TabButton";
import TabAbout from "./TabAbout";
import TabStats from "./TabStats";
import TabAbilities from "./TabAbilities";
import TabEvolutions from "./TabEvolutions";

export default function PokeInfo({pokemon, searchPokemon}){
    const [activeTab, setActiveTab] = useState('about')
    function activateTab(name){
        setActiveTab(name)
    }    

    const tab = {
        about: <TabAbout stats={pokemon.about} />,
        stats: <TabStats stats={pokemon.stats} />,
        abilities: <TabAbilities stats={pokemon.abilities} />,
        evolutions: <TabEvolutions stats={pokemon.evolutions} name={pokemon.about.name} searchPokemon={searchPokemon} />
    }

    return (
        <div className="gap-4 flex flex-col">
            <div className="flex max-w-[1002px] m-auto gap-8 w-full">
                <TabButton isActive={activeTab == 'about'} activateTab={() => activateTab('about')}>About</TabButton>
                <TabButton isActive={activeTab == 'stats'} activateTab={() => activateTab('stats')}>Stats</TabButton>
                <TabButton isActive={activeTab == 'abilities'} activateTab={() => activateTab('abilities')}>Abilities</TabButton>
                {
                    pokemon.evolutions.length > 1 &&
                    <TabButton isActive={activeTab == 'evolutions'} activateTab={() => activateTab('evolutions')}>Evolutions</TabButton>
                }
            </div>
            <div className="text-white">
                {tab[activeTab]}
            </div>
        </div>
    )
}