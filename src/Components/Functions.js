import FetchData from "./FetchData.js";
import { CreateAttribute, CreateElement } from "./ElementComp.js";

export function selectGenres(movieArr, genresArr) {
  let newArr = [];

  genresArr.forEach((genres) => {
    movieArr.forEach((item) => genres.id === item && newArr.push(genres.name));
  });

  return newArr.join(" / ");
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export function toggleModal() {
  const playVideo = document.querySelector(".section-info__overview-video");

  playVideo.addEventListener("click", () => {
    document.querySelector(".modal").classList.toggle("active");
    document.querySelector(".modal").addEventListener("click", (e) => {
      e.target.closest(".modal_header-exit")
        ? document.querySelector(".modal").classList.add("active")
        : false;
    });
  });
}

export function setId(place, id) {
  sessionStorage.setItem(place, id);
}

export function genderCheck(num) {
  let gender;
  num === 1 ? (gender = "Female") : (gender = "Male");
  return gender;
}

export function recm(parrent, el) {
  const recomended = document.querySelector(`.${parrent}`);
  recomended.addEventListener("click", (e) => {
    let movieID = e.target.closest(`.${el}`).dataset.movieid;

    if (movieID) {
      setId("cardId", movieID);
      location.reload();
      this.infoLoad();
    }
  });
}

export function recmShow(parrent, el) {
  const recomended = document.querySelector(`.${parrent}`);
  recomended.addEventListener("click", (e) => {
    let movieID = e.target.closest(`.${el}`).dataset.showid;

    if (movieID) {
      setId("showId", movieID);
      location.reload();
      this.infoLoad();
    }
  });
}

export function movieInfo(parrent, el) {
  const recomended = document.querySelector(`.${parrent}`);
  recomended.addEventListener("click", (e) => {
    let movieID = e.target.closest(`.${el}`).dataset.movieid;

    if (movieID) {
      setId("cardId", movieID);
      location.href = "info.html";
    }
  });
}

export function showInfo(parrent, el) {
  const recomended = document.querySelector(`.${parrent}`);
  recomended.addEventListener("click", (e) => {
    let showID = e.target.closest(`.${el}`).dataset.showid;
    console.log(showID);
    if (showID) {
      setId("showId", showID);
      location.href = "showInfo.html";
    }
  });
}

export function actorsInfo(parrent, el) {
  const actors = document.querySelector(`.${parrent}`);
  actors.addEventListener("click", (e) => {
    let actorId = e.target.closest(`.${el}`).dataset.actorid;

    if (actorId) {
      setId("actorId", actorId);
      location.href = "actor.html";
    }
  });
}

export function searchAll() {
  const form = document.getElementById("header__form");
  const inputValue = document.getElementById("header__form--search");
  form.addEventListener("submit", (e) => {
    sessionStorage.setItem("mltSearch", `${inputValue.value}`);
    sessionStorage.setItem("pagType", `mltSearch`);
    e.preventDefault();
    const getData = new FetchData();
    getData.multiSearch(inputValue.value).then((item) => {
      localStorage.setItem("cardArr", JSON.stringify(item));

      location.href = "search.html";
    });
  });
}

export function updateToggleBar() {
  const el = new CreateElement();
  const getData = new FetchData();
  const tglBar = document.querySelector(".toggleBar");
  const movieId = document.getElementById("movie-icon");
  const tvID = document.getElementById("tv-icon");
  const ul = document.querySelector(".toggleBar__list");
  const ratingRange = document.getElementById("rating-range");
  const yearRange = document.getElementById("year-range");
  const ratingVal = document.getElementById("rating-val");
  const yearVal = document.getElementById("year-val");
  const program = document.getElementById("program");

  //togglebar heading / movie or tv
  [movieId, tvID].forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.id) {
        program.textContent = e.target.id.split("-")[0];
      } else if (e.target.closest(".sidebar__box").id) {
        program.textContent = e.target
          .closest(".sidebar__box")
          .id.split("-")[0];
      }
    });
  });

  //update genres list
  getData.genres().then((item) => {
    item.forEach((genre) => {
      const { id, name } = genre;
      const list = el.renderElement("li", "toggleBar__list--item", [
        new CreateAttribute("id", id),
      ]);
      list.innerHTML = `<a href="#"> <h3 class="heading-3">${name}</h3></a>`;
      ul.insertAdjacentElement("beforeend", list);
    });
  });

  //range update
  [ratingRange, yearRange].forEach((range, index) => {
    range.addEventListener("mousemove", (e) => {
      [ratingVal, yearVal][index].textContent = e.target.value;
    });
  });

  [ratingRange, yearRange].forEach((range, index) => {
    range.addEventListener("change", (e) => {
      [ratingVal, yearVal][index].textContent = e.target.value;
    });
  });

  //active list
  ul.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.closest("li") &&
      e.target.closest("li").classList.toggle("listActive");
  });

  tglBar.addEventListener("click", (e) => {
    if (
      e.target.className === "toggleBar__btn" ||
      e.target.closest(".toggleBar__btn")
    ) {
      sessionStorage.setItem("pagType", "activeGenres");
      let activeList = document.querySelectorAll(".listActive");
      const activeIds = [...activeList].map((item) => item.id + "%2C").join("");
      const activeGenres = [...activeList].map((item) => item.id);
      const [rating, year] = [ratingVal.textContent, yearVal.textContent];

      sessionStorage.setItem("activeGenres", JSON.stringify(activeGenres));
      sessionStorage.setItem("typeName", program.textContent);
      sessionStorage.setItem("yearRange", year);
      sessionStorage.setItem("ratingRange", rating);

      getData
        .discoverList(program.textContent, activeIds, year, rating)
        .then((res) => {
          localStorage.setItem("cardArr", JSON.stringify(res));
          location.href = "search.html";
        });
    }
  });
}

export function checkPoster(img) {
  let poster;

  if (img == null || img == undefined) {
    poster = `./img/poster-repl.png`;
  } else {
    poster = ` https://image.tmdb.org/t/p/w185/${img}`;
  }

  return poster;
}

export function toggleBarEffect() {
  document.getElementById("movie-icon").addEventListener("click", toggle);
  document.getElementById("tv-icon").addEventListener("click", toggle);
  const toggleBar = document.querySelector(".toggleBar");
  const sidebar = document.querySelector(".sidebar");

  function toggle() {
    toggleBar.classList.toggle("toggleBar__show");
    sidebar.classList.toggle("sidebar__active");
  }
}

export function sliderEffect() {
  const prev = document.getElementById("top-movie_left"),
    next = document.getElementById("top-movie_right"),
    slider = document.querySelector(".top-movie__slider"),
    items = slider.querySelectorAll(".top-movie__slider-item");

  let current = 1;

  slider.style.transform = `translateX(${-780 * current}px)`;

  next.addEventListener("click", () => {
    current++;
    slider.style.transition = "transform 0.4s ease-in-out";
    slider.style.transform = `translateX(${-780 * current}px)`;
  });

  prev.addEventListener("click", () => {
    current--;
    slider.style.transition = "transform 0.4s ease-in-out";
    slider.style.transform = `translateX(${-780 * current}px)`;
  });

  slider.addEventListener("transitionend", () => {
    if (items[current].id === "lastImg") {
      current = items.length - 2;
      slider.style.transition = "none";
      slider.style.transform = `translateX(${-780 * current}px)`;
    }
    if (items[current].id === "firstImg") {
      current = 1;
      slider.style.transition = "none";
      slider.style.transform = `translateX(${-780 * current}px)`;
    }
  });

  // setInterval(() => {
  //   current++;
  //   items[current].id === undefined ? (current = 1) : current;
  //   console.log(current);
  //   slider.style.transition = "transform 0.4s ease-in-out";
  //   slider.style.transform = `translateX(${-780 * current}px)`;
  // }, 10000);
}

export function updateFavorite(typeId, storageName) {
  const overBox = document.querySelector(".section-info__overview-box");

  overBox.addEventListener("click", (e) => {
    if (e.target.closest(".section-info__overview-favourite")) {
      location.reload();
      let infoId = sessionStorage.getItem(`${typeId}`);

      if (localStorage.getItem(`${storageName}`) === null) {
        const favArr = [];
        favArr.push(infoId);
        localStorage.setItem(`${storageName}`, JSON.stringify(favArr));
      } else {
        const favArr = JSON.parse(localStorage.getItem(`${storageName}`));

        if (favArr.indexOf(infoId) > -1) {
          favArr.splice(favArr.indexOf(infoId), 1);
          localStorage.setItem(`${storageName}`, JSON.stringify(favArr));
        } else {
          favArr.push(infoId);
          localStorage.setItem(`${storageName}`, JSON.stringify(favArr));
        }
      }
    }
  });
}

export function updateFavIcon(typeId, storageName) {
  const infoId = sessionStorage.getItem(`${typeId}`);
  let lsArr = localStorage.getItem(`${storageName}`);

  let html;

  if (lsArr === null) {
    html = `<use xlink:href="../img/sprite.svg#icon-heart-outlined"></use>`;
  } else if (lsArr.indexOf(infoId) > -1) {
    html = `<use xlink:href="../img/sprite.svg#icon-heart"></use>`;
  } else {
    html = `<use xlink:href="../img/sprite.svg#icon-heart-outlined"></use>`;
  }

  return html;
}

export function pagNum(dec, cur, inc, num, cb) {
  num < 2 ? (dec.style.display = "none") : (dec.style.display = "inline-block");
  let prev = num - 1;
  let curr = num;
  let next = num + 1;

  // dec.textContent = prev;
  // cur.textContent = curr;
  // inc.textContent = next;

  dec.innerHTML = ` <i class="fas fa-chevron-left"></i> ${prev}`;
  cur.innerHTML = `${curr}`;
  inc.innerHTML = `${next} <i class="fas fa-chevron-right"></i> `;

  const pagType = sessionStorage.getItem("pagType");
  let cards = document.querySelectorAll(".search-box");

  const getData = new FetchData();

  function render(arr) {
    cards.forEach((card) => card.remove());

    arr.forEach((card) => {
      if (card.title) {
        const {
          poster_path,
          title,
          release_date,
          vote_average,
          media_type,
          id,
        } = card;

        cb(poster_path, title, release_date, vote_average, media_type, id);
      } else {
        const {
          poster_path,
          name,
          first_air_date,
          vote_average,
          media_type,
          id,
        } = card;

        cb(poster_path, name, first_air_date, vote_average, media_type, id);
      }
    });
  }

  switch (pagType) {
    case "genreId":
      let genderId = sessionStorage.getItem("genreId");
      getData.searchMovieList(genderId, curr).then((arr) => render(arr));
      break;

    case "mltSearch":
      let mltId = sessionStorage.getItem("mltSearch");
      getData.multiSearch(mltId, curr).then((arr) => render(arr));
      break;

    case "activeGenres":
      let discoverIds = JSON.parse(sessionStorage.getItem("activeGenres"))
        .map((item) => item + "%2C")
        .join("");
      let yrng = sessionStorage.getItem("yearRange");
      let rrng = sessionStorage.getItem("ratingRange");
      let type = sessionStorage.getItem("typeName");

      getData
        .discoverList(type, discoverIds, yrng, rrng, curr)
        .then((arr) => render(arr));
      break;

    default:
      break;
  }
}
