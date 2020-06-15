import { CreateElement } from "../Components/ElementComp.js";

import FetchData from "../Components/FetchData.js";
import {
  toggleBarEffect,
  genderCheck,
  updateToggleBar,
} from "../Components/Functions.js";

class Actor extends CreateElement {
  constructor() {
    super();
    this.section = document.querySelector(".section-actor");
    this.actorList = document.querySelector(".section-actor_content ul");
  }

  render(id) {
    const actorHeader = this.renderElement("div", "section-actor_header");
    const getData = new FetchData();

    //Actor Detail's
    getData.actorDetails(id).then((actor) => {
      actorHeader.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${
              actor.profile_path
            }" alt="actor-profile" />

            <div class="section-actor_header-info">
              <div class="section-actor_header-info--name">${actor.name}</div>
              <div class="section-actor_header-info--bio">
                <span>Biograpy: </span>${actor.biography}
              </div>
              <div class="section-actor_header-info--known">
                <span>Known For: </span>${actor.known_for_department}
              </div>
              <div class="section-actor_header-info--gender">
                <span>Gender: </span>${genderCheck(actor.gender)}
              </div>
              <div class="section-actor_header-info--bday">
                <span>Birthday: </span>
                ${actor.birthday}
              </div>
              <div class="section-actor_header-info--bplace">
                <span>Place of Birth: </span>
                ${actor.place_of_birth}
              </div>
            </div>
            `;

      this.section.insertAdjacentElement("afterbegin", actorHeader);
    });

    //Actor Content

    getData.actorCredits(id).then((res) => {
      res.forEach((item) => {
        if (item.media_type !== "tv") {
          const actorItem = this.renderElement("li");

          actorItem.innerHTML = `
                <span class="acting_year">${
                  item.release_date.split("-")[0]
                }</span>
                <div class="dot"></div>
                <span class="acting_movie">${item.title}</span>
                <span class="as">as</span>
                <span class="acting_name">${item.character}</span>
                `;
          this.actorList.appendChild(actorItem);
        } else {
          const actorItem = this.renderElement("li");

          actorItem.innerHTML = `
                <span class="acting_year">${
                  item.first_air_date.split("-")[0]
                }</span>
                <div class="dot"></div>
                <span class="acting_movie">${item.name}</span>
                <span class="as">as</span>
                <span class="acting_name">${item.character}</span>
                `;
          this.actorList.appendChild(actorItem);
        }
      });
    });
  }

  init() {
    let id = sessionStorage.getItem("actorId");
    this.render(id);

    updateToggleBar();
  }
}

const actor = new Actor();

actor.init();
toggleBarEffect();
updateToggleBar();
