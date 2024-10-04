const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const nameEl = document.getElementById("pokemon-name");
const idEl = document.getElementById("pokemon-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");

function searchPk(search) {
  const regex = /[~!@#$%^&*()_+`\[\];'\,.\/{}:"|<>?\s]/g;
  search = search.replace(regex, "").toLowerCase();
  const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/" + search;

  const fetchData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      showData(data);
    } catch (err) {
      alert("Pokémon not found");
    }
  };
  fetchData();
}

function showData(obj) {
  const { name, id, weight, height, stats, types, sprites } = obj;
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const imgEl = `<img id="sprite" src ="${sprites.front_default}">`;
  document.getElementById("types").innerHTML = "";
  document.getElementById("img-container").innerHTML = imgEl;
  nameEl.innerText = capitalizedName;
  idEl.innerText = `#${id}`;
  weightEl.innerText = weight;
  heightEl.innerText = height;
  for (let data of stats) {
    const { base_stat, stat } = data;
    const { name } = stat;
    document.getElementById(name).innerText = base_stat;
  }
  for (let data of types) {
    const { type } = data;
    document.getElementById("types").innerHTML += `<p>${type.name}</p>`;
  }
}

searchInput.addEventListener("change", () => {
  searchPk(searchInput.value);
});

searchBtn.addEventListener("click", () => {
  searchPk(searchInput.value);
});
