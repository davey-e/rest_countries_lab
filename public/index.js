let url;

const app = function(){
    url = "https://restcountries.eu/rest/v2/all";
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
    const select = document.getElementById("countries-drop-down");
    countries.forEach(function(country){
        const option = document.createElement("option");
        option.innerText = country.name;
        select.appendChild(option);
    });

}

document.addEventListener('DOMContentLoaded', app);