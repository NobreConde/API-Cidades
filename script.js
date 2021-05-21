const countriesList = document.getElementById("paises");
let countries;

countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
  displayCountryInfo(event.target.value);
}

fetch("https://restcountries.eu/rest/v2/all")
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log("Error:", err));

function initialize(countriesData) {
  countries = countriesData;
  let options = "";
  countries.forEach(country => options+=`<option value="${country.alpha3Code}">${country.name}</option>`);
  countriesList.innerHTML = options;
  countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);
  displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

function displayCountryInfo(countryByAlpha3Code) {
  const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);
  document.querySelector("#bandeira-container img").src = countryData.flag;
  document.querySelector("#bandeira-container img").alt = `Flag of ${countryData.name}`;  
  document.getElementById("capital").innerHTML = countryData.capital;
  document.getElementById("cod-de-discagem").innerHTML = `+${countryData.callingCodes[0]}`;
  document.getElementById("populacao").innerHTML = countryData.population.toLocaleString("en-US");
  document.getElementById("moeda").innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(", ");
  document.getElementById("regiao").innerHTML = countryData.region;
  document.getElementById("sub-regiao").innerHTML = countryData.subregion;
}