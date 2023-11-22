const srcInput = document.querySelector(".input-search");
const container = document.querySelector("main");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
let index = 1;
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
  }
};
window.onload = createPokemon("bulbasaur");
async function createPokemon(pokemon) {
  const dadosPokemonAnterior = document.querySelector(".pokemon-data");
  if (dadosPokemonAnterior) {
    dadosPokemonAnterior.remove();
  }
  const imgPokemonAnterior = document.querySelector(".pokemon");
  if (imgPokemonAnterior) {
    imgPokemonAnterior.remove();
  }
  const text = document.createElement("h1");
  text.classList.add("pokemon-data");
  const idPokemon = document.createElement("span");
  idPokemon.innerText = `Loading...`;
  const namePokemon = document.createElement("span");
  const img = document.createElement("img");
  img.classList.add("pokemon");
  img.src = "./images/pikachu.gif";

  text.appendChild(idPokemon);
  text.appendChild(namePokemon);
  container.appendChild(img);
  container.appendChild(text);
  const data = await fetchPokemon(pokemon);
  if (data) {
    idPokemon.innerText = `${data.id} - `;
    namePokemon.innerText = `${data.name}`;
    namePokemon.classList.add("pokemon-name");
    img.src = data["sprites"]["other"]["official-artwork"]["front_default"];
    index=data.id;
  } else {
    idPokemon.innerText = `Not Found :c`;
    img.src = "./images/ash-sad.png";
  }
}
srcInput.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    event.preventDefault();
    const pokemon = srcInput.value.toLowerCase().trim();
    console.log("Search input:", pokemon);
    createPokemon(`${pokemon}`);
    srcInput.value = "";
    return;
  }
});
btnPrev.addEventListener("click", () => {
  if (index > 0) {
    index -= 1;
    createPokemon(index);
  }
});

btnNext.addEventListener("click", () => {
  index += 1;
  createPokemon(index);
});
