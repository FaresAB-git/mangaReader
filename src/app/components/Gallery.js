import styles from '../styeComponents/gallery.module.css'; // Assurez-vous que le chemin est correct
import Link from 'next/link';
import useCoverUrls from '../hooks/useCoverUrls'; // Assurez-vous d'importer le hook correctement
import useLastUpdatedManga from '../hooks/useLastUpdatedManga';

export default function Gallery({ mangaList }) {

    const { coverUrls, loading } = useCoverUrls(mangaList);

    console.log(mangaList);
    console.log(coverUrls);

    return (
        <div className={styles.grid}>
            {mangaList.map((manga, index) => (
                <div key={index} className={styles.mangaContainer}> 
                    <Link key={index} href={`/manga/${manga.id}?imageSrc=/api/proxyImage?url=${encodeURIComponent(coverUrls[index])}&mangaTitle=${encodeURIComponent(manga.title)}`} passHref>
                        <div key={index} className={styles.imgandTitleContainer}> 
                            
                            <div className={styles.imgContainer}>
                                <img className={styles.imgGallery} src={coverUrls[index]} />
                            </div>
                            
                            <div className={styles.titleContainer}>
                                <h1>{manga.attributes.title.en}</h1>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
