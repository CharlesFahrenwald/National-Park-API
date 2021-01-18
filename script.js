'use strict';
const apiKey ="";
const searchURL ='https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map
  (key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}


function displayResults(responseJson) {
    // console.log(responseJson);
    $("#results-list").empty();
    for (let i = 0; i < responseJson.data.length; i++){

      $("#results-list").append(`<p>${responseJson.data[i].fullName}</p>

      <p>${responseJson.data[i].description}</p>

      <a href=" ${responseJson.data[i].url}">Visit Website</a>`);}

    $("#results-list").removeClass("hidden");
  };
     

function getNationalParks(query, limit = 10) {
  //debugger;
  const params = {
    q: query, limit, 
    api_key: apiKey,
    
  };
  if(!Number.parseFloat(limit) || Number.parseFloat(limit) >= 10){
    params.limit = 10;
  }
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  console.log(url);


  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => (displayResults(responseJson)))
  .catch(err => { 
    $('#js-error-message').text('Something went wrong: ${err.message}');
  });
}

  
  
 /* fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(JSON.stringify(responseJson)))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });*/


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const query = $('#state-name-input').val();
    const limit = $('#number-input').val();
    getNationalParks(query, limit);
  });
}

$(watchForm);
