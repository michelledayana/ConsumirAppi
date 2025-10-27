const container = document.getElementById('pokemonContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Mostrar Pokémon iniciales específicos como en la imagen
window.addEventListener('DOMContentLoaded', () => loadInitialPokemons());

// Pokémon iniciales específicos de la imagen
async function loadInitialPokemons() {
  container.innerHTML = '';
  
  // Los Pokémon específicos de la imagen
  const initialPokemons = [
    { name: 'bulbasaur', displayName: 'Bulbasaur' },
    { name: 'ivysaur', displayName: 'Ivysaur' },
    { name: 'venusaur', displayName: 'Venusaur' },
    { name: 'charmander', displayName: 'Charmander' }
  ];
  
  for (const pokemon of initialPokemons) {
    await getPokemon(pokemon.name, pokemon.displayName);
  }
}

async function getPokemon(idOrName, displayName = null) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
    if (!res.ok) throw new Error("Pokémon no encontrado");
    const pokemon = await res.json();

    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    
    // Usar el nombre de display si se proporciona, sino capitalizar el nombre de la API
    const finalDisplayName = displayName || pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
    card.innerHTML = `
      <h2>${finalDisplayName}</h2>
      <ul>
        ${pokemon.types.map(type => `<li>${formatTypeName(type.type.name)}</li>`).join('')}
      </ul>
    `;
    container.appendChild(card);
  } catch (err) {
    container.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

// Formatear nombres de tipos según la imagen
function formatTypeName(typeName) {
  const typeMap = {
    'grass': 'Planta',
    'poison': 'Veneno', 
    'fire': 'Fuego'
  };
  
  return typeMap[typeName] || typeName.charAt(0).toUpperCase() + typeName.slice(1);
}

// Buscar Pokémon
searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.toLowerCase().trim();
  if (!query) return;

  container.innerHTML = '';
  await getPokemon(query);
  await saveSearch(query);
});

async function saveSearch(query) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return;

  try {
    await fetch('http://backend:3000/api/searches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id || 1, // usar el ID del usuario logueado
        query
      })
    });
  } catch (err) {
    console.error("Error guardando búsqueda:", err);
  }
}