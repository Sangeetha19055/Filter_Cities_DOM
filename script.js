const box = document.querySelector("#box");
const search = document.querySelector("#search");

let cities_data = [];

// =============================================================================================================================
//Inital data loads on the screen...
document.addEventListener("DOMContentLoaded", () => {
  loadData();
});
search.addEventListener("keyup", (event) => {
  event.preventDefault();
  filterCities(event.target.value);
});
// =============================================================================================================================
// Filtering the searching data
const filterCities = (search_text) => {
  const filterCities = cities_data.filter((city) => {
    const regex = new RegExp(`${search_text}`, "gi");
    return city.city.match(regex) || city.state.match(regex);
  });
  console.log("filter One", filterCities);
  displayCities(filterCities);
};
// =============================================================================================================================
//fisrt loading data
async function loadData() {
  try {
    const Api_response = await fetch(
      "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
    );
    const data = await Api_response.json();
    console.log(data);
    cities_data = data;
    displayCities(cities_data);
  } catch (err) {
    const output = `
         <div>
         <h1>Data Not Found... Try After SomeTime..😪 😪 😪 </h1>
         </div>
         `;
    box.innerHTML = output; //error means h1 tag line will appear here.
  }
}

function displayCities(cities_datas) {
  console.log(cities_datas);
  var card_box = "";

  if (cities_datas.length > 0) {
    cities_datas.forEach((element) => {
      card_box += `
  <div class="card__box">
         <h3>City: ${element.city}</h3>
         <p>Growth: ${element.growth_from_2000_to_2013}</p>
         <p>Latitude: ${element.latitude}</p>
         <p>Longitude: ${element.longitude}</p>
         <p>Population: ${element.population}</p>
         <p>Rank: ${element.rank}</p>
         <p>State: ${element.state}</p>
  </div>`;
    });
  } else {
    // let card_boxs;
    // const error_message = document.querySelector(".box");
    card_box = `<div class="card__box--errortext"> Error : No Citites /Sates Found</div>`;
    // error_message.innerHTML = card_boxs;
  }
  // image_box = card_box;
  box.innerHTML = card_box;
}
