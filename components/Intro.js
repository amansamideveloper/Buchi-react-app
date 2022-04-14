import React from 'react'
import Image from 'next/image'
import styles from '../styles/intro.module.css'
import Circle from './Circle'
import Link from 'next/dist/client/link'
const Intro = () => {
    return (
        <div className={styles.container}>

            <div className={styles.card}>
                <Circle backgroundColor="#b0ff49" top="-50vh" left="-50vh" />
                <Circle backgroundColor="#01c686" right="-40vh" />
                <h1 className={styles.title}>
                    <span className={styles.brand}>BUCHI</span> OVER 200,000  STRAY DOGS ON ADDIS ABEBA STREET IN 2020!</h1>
                <p className={styles.desc}>
                    adopt a stray pet to descrease the number of stray pets on the street                </p>
                <Link className={styles.button} passHref href='/search'> Search here
                </Link>
            </div>
            <div className={styles.card}>
                <Image src="/img/pet1.png"

                    layout='fill'
                    objectFit='contain'
                    alt=''
                />
            </div>
        </div>
    )
}

export default Intro