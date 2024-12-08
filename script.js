// @ts-nocheck
// const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
// const IMGPATH = "https://image.tmdb.org/t/p/w1280";
// const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&      api_key=04c35731a5ee918f014970082a0088b1&query=";

// 3adcbb1584d0a548b7910769f114d821

const popularApi = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=3adcbb1584d0a548b7910769f114d821';

const searchApi = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key=04c35731a5ee918f014970082a0088b1&query=';

const Images = 'https://image.tmdb.org/t/p/w500';

const getMovies = async(api) => {
    const response = await fetch(api);
    const data = await response.json();
    // console.log(data);
    showMovies(data.results);
}
const movieBox = document.querySelector('#movie-box');
// const box = document.querySelector('.box');

const showMovies = (data) => {
    movieBox.innerHTML = "";

    data.forEach((item) => {
        // console.log(item);
        const imagePath = item.poster_path === null ? "image-missing.png" : Images + item.poster_path;
        const box = document.createElement('div');
        box.classList.add('box')
        box.innerHTML = `
            <img src="${imagePath}" alt="">
            <div class="overlay">
                <div class="title">
                    <h2>${item.original_title}</h2>
                    <span>${item.vote_average.toFixed(1)}</span>
                </div>
                <h3>Overview:</h3>
                <p>
                    ${item.overview}
                </p>
            </div>
        `;
        movieBox.appendChild(box)
    })
}

document.querySelector("#search").addEventListener("keyup", (event) => {
    if(event.target.value !=""){
        getMovies(searchApi + event.target.value);
    }else{
        getMovies(popularApi)
    }
} );
getMovies(popularApi);
