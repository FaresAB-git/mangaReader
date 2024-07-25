import styles from '../styeComponents/header.module.css'
import Link from 'next/link';

export default function Header(){
    return (
        <>
        <div className={styles.headerContainer}>

            <h1 className={styles.appTitle}> <Link href='/'> Manga Scan Perso </Link>  </h1>
        </div>
        </>
    )
}