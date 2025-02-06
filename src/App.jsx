import { useState } from 'react'
import './App.css'
import PokemonInput from './components/PokemonInput'
import PokeInfo from './components/PokeInfo'
import Message from './components/Message'

function App() {
  const [ isLoading, setIsLoading] = useState(false)
  const [ pokemon, setPokemon ] = useState(null)
  const [isError, setIsError] = useState(null)

  async function searchPokemon(value){
    setIsError(null)
    setIsLoading(true)
    setPokemon(null)
    try {
      // get Pokemon
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
      const data = await resp.json()
      //console.log(data)

      // get species
      const respEsp = await fetch(`${data.species.url}`)
      const dataEsp = await respEsp.json()

      // get Evlution
      const respEvo = await fetch(`${dataEsp.evolution_chain.url}`)
      const dataEvo = await respEvo.json()

      const pkm = {
        about:{
          id: data.id,
          name: data.name,
          img: data.sprites.other['official-artwork'].front_default,
          type: [],
          weight: data.weight,
          height:data.height
        },
        stats: {
          hp: data.stats[0].base_stat,
          attack:data.stats[1].base_stat,
          defense:data.stats[2].base_stat,
          speed:data.stats[5].base_stat,
        },
        abilities:[],
        evolutions: [],
      } 
      // set the abilities
      data.abilities.forEach(ab => pkm.abilities.push(ab.ability.name))

      // set the types
      data.types.forEach(type => pkm.about.type.push(type.type.name))

      // set the evolutions
      let current = dataEvo.chain
      while(current){
        pkm.evolutions.push(current.species.name)
        if(current.evolves_to.length > 0 && current.evolves_to.length < 2){
          current = current.evolves_to[0]
        } else if(current.evolves_to.length > 2){
          current.evolves_to.forEach(p => pkm.evolutions.push(p.species.name))
          current = null
        } else {
          current = null
        }
      }
      setPokemon(pkm)
    } catch (error) {
      console.log(error)
      setIsError(value)
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <section className={`w-[100vw] h-[100vh] ${ pokemon && !isLoading ? 'grid-rows-[max-content_1fr]':'' } grid gap-8`}>
      <div className={`flex w-full ${pokemon || isLoading ? 'max-w-[1002px] justify-between items-end m-auto mt-6 border-b-[1px] border-white/20 pb-4': 'm-auto gap-16 flex-col items-center'}`}>
        <h1 className={`font-bold ${ pokemon || isLoading ? 'text-4xl':'text-8xl' }`}>POKEDEX</h1>
        <PokemonInput searchPokemon={searchPokemon} />
      </div>
      { pokemon && !isLoading
        ? <div className='flex flex-col item-center gap-4'>
            <h2 className='text-2xl capitalize font-bold text-white'>{pokemon.about.name}</h2>
            <img className='w-[300px] mx-auto' src={pokemon.about.img} />
            <PokeInfo pokemon={pokemon} searchPokemon={searchPokemon} />
          </div>
        : null
      }
      {
        isLoading && <Message>Loading...</Message> 
      }
      {
        isError && <Message><span className='text-red-500'>{isError}</span> was not found!!</Message>
      }
    </section>
  )
}

export default App
