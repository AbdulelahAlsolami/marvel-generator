console.log("Mongo JS LOADED");

async function searchHero() {

  const heroName = document
    .getElementById("heroInput")
    .value
    .trim();

  const resultDiv = document.getElementById("result");

  if (!heroName) {
    alert("Enter superhero name");
    return;
  }

  resultDiv.innerHTML = "Loading...";

  try {

    const response = await fetch(
      "http://localhost:5000/api/marvel"
    );

    const data = await response.json();

    console.log("Mongo Data:", data);

    const filtered = data.filter(hero =>
      hero.name.toLowerCase().includes(heroName.toLowerCase())
    );

    if (filtered.length === 0) {

      resultDiv.innerHTML = `
        <p>No superhero found</p>
      `;

      return;
    }

    resultDiv.innerHTML = filtered.map(hero => `

      <div class="hero-card">

        <h2>${hero.name}</h2>

        <img
          src="${hero.image}"
          alt="${hero.name}"
          width="200"
        >

        <p>
          ${hero.description || "No description"}
        </p>

      </div>

    `).join("");

  }

  catch (error) {

    console.error(error);

    resultDiv.innerHTML = `
      <p>Error connecting to Mongo API</p>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("searchBtn");

  btn.addEventListener("click", searchHero);

});