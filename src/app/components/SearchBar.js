'use client'
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
            const response = await fetch(`https://api.mangadex.org/manga?title=${searchValue}&limit=30`);
            const data = await response.json();

            const mangaResults = await Promise.all(data.data
                .filter(manga => !manga.attributes.tags.some(tag => tag.attributes.name.en === 'Doujinshi' || tag.attributes.name.en === 'Fan-Made'))
                .map(async (manga) => {
                    const coverArt = manga.relationships.find(rel => rel.type === 'cover_art');

                    if (coverArt) {
                        const coverResponse = await fetch(`https://api.mangadex.org/cover/${coverArt.id}`);
                        const coverData = await coverResponse.json();
                        const coverFileName = coverData.data.attributes.fileName;
                        const imageUrl = `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}`;
                        return {
                            id: manga.id,
                            title: manga.attributes.title.en || manga.attributes.title['ja'],
                            imageUrl
                        };
                    }

                    return {
                        id: manga.id,
                        title: manga.attributes.title.en || manga.attributes.title['ja'],
                        imageUrl: '' // default or placeholder image if no cover art
                    };
                })
            );

            setResults(mangaResults);
        } catch (error) {
            console.error("Erreur lors de la recherche de mangas:", error);
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
