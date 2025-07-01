import React, { useState } from 'react';
import "./App.css"
// @ts-ignore
import pokemon from 'pokemontcgsdk';

function App() {

  /*ts line creates a variable called pokemonName and a function to set the value, we have the 
  useState to automatically rerender the value when its changes from "loading"  */
  const [pokemonName, setPokemonName] = useState('Loading...');
  function searchCard(){
    pokemon.configure({apiKey: process.env.REACT_APP_POKEMON_API_KEY || ''});
    pokemon.card.find
  }
  function getCard(){
    pokemon.configure({apiKey: process.env.REACT_APP_POKEMON_API_KEY || ''});
    
    pokemon.card.find(pokemonName)
    .then((card: any) => {
        console.log(card.large);
        setPokemonName(card.images.large); 
    })
    .catch((error: any) => {
        console.error('Error fetching card:', error);
        setPokemonName('Error loading card');
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    searchCard();
  }
  
  React.useEffect(() => {
    getCard();
  }, []);

  return (
    <>
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input className="SearchBar" type="search" />
      </form>
      <img src={pokemonName} />
    </div>
    </>
  );
}

export default App;
