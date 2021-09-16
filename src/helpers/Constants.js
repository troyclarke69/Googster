// covid stats resources

export const owidApi = "https://covid.ourworldindata.org/data/owid-covid-data.json";

export const vacApi = "https://github.com/owid/covid-19-data/blob/master/public/data/vaccinations/vaccinations.json";

export const dailyApi = "https://pomber.github.io/covid19/timeseries.json";

export const earthApi = "https://corona.lmao.ninja/v2/all";


// custom Api ref. newsapi.org ...
// Errors: 426 Uprade req'd
// Dec/20 -- looks like they discontinued free service
// Still working on corona-now.netlify.app AND https://troyclarke69.pythonanywhere.com/api/corona-news
// HOWEVER, still may be able to hit pythonanywhere - passing in countryCode ... update python script
// ALT: https://gnews.io/ (free 10/per, 100 hits/day = 1000)
export const x = "https://troyclarke69.pythonanywhere.com/api/corona-news";

// country=<iso2>, obtained from infoApi (countryInfo object)
export const newsApi = "https://newsapi.org/v2/top-headlines?country=<>&q=corona&apiKey=de67b2237afe4fb1b77bfbe773987fca";


// default sort=cases
export const countriesApi = "https://corona.lmao.ninja/v2/countries";

export const countryApi = "https://corona.lmao.ninja/v2/countries/";

export const geoApi = "https://geolocation-db.com/json/8f12b5f0-2bc2-11eb-9444-076679b7aeb0";

export const infoApi = "https://restcountries.eu/rest/v2/name/";

// by IP (obtained from geoApi)
export const dateTimeApi = "http://worldtimeapi.org/api/ip/";
// "http://worldtimeapi.org/api/timezone/America/Argentina/Salta" ... works, but ./America/NewYork/NewYork does not
// see list of timezones here: http://worldtimeapi.org/timezones
// not highly useful for this app
// https://timezonedb.com/api may be useful ??? but looks like it may not work in many cases, w/o more hacking

// get weather?
// weather-widget: up to 5 locations (pre-programmed) ...
// weather-api: https://weathersource.com/products/onpoint-api/ (free 30-day trial)
// perhaps other service? free, pass in location??? obtained from geolocation city, state, country, postal, ip ... ??