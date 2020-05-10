import { CreateAttribute, CreateElement } from "../Components/ElementComp.js";

import FetchData from "../Components/FetchData.js";
import {
  selectGenres,
  checkPoster,
  toggleBarEffect,
  updateToggleBar,
} from "../Components/Functions.js";

export default class Search extends CreateElement {
  constructor() {
    super();
    this.hookID = document.getElementById("section-search");
  }
  renderCardGenre(id, getGenres) {
    const genreCard = this.renderElement("div", "selected");
    let cardHTML = "";

    if (id === null) {
      cardHTML += `
      <div class="selected__item"  >
      Comdey
         
      </div>
      `;
      genreCard.innerHTML = cardHTML;
      genreCard.style.opacity = "0";
      this.hookID.insertAdjacentElement("afterbegin", genreCard);
    } else {
      id.forEach((item) => {
        cardHTML += `
              <div class="selected__item">
              ${selectGenres([+item], getGenres)}
                 
              </div>
          `;
        genreCard.innerHTML = cardHTML;
        this.hookID.insertAdjacentElement("afterbegin", genreCard);
      });
    }
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

  loadCard() {
    let id = sessionStorage.getItem("genreId");
    const getData = new FetchData();
    getData.genres().then((movies) => this.renderCardGenre([id], movies));

    getData.searchMovieList(id).then((data) => {
      data.forEach((item) => {
        const { poster_path, title, release_date, vote_average, id } = item;

        this.render(
          poster_path,
          title,
          release_date,
          vote_average,
          "movie",
          id
        );
      });
    });
  }

  loadCardArr() {
    let cards = JSON.parse(localStorage.getItem("cardArr"));

    let genreId = JSON.parse(sessionStorage.getItem("activeGenres"));

    const getData = new FetchData();
    getData.genres().then((movies) => this.renderCardGenre(genreId, movies));

    cards.forEach((card) => {
      if (card.title) {
        const {
          poster_path,
          title,
          release_date,
          vote_average,
          media_type,
          id,
        } = card;

        this.render(
          poster_path,
          title,
          release_date,
          vote_average,
          media_type,
          id
        );

        localStorage.removeItem("cardArr");
      } else {
        const {
          poster_path,
          name,
          first_air_date,
          vote_average,
          media_type,
          id,
        } = card;

        this.render(
          poster_path,
          name,
          first_air_date,
          vote_average,
          media_type,
          id
        );

        localStorage.removeItem("cardArr");
      }
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

const card = new Search();
let cards = JSON.parse(localStorage.getItem("cardArr"));

cards !== null ? card.loadCardArr() : card.loadCard();

card.cardInfo();

toggleBarEffect();
updateToggleBar();
