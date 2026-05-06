console.log("JS LOADED");

async function searchHero() {
  console.log("BUTTON CLICKED");

  const heroName = document.getElementById("heroInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!heroName) {
    alert("Enter superhero name");
    return;
  }

  resultDiv.innerHTML = "Loading...";

  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE";

  try {
    const supabaseUrl = "https://supa-purple.compostela.cloud";

    const response = await fetch(
      `${supabaseUrl}/rest/v1/characters?select=*&name=ilike.*${heroName}*`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        }
      }
    );

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("DATA:", data);

    if (!response.ok) {
      resultDiv.innerHTML = "Database error: " + JSON.stringify(data);
      return;
    }

    if (!data || data.length === 0) {
      resultDiv.innerHTML = "No superhero found";
      return;
    }

    resultDiv.innerHTML = data.map(hero => {
      const imageUrl =
        hero.thumbnail_url ||
        hero.image_url ||
        hero.img ||
        hero.image ||
        "";

      return `
        <div class="hero-card">
          <h3>${hero.name}</h3>

          ${
            imageUrl
              ? `<img src="${imageUrl}" alt="${hero.name}" width="160">`
              : `<p>No image available</p>`
          }

          <p>${hero.description || "No description"}</p>
        </div>
      `;
    }).join("");

  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = "Error connecting: " + err.message;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("searchBtn");

  if (btn) {
    btn.addEventListener("click", searchHero);
    console.log("Button connected");
  } else {
    console.log("Button NOT FOUND");
  }
});