function makeCall(url, callBack) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
      console.log("Success!");
      callBack(this);
    }
  });
  xhr.open("GET", url, true);
  xhr.send();
}

function movies(response) {
  console.log(response.responseText);
  var data = JSON.parse(response.responseText);
  console.log(data);
  var movie = "";
  for (var i = 0; i < data.Search.length; i++) {
    movie += `<img src = "${data.Search[i].Poster}"
   id ="${data.Search[i].imdbID}"
   onclick = "callDetails('${data.Search[i].imdbID}')"/>`;
    document.querySelector("#app").innerHTML = movie;
    console.log(movie);
  }
}

function details(response) {
  console.log(response.responseText);
  var data = JSON.parse(response.responseText);
  console.log(data);
  var movieDetails = "";
  document.querySelector("#details").innerHTML = movieDetails;
  movieDetails += `
  <h3>Title: ${data.Title}</h3>
  <p>Year: ${data.Year}</p>
  <p>Type: ${data.Type}</p>
  <p>Genre: ${data.Genre}</p>
  <p>Director: ${data.Director}</p>
  <p>Actors: ${data.Actors}</p>
  <p>Writer: ${data.Writer}</p>
  <p>Plot: ${data.Plot}</p>
  `;
  console.log(movieDetails);
  document.querySelector("#details").innerHTML = movieDetails;
}

window.callDetails = function(imdbID) {
  console.log(imdbID);
  makeCall(`https://www.omdbapi.com/?apikey=2432c0ee&i=${imdbID}`, details);
};
document.querySelector("#find").addEventListener("click", function() {
  var selectedMovie = document.querySelector("#movie-name").value;
  console.log(selectedMovie);
  makeCall(
    `https://www.omdbapi.com/?apikey=2432c0ee&s=${selectedMovie}`,
    movies
  );
});
