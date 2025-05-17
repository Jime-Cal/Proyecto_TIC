export interface Movie {
  trailerKey: any;
  map(
    arg0: (movie: {
      videos: any;
      id: number;
    }) => Promise<{ trailerKey: any; id: number }>
  ): any;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export interface MovieDetail extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  vote_average: number;
}

export interface Review {
  author: string;
  content: string;
}
