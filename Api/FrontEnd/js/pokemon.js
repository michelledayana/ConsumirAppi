const container = document.getElementById('pokemonContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Mostrar algunos Pokémon iniciales
window.addEventListener('DOMContentLoaded', () => loadPokemons());

async function loadPokemons(limit = 6) {
  container.innerHTML = '';
  for (let i = 1; i <= limit; i++) {
    await getPokemon(i);
  }
}

async function getPokemon(idOrName) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
    if (!res.ok) throw new Error("Pokémon no encontrado");
    const pokemon = await res.json();

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <h3>${pokemon.name.toUpperCase()}</h3>
      <p>Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
    `;
    container.appendChild(card);
  } catch (err) {
    container.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
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
        user_id: 1, // puedes ajustar según el usuario logueado
        query
      })
    });
  } catch (err) {
    console.error("Error guardando búsqueda:", err);
  }
}
