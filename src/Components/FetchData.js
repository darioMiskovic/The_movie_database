//Fetch data
export default class FetchData {
  constructor() {
    this.key = "8ce50ea5c815aad1fbc1a2f3c25f14f1";
  }

  async toggleBarSearch(genres, rating, year) {
    let res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${this.key}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&primary_release_year=${year}&vote_count.lte=${rating}&with_genres=${genres}&with_original_language=en
          `
    );
    let data = await res.json();
    return data.results.slice(0, 3);
  }

  async multiSearch(word, page = 1) {
    let res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${this.key}&language=en-US&query=${word}&page=${page}&include_adult=false`
    );
    let data = await res.json();
    return data.results;
  }

  async searchTopMovie() {
    let res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.key}&language=en-US&page=1`
    );

    let data = await res.json();
    return data.results.slice(0, 3);
  }

  async searchMovieList(genreId, page = 1) {
    let res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${this.key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}&with_original_language=en`
    );
    let data = await res.json();
    return data.results;
  }

  async searchInfo(type, id) {
    let res = await fetch(
      ` https://api.themoviedb.org/3/${type}/${id}?api_key=${this.key}&language=en-US`
    );
    let data = await res.json();
    return data;
  }

  async trendingWeek(type, num) {
    let res = await fetch(
      `https://api.themoviedb.org/3/trending/${type}/week?api_key=${this.key}
          `
    );
    let data = await res.json();
    return data.results.slice(0, num);
  }

  async genres() {
    let res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=en-US`
    );
    let data = await res.json();
    return data.genres;
  }

  async movieItems(type, option, id) {
    let res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/${option}?api_key=${this.key}`
    );
    let data = await res.json();
    let finalData;
    option === "credits" ? (finalData = data.cast) : false;
    option === "images" ? (finalData = data.backdrops) : false;
    option === "videos" || option === "recommendations"
      ? (finalData = data.results)
      : false;

    return finalData;
  }

  async showItems(type, option, id) {
    let res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/${option}?api_key=${this.key}`
    );
    let data = await res.json();
    let finalData;
    option === "credits" ? (finalData = data.cast) : false;
    option === "images" ? (finalData = data.backdrops) : false;
    option === "videos" || option === "recommendations"
      ? (finalData = data.results)
      : false;

    return finalData;
  }

  async actorDetails(id) {
    let res = await fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${this.key}&language=en-US`
    );
    let data = await res.json();
    return data;
  }

  async actorCredits(id) {
    let res = await fetch(
      `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${this.key}&language=en-US`
    );
    let data = await res.json();
    return data.cast;
  }

  async discoverList(type, genres, year = false, rating = false, page = 1) {
    let res = await fetch(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${this.key}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=${page}&year=${year}&vote_count.lte=${rating}&with_genres=${genres}`
    );
    let data = await res.json();

    return data.results;
  }
}
