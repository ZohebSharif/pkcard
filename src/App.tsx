import React, { useState } from 'react';
// @ts-ignore
import pokemon from 'pokemontcgsdk';
import './index.css'
import PokeballImg from './imgs/pokeballImage.png';
import Home from './imgs/home.png';
import Collection from './imgs/collection.png';
import Market from './imgs/market.png';
import Grader from './imgs/grader.png';
function App() {
  const [cards, setCards] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

 function searchCard(pokemonName: string) {
    setIsLoading(true);
    setError('');
    pokemon.configure({apiKey: process.env.REACT_APP_POKEMON_API_KEY || ''});
    

    
    return pokemon.card.all({q: `name:${pokemonName}*`})  
    .then((result: any) => {        
      const cardsArray = result.data || result || [];
      
      setCards(cardsArray); 
      setIsLoading(false);
    })
    .catch((error: any) => {  
      setCards([]);
      setError('Failed to fetch cards. Please try again.');
      setIsLoading(false);
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    if (searchTerm.trim()) {
      searchCard(searchTerm);
      setSearchTerm(''); 
    }
  }
  
  return (
    <>
    <div className="App">
    <div className="w-full h-[8vw] bg-blue-400 rounded-b-md shadow-md flex items-center justify-between px-10 fixed z-20">
      <img src={PokeballImg} alt="Pokeball" className="w-16 h-16"></img>
      <img src={Home} alt="Home" className="w-20 h-10 hover:scale-110 transition-transform duration-200 cursor-pointer" />
      <img src={Collection} alt="Collection" className="w-30 h-10 hover:scale-110 transition-transform duration-200 cursor-pointer" />
      <img src={Market} alt="Market" className="w-25 h-10 hover:scale-110 transition-transform duration-200 cursor-pointer" />
      <img src={Grader} alt="Grader" className="w-30 h-11 hover:scale-110 transition-transform duration-200 cursor-pointer" />
      <form onSubmit={handleSubmit} className="flex items-center">
        <input 
          type="search" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for Pokemon cards..."
          className="w-80 px-4 py-3 rounded-lg border border-gray-300 shadow-sm 
                   bg-white text-gray-900 placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent
                   hover:shadow-md hover:border-gray-400
                   transition-all duration-200 ease-in-out
                   active:scale-95 active:shadow-inner"
        />
      </form>
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-40 pl-40 pr-40 transition-transform">
        {isLoading && <p>Loading cards...</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}
        {cards.length > 0 && (
          cards.map((card: any) => (
            <img 
              className= "w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 z-10"
              key={card.id} 
              src={card.images.large} 
              alt={card.name}
              
            />
          ))
        )}
        {!isLoading && !error && cards.length === 0 && (
            <></>
        )}
      </div>
    </div>
    </>
  );
}

export default App;
