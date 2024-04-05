/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { IMAGES } from "../../lib/media";
import Offline from '../../components/common/Offline'
import RefreshSvg from '@/components/common/RefreshSvg';
const NoInternetConnection = (props) => {
    const [isOnline, setOnline] = useState(true);
    const [url, setUrl] = useState();


    // On initization set the isOnline state.
    useEffect(() => {
        const storedImages = JSON.parse(localStorage.getItem('objectURLs'));
        setUrl(storedImages)
        setOnline(navigator.onLine);
        window.addEventListener('online', () => {
            setOnline(true)
        });

        window.addEventListener('offline', () => {
            setOnline(false)
        });

    }, [])
    const openSystemNetworkSettings = () => {

        window.open('ms-settings:network', '_blank'); // Opens in a new tab/window
    };
    // event listeners to update the state 
    console.log(url?.refresh_no_internet_connection);
    if (isOnline) {
        return (
            props.children
        )
    } else {
        return (
            <div className='bg-black  sm:h-screen w-screen opacity-[0.90]'>
                <div className='flex flex-col items-center pt-8 sm:pt-12 2xl:pt-28 justify-between h-[100dvh] sm:h-screen uppercase text-white'>
                    <p className='text-white tracking-[1.5px] 2xl:tracking-[4px] text-[8px] sm:text-[14px] 2xl:text-[18px] opacity-70 '>you don`t seem to be connected to the internet</p>
                    <div className='flex flex-col items-center space-y-5 sm:space-y-6  2xl:space-y-16 '>
                        <Offline />
                        <p className='text-[10px] sm:text-[14px] 2xl:text-[20px] tracking-[1.5px] 2xl:tracking-[3px] opacity-70 '>no internet connection</p>
                        <div className='flex items-center space-x-1 2xl:space-x-3 opacity-70 '>
                            <p className='text-[10px] sm:text-[14px] 2xl:text-[20px] tracking-[1.5px] 2xl:tracking-[3px]'>check your connection or try again</p>
                            <RefreshSvg />
                        </div>
                        <p onClick={openSystemNetworkSettings} className='text-[8px] sm:text-[12px] 2xl:text-[18px] tracking-[1.5px] 2xl:tracking-[3px] opacity-50 cursor-pointer hover:opacity-100'>internet setting</p>
                    </div>
                    <div className='self-start pb-5 2xl:pb-10 px-5 xl:px-10'>
                        <img src="/assets/ZIG-ZIMO-GROUP-W.svg" className='w-[80px] sm:w-[120px] 2xl:w-[148px] ' alt="" />
                    </div>
                </div>
            </div>
        )
    }


}

export default NoInternetConnection