import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '../styles/services.module.css'
import Image from 'next/image'
import ReactPaginate from 'react-paginate';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';
import { useRouter } from 'next/router'
const Services = ({ accessToken }) => {

    const [currentItems, setCurrentItems] = useState(null);
    const [localItems, setLocalItems] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter()
    useEffect(() => {

        const fetchResults = async () => {
            try {
                const petResults = await fetch(
                    `https://api.petfinder.com/v2/animals`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );



                const json = await petResults.json();
                setCurrentItems(json.animals)
            } catch (error) {
                console.log(error)
            }

        }
        const fetchLocal = async () => {
            try {
                var config = {
                    method: 'get',
                    url: 'http://209.97.133.58:8000/pet/get_pets?limit=30',

                };

                const localData = await axios(config)


                setLocalItems(localData.data.pets)
                const json = await petResults.json();

                console.log(localItems.json())
                setCurrentItems(json.animals)
            } catch (error) {
                setError(error)
            }

        }
        if (accessToken === null) return;

        fetchResults()
        fetchLocal()

    }, [])
    const goToDetail = (i) => {
        router.push({ pathname: '/details', query: { i } })
    }

    return (
        <>

            <div className={styles.container}>
                <h1 className={styles.title}>Pets from localhost</h1>
                <h1 className={styles.subtitles}>you can choose any pets here</h1>
                <div className={styles.services}>

                    {localItems ? localItems.map((service, i) => (
                        <div key={i} onClick={() => goToDetail(i)} >
                            <div className={styles.service}>
                                {/* {console.log(service)} */}
                                <div className={styles.desc}>{service.gender}</div>
                                <span className={styles.cat}>{service.age}</span>
                                <div className={styles.media}>
                                    {service.photos && service.photos[0] && service.photos[0].url ? (
                                        <Image src={service.photos[0].url}
                                            width="100"
                                            height="100%"
                                            layout='responsive'
                                            objectFit='cover'
                                            alt={service.name} />
                                    ) : (<Image src='/img/no.png'
                                        width="100"
                                        height="100%"
                                        layout='responsive'
                                        objectFit='cover'
                                        alt={service.name} />)}
                                </div>
                            </div>
                        </div>
                    )) : <Skeleton count={10} />}

                </div>
            </div>

            <div className={styles.container}>
                <h1 className={styles.title}>Pets from petfinder</h1>
                <h1 className={styles.subtitles}>you can choose any pets here</h1>
                <div className={styles.services}>

                    {currentItems ? currentItems.map(service => (
                        <Link passHref key={service.id} href={`/products/${service.id}`}>
                            <div className={styles.service}>
                                <div className={styles.desc}>{service.description}</div>
                                <span className={styles.cat}>{service.name}</span>
                                <div className={styles.media}>
                                    {service.photos && service.photos[0] && service.photos[0].full ? (
                                        <Image src={service.photos[0].full}
                                            width="100"
                                            height="100%"
                                            layout='responsive'
                                            objectFit='cover'
                                            alt={service.name} />
                                    ) : (<Image src='/img/no.png'
                                        width="100"
                                        height="100%"
                                        layout='responsive'
                                        objectFit='cover'
                                        alt={service.name} />)}
                                </div>
                            </div>
                        </Link>
                    )) : <Skeleton count={10} />}

                </div>
            </div>


        </>
    )
}

export default Services