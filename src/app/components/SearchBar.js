'use client';
import styles from '../styeComponents/searchBar.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Utilisez le hook de next/navigation
import ScanIcon from './ScanIcon';

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();

    function searching(value) {
        setSearchValue(value);
    }

    const rechercher = async () => {
        try {
            const response = await fetch(`/api/search2?title=${encodeURIComponent(searchValue)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // Stocker les résultats de la recherche dans le local storage
            localStorage.setItem('searchResults', JSON.stringify(data.data));
            // Rediriger vers la page de résultats avec le paramètre de recherche
            router.push(`/mangaSearched?query=${encodeURIComponent(searchValue)}`);
        } catch (error) {
            console.error('Erreur lors de la recherche de mangas:', error);
        }
    };

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
        </>
    );
}
