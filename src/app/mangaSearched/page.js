'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // Importez useSearchParams
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Gallery from '../components/Gallery';
import styles from '../styeComponents/searchBar.module.css';

export default function MangaSearched() {
    const searchParams = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true); 
    const query = searchParams.get('manga'); 

    useEffect(() => {
        if (query) {
            const fetchResults = async () => {
                // Remplacez l'utilisation du localStorage par un appel API si possible
                const results = localStorage.getItem('searchResults');
                if (results) {
                    setSearchResults(JSON.parse(results));
                }
                setLoading(false); // Marquer le chargement comme terminé
            };

            fetchResults();
        }
    }, [query]); // Dépendre du paramètre de query

    if (loading) {
        return <div>Loading...</div>; // Afficher un message de chargement pendant la récupération des résultats
    }

    return (
        <>
            <Header />
            <Suspense>
                <SearchBar />
            </Suspense>
            <div className={styles.scanIconContainer}>
                {/* Votre contenu ici */}
            </div>
            <Gallery mangaList={searchResults} />
        </>
    );
}
