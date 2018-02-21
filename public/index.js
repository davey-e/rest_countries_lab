let url;

const app = function(){
    url = "https://restcountries.eu/rest/v2/all";
    const getButton = document.getElementById('get-button');
    getButton.addEventListener('click', handleGetButtonClick);
}

const handleGetButtonClick = function(){
    makeRequest(url, requestComplete);
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
    const countries = JSON.parse(jsonString); //This parses the string into a js object
    populateList(countries);
}

const populateList = function(countries){
    const ul = document.getElementById("country-list");
    countries.forEach(function(country){
        const li = document.createElement("li");
        li.innerText = country.name;
        ul.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', app);