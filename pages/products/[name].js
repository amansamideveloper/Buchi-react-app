import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../_app'
import Skeleton from 'react-loading-skeleton'
import styles from '../../styles/product.module.css'
import { useRouter } from 'next/router'


const Product = () => {


    console.log(useRouter())


    const [currentItem, setCurrentItem] = useState(null);

    const id = useRouter().query.name;
    const gender = useRouter().query.gender;
    const age = useRouter().query.age;
    const good_with_children = useRouter().query.good_with_children;
    const size = useRouter().query.good_with_children;
    const source = useRouter().query.source;
    const type = useRouter().query.type;


    const fetchResults = async () => {

        try {

            const clientId = 'Fn3yNj9x3TeI8mbR1H6pUvwrYkGeo6tJIjKhjHhK81Y7O6QfhZ'
            const clientSecret = 'MuCuL3EIUZR6XvplrjDW6VKQd8bYO9owxnP8RZX0'
            const fetchToken = async () => {
                const params = new URLSearchParams();
                params.append("grant_type", "client_credentials")
                params.append("client_id", clientId)
                params.append("client_secret", clientSecret)
                const petFinderRes = await fetch(
                    'https://api.petfinder.com/v2/oauth2/token',
                    {
                        method: 'POST',
                        body: params
                    }
                );
                const data = await petFinderRes.json()
                data = await data.access_token

                return data
            }
            const accessToken = await fetchToken()

            const petResults = await fetch(
                `https://api.petfinder.com/v2/animals/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const json = await petResults.json();

            setCurrentItem(json.animal);


        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {

        fetchResults()
    }, [])
    if (source)
        return (
            <div className={styles.container}>
                <>

                    <div className={styles.cardS}>
                        <div className={styles.title}>{gender}</div>
                        <p className={styles.desc}>{age}</p>
                        <p className={styles.desc}>Good with children {good_with_children}</p>
                        <p className={styles.desc}>size {size}</p>
                        <p className={styles.desc}>type {type}</p>

                        <button className={styles.button}>

                            <Link href={`/adopts/${id}`}>Adopt</Link>
                        </button>
                    </div>
                </>




            </div>

        )
    return (
        <div className={styles.container}>
            {currentItem ? (<>
                <div className={styles.cardL}>

                    <>
                        {currentItem.photos ? (

                            currentItem.photos.map((photo, i) => (
                                <div key={i} className={styles.imgContainer} >
                                    <Image src={photo.full}
                                        width="100%"
                                        height="100%"
                                        layout='responsive'
                                        objectFit='cover'
                                        alt={currentItem.name} />
                                </div>
                            ))
                        ) : (<Image src='/img/no.png'
                            width="100"
                            height="100%"
                            layout='responsive'
                            objectFit='cover'
                            alt={currentItem.name} />)}
                    </>
                </div>

                <div className={styles.cardS}>
                    <div className={styles.title}>{currentItem.species}</div>
                    <p className={styles.desc}>{currentItem.description}</p>
                    <p className={styles.desc}><span>{currentItem.contact.emai ? 'Email Address' : ''} </span>{currentItem.contact?.email}</p>
                    <p className={styles.desc}><span>{currentItem.contact.phonenumber ? 'Phone number' : ''} </span>{currentItem.contact?.phonenumber}</p>

                </div>
            </>
            ) : (<Skeleton count={10} />)}



        </div>
    )
}




export default Product