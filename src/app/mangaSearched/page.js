// app/mangaSearched/page.js
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Gallery from '../components/Gallery';
import styles from '../styeComponents/searchBar.module.css';

export default function MangaSearched() {
    const [searchResults, setSearchResults] = useState([]);
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    useEffect(() => {
        if (query) {
            const results = localStorage.getItem('searchResults');
            if (results) {
                setSearchResults(JSON.parse(results));
            }
        }
    }, [query]); // Surveillez les changements de query

    return (
        <>
            <Header />
            <SearchBar />
            <div className={styles.scanIconContainer}></div>
            <Gallery mangaList={searchResults} />
        </>
    );
}
