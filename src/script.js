//Creates and appends html element with tagname,id and class as attributes top parent element
const createAndAppendElement = (tag, className, parentTag) => {
    let element = document.createElement(tag);
    className ? element.setAttribute("class", className) : false;
    parentTag ? parentTag.append(element) : false;
    return element;
};

let container = createAndAppendElement("div", "container");
let row = createAndAppendElement("div", "row", container);
let col = createAndAppendElement("div", "col-12", row);
let websitename = createAndAppendElement("h1", "text-center m-3 display-3", col).innerText = "Weather Studio"
const createCard = (country) => {
    let col = createAndAppendElement("div", "col-sm-6  col-lg-4", row);
    let card = createAndAppendElement("div", "card mx-md-2 my-4 text-center", col);
    let cardHeader = createAndAppendElement("div", "card-header bg-dark text-white", card);
    let cardImg = createAndAppendElement("img", "card-img-top img-fluid w-75 mx-auto pt-4", card); //src amd alt
    let cardBody = createAndAppendElement("div", "card-body", card);
    let capital = createAndAppendElement("p", "card-text mb-0", cardBody);
    let region = createAndAppendElement("p", "card-text mb-0", cardBody);
    let code = createAndAppendElement("p", "card-text mb-0", cardBody);
    let latlng = createAndAppendElement("p", "card-text", cardBody);
    let weatherButton = createAndAppendElement("button", "btn btn-primary", cardBody);
    cardHeader.innerText = country.name;
    cardImg.src = country.flag;
    cardImg.alt = `${country.name} flag img`;
    capital.innerText = `Capital : ${country.capital}`;
    region.innerText = `Region : ${country.region}`;
    code.innerText = `Country Code : ${country.callingCodes[0]}`;
    latlng.innerText = `latlng : ${country.latlng[0]} ${country.latlng[1]}`;
    weatherButton.innerText = "Weather Info";
    weatherButton.onclick = () => {
        displayWeather(country);
        var close = document.querySelector(".close-btn");
        close.onclick = () => {
            document.querySelector(".popup").style.display = "none";
        }
    }
}

const displayCountries = async () => {
    const REST_COUNTRIES_URL = 'https://restcountries.eu/rest/v2/all';
    try {
        let response = await fetch(REST_COUNTRIES_URL);
        let countries = await response.json();
        //Creates card for all the countries
        countries.forEach(country => {
            createCard(country);
        });
    } catch (error) {
        console.log(error)
        createAndAppendElement("span", "h5 text-danger text-center", col).innerText = "Service down !! Try later  ";
    }
}
displayCountries();

const displayWeather = async (country) => {
    const API_KEY = "c61fe78e67162f1be463481d1ce92844";
    const OW_BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"
    document.querySelector(".popup").style.display = "flex";
    try {
        let lat = country.latlng[0]
        let lon = country.latlng[1]
        url = `${OW_BASE_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        let response = await fetch(url);
        let weatherData = await response.json();
        countryName.innerText = country.name;
        icon.setAttribute("src", "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png")
        description.innerText = "Description - " + weatherData.weather[0].description;
        temperature.innerText = "Temperature - " + weatherData.main.temp;
        degree.innerText = "\xBA C";
        pressure.innerText = "Pressure - " + weatherData.main.pressure + " mbar";
        humidity.innerText = "Humidity - " + weatherData.main.humidity + " %";
    } catch (error) {
        console.error(error);
        description.innerText = "Error : " + error;
    }
}

var popup = createAndAppendElement("div", "popup");
var content = createAndAppendElement("div", "content", popup);
var countryName = createAndAppendElement("span", "h3 pt-3", content);
var icon = createAndAppendElement("img", "img-fluid", content);
var description = createAndAppendElement("p", "m-0", content);
description.innerText = "Loading..";
var temperature = createAndAppendElement("span", "", content);
var degree = createAndAppendElement("span", "h6", content);
var pressure = createAndAppendElement("p", "m-0", content);
var humidity = createAndAppendElement("p", "m-0", content);
var closeButton = createAndAppendElement("button", "close-btn btn btn-primary mt-3", content);
closeButton.innerText = "Close";

document.body.append(container, popup);