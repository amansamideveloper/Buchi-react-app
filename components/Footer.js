import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/footer.module.css'
function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.cardL}>
                <h1 className={styles.title}>Buchi.</h1>
                <h4 className={styles.linkTitle}>
                    <Link passHref href='/'>
                        <>
                            <span className={styles.linkText}>Work with us</span>

                        </>
                    </Link>
                </h4>
            </div>
            <div className={styles.cards}>

            </div>
            <div className={styles.cardS}>
                <div className={styles.cardItem}>
                    Addis Abeba, Bole Atlas
                </div>
                <div className={styles.cardItem}>
                    amansamicoder2022@gmail.com <br />
                </div>
            </div>
        </div>
    )
}

export default Footer