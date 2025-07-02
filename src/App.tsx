import React, { useState } from 'react';
import "./App.css"
// @ts-ignore
import pokemon from 'pokemontcgsdk';

function App() {
  const [cards, setCards] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

 function searchCard(pokemonName: string) {
    console.log('Starting search for:', pokemonName);
    setIsLoading(true);
    setError('');
    pokemon.configure({apiKey: process.env.REACT_APP_POKEMON_API_KEY || ''});
    
    console.log('API Key:', process.env.REACT_APP_POKEMON_API_KEY ? 'Present' : 'Missing');
    console.log('Query string:', `name:${pokemonName}*`);
    
    return pokemon.card.all({q: `name:"${pokemonName}"`})  // Try exact name search first
    .then((result: any) => {  
        console.log('API result:', result); // Debug: log the full result
      console.log('Result data:', result.data); // Debug: log the data array
      console.log('Data length:', result.data?.length); // Debug: log array length
      
      if (result.data && result.data.length > 0) {
        console.log('First card:', result.data[0]);
        console.log('First card images:', result.data[0].images);
      }
      
      setCards(result.data || []); // Ensure we set an array even if result.data is undefined
      setIsLoading(false);
      console.log('Loading set to false, cards set');
    })
    .catch((error: any) => {  
      console.error('Error fetching cards:', error);
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
      <form onSubmit={handleSubmit}>
        <input 
          className="SearchBar" 
          type="search" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for Pokemon cards..."
        />
      </form>
      <div className="cards-grid">
        {isLoading && <p>Loading cards...</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}
        {!isLoading && !error && cards && cards.length > 0 ? (
          cards.map((card: any) => (
            <img 
              key={card.id} 
              src={card.images.large} 
              alt={card.name}
            />
          ))
        ) : (
          !isLoading && !error && <p>Search for Pokemon cards above! Try "pikachu" or "charizard"</p>
        )}
      </div>
    </div>
    </>
  );
}

export default App;
