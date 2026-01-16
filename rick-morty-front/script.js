const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("searchInput");
const characterDiv = document.getElementById("character");


searchBtn.addEventListener("click", async () => {
const name = input.value;


if (!name) return;


try {
const response = await fetch(
`http://localhost:3000/characters/${name}`
);


const data = await response.json();
const character = data[0];


characterDiv.innerHTML = `
<div class="card">
<h2>${character.name}</h2>
<img src="${character.image}" alt="${character.name}">
<p><strong>Status:</strong> ${character.status}</p>
<p><strong>Species:</strong> ${character.species}</p>
<p><strong>Gender:</strong> ${character.gender}</p>
<p><strong>Origin:</strong> ${character.origin.name}</p>
</div>
`;
} catch (error) {
characterDiv.innerHTML = "<p>Personaje no encontrado</p>";
}
});