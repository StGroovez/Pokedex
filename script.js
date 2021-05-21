// HTML Elements
const searchInputWrapper = document.getElementById('searchInputWrapper')
const searchInput = document.getElementById('searchInput');
const pokemonSearch = document.getElementById("pokemonSearch");
const pokemonText = document.getElementById('pokemonText');
const pokemonPhoto = document.getElementById('pokemonPhoto');
const searchButton = document.getElementById('searchButton');

// POKEDEX INDEX VARIABLE!!!!!!!!!!

let pokemon = [];
for (let index = 1; index < 152; index++) {
    let contador = index
    pokemon[index] = document.getElementById("pokemon" + index)
    pokemon[index].addEventListener('click', () =>{
        getPokemon(contador);
    });
};

// HTML Search Buttons

pokemonSearch.addEventListener('click', () =>{
    searchInputWrapper.style.display = 'flex';
    searchInputWrapper.style.flexDirection = 'column';
    searchInputWrapper.style.justifyContent = 'center';
    searchInputWrapper.style.alignItems = 'center';
    searchInputWrapper.style.justifyContent = 'space-around';
});

searchButton.addEventListener('click', () => {
    getPokemon(searchInput.value)
    searchInputWrapper.style.display = 'none';
});

// Bonus Functions

function convertionM(data){
    return data/10;
};

function convertionG(data){
    return data/10;
};

// Main Functions

// Get POKEMON
function getPokemon(id){
    fetch('https://pokeapi.co/api/v2/pokemon/' + id)
        .then((poke1) => (poke1.json()))
        .then((poke) => {
            console.log(poke)
            const Bulbasaur = {
                name: poke.name.toUpperCase(),
                id: poke.id,
                height: convertionM(poke.height) + ' m.',
                weight: convertionG(poke.weight) + ' kg.',
                type: '',
                abilities: '',
                sprite: poke.sprites.front_default,
                moves: ''
            };
            poke.types.forEach((type) => {
                Bulbasaur.type = Bulbasaur.type + type.type.name + '. '
            })
            poke.abilities.forEach((abilities) => {
                Bulbasaur.abilities = Bulbasaur.abilities + abilities.ability.name + '. '
            })
            for (let i = 0; i < poke.moves.length; i++) {
                Bulbasaur.moves = Bulbasaur.moves + poke.moves[i].move.name + '. '
                if(i === 12){
                    break;
                }
            }

            console.log(Bulbasaur)
            printPokemonInfo(Bulbasaur);
            printPokemonPhoto(Bulbasaur);
        });
}

// Get POKEMON INFO

function printPokemonInfo(infoPokemon){
    const pokemonInfo = 
    `
    <h2 class="pokemonName">#${infoPokemon.id}. ${infoPokemon.name}</h2>
    <p class="boldProfile">Profile</p>
    <ul class="pokemonTrue">
        <li><p class="boldInfo">Height: </p> ${infoPokemon.height} <p class="boldInfo"> Weight: </p> ${infoPokemon.weight}</li>
        <li><p class="boldInfo">Type: </p>${infoPokemon.type}</li>
        <li><p class="boldInfo">Abilities: </p> ${infoPokemon.abilities}</li>
        <li><p class="boldInfo"">Moves: </p> ${infoPokemon.moves}</li>
    </ul>
    `
    pokemonText.innerHTML = pokemonInfo
}

// Get POKEMON SPRITE

function printPokemonPhoto(infoPokemon){
    const pokemonImage = `
    <img class="pokemonSprite" src="${infoPokemon.sprite}"/>
    `
    pokemonPhoto.innerHTML = pokemonImage
}

