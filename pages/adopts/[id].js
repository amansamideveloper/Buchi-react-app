import React, { useState, useEffect } from 'react'
import styles from '../../styles/contact.module.css'
import Circles from '../../components/Circle'
import axios from 'axios'
import { useRouter } from 'next/router'
const Adopt = () => {
    const id = useRouter().query.id

    const [name, setName] = useState(null)
    const [response, setResponse] = useState(null)
    const [adopt, setAdpt] = useState(null)
    const [phoneNumber, setphoneNumber] = useState(null)
    const [error, setError] = useState(null)
    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            phone: phoneNumber

        }
        try {
            const customer = await axios.post(`http://209.97.133.58:8000/customer/add_customer`,
                data, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                }
            })


            const customer_id = await customer.data.customer_id
            console.log('costumerrrrr', customer_id)
            const reqAdopt = {
                customer_id: customer_id,
                pet_id: id
            }
            const adopt = await axios.post(`http://209.97.133.58:8000/adoption/adopt`, reqAdopt, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                }
            })
            setAdpt(adopt)
        } catch (error) {
            setError(error)
        }
    }

    if (adopt?.data?.status === 'success') return (

        <div className={styles.container}>
            <Circles backgroundColor="green" left="-40vh" top="-20vh" />
            <Circles backgroundColor="yellow" right="-30vh" bottom="-60vh" />
            <div><h3>Congratulation</h3><p>we are setup meeting with your companion soon</p></div>

            <h1 className={styles.title}></h1>

        </div>
    )
    return (

        <div className={styles.container}>
            <Circles backgroundColor="green" left="-40vh" top="-20vh" />
            <Circles backgroundColor="yellow" right="-30vh" bottom="-60vh" />

            {error ? <div><h3>Connection failed</h3></div> : ''}
            <h1 className={styles.title}></h1>
            <form className={styles.form1} onSubmit={onSubmit}>
                <input name='name' value={name} onChange={e => setName(e.target.value)} className={styles.inputS} placeholder="Name" />
                <input name='phonenumber' onChange={e => setphoneNumber(e.target.value)} value={phoneNumber} className={styles.inputS} placeholder="phone number" />

                <button className={styles.btn} type='submit'>Adopt</button>
            </form>
        </div>
    )
}

export default Adopt