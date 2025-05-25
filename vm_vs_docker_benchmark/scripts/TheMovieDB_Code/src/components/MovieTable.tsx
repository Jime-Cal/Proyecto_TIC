import { Eye } from "lucide-react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { tmdbApi } from "../api/themoviedb/tmdbApi";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MovieTable() {
  const rowsPerPage = 8;
  const [page, setPage] = useState(0);
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await tmdbApi.getPopularMovies(page + 1);
        setAllMovies((prevMovies) => {
          if (page === 0) {
            return response.data.results;
          } else {
            return [...prevMovies, ...response.data.results];
          }
        });
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  if (isLoading && page === 0) {
    return <p className="text-center text-gray-600">Cargando...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 font-semibold">
        Error al cargar las películas
      </p>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: 2,
        borderRadius: "4px",
      }}
    >
      <TableContainer sx={{ maxHeight: "60vh" }}>
        <Table stickyHeader aria-label="tabla de películas populares">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#EEEEEE" }}
              >
                Nombre
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#EEEEEE" }}
              >
                Año
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#EEEEEE",
                  textAlign: "center",
                }}
              >
                Ver
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allMovies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(
                (movie: {
                  id: React.Key | null | undefined;
                  title:
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactPortal
                        | React.ReactElement<
                            unknown,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                  release_date: string | number | Date;
                }) => (
                  <TableRow key={movie.id} hover>
                    <TableCell>{movie.title}</TableCell>
                    <TableCell>
                      {new Date(movie.release_date).getFullYear()}
                    </TableCell>
                    <TableCell align="center">
                      <Link
                        to={`/movie/${movie.id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Eye size={20} />
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={allMovies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
      />
    </Box>
  );
}
