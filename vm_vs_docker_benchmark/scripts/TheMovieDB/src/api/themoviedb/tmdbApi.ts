import axiosClient from "../axiosClient";

export interface MovieVideos {
  id: number;
  results: {
    find(arg0: (video: { type: string; site: string }) => boolean): unknown;
    key: string;
    name: string;
    site: string;
    type: string;
  };
}

export const tmdbApi = {
  getPopularMovies: (page: number) =>
    axiosClient.get(`/movie/popular?page=${page}`),

  getAllMovies: (page: number, p0: number) =>
    axiosClient.get(`/discover/movie?page=${page}`),

  getMovieDetails: (movieId: number) => axiosClient.get(`/movie/${movieId}`),

  getMovieReviews: (movieId: number) =>
    axiosClient.get(`/movie/${movieId}/reviews`),

  getMovieVideos: (movieId: number) =>
    axiosClient.get(`/movie/${movieId}/videos`),

  getMovieCredits: (movieId: number) =>
    axiosClient.get(`/movie/${movieId}/credits`),
};
