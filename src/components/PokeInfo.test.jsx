import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import user from '@testing-library/user-event'
import "@testing-library/jest-dom";
import PokeInfo from "./PokeInfo";

const fakePokemon = {
    about:{
        id: 1,
        name: 'PokeTest',
        img: 'img PokeTest',
        type: ['PokeTest'],
        weight: 666,
        height:666
      },
      stats: {
        hp: 666,
        attack:666,
        defense:666,
        speed:666,
      },
      abilities:['Teste'],
      evolutions: ['Teste'],
}

it('Should not render Evolution Tab if the pokemon has no evolution', async () => {

    render(<PokeInfo pokemon={fakePokemon} />)
    
    const tab = screen.queryByRole('button', {name: /evolutions/i})

    expect(tab).not.toBeInTheDocument()
})

it('Should click o a tab and disable it, and the rest remains the same', async () => {
    fakePokemon.evolutions = ['teste', '2']
    render(<PokeInfo pokemon={fakePokemon} />)

    const buttons = await screen.findAllByRole('button')

    for(const button of buttons){
        await user.click(button)
        buttons.forEach(bt => {
            if(bt == button){
                expect(bt).toHaveAttribute('disabled')
            } else {
                expect(bt).not.toHaveAttribute('disabled')
            }
        })
    }
})
it('Should show about content when click on about', async () => {
    render(<PokeInfo pokemon={fakePokemon} />)
    const aboutButton = await screen.findByRole('button', {name:/about/i})
    const statsButton = await screen.findByRole('button', {name:/stats/i})

    await user.click(statsButton)
    await user.click(aboutButton)

    const type = await screen.findByText(/type:/i)
    
    expect(type).toBeInTheDocument()
}) 
it('Should show stats content when click on stats', async () => {
    render(<PokeInfo pokemon={fakePokemon} />)
    const statsButton = await screen.findByRole('button', {name:/stats/i})

    await user.click(statsButton)

    const result = await screen.findByText(/hp:/i)

    expect(result).toBeInTheDocument()
}) 
it('Should show abilities content when click on abilities', async () => {
    render(<PokeInfo pokemon={fakePokemon} />)
    const button = await screen.findByRole('button', {name:/abilities/i})

    await user.click(button)

    const result = await screen.findByText(/teste/i)

    expect(result).toBeInTheDocument()
}) 
it('Should show evolutions content when click on evolutions', async () => {
    render(<PokeInfo pokemon={fakePokemon} />)
    const button = await screen.findByRole('button', {name:/evolutions/i})

    await user.click(button)

    const result = await screen.findByText(/teste/i)

    expect(result).toBeInTheDocument()
}) 
