// import { sliderEffect } from "../Components/Slider.js";
import { CreateAttribute, CreateElement } from "../Components/ElementComp.js";
import {
  selectGenres,
  actorsInfo,
  movieInfo,
  showInfo,
  searchAll,
  updateToggleBar,
  toggleBarEffect,
  sliderEffect,
} from "../Components/Functions.js";
import FetchData from "../Components/FetchData.js";

export default class Home extends CreateElement {
  getElement() {
    this.topMovie = document.querySelector(".top-movie__slider");
    this.movieList = document.querySelector(".movie-list");
    this.actors = document.querySelector(".actors_flex");
    this.topTv = document.querySelector(".tv-show");
  }

  async updateTopMovie() {
    const getData = new FetchData();
    let topMovie = await getData.searchTopMovie();
    const getGenres = await getData.genres();

    const firstMovie = topMovie[0];
    const lastMovie = topMovie[topMovie.length - 1];
    topMovie = [lastMovie, ...topMovie, firstMovie];

    topMovie.forEach((movie, index) => {
      let card;

      if (index === 0) {
        card = this.renderElement("div", "top-movie__slider-item", [
          new CreateAttribute("id", "lastImg"),
        ]);
      } else if (index === topMovie.length - 1) {
        card = this.renderElement("div", "top-movie__slider-item", [
          new CreateAttribute("id", "firstImg"),
        ]);
      } else {
        card = this.renderElement("div", "top-movie__slider-item");
      }

      card.innerHTML = `
      <div class="top-movie__bg">
            <img src="https://image.tmdb.org/t/p/w780/${
              movie.backdrop_path
            }" alt="movie backdrop" />
       </div>

        <div class="top-movie__info">
                <div class="top-movie__info--title">${movie.title}</div>
                <div class="top-movie__info--genre">
                    ${movie.release_date}
                    <div class="dot"></div>
                    ${selectGenres(movie.genre_ids, getGenres)}
                </div>

            <div class="top-movie__info-btn" data-movieid=${
              movie.id
            }>Show info</div>
        </div>
        
      `;

      this.topMovie.append(card);
    });
    movieInfo("top-movie__container", "top-movie__info-btn");

    sliderEffect();
  }

  async updateActors() {
    const getData = new FetchData();
    const getActors = await getData.trendingWeek("person", 6);

    getActors.forEach((actor) => {
      let card = this.renderElement("figure", "actors__box", [
        new CreateAttribute("data-actorid", actor.id),
      ]);

      card.innerHTML = `
      <div class="actors__box-img">
        <img src="https://image.tmdb.org/t/p/w185/${actor.profile_path}" alt="actor" />
      </div>
      <figcaption class="actors__box-name">${actor.name}</figcaption>

      `;
      this.actors.append(card);
    });

    actorsInfo("actors_flex", "actors__box");
  }

  async updateShowWeek() {
    const getData = new FetchData();
    const getShow = await getData.trendingWeek("tv", 1);

    getShow.forEach((show) => {
      let card = this.renderElement("div", "tv-show__box");
      sessionStorage.setItem("showId", `${show.id}`);
      card.innerHTML = `
       <img src="https://image.tmdb.org/t/p/w185/${show.poster_path}" alt="tv-show" />
          <div class="tv-show__box-description">
            <div class="tv-show__box-title">${show.name}</div>
            <div class="tv-show__box-overview">
            ${show.overview}
            </div>
            <button id="desc-btn" class="desc-btn"data-showid=${show.id}>Read More</button>
          </div>

      `;
      this.topTv.insertAdjacentElement("beforeend", card);
    });

    showInfo("tv-show__box", "desc-btn");
  }

  updateMovieList() {
    this.movieList.addEventListener("click", (e) => {
      const genreId = e.target.closest("div").id;

      sessionStorage.setItem("genreId", `${genreId}`);
      location.href = "search.html";
    });
  }

  init() {
    this.getElement();
    this.updateTopMovie();
    this.updateActors();
    this.updateShowWeek();
    this.updateMovieList();
    searchAll();

    updateToggleBar();
  }
}

const home = new Home();
home.init();
toggleBarEffect();
