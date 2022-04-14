import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import styles from '../styles/product.module.css'

import { withRouter } from 'next/router'


const Detail = (props) => {
    let i = props.router.query.i
    const [currentItems, setCurrentItems] = useState(null);
    const [localItems, setLocalItems] = useState(null);
    const [error, setError] = useState(null);


    const fetchLocal = async () => {
        try {
            var config = {
                method: 'get',
                url: 'http://209.97.133.58:8000/pet/get_pets?limit=30',

            };

            const localData = await axios(config)


            setLocalItems(localData.data.pets)
            const json = await petResults.json();


            setCurrentItems(json.animals)
        } catch (error) {
            setError(error)

        }

    }
    useEffect(() => {
        fetchLocal()

    }, [])
    const id = parseInt(i)
    console.log(localItems)
    return (
        <div className={styles.container}>
            {localItems ? localItems.map(function (service, m) {

                if (id === m) {
                    console.log(id, m)
                    return (


                        <div className={styles.cardL}>
                            <>
                                {service.photos ? (

                                    service.photos.map((photo, i) => (
                                        <div key={i} className={styles.imgContainer} >
                                            <Image src={photo.url}
                                                width="100%"
                                                height="100%"
                                                layout='responsive'
                                                objectFit='cover'

                                                alt={service.name} />
                                        </div>
                                    ))
                                ) : (<Image src='/img/no.png'
                                    width="100"
                                    height="100%"
                                    layout='responsive'
                                    objectFit='cover'
                                    alt={service.name} />)}
                            </>


                            <div className={styles.cardS}>
                                <div className={styles.title}>{service.type}</div>
                                <div className={styles.desc}>{service.age ? 'Age :' + service.age : null}</div>
                                <div className={styles.desc}>{service.gender ? 'Gender :' + service.gender : null}</div>
                                <div className={styles.desc}>{service.good_with_children ? 'Good with children ' : 'May attack children'}</div>
                                <button className={styles.button}>

                                    <Link href={`/adopts/${service.pet_id}`}>Adopt</Link>
                                </button>

                            </div>


                        </div>
                    )
                } else {
                    return null
                }



            }
            )
                : ''}
        </div>
    )
}




export default withRouter(Detail)