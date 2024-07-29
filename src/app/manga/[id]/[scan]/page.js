"use client"; // Assurez-vous que le fichier est rendu côté client
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import useMangaScans from '../../../hooks/useMangaScans';
import styles from '../../../styeComponents/scan.module.css';

export default function ScanPage() {
    const params = useParams();
    const { scan, id } = params;
    const router = useRouter();
    const [chapterNumber, setChapterNumber] = useState('');
    const [selectedChapter, setSelectedChapter] = useState('');
    const [chapterList, setChapterList] = useState(null);

    useEffect(() => {
        const chapterNumberFromURL = new URLSearchParams(window.location.search).get('chapterNumber');
        setChapterNumber(chapterNumberFromURL);
    }, []);

    useEffect(() => {
        const storedChapterList = localStorage.getItem('chapterList');
        if (storedChapterList) {
            const parsedChapterList = JSON.parse(storedChapterList);
            setChapterList(parsedChapterList);

            // Définir selectedChapter sur le chapitre actuel au montage
            const chapterNumberFromURL = new URLSearchParams(window.location.search).get('chapterNumber');
            if (chapterNumberFromURL) {
                const currentChapter = parsedChapterList.find(ch => encodeURIComponent(ch.attributes.chapter) === chapterNumberFromURL);
                if (currentChapter) {
                    setSelectedChapter(currentChapter.id);
                }
            }
        }
    }, []);
    console.log(scan) //(chapterID)
    const { scans, error } = useMangaScans(scan);
    
    
    const { baseUrl, chapter } = scans;
    const { hash: chapterHash, data: pages } = chapter;

    console.log("baseURL:", baseUrl, "chapterHash:", chapterHash);

    const handleChange = (event) => {
        const selectedChapterId = event.target.value;
        const chapter = chapterList.find(ch => ch.id === selectedChapterId);
        if (chapter) {
            const chapterNumber = encodeURIComponent(chapter.attributes.chapter);
            router.push(`/manga/${id}/${chapter.id}?chapterNumber=${chapterNumber}`);
        }
    };

    const handleNext = () => {
        if (!chapterList || !selectedChapter) return;
        const currentIndex = chapterList.findIndex(ch => ch.id === selectedChapter);
        if (currentIndex > 0) {
            const previousChapter = chapterList[currentIndex - 1];
            const previousChapterNumber = encodeURIComponent(previousChapter.attributes.chapter);
            router.push(`/manga/${id}/${previousChapter.id}?chapterNumber=${previousChapterNumber}`);
        }
    };

    const handlePrevious = () => {
        if (!chapterList || !selectedChapter) return;
        const currentIndex = chapterList.findIndex(ch => ch.id === selectedChapter);
        if (currentIndex < chapterList.length - 1) {
            const nextChapter = chapterList[currentIndex + 1];
            const nextChapterNumber = encodeURIComponent(nextChapter.attributes.chapter);
            router.push(`/manga/${id}/${nextChapter.id}?chapterNumber=${nextChapterNumber}`);
        }
    };

    return (
        <>
            <Header />
            <div className={styles.readerHeader}>
                {chapterList && (
                    <div className={styles.chapterContainer}>
                        <select
                            className={styles.selectChapter}
                            value={selectedChapter}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select a chapter</option>
                            {chapterList.map((chapter, index) => (
                                <option key={`${chapter.id}-${index}`} value={chapter.id}>
                                    {chapter.attributes.chapter}
                                </option>
                            ))}
                        </select>
                        <a className={styles.chapterBtnPrev} onClick={handlePrevious}> précédent </a>
                        <a className={styles.chapterBtnNext} onClick={handleNext}> suivant </a>
                    </div>
                )}
            </div>
            {baseUrl && chapterHash ? (
                <div className={styles.reader}>
                    {pages.map((page, index) => (
                        <img
                            key={index}
                            src={`${baseUrl}/data/${chapterHash}/${page}`}
                            alt={`Page ${index + 1}`}
                            style={{ marginBottom: '10px' }}
                        />
                    ))}
                </div>
            ) : (
                <h2 className={styles.pageUnavailable}>Pages unavailable</h2>
            )}
            <div className={styles.readerFooter}>
                {chapterList && (
                    <div className={styles.chapterContainer}>
                        <select
                            className={styles.selectChapter}
                            value={selectedChapter}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select a chapter</option>
                            {chapterList.map((chapter, index) => (
                                <option key={`${chapter.id}-${index}`} value={chapter.id}>
                                    {chapter.attributes.chapter}
                                </option>
                            ))}
                        </select>
                        <a className={styles.chapterBtnPrev} onClick={handlePrevious}> précédent </a>
                        <a className={styles.chapterBtnNext} onClick={handleNext}> suivant </a>
                    </div>
                )}
            </div>
            
        </>
    );
}
