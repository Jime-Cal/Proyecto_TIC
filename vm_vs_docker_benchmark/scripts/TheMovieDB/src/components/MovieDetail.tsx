import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tmdbApi } from "../api/themoviedb/tmdbApi";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Grid,
} from "@mui/material";

const noImagePlaceholder = "/mnt/data/no-image-available-icon-vector.jpg";

const MovieDetail = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await tmdbApi.getMovieDetails(Number(movieId));
        setMovie(response.data);
        const castResponse = await tmdbApi.getMovieCredits(Number(movieId));
        setCast(castResponse.data.cast.slice(0, 10)); // Get top 10 cast members
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (movieId) fetchMovie();
  }, [movieId]);

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        sx={{ display: "flex", maxWidth: 900, boxShadow: 3, borderRadius: 3 }}
      >
        <Box
          component="img"
          sx={{ width: 300, borderRadius: "12px 0 0 12px" }}
          src={
            movie?.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : noImagePlaceholder
          }
          alt={movie?.title || "No Image"}
        />
        <CardContent sx={{ flex: 1, ml: 3 }}>
          <Typography variant="h4" fontWeight="bold">
            {movie?.title} (
            {movie?.release_date
              ? new Date(movie.release_date).getFullYear()
              : "Unknown"}
            )
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {movie?.genres?.map((g: { name: any }) => g.name).join(", ") ||
              "Unknown"}{" "}
            •{" "}
            {movie?.runtime
              ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
              : "Unknown runtime"}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: "#4CAF50",
                color: "white",
                fontWeight: "bold",
                boxShadow: 2,
              }}
            >
              <Typography variant="h6">
                {movie?.vote_average
                  ? Math.round(movie.vote_average * 10)
                  : "N/A"}
                %
              </Typography>
            </Box>
            <Typography sx={{ ml: 2 }} color="text.primary">
              User Score
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mt: 2, color: "text.primary" }}>
            {movie?.overview || "No description available."}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, textTransform: "none", borderRadius: 2 }}
            onClick={() => navigate("/")}
          >
            Go back
          </Button>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4, width: "100%", maxWidth: 900 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Cast
        </Typography>
        <Grid container spacing={2}>
          {cast.map((actor) => (
            <Grid item xs={6} sm={4} md={3} key={actor.id}>
              <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                <Box
                  component="img"
                  sx={{ width: "100%", borderRadius: "8px 8px 0 0" }}
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : noImagePlaceholder
                  }
                  alt={actor.name}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="body1" fontWeight="bold">
                    {actor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {actor.character || "Unknown Role"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MovieDetail;
