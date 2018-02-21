let url;
let countries;
let ul;

const app = function(){
    url = "https://restcountries.eu/rest/v2/all";
    makeRequest(url, requestComplete);
    displayCountryDetails();
}

const makeRequest = function(url, callback){
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", callback);
    request.send();
}

const requestComplete = function(){
    if(this.status !== 200) return;
    const jsonString = this.responseText; //This is a string
    countries = JSON.parse(jsonString); //This parses the string into a js object
    populateList(countries);
}

const populateList = function(countries){
    const select = document.getElementById("countries-drop-down");
    countries.forEach(function(country){
        const option = document.createElement("option");
        option.innerText = country.name;
        select.appendChild(option);
    });
}

const displayCountryDetails = function(){
    ul = document.getElementById("country-details");
    const select = document.getElementById("countries-drop-down");
    select.addEventListener('change', handleDropDownChange);
}

const handleDropDownChange = function(){
    ul.innerHTML = "";
    const select = document.getElementById("countries-drop-down");
    const selectedCountryName = select.options[select.selectedIndex].innerText;
    const countryDetails = countries.reduce(function(accumulator, currentValueInArray){
        if(selectedCountryName === currentValueInArray.name){
            accumulator = currentValueInArray;
            
        };
        return accumulator;  // the country object
    })
    
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