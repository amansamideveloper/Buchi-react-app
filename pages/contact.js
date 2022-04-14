import React from 'react'
import styles from '../styles/contact.module.css'
import Circles from '../components/Circle'
const contact = () => {
    return (
        <div className={styles.container}>
            <Circles backgroundColor="green" left="-40vh" top="-20vh" />
            <Circles backgroundColor="yellow" right="-30vh" bottom="-60vh" />
            <h1 className={styles.title}>Get in touch</h1>
            <form className={styles.form}>
                <input className={styles.inputS} placeholder="username" />
                <input className={styles.inputS} placeholder="phone number" />
                <input className={styles.inputL} placeholder="Email" />
                <input className={styles.inputL} placeholder="Subject" />
                <text className={styles.textarea} placeholder="Message" row={6} />
                <button className={styles.buttonF}>SUBMIT</button>
            </form>
        </div>
    )
}

export default contact