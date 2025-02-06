import { render, screen } from "@testing-library/react";
import { it, expect, vi, afterEach } from "vitest";
import user from '@testing-library/user-event'
import PokemonInput from "./PokemonInput";

const test = {
  fakeSearch(params){}
}

afterEach(() => {
  vi.restoreAllMocks()
})

it('Should not be abble to click on the button if the input is empty', async () => {
  const spy = vi.spyOn(test, 'fakeSearch')

  render(<PokemonInput searchPokemon={spy}/>)
  const button = screen.getByRole('button')
  const input = screen.getByRole('textbox')
  
  await user.click(button)
  expect(spy).not.toHaveBeenCalled()
  
  await user.type(input, 'test')
  await user.clear(input)
  await user.click(button)

  expect(spy).not.toHaveBeenCalled()
})

it('Should clean the input after the button is pressed', async () => {
  const spy = vi.spyOn(test, 'fakeSearch')
  render(<PokemonInput searchPokemon={spy}/>)

  const button = screen.getByRole('button')
  const input = screen.getByRole('textbox')

  await user.type(input, 'test')
  await user.click(button)

  expect(input.value).toBe('')
})

it('Should format the input', async () => {
  const spy = vi.spyOn(test, 'fakeSearch')
  render(<PokemonInput searchPokemon={spy}/>)

  const button = screen.getByRole('button')
  const input = screen.getByRole('textbox')

  await user.type(input, 'Pokemão Muriçok@')
  await user.click(button)

  expect(spy).toHaveBeenCalledWith('pokemao-muricok')
})