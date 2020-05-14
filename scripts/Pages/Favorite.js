import { CreateAttribute, CreateElement } from "../Components/ElementComp.js";

import FetchData from "../Components/FetchData.js";
import {
  checkPoster,
  toggleBarEffect,
  updateToggleBar,
} from "../Components/Functions.js";

class Favorite extends CreateElement {
  constructor() {
    super();
    this.hookID = document.getElementById("section-search");
  }

  render(img, title, year, rating, type, id) {
    const movieCard = this.renderElement("div", "search-box", [
      type === "tv"
        ? new CreateAttribute("data-showid", id)
        : new CreateAttribute("data-movieid", id),
    ]);
    movieCard.innerHTML = `
            <img src="${checkPoster(img)}" alt="movie-card" />
            <div class="search-box__title">${title}</div>
            <div class="search-box__info">
              <span class="search-box__info-year">
                <i class="fas fa-calendar-alt"></i>${year}</span
              >
              <span class="search-box__info-rate">
                <i class="far fa-star"></i>${rating}</span
              >
            </div>
            `;
    this.hookID.insertAdjacentElement("afterbegin", movieCard);
  }

  init() {
    toggleBarEffect();
    updateToggleBar();
    const favMovies = JSON.parse(localStorage.getItem("favoriteMovieIds"));
    const favShows = JSON.parse(localStorage.getItem("favoriteShowIds"));

    [favMovies, favShows].forEach((typeArr) => {
      typeArr;
    });

    const getData = new FetchData();

    favMovies.forEach((movieId) => {
      getData.searchInfo("movie", movieId).then((movie) => {
        const {
          poster_path,
          title,
          release_date,
          vote_average,
          media_type,
          id,
        } = movie;

        this.render(
          poster_path,
          title,
          release_date,
          vote_average,
          media_type,
          id
        );
      });
    });

    favShows.forEach((showId) => {
      getData.searchInfo("tv", showId).then((show) => {
        console.log(show.media_type);
        const {
          poster_path,
          name,
          first_air_date,
          vote_average,

          id,
        } = show;

        this.render(poster_path, name, first_air_date, vote_average, "tv", id);
      });
    });
  }

  cardInfo() {
    this.hookID.addEventListener("click", (e) => {
      if (e.target.closest("div").dataset.showid) {
        const cardId = e.target.closest("div").dataset.showid;
        sessionStorage.setItem("showId", cardId);
        location.href = "showInfo.html";
      }
      if (e.target.closest("div").dataset.movieid) {
        const cardId = e.target.closest("div").dataset.movieid;
        sessionStorage.setItem("cardId", cardId);
        location.href = "info.html";
      }
    });
  }
}

const favorite = new Favorite();

favorite.init();
favorite.cardInfo();
