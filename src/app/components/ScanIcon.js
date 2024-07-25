import styles from '../styeComponents/scanIcon.module.css';
import Link from 'next/link';

export default function ScanIcon(props) {
    return (
        <Link href={`/manga/${props.id}?imageSrc=${encodeURIComponent(props.imageSrc)}&mangaTitle=${encodeURIComponent(props.title)}`} passHref>
            
                <img src={props.imageSrc} alt={props.title} className={styles.imgScan} />
                <span className={styles.mangaTitle}>{props.title}</span><br />
            
        </Link>
    );
}

