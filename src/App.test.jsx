import { afterAll, afterEach, beforeAll, describe, expect, it, waitFor } from "vitest";
import { http, HttpResponse } from 'msw'
import {setupServer} from 'msw/node'
import App from "./App";
import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";

const pkmSucc = {
    id: "1234",
    name: "pkmtest",
    weight: 22,
    height: 22,
    species: { url: "https://pokeapi.co/api/v2/pokemon-species/1234/" },  // ✅ Add species URL
    sprites: { 
        other: { "official-artwork": { front_default: "test-url.png" } } 
    },
    types: [{ type: { name: "batata" } }],
    stats: [
        { base_stat: 99, stat: { name: "hp" } },
        { base_stat: 99, stat: { name: "attack" } },
        { base_stat: 99, stat: { name: "defense" } },
        { base_stat: 99, stat: { name: "defense" } },
        { base_stat: 99, stat: { name: "defense" } },
        { base_stat: 99, stat: { name: "speed" } }
    ],
    abilities: [{ability:{name:'ab1'}}, {ability:{name:'ab2'}}]
}

const handlers = [
    http.get("https://pokeapi.co/api/v2/pokemon/:id", () => {      
        return HttpResponse.json(pkmSucc)
    }),
        // Mocking the second request for species
        http.get("https://pokeapi.co/api/v2/pokemon-species/1234/", () => {
            return HttpResponse.json({
                evolution_chain: { url: "https://pokeapi.co/api/v2/evolution-chain/1234/" }
            });
        }),
    
        // Mocking the third request for evolution chain
        http.get("https://pokeapi.co/api/v2/evolution-chain/1234/", () => {
            return HttpResponse.json({
                chain: {
                    species: { name: 'pkm-test' },
                    evolves_to: []
                }
            });
        })
]

const server = setupServer(...handlers)

beforeAll(() => {
    server.listen()
})
afterEach(() => {
    server.resetHandlers()
})
afterAll(() => {
    server.close()
})
describe('Successfull response', () => {
    beforeAll(() => {
        server.use(
            http.get("https://pokeapi.co/api/v2/pokemon/:id", () => {      
                return HttpResponse.json(pkmSucc)
            })
        )
    })
    
   it("Should display Pokémon data after Search", async () => {
       render(<App />);
       const input = screen.getByRole("textbox");    
   
       await user.type(input, "1234");
       const button = await screen.findByRole("button");
       
       await user.click(button)
   
       const name = await screen.findByText(/pkmtest/i)
      
       expect(name).toBeInTheDocument()
   });

})

describe('No data returned', () => {
    beforeAll(() => {
        server.use(
          http.get("https://pokeapi.co/api/v2/pokemon/:id", (req, res, ctx) => {
            return res(
              ctx.status(404), // Simulate not found error
              ctx.json({ message: 'Not Found' })
            );
          })
        );
    });

    it('Should display not found text if the pokemon is not found', async () => {
        render(<App />)
        const input = screen.getByRole("textbox");    
        await user.type(input, "1234dasdas");
        
        const button = screen.getByRole("button");   
        await user.click(button)
    
        const not = screen.queryByText(/not found/i)
       
        expect(not).toBeInTheDocument()
    })
})