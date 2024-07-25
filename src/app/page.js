"use client"; // Assurez-vous que le fichier est rendu côté client
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Carousel from "./components/Carousel";
import usePopularManga from '../app/hooks/usePopularManga';
import { useEffect } from 'react';

export default function Home() {
  const { mangas: popularManga, error } = usePopularManga('/api/popularManga');

  // Log l'état actuel des mangas et des erreurs pour le débogage
  useEffect(() => {
    console.log("Mangas:", popularManga);
    console.log("Error:", error);
  }, [popularManga, error]);

  // Affichez un indicateur de chargement ou un message d'erreur si nécessaire
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!popularManga || popularManga.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <SearchBar />
      <Carousel popularManga={popularManga} />
      
    </>
  );
}
