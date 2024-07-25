// components/SearchBar.js
'use client';
import styles from '../styeComponents/searchBar.module.css';
import { useState } from 'react';
import ScanIcon from './ScanIcon';

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([]);

    function searching(value) {
        setSearchValue(value);
    }

    async function rechercher() {
        try {
            const response = await fetch(`/api/search?title=${encodeURIComponent(searchValue)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Erreur lors de la recherche de mangas:', error);
        }
    }

    return (
        <>
            <div className={styles.searchBarContainer}>
                <div id="SearchBar" className="relative inline-flex items-center text-gray-600 focus-within:text-gray-400 w-1/3">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </span>
                    <input id="SearchBarInput" onChange={(e) => searching(e.target.value)} type="search" name="q" className="py-2 text-sm text-gray-600 bg-gray-200 rounded-md pl-10 focus:outline-none focus:bg-gray-200 focus:text-gray-600 w-full" placeholder="Search..." autoComplete="off" />
                    <button className={styles.btnSearch} onClick={rechercher}> search </button>
                </div>
            </div>

            <div className={styles.scanIconContainer}>
                {results.map((manga) => (
                    <ScanIcon
                        key={manga.id}
                        imageSrc={manga.imageUrl}
                        title={manga.title}
                        id={manga.id}
                    />
                ))}
            </div>
        </>
    );
}
