!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="assets/scripts/",n(n.s=3)}([function(e,t,n){"use strict";n.d(t,"j",(function(){return s})),n.d(t,"c",(function(){return i})),n.d(t,"n",(function(){return o})),n.d(t,"d",(function(){return l})),n.d(t,"g",(function(){return d})),n.d(t,"h",(function(){return u})),n.d(t,"e",(function(){return g})),n.d(t,"k",(function(){return m})),n.d(t,"a",(function(){return f})),n.d(t,"i",(function(){return h})),n.d(t,"q",(function(){return p})),n.d(t,"b",(function(){return v})),n.d(t,"m",(function(){return y})),n.d(t,"l",(function(){return _})),n.d(t,"p",(function(){return S})),n.d(t,"o",(function(){return b})),n.d(t,"f",(function(){return w}));var a=n(1),r=n(2);function s(e,t){let n=[];return t.forEach(t=>{e.forEach(e=>t.id===e&&n.push(t.name))}),n.join(" / ")}const i=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2});function o(){document.querySelector(".section-info__overview-video").addEventListener("click",()=>{document.querySelector(".modal").classList.toggle("active"),document.querySelector(".modal").addEventListener("click",e=>{e.target.closest(".modal_header-exit")&&document.querySelector(".modal").classList.add("active")})})}function c(e,t){sessionStorage.setItem(e,t)}function l(e){let t;return t=1===e?"Female":"Male",t}function d(e,t){document.querySelector("."+e).addEventListener("click",e=>{let n=e.target.closest("."+t).dataset.movieid;n&&(c("cardId",n),location.reload(),this.infoLoad())})}function u(e,t){document.querySelector("."+e).addEventListener("click",e=>{let n=e.target.closest("."+t).dataset.showid;n&&(c("showId",n),location.reload(),this.infoLoad())})}function g(e,t){document.querySelector("."+e).addEventListener("click",e=>{let n=e.target.closest("."+t).dataset.movieid;n&&(c("cardId",n),location.href="info.html")})}function m(e,t){document.querySelector("."+e).addEventListener("click",e=>{let n=e.target.closest("."+t).dataset.showid;console.log(n),n&&(c("showId",n),location.href="showInfo.html")})}function f(e,t){document.querySelector("."+e).addEventListener("click",e=>{let n=e.target.closest("."+t).dataset.actorid;n&&(c("actorId",n),location.href="actor.html")})}function h(){const e=document.getElementById("header__form"),t=document.getElementById("header__form--search");e.addEventListener("submit",e=>{sessionStorage.setItem("mltSearch",""+t.value),sessionStorage.setItem("pagType","mltSearch"),e.preventDefault();(new a.a).multiSearch(t.value).then(e=>{localStorage.setItem("cardArr",JSON.stringify(e)),location.href="search.html"})})}function p(){const e=new r.b,t=new a.a,n=document.querySelector(".toggleBar"),s=document.getElementById("movie-icon"),i=document.getElementById("tv-icon"),o=document.querySelector(".toggleBar__list"),c=document.getElementById("rating-range"),l=document.getElementById("year-range"),d=document.getElementById("rating-val"),u=document.getElementById("year-val"),g=document.getElementById("program");[s,i].forEach(e=>{e.addEventListener("click",e=>{e.target.id?g.textContent=e.target.id.split("-")[0]:e.target.closest(".sidebar__box").id&&(g.textContent=e.target.closest(".sidebar__box").id.split("-")[0])})}),t.genres().then(t=>{t.forEach(t=>{const{id:n,name:a}=t,s=e.renderElement("li","toggleBar__list--item",[new r.a("id",n)]);s.innerHTML=`<a href="#"> <h3 class="heading-3">${a}</h3></a>`,o.insertAdjacentElement("beforeend",s)})}),[c,l].forEach((e,t)=>{e.addEventListener("mousemove",e=>{[d,u][t].textContent=e.target.value})}),[c,l].forEach((e,t)=>{e.addEventListener("change",e=>{[d,u][t].textContent=e.target.value})}),o.addEventListener("click",e=>{e.preventDefault(),e.target.closest("li")&&e.target.closest("li").classList.toggle("listActive")}),n.addEventListener("click",e=>{if("toggleBar__btn"===e.target.className||e.target.closest(".toggleBar__btn")){sessionStorage.setItem("pagType","activeGenres");let e=document.querySelectorAll(".listActive");const n=[...e].map(e=>e.id+"%2C").join(""),a=[...e].map(e=>e.id),[r,s]=[d.textContent,u.textContent];sessionStorage.setItem("activeGenres",JSON.stringify(a)),sessionStorage.setItem("typeName",g.textContent),sessionStorage.setItem("yearRange",s),sessionStorage.setItem("ratingRange",r),t.discoverList(g.textContent,n,s,r).then(e=>{localStorage.setItem("cardArr",JSON.stringify(e)),location.href="search.html"})}})}function v(e){let t;return t=null==e||null==e?"./img/poster-repl.png":" https://image.tmdb.org/t/p/w185/"+e,t}function y(){document.getElementById("movie-icon").addEventListener("click",n),document.getElementById("tv-icon").addEventListener("click",n);const e=document.querySelector(".toggleBar"),t=document.querySelector(".sidebar");function n(){e.classList.toggle("toggleBar__show"),t.classList.toggle("sidebar__active")}}function _(){const e=document.getElementById("top-movie_left"),t=document.getElementById("top-movie_right"),n=document.querySelector(".top-movie__slider"),a=n.querySelectorAll(".top-movie__slider-item");let r=1;n.style.transform=`translateX(${-780*r}px)`,t.addEventListener("click",()=>{r++,n.style.transition="transform 0.4s ease-in-out",n.style.transform=`translateX(${-780*r}px)`}),e.addEventListener("click",()=>{r--,n.style.transition="transform 0.4s ease-in-out",n.style.transform=`translateX(${-780*r}px)`}),n.addEventListener("transitionend",()=>{"lastImg"===a[r].id&&(r=a.length-2,n.style.transition="none",n.style.transform=`translateX(${-780*r}px)`),"firstImg"===a[r].id&&(r=1,n.style.transition="none",n.style.transform=`translateX(${-780*r}px)`)})}function S(e,t){document.querySelector(".section-info__overview-box").addEventListener("click",n=>{if(n.target.closest(".section-info__overview-favourite")){location.reload();let n=sessionStorage.getItem(""+e);if(null===localStorage.getItem(""+t)){const e=[];e.push(n),localStorage.setItem(""+t,JSON.stringify(e))}else{const e=JSON.parse(localStorage.getItem(""+t));e.indexOf(n)>-1?(e.splice(e.indexOf(n),1),localStorage.setItem(""+t,JSON.stringify(e))):(e.push(n),localStorage.setItem(""+t,JSON.stringify(e)))}}})}function b(e,t){const n=sessionStorage.getItem(""+e);let a,r=localStorage.getItem(""+t);return a=null===r?'<use xlink:href="../img/sprite.svg#icon-heart-outlined"></use>':r.indexOf(n)>-1?'<use xlink:href="../img/sprite.svg#icon-heart"></use>':'<use xlink:href="../img/sprite.svg#icon-heart-outlined"></use>',a}function w(e,t,n,r,s){e.style.display=r<2?"none":"inline-block";let i=r-1,o=r,c=r+1;e.innerHTML=' <i class="fas fa-chevron-left"></i> '+i,t.innerHTML=""+o,n.innerHTML=c+' <i class="fas fa-chevron-right"></i> ';const l=sessionStorage.getItem("pagType");let d=document.querySelectorAll(".search-box");const u=new a.a;function g(e){d.forEach(e=>e.remove()),e.forEach(e=>{if(e.title){const{poster_path:t,title:n,release_date:a,vote_average:r,media_type:i,id:o}=e;s(t,n,a,r,i,o)}else{const{poster_path:t,name:n,first_air_date:a,vote_average:r,media_type:i,id:o}=e;s(t,n,a,r,i,o)}})}switch(l){case"genreId":let e=sessionStorage.getItem("genreId");u.searchMovieList(e,o).then(e=>g(e));break;case"mltSearch":let t=sessionStorage.getItem("mltSearch");u.multiSearch(t,o).then(e=>g(e));break;case"activeGenres":let n=JSON.parse(sessionStorage.getItem("activeGenres")).map(e=>e+"%2C").join(""),a=sessionStorage.getItem("yearRange"),r=sessionStorage.getItem("ratingRange"),s=sessionStorage.getItem("typeName");u.discoverList(s,n,a,r,o).then(e=>g(e))}}},function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));class a{constructor(){this.key="8ce50ea5c815aad1fbc1a2f3c25f14f1"}async toggleBarSearch(e,t,n){let a=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${this.key}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&primary_release_year=${n}&vote_count.lte=${t}&with_genres=${e}&with_original_language=en\n          `);return(await a.json()).results.slice(0,3)}async multiSearch(e,t=1){let n=await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${this.key}&language=en-US&query=${e}&page=${t}&include_adult=false`);return(await n.json()).results}async searchTopMovie(){let e=await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${this.key}&language=en-US&page=1`);return(await e.json()).results.slice(0,3)}async searchMovieList(e,t=1){let n=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${this.key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${t}&with_genres=${e}&with_original_language=en`);return(await n.json()).results}async searchInfo(e,t){let n=await fetch(` https://api.themoviedb.org/3/${e}/${t}?api_key=${this.key}&language=en-US`);return await n.json()}async trendingWeek(e,t){let n=await fetch(`https://api.themoviedb.org/3/trending/${e}/week?api_key=${this.key}\n          `);return(await n.json()).results.slice(0,t)}async genres(){let e=await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=en-US`);return(await e.json()).genres}async movieItems(e,t,n){let a,r=await fetch(`https://api.themoviedb.org/3/${e}/${n}/${t}?api_key=${this.key}`),s=await r.json();return"credits"===t&&(a=s.cast),"images"===t&&(a=s.backdrops),("videos"===t||"recommendations"===t)&&(a=s.results),a}async showItems(e,t,n){let a,r=await fetch(`https://api.themoviedb.org/3/${e}/${n}/${t}?api_key=${this.key}`),s=await r.json();return"credits"===t&&(a=s.cast),"images"===t&&(a=s.backdrops),("videos"===t||"recommendations"===t)&&(a=s.results),a}async actorDetails(e){let t=await fetch(`https://api.themoviedb.org/3/person/${e}?api_key=${this.key}&language=en-US`);return await t.json()}async actorCredits(e){let t=await fetch(`https://api.themoviedb.org/3/person/${e}/combined_credits?api_key=${this.key}&language=en-US`);return(await t.json()).cast}async discoverList(e,t,n=!1,a=!1,r=1){let s=await fetch(`https://api.themoviedb.org/3/discover/${e}?api_key=${this.key}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=${r}&year=${n}&vote_count.lte=${a}&with_genres=${t}`);return(await s.json()).results}}},function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r}));class a{constructor(e,t){this.name=e,this.value=t}}class r{renderElement(e,t,n){const a=document.createElement(e);return t&&(a.className=t),n&&n.length>0&&n.forEach(e=>{a.setAttribute(e.name,e.value)}),a}}},function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(1),s=n(0);class i extends a.b{constructor(){super(),this.section=document.querySelector(".section-actor"),this.actorList=document.querySelector(".section-actor_content ul")}render(e){const t=this.renderElement("div","section-actor_header"),n=new r.a;n.actorDetails(e).then(e=>{t.innerHTML=`\n            <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${e.profile_path}" alt="actor-profile" />\n\n            <div class="section-actor_header-info">\n              <div class="section-actor_header-info--name">${e.name}</div>\n              <div class="section-actor_header-info--bio">\n                <span>Biograpy: </span>${e.biography}\n              </div>\n              <div class="section-actor_header-info--known">\n                <span>Known For: </span>${e.known_for_department}\n              </div>\n              <div class="section-actor_header-info--gender">\n                <span>Gender: </span>${Object(s.d)(e.gender)}\n              </div>\n              <div class="section-actor_header-info--bday">\n                <span>Birthday: </span>\n                ${e.birthday}\n              </div>\n              <div class="section-actor_header-info--bplace">\n                <span>Place of Birth: </span>\n                ${e.place_of_birth}\n              </div>\n            </div>\n            `,this.section.insertAdjacentElement("afterbegin",t)}),n.actorCredits(e).then(e=>{e.forEach(e=>{if("tv"!==e.media_type){const t=this.renderElement("li");t.innerHTML=`\n                <span class="acting_year">${e.release_date.split("-")[0]}</span>\n                <div class="dot"></div>\n                <span class="acting_movie">${e.title}</span>\n                <span class="as">as</span>\n                <span class="acting_name">${e.character}</span>\n                `,this.actorList.appendChild(t)}else{const t=this.renderElement("li");t.innerHTML=`\n                <span class="acting_year">${e.first_air_date.split("-")[0]}</span>\n                <div class="dot"></div>\n                <span class="acting_movie">${e.name}</span>\n                <span class="as">as</span>\n                <span class="acting_name">${e.character}</span>\n                `,this.actorList.appendChild(t)}})})}init(){let e=sessionStorage.getItem("actorId");this.render(e),Object(s.q)()}}(new i).init(),Object(s.m)(),Object(s.q)()}]);
//# sourceMappingURL=Actor.js.map