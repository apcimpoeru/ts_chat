import type { NextPage } from 'next'
import Header from '../components/header/header'
import Test from '../components/test/test'
import Test2 from '../components/test2/test2'
import TS_wrapper from '../components/TS_Chat/TS_wrapper' 
import headerJSON from '../data/header.json'
import { useEffect } from 'react'

const Home: NextPage = () => {

    useEffect(() => {
        console.log(headerJSON);
    }, []);


    return (
        <>
            <Header/>
            <TS_wrapper/>
        </>
    )
}

export default Home
