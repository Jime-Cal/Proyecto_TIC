import React, { useState } from "react";
import { CssBaseline, Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/TopBar/NavBar";
import MenuDrawer from "./components/TopBar/MenuDrawer";
import MovieTable from "./components/MovieTable";
import MovieDetail from "./components/MovieDetail";

const queryClient = new QueryClient();

function App() {
  const [menuOpen, setMenuOpen] = useState(true); // Cambiar a true para que esté abierto por defecto
  const [isCollapsed, setIsCollapsed] = useState(false); // Nuevo estado para controlar si el drawer está colapsado

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
    setIsCollapsed(!isCollapsed); // Cambia el estado de colapso al hacer clic en el icono del Navbar
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Router>
        <Navbar handleMenuToggle={handleMenuToggle} handleDrawerToggle={handleDrawerToggle} />
        <Box sx={{ display: 'flex' }}>
          <MenuDrawer open={menuOpen} handleClose={handleMenuToggle} isCollapsed={isCollapsed} />
          <Box component="main" sx={{ flexGrow: 1, padding: 3, marginTop: 8 }}>
            <Routes>
              <Route path="/" element={<MovieTable />} />
              <Route path="/movie/:movieId" element={<MovieDetail />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
