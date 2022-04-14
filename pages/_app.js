import Layout from '../components/Layout'
import React, { createContext, useEffect, useState } from 'react'
import '../styles/globals.css'
export const Context = createContext(null);
function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState(null)
  useEffect(() => {

    fetchToken()
  }, [])
  const fetchToken = async () => {
    const res = await fetch('/api/oath-token');
    const json = await res.json()
    setAccessToken(json.access_token)

  }

  return (

    <Layout >
      <Component {...pageProps} />

    </Layout>

  )
}

export default MyApp
