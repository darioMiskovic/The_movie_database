import { CreateAttribute, CreateElement } from "../Components/ElementComp.js";
import FetchData from "../Components/FetchData.js";
import {
  toggleBarEffect,
  updateToggleBar,
  toggleModal,
  actorsInfo,
  recm,
} from "../Components/Functions.js";

class ShowInfo extends CreateElement {
  constructor() {
    super();
    this.hookID = document.querySelector(".section-info");
  }

  render(obj) {
    const infoHead = document.querySelector(".section-info-header"),
      overView = document.querySelector(".section-info__overview"),
      facts = document.querySelector(".section-info__facts"),
      actors = document.querySelector(".section-info__actors-flex"),
      gallery = document.querySelector(".section-info__backdrops"),
      trailer = document.querySelector(".section-info__trailer"),
      recomended = document.querySelector(".section-info__recomendations"),
      modal = document.querySelector(".modal");

    //Background image**
    const bgImg = this.renderElement("div", "section-info-header__bckg");
    bgImg.style.backgroundImage = `
    linear-gradient(
        to right bottom,
        #01d277 10%,
        rgba(45, 45, 45, 0.73) 75%
      ),
    url('https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${obj.backdrop_path}')
    
    `;

    infoHead.append(bgImg);

    //Overview**
    const poster = this.renderElement("div", "section-info__overview-poster");
    const info = this.renderElement("div", "section-info__overview-info");

    //Overview - poster
    poster.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${obj.poster_path}" alt="poster-img"  />
    `;

    //Overview - Info
    info.innerHTML = `

      <!--Overview Title-->
      <div class="section-info__overview-title">
        ${obj.name} <span class="rel-year">(${
      obj.first_air_date.split("-")[0]
    })</span>
      </div>
      <!--Overview About-->
      <div class="section-info__overview-about">
      ${obj.first_air_date} ${obj.genres
      .map((genre) => genre.name)
      .join("/")} ${obj.episode_run_time[0]}min
      </div>
      <!--Overview Box: Rating Like Video-->
      <div class="section-info__overview-box">
        <div class="section-info__overview-rating">
          <svg class="section-info__overview-icon">
            <use xlink:href="../img/sprite.svg#icon-star-empty"></use>
          </svg>

          <span>${obj.vote_average}</span>
        </div>
        <div class="section-info__overview-favourite">
          <svg class="section-info__overview-icon">
            <use xlink:href="../img/sprite.svg#icon-heart-outlined"></use>
          </svg>
        </div>
        <div class="section-info__overview-video">
          <i class="fas fa-play"></i>
          <span>Play video</span>
        </div>
      </div>
      <!--Overview Description-->
      <div class="section-info__overview-description">
      ${obj.overview}
      </div>
      <!--Overview Writers-->
      <div class="section-info__overview-writer">
        Production:  ${obj.production_companies
          .map((item) => item.name)
          .join(", ")}
      </div>
      `;
    [poster, info].forEach((item) => overView.append(item));

    // Facts**
    const status = this.renderElement("div", "section-info__facts-status");
    const orgLang = this.renderElement("div", "section-info__facts-lang");
    const numSeason = this.renderElement("div", "section-info__facts-budget");
    const orgName = this.renderElement("div", "section-info__facts-revenue");

    status.textContent = `Status: ${obj.status}`;
    orgName.textContent = `Original Name: ${obj.original_name}`;
    numSeason.textContent = `Seasons: ${obj.seasons.length}`;
    orgLang.textContent = `Orignal Language: ${obj.original_language.toUpperCase()}`;

    [status, orgName, numSeason, orgLang].forEach((item) =>
      facts.appendChild(item)
    );

    //Cast***
    let id = sessionStorage.getItem("showId");
    const getData = new FetchData();
    getData.showItems("tv", "credits", id).then((cast) =>
      cast.slice(0, 8).forEach((actor) => {
        const actorBox = this.renderElement("div", "section-info__actors-box", [
          new CreateAttribute("data-actorid", actor.id),
        ]);

        actorBox.innerHTML = `
       
        <div class="section-info__actors-box-img">
          <img src="https://image.tmdb.org/t/p/w185${actor.profile_path}" alt="actor-img" />
        </div>
        <div class="section-info__actors-box-info">
          <span class="actors-name">${actor.name}</span>

          <span class="actors-character">${actor.character}</span>
        </div>
      
        `;

        actors.insertAdjacentElement("beforeend", actorBox);
      })
    );

    // Gallery**
    gallery.style.display = "none";
    // const galleryContainer = this.renderElement(
    //   "div",
    //   "section-info__backdrops-gallery"
    // );

    // let htmlGallery = "";

    // getData.movieItems("tv", "images", id).then((img) => {
    //   img.slice(0, 4).forEach((item) => {
    //     htmlGallery += ` <img src="https://image.tmdb.org/t/p/w780${item.file_path}" alt="bckDrop-img" />`;
    //   });
    //   galleryContainer.innerHTML = htmlGallery;
    //   gallery.insertAdjacentElement("beforeend", galleryContainer);
    // });

    //Videos **
    const trailerBox = this.renderElement("div", "section-info__trailer-box");
    let htmlVideos = "";

    getData.movieItems("tv", "videos", id).then((res) => {
      res.slice(0, 2).forEach((video) => {
        htmlVideos += `
       <iframe
       type="text/html"
       width="100%"
       height="100%"
       src="//www.youtube.com/embed/${video.key}?autoplay=0&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1"
       frameborder="0"
       allowfullscreen
     ></iframe>
       `;
      });

      trailerBox.innerHTML = htmlVideos;
      trailer.insertAdjacentElement("beforeend", trailerBox);
    });

    //Recomendations **
    const recmFlex = this.renderElement(
      "div",
      "section-info__recomendations-flex"
    );
    let htmlRecm = "";

    getData.movieItems("tv", "recommendations", id).then((res) => {
      res.slice(0, 4).forEach((recm) => {
        htmlRecm += `
        <div class="section-info__recomendations-box" data-movieid=${recm.id}>
        <div class="section-info__recomendations-box-img">
          <img src="https://image.tmdb.org/t/p/w300${recm.backdrop_path}" alt="recomendations-img" />
        </div>
        <div class="section-info__recomendations-box-title">
          <span class="rec-title">${recm.name}</span>
        </div>
      </div>
        `;
      });

      recmFlex.innerHTML = htmlRecm;
      recomended.insertAdjacentElement("beforeend", recmFlex);
    });

    //Modal **
    getData.showItems("tv", "videos", id).then((video) => {
      let modalVideo = video[0];
      modal.innerHTML = `
      <div class="modal_header">
      <div class="modal_header-title">Play Trailer</div>
  
      <svg class="modal_header-exit">
        <use xlink:href="../img/sprite.svg#icon-cross"></use>
      </svg>
    </div>
  
    <div class="modal_content">
      <iframe
        type="text/html"
        width="100%"
        height="100%"
        src="//www.youtube.com/embed/${modalVideo.key}?autoplay=0&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
      `;
    });
  }

  infoLoad() {
    let id = sessionStorage.getItem("showId");

    const getData = new FetchData();

    getData.searchInfo("tv", id).then((info) => {
      this.render(info);
      toggleModal();
      recm("section-info__recomendations", "section-info__recomendations-box");
      actorsInfo("section-info__actors-flex", "section-info__actors-box");
    });
  }
}

const info = new ShowInfo();

info.infoLoad();
toggleBarEffect();
updateToggleBar();
