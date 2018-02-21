const app = function(){
    url = "https://restcountries.eu/rest/v2/all";

    // display last selected country
    const countryObject = getCountryFromLocalStorage();
    if(countryObject !== null){
        createCountryDetailList(countryObject);
    }

    // get data from api
    makeRequest(url, requestComplete);
}

// get data from api
const makeRequest = function(url, callback){
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", callback);
    request.send();
}

// callback used in makeRequest to convert api data into array of country objects
const requestComplete = function(){
    if(this.status !== 200) return;
    const jsonString = this.responseText; //This is a string
    const countries = JSON.parse(jsonString); //This parses the string into a js object
    populateList(countries);
}

const populateList = function(countries){
    const select = document.getElementById("countries-drop-down");
    countries.forEach(function(country, index){
        const option = document.createElement("option");
        option.innerText = country.name;
        option.value = index;
        select.appendChild(option);
    });
    // when the dropdown is used to select a country name:...
    const handleDropDownChange = function(){
    // clear previously selected country from displayed details
    const ul = document.getElementById("country-details");
    ul.innerHTML = "";

    // grab the dropdown list, find what has been selected, 
    // retrieve the country object from the array of countries
    const select = document.getElementById("countries-drop-down");
    const selectedCountry = countries[this.value]

    createCountryDetailList(selectedCountry);
    saveCountryToLocalStorage(selectedCountry);
    
    }

    select.addEventListener('change', handleDropDownChange);

}

const saveCountryToLocalStorage = function (countryDetails) {
    const jsonCountryDetails = JSON.stringify(countryDetails);
    localStorage.setItem("country", jsonCountryDetails)
}

const getCountryFromLocalStorage = function () {
    const countryObject = JSON.parse(localStorage.getItem("country"));
    return countryObject;
}


const createCountryDetailList = function (countryDetails) {
    const ul = document.getElementById("country-details");
    const liName = document.createElement('li');
    liName.innerText = "Country Name: " + countryDetails.name;
    ul.appendChild(liName);
    const liPopulation = document.createElement('li');
    liPopulation.innerText = "Population: " + countryDetails.population;
    ul.appendChild(liPopulation);
    const liCapital = document.createElement('li');
    liCapital.innerText = "Capital City: " + countryDetails.capital;
    ul.appendChild(liCapital);
}

document.addEventListener('DOMContentLoaded', app);