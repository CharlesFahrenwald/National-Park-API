'use strict'
const API_KEY ="SubiupgSxGo2DvlMscm2kQoLHCU9OmLMINU3isKG";
const searchURL ="https://developer.nps.gov/api/v1/parks";

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $(`#results-list`).empty();
    let html = "";
    for (let i = 0; i < responseJson.data.length; i++) {
        const parks = responseJson.data[i];
        const description = parks.description;
        const name = parks.name;
        const url = parks.url;
        const address = parks.directions;

        html += `
        <li><h3>${name}</h3>
        <p>Description: ${description}</p>
        <p>url:<a href="${url}">${url}</a></p>
        <p> address: ${address}</p>
        </li>`;
    }
    $("#results-list").html(html);
    $("#results").removeClass("hidden");
}

function getResults(){
    maxResults-= 1;
    const params = {
        api_key: API_KEY, limit: maxResults, stateCode:query};
        const queryString = formatQueryParams(params);
        const url = searchURL + "?" + queryString;

        fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(JSON.stringify(responseJson)))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
    }
    function watchForm() {
        $('.user-form').submit(function (event) {
          event.preventDefault();
          const state = $(this)
          .find("#state")
          .val();
          const maxResults = $(this)
          .find("#max")
          .val();
          getParkResults(state, maxResults);
        });
      }
      
      $(watchForm);


