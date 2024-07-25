"use client"; // Assurez-vous que le fichier est rendu côté client
import styles from '../../styeComponents/mangaDetail.module.css';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

import Header from '../../components/Header';
import useMangaDetail from '../../hooks/useMangaDetail';
import useMangaChapters from '../../hooks/useMangaChapters';

export default function MangaDetails() {
    const params = useParams();
    const { id } = params;

    const mangaData = useMangaDetail(id).mangaData;
    
    const chapterList = useMangaChapters(id).chapterList;
    

    useEffect(() => {
        if (chapterList) {
            localStorage.setItem('chapterList', JSON.stringify(chapterList));
        }
    }, [chapterList]);

    // Récupération des query params via URLSearchParams
    const imageSrc = new URLSearchParams(window.location.search).get('imageSrc');
    const mangaTitle = new URLSearchParams(window.location.search).get('mangaTitle');

    // Extraction des genres et des thèmes à partir de mangaData
    const genres = mangaData?.data?.attributes?.tags?.filter(tag => tag.attributes.group === 'genre') || [];
    const themes = mangaData?.data?.attributes?.tags?.filter(tag => tag.attributes.group === 'theme') || [];

    return (
        <>
            <Header />
            
            <div className={styles.mangaInfoAndImgContainer}>
                {imageSrc && (
                    <img src={imageSrc} alt={mangaTitle} className={styles.mangaImg} />
                )}
                {mangaData && (
                    <div className={styles.mangaInfoContainer}>
                        <h2 className={styles.mangaTitle}>{mangaData.data.attributes.title.en}</h2>
                        <p className={styles.mangaDesc}>{mangaData.data.attributes.description.en}</p>
                    </div>
                )}
            </div>
            {mangaData && (
                <div className={styles.genreTheme}>
                    <div className={styles.genre}> 
                        <h1 className={styles.genreLabel}>Genres:</h1>
                        <div className={styles.genreList}>
                            {genres.map(genre => (
                                <p className={styles.genreElement} key={genre.id}>{genre.attributes.name.en}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {chapterList && (
                <div className={styles.chapterContainer}>
                    <h3 className={styles.chapterLabel}>Chapters list</h3>
                    <ul className={styles.chapterList}>
                        {chapterList.map((chapter, index) => (
                            <li key={`${chapter.id}-${index}`}>
                                <Link href={`/manga/${id}/${chapter.id}?chapterNumber=${encodeURIComponent(chapter.attributes.chapter)}`} className={styles.chapterLink}>
                                    Chapter: {chapter.attributes.title} n° : {chapter.attributes.chapter}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            <div className={styles.footer}></div>
            
        </>
    );
}
