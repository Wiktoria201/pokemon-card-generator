document.addEventListener("DOMContentLoaded", function () {
  const colors = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };

  const btn = document.querySelector("#btn-generate");
  const pokemonNameEl = document.querySelector("#pokemon-name-el");
  const pokemonHpEl = document.querySelector("#pokemon-hp-el");
  const statAttack = document.querySelector("#stat-attack");
  const statDefense = document.querySelector("#stat-defense");
  const statSpeed = document.querySelector("#stat-speed");
  const pokemonProperties = document.querySelector("#properties-container");
  const card = document.querySelector("#card-container");

  btn.addEventListener("click", function () {
    card.style.display = "flex";
    const randomPokemon = Math.floor(Math.random() * 150) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${randomPokemon}/`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const imgSrc = data.sprites.other.dream_world.front_default;
        const pokemonImage = document.querySelector("#img");
        pokemonImage.setAttribute("src", imgSrc);

        const pokemonHp = data.base_experience;
        pokemonHpEl.textContent = `HP ${pokemonHp}`;

        const pokemonName = data.name;
        pokemonNameEl.textContent =
          pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

        const allProperties = data.types.map((type) => type.type.name);
        pokemonProperties.innerHTML = allProperties
          .map((property) => `<p class="round main-color">${property}</p>`)
          .join("");

        statAttack.textContent = data.stats[1].base_stat;
        statDefense.textContent = data.stats[2].base_stat;
        statSpeed.textContent = data.stats[5].base_stat;

        allProperties.forEach((property) => {
          if (colors[property]) {
            const mainColorElements = document.querySelectorAll(".main-color");
            mainColorElements.forEach((element) => {
              element.style.backgroundColor = colors[property];
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
