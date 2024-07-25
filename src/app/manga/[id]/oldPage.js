// app/manga/[id]/page.tsx (ou page.js selon votre configuration)
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

    const mangaData = useMangaDetail(id);
    const chapterList = useMangaChapters(id);

    useEffect(() => {
        if (chapterList) {
            localStorage.setItem('chapterList', JSON.stringify(chapterList));
        }
    }, [chapterList]);

    // Récupération des query params via URLSearchParams
    const imageSrc = new URLSearchParams(window.location.search).get('imageSrc');
    const mangaTitle = new URLSearchParams(window.location.search).get('mangaTitle');

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
                        {/* Affichez plus d'informations sur le manga ici */}
                    </div>
                )}
            </div>
            {chapterList && (
                <div className={styles.chapterContainer}>
                    <h3 className={styles.chapterLabel}>Chapters list</h3>
                    <ul className={styles.chapterList}>
                        {chapterList.map((chapter, index) => (
                            <li key={`${chapter.id}-${index}`}>
                                <Link href={`/manga/${id}/${chapter.id}?chapterNumber=${encodeURIComponent(chapter.attributes.chapter)}`} className={styles.chapterLink}>
                                    chapter: {chapter.attributes.title} n° : {chapter.attributes.chapter}
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
