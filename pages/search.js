import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '../styles/services.module.css'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Search = () => {
    const [currentItems, setCurrentItems] = useState(null);
    const [goodWithChildren, setGoodWithChildren] = useState(null)
    const [age, setAge] = useState(null)
    const [types, setTypes] = useState(null)
    const [size, setSize] = useState(null)
    const [gender, setGender] = useState(null)

    const [localItems, setLocalItems] = useState(null);
    const clientId = 'Fn3yNj9x3TeI8mbR1H6pUvwrYkGeo6tJIjKhjHhK81Y7O6QfhZ'
    const clientSecret = 'MuCuL3EIUZR6XvplrjDW6VKQd8bYO9owxnP8RZX0'
    const checkgood = goodWithChildren || 1;
    const checkage = age || 'baby'
    const checkSize = size || 'small'
    const checkgender = gender || 'male'
    const checkTypes = types || 'dog'
    const [error, setError] = useState(null);
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
    const fetchResults = async () => {
        try {
            const accessToken = await fetchToken()

            const petResults = await fetch(
                `https://api.petfinder.com/v2/animals`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const json = await petResults.json();

            setCurrentItems(json.animals);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        fetchResults()
    }, [])
    function onSubmit(e) {
        e.preventDefault();
        let baseURL = 'https://api.petfinder.com/v2/animals?'

        const fetchResults = async () => {
            const accessToken = await fetchToken()
            baseURL = `${baseURL}good_with_children=${checkgood}&age=${checkage}&gender=${checkgender}&size=${checkSize}&type=${checkTypes}`


            const petResults = await fetch(
                baseURL,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const json = await petResults.json();
            setCurrentItems(json.animals)
        }
        fetchResults()
    }
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Pets Gallery</h1>
                <form className={styles.form} onSubmit={onSubmit}>
                    <div className={styles.cont}>
                        <label>Types</label>
                        <select className={styles.inputS} value={types}
                            onChange={(e) => {
                                setTypes(e.target.value);
                            }}>
                            <option></option>
                            <option value='cat'>Cat</option>
                            <option value='dog'>Dog</option>
                        </select>
                    </div>
                    <div className={styles.cont}>
                        <label>Good with chilldren</label>
                        <select className={styles.inputS} value={goodWithChildren}
                            onChange={(e) => {
                                setGoodWithChildren(e.target.value);
                            }}>
                            <option></option>
                            <option value='1'>Yes</option>
                            <option value='0'>No</option>
                        </select>
                    </div>
                    <div className={styles.cont}>
                        <label>Age</label>
                        <select className={styles.inputS} value={age}
                            onChange={(e) => {
                                setAge(e.target.value);
                            }}>
                            <option value='adult'>adult</option>
                            <option value='baby'>baby</option>
                            <option value='senior'>senior</option>
                            <option value='young'>young</option>
                        </select>
                    </div>
                    <div className={styles.cont}>
                        <label>Gender</label>
                        <select className={styles.inputS} value={gender} onChange={(e) => {
                            setGender(e.target.value);
                        }}>
                            <option></option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                    </div>
                    <div className={styles.cont}>
                        <label>Size</label>
                        <select className={styles.inputS} value={size} onChange={(e) => {
                            setSize(e.target.value);
                        }}>
                            <option value='small'>small</option>
                            <option value=' medium'>medium</option>
                            <option value=' large'>large</option>
                            <option value=' xlarge'>xlarge</option>
                        </select>
                    </div>
                    <div className={styles.cont}> <button type='submit' className={styles.inputA}>SUBMIT</button></div>

                </form>
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

export default Search