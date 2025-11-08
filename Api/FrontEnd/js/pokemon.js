const container = document.getElementById('pokemonContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Mostrar Pokémon iniciales
window.addEventListener('DOMContentLoaded', () => loadInitialPokemons());

// Pokémon iniciales específicos
async function loadInitialPokemons() {
  container.innerHTML = '';

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

// Obtener Pokémon e insertar tarjeta
async function getPokemon(idOrName, displayName = null) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
    if (!res.ok) throw new Error("Pokémon no encontrado");
    const pokemon = await res.json();

    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const finalDisplayName =
      displayName ||
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    // Imagen oficial o placeholder
    const imageUrl =
      pokemon.sprites.other["official-artwork"].front_default ||
      pokemon.sprites.front_default ||
      "https://via.placeholder.com/150?text=Sin+Imagen";

    // Construcción de la tarjeta con imagen
    card.innerHTML = `
      <img src="${imageUrl}" alt="${finalDisplayName}" class="pokemon-image floating">
      <h2>${finalDisplayName}</h2>
      <ul class="pokemon-types">
        ${pokemon.types
          .map(
            (type) =>
              `<li class="type-${type.type.name}">${formatTypeName(
                type.type.name
              )}</li>`
          )
          .join("")}
      </ul>
    `;
    container.appendChild(card);
  } catch (err) {
    container.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

// Traducir tipos al español
function formatTypeName(typeName) {
  const typeMap = {
    grass: "Planta",
    poison: "Veneno",
    fire: "Fuego",
    water: "Agua",
    electric: "Eléctrico",
    psychic: "Psíquico",
    ground: "Tierra",
    rock: "Roca",
    ice: "Hielo",
    bug: "Bicho",
    dragon: "Dragón",
    ghost: "Fantasma",
    dark: "Siniestro",
    steel: "Acero",
    fairy: "Hada",
    fighting: "Lucha",
    flying: "Volador",
    normal: "Normal",
  };

  return (
    typeMap[typeName] ||
    typeName.charAt(0).toUpperCase() + typeName.slice(1)
  );
}

// Buscar Pokémon
searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.toLowerCase().trim();
  if (!query) return;

  container.innerHTML = "";
  await getPokemon(query);
  await saveSearch(query);
});

// Guardar búsqueda en tu API
async function saveSearch(query) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  try {
    await fetch("https://apipokemon-ug9f.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id || 1,
        query,
      }),
    });
  } catch (err) {
    console.error("Error guardando búsqueda:", err);
  }
}
