import styles from '../styeComponents/carousel.module.css'; // Assurez-vous que le chemin est correct
import Link from 'next/link';
import useCoverUrls from '../hooks/useCoverUrls'; // Assurez-vous d'importer le hook correctement
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



// Fonction utilitaire pour obtenir le premier titre disponible
const getTitle = (manga) => {
    if (manga.attributes.title && manga.attributes.title.en) {
        return manga.attributes.title.en;
    }

    // Sinon, obtenir le premier titre disponible (en d'autres langues)
    const titles = manga.attributes.title || {};
    return Object.values(titles)[0] || 'No Title Available';
};

export default function Carousel({ popularManga }) {

    const settings = { //carousel-setting
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows : true
      };


    // Utiliser le hook personnalisé pour obtenir les URLs des couvertures
    const { coverUrls, loading } = useCoverUrls(popularManga);
    console.log('Cover URLs:', coverUrls);
    console.log('Loading:', loading);

    // Vérifiez si popularManga est bien un tableau
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!Array.isArray(popularManga) || coverUrls.length !== popularManga.length) {
        return <div>Invalid data format</div>;
    }

    return (
        <div className={styles.carouselContainer}>
            <h1 className={styles.popularTitleTitle}> Popular Title </h1>
            <div className={styles.sliderContainer}>
                <Slider {...settings} className={styles.sliderPopular}>
                {popularManga.map((manga, index) => (
                    <div key={manga.id} className={styles.mangaItem}>
                        <Link href={`/manga/${manga.id}?imageSrc=${encodeURIComponent(coverUrls[index])}&mangaTitle=${encodeURIComponent(getTitle(manga))}`}>
                            <img 
                                src={coverUrls[index]} 
                                alt={getTitle(manga)} 
                                className={styles.coverImage} 
                            />
                            <div className={styles.mangaTitle}>
                                {getTitle(manga)}
                            </div>
                        </Link>
                    </div>
                ))}
                </Slider>
            </div>
            <div className={styles.footerDiv}> 
                
            </div>
        </div>
        
        
    );
}
