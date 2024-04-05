/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { getVisitor } from "../lib/helper";
import { getDate, getDay, getMonth, getYear, getTime } from "../lib/getDate";
import { resolve } from 'styled-jsx/css';
import { getLocation } from '@/lib/getLocation';
import { useCountUp } from 'react-countup';
import { Spinner } from '@/components/common/Spinner';
const PageOne = ({ primaryFont }) => {
    const countUpRefOne = useRef(null);
    const countUpRefTwo = useRef(null);

    const [isBtnClick, setIsBtnClick] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [visitor, setVisitor] = useState();
    const [count, setCount] = useState()
    const [isLoad, setIsLoad] = useState(true);

    const [location, setLocation] = useState(null)
    const [date, setDate] = useState([{
        currentDay: getDay(),
        currentDate: getDate(),
        currentMonth: getMonth(),
        currentYear: getYear(),
        currentTime: getTime(),
    }])
    function testHandler() {
        setIsClicked(!isClicked);
    }
    const { countUp: countUpOne, start: startOne, pauseResume: pauseResumeOne, reset: resetOne, update: updateOne } = useCountUp({
        ref: countUpRefOne,
        end: 175.31,
        duration: 5,
        startOnMount: false,
        decimals: 2,

        onEnd: () => {
            setIsBtnClick(false);
        }
    });

    const { countUp: countUpTwo, start: startTwo, pauseResume: pauseResumeTwo, reset: resetTwo, update: updateTwo } = useCountUp({
        ref: countUpRefTwo,
        end: 100, // Example end value for the second count-up
        duration: 5,
        startOnMount: false,
        decimals: 2,

        onEnd: () => {
            setIsBtnClick(false);
        }
    });

    // Then you can use these count-up animations in your UI as needed


    function countHandlerOne() {
        setIsBtnClick(true);
        startOne();
        setCount(countUpOne)

    }

    function countHandlerTwo() {
        setIsBtnClick(true);
        startTwo();
        setCount(countUpTwo)

    }

    useEffect(() => {
        const loc = getLocation();
        loc.then(res => setLocation(res));
        const visitorData = JSON.parse(localStorage.getItem("visitor"));
        if (visitorData === null) {
            let visitorAPI = getVisitor();
            visitorAPI.then(res => setVisitor(res));
        }
        else {
            setVisitor(visitorData);

        }

        setIsLoad(false);


    }, [])

    return <React.Fragment>

        <React.Fragment>
            {isLoad ? <Spinner /> :
                <div className={`hidden font-${primaryFont} ${isClicked ? 'h-[130dvh] ' : 'h-[100dvh] '} sm:h-screen w-screen bg-black sm:flex flex-col  justify-between overflow-hidden`}>
                    {
            /* ************** other screen */}

                    <header className='hidden bg-red- sm:flex items-center justify-between lg:pt-4  xl:px-6  2xl:px-12 2xl:pt-8'>
                        <img src="/assets/ZF-logo.svg" className='w-[50px] lg:w-[70px] 2xl:w-[97px] cursor-pointer' alt="" />
                        <p className='text-[10px] xl:text-[14px] 2xl:text-[20px] tracking-[1.5px] 2xl:tracking-[3px] opacity-80 text-[#ffff] uppercase bg-green-00 xl:mr-8 2xl:mr-0 '>Your internet Speed</p>
                        <img src={visitor?.visitor_data.country.app_icon} className='w-[20px] lg:w-[40px] 2xl:w-[50px] ' alt="country-Flag" />
                    </header>

                    {/* **************Section for other screen */}
                    {/* <div className={` `}> */}

                    <section className={` ${isClicked ? 'opacity-20' : 'opacity-100'} relative xl:-mt-5 2xl:-mt-0 3xl:mt-[20px] self-end text-[rgb(255,255,255)] hidden lg:flex flex-col items-center  space-x-10  lg:space-x-5 mr-5 2xl:px-7  3xl:px-8`}>
                        <div className={`flex items-center space-x-5`} >
                            <p className={` text-[150px] lg:text-[250px] 2xl:text-[294px] 3xl:text-[395px] tracking-[14px] 3xl:tracking-[17px]`} ref={countUpRefOne}> {count || 0}</p>
                            <div className='flex flex-col items-center text-[22px] xl:text-[30px] 3xl:text-[42px] space-y-2 xl:space-y-5 3xl:xl:space-y-8 lg:mt-6 2xl:mt-[40px] 3xl:mt-[50px]'>
                                <p>Mbps</p>
                                <div className={`${isBtnClick ? "block" : "hidden"}`}> <button ><img src="/assets/ZIFI-Circle-Download-Green.png" className='w-[34px] lg:w-[80px] 2xl:w-[100px] 3xl:w-[130px]' alt="" /></button></div>
                                <div className={`relative ${isBtnClick ? "hidden" : "block"} cursor-pointer`} onClick={countHandlerOne} >
                                    <button ><img src="/assets/ZIFI Circle Test.png" className='w-[34px] lg:w-[80px] 2xl:w-[100px] 3xl:w-[119px] ' alt="" /></button>
                                    <p className='text-[#ffff] text-[25px] 2xl:text-[28px] 3xl:text-[34px] absolute xl:top-5 xl:right-5 2xl:top-7 2xl:right-[28px] 3xl:top-[2.1rem] 3xl:right-[33px]'>GO</p>
                                </div>


                            </div>
                        </div>

                        <div>
                            <p onClick={testHandler} className={`absolute tracking-[2px] cursor-pointer uppercase xl:bottom-0 xl:right-2 2xl:bottom-0 3xl:bottom-0 3xl:right-14 2xl:right-10  text-[14px] xl:text-[16px] 2xl:text-[20px] text-[#ffff] -mt-5 opacity-50 hover:opacity-100 hover:transition-all ease-in-out duration-50`}>more information</p>
                        </div>





                    </section>

                    <div className={` absolute top-20 left-4 xl:top-20 xl:left-2 2xl:top-36 2xl:left-0 3xl:top-[330px] 3xl:left-0   ${isClicked ? 'block' : 'hidden'}`}>
                        <section className={`hidden sm:flex flex-col-reverse lg:flex-row justify-between xl:space-x-[490px] 2xl:space-x-[340px] 3xl:space-x-[540px]`} >
                            <div className='ml-5 mr-5 py-5 lg:ml-4 lg:mr-5 lg:py-5 2xl:ml-12 2xl:mr-10 2xl:py-10 space-y-5 2xl:space-y-14 -mt-2 xl:-mt-10 2xl:-mt-28 3xl:-mt-60'>
                                <div className='hidden sm:block'>
                                    <p className=' text-[12px] 2xl:text-[16px] 3xl:text-[20px] text-[#ffff]  opacity-50 tracking-[1.5px] uppercase mt-6 2xl:mt-12 3xl:mt-2'>more information</p>
                                </div>
                                <div onClick={testHandler} className='hidden sm:block cursor-pointer '>
                                    <img src="/assets/Arrow-Back-W-Web.svg" className='w-[18px] lg:w-[25px] 3xl:w-[30px] 2xl:-mt-5 3xl:mt-0' alt="" />
                                </div>

                                <div className='flex  justify-start  '>
                                    <div className='flex items-center space-x-10 tracking-[1.5px] leading-[20px] xl:leading-[23px] 2xl:leading-[30px] 3xl:leading-[40px]'>
                                        <div className='space-y-5 sm:space-y-10 xl:space-y-5  3xl:space-y-10'>
                                            <div className='flex items-center space-x-5 2xl:space-x-12'>
                                                <div>
                                                    <img src={visitor?.visitor_data.country.app_icon} className='w-[25px] lg:w-[30px] 2xl:w-[50px] ' alt="" />
                                                </div>
                                                <div className='flex items-center space-x-20 xl:space-x-[85px] 2xl:space-x-[110px] 3xl:space-x-[120px]'>
                                                    <div className='text-[10px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[20px] text-[#ffff] opacity-50'>
                                                        <p>CITY</p>
                                                        <p>COUNTRY</p>

                                                    </div>
                                                    <div className='text-[10px] lg:text-[12px] 2xl:text-[16px] 3xl:text-[20px] text-[#ffff] uppercase'>
                                                        <p>{visitor?.visitor_data.cityName} </p>
                                                        <p>{visitor?.visitor_data.country.name}</p>
                                                    </div>
                                                </div>

                                            </div>


                                            <div className='flex space-x-6 xl:space-x-5 2xl:space-x-14 items-center'>
                                                <div>
                                                    <img src="/assets/ZIFI-User-Icon.svg" className='w-[22px] lg:w-[30px] 2xl:w-[43px] ' alt="" />
                                                </div>
                                                <div className='flex items-center space-x-[52px] xl:space-x-14 2xl:space-x-[68px]'>
                                                    <div className='text-[10px] lg:text-[12px]  2xl:text-[16px] 3xl:text-[20px] text-[#ffff] opacity-50'>
                                                        <p>LATITUDE</p>
                                                        <p>LONGITUDE</p>
                                                        <p>INTERNAL IP</p>
                                                        <p>EXTERNAL IP</p>
                                                        <p>MAC ADDRESS</p>
                                                    </div>
                                                    <div className='text-[10px] lg:text-[12px]  2xl:text-[16px] 3xl:text-[20px] text-[#ffff]'>
                                                        <p>{location?.latitude}</p>
                                                        <p>{location?.longitude}</p>
                                                        <p>10.0.0.186</p>
                                                        <p>82.41.174.63</p>
                                                        <p>5D:C3:07:7A:C4:88</p>
                                                    </div>
                                                </div>

                                            </div>


                                            <div className='flex items-center space-x-6 xl:space-x-5 2xl:space-x-14'>
                                                <div>
                                                    <img src="/assets/ZIFI-WiFi-Ico-W.svg" className='w-[22px] lg:w-[30px] 2xl:w-[43px] ' alt="" />
                                                </div>
                                                <div className='flex items-center space-x-[52px] xl:space-x-[58px] 2xl:space-x-[70px]'>
                                                    <div className='text-[10px] lg:text-[12px]  2xl:text-[16px] 3xl:text-[20px] text-[#ffff] opacity-50'>
                                                        <div >
                                                            <p>PROVIDER</p>
                                                            <p>ROUTER NAME</p>
                                                            <p>SERVER</p>
                                                            <p>PING</p>
                                                        </div>
                                                    </div>
                                                    <div className='text-[10px] lg:text-[12px]  2xl:text-[16px] 3xl:text-[20px] text-[#ffff]'>
                                                        <p>VIRGIN MEDIA</p>
                                                        <p>TP LINK</p>
                                                        <p>LONDON</p>
                                                        <p>12 ms</p>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='flex items-center space-x-[46px] xl:space-x-[50px] 2xl:space-x-[100px]'>
                                                <div>
                                                </div>
                                                <div className='flex items-center space-x-[110px]  xl:space-x-[125px]  2xl:space-x-[155px] 3xl:space-x-[170px]'>
                                                    <div className='text-[10px] lg:text-[12px]  2xl:text-[16px] 3xl:text-[20px] text-[#ffff] opacity-50'>
                                                        <p>DATE</p>
                                                        <p>TIME</p>

                                                    </div>
                                                    <div className='text-[10px] lg:text-[12px]  2xl:text-[16px] 3xl:text-[20px] text-[#ffff]'>
                                                        <p>27/03/2024</p>
                                                        <p>15:45</p>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>



                                </div >
                            </div>
                            <div style={{ zIndex: 1 }} className='relative flex flex-col items-center sm:items-end ml-5 mr-5  lg:ml-5 lg:mr-5 text-white  2xl:ml-10 2xl:mr-12 xl:mt-14 2xl:mt-16 3xl:-mt-[83px]'>
                                <div className='flex flex-col items-center sm:items-end -space-y-10'>
                                    <div className='flex flex-col sm:flex-row items-center space-x-3'>
                                        <p className='text-[70px] lg:text-[130px] 2xl:text-[160px] 3xl:text-[200px]'>175.31</p>
                                        <div className='sm:hidden'><p className='text-[10px] xl:text-[16px] -mt-3 lg:mt-0 tracking-[2px] '>DOWNLOAD</p></div>

                                        <div className='flex items-center sm:block text-[25px] xl:text-[16px]  2xl:text-[30px] space-x-2 sm:space-x-0 sm:space-y-2 lg:space-y-5'>
                                            <button onClick={'testHandler'} className='block sm:hidden cursor-pointer '>
                                                <img src="/assets/ZIFI-Arrow-Green.svg" className=' w-[23px] 2xl:w-[30px] 3xl:w-[43px] ' alt="" />
                                            </button>
                                            <p className='tracking-[2px]'>Mbps</p>
                                            <button onClick={'testHandler'} className='hidden sm:block cursor-pointer '>
                                                <img src="/assets/ZIFI-Arrow-Green.svg" className=' w-[23px] 2xl:w-[30px] 3xl:w-[43px]' alt="" />
                                            </button>
                                        </div>

                                    </div>
                                    <div className='hidden sm:block'><p className='text-[10px] lg:text-[10px] 2xl:text-[16px] mt-5 lg:mt-0 tracking-[2px]'>DOWNLOAD</p></div>
                                </div>

                                <div className='flex flex-col items-center sm:items-end -space-y-10 '>
                                    <div className='flex flex-col sm:flex-row items-center space-x-3'>
                                        <p className='text-[70px] lg:text-[130px] 2xl:text-[160px] 3xl:text-[200px]'>52.97</p>
                                        <div className='sm:hidden'><p className='text-[10px] xl:text-[16px] -mt-3 lg:mt-0 tracking-[2px]'>UPLOAD</p></div>

                                        <div className='flex items-center sm:block text-[25px] xl:text-[16px]  2xl:text-[30px] space-x-2 sm:space-x-0 sm:space-y-2 lg:space-y-5'>
                                            <button onClick={'testHandler'} className='block sm:hidden cursor-pointer '>
                                                <img src="/assets/ZIFI-Upload-Arrow-Purple.svg" className=' w-[23px] 2xl:w-[30px] 3xl:w-[43px] ' alt="" />
                                            </button>
                                            <p className='tracking-[2px]'>Mbps</p>
                                            <button onClick={'testHandler'} className='hidden sm:block cursor-pointer '>
                                                <img src="/assets/ZIFI-Upload-Arrow-Purple.svg" className=' w-[23px] 2xl:w-[30px] 3xl:w-[43px] ' alt="" />
                                            </button>
                                        </div>

                                    </div>
                                    <div className='hidden sm:block'><p className='text-[10px] lg:text-[10px] 2xl:text-[16px] mt-5 lg:mt-0 tracking-[2px]'>UPLOAD</p></div>
                                </div>



                            </div>
                        </section >
                    </div>

                    {/* </div> */}



                    {/* **************Footer for Other screen */}

                    <footer className='hidden sm:flex items-center justify-between ml-5 mr-5 py-1 lg:ml-0 lg:mr-0 lg:py-5 xl:px-6 2xl:ml-0 2xl:mr-0 2xl:px-12 2xl:pb-8'>
                        <div>
                            <a href="https://zimomeet.com/"> <img src="/assets/ZIG-ZIMO-GROUP-W.svg" className='w-[80px] lg:w-[115px] 2xl:w-[148px]' alt="" />
                            </a>
                        </div>
                        <div className='flex items-center space-x-5 xl:space-x-14 2xl:space-x-10'>
                            <a href="https://zitransfer.com/"> <img src="/assets/ZTFR-w.svg" className='w-[60px] lg:w-[70px] 2xl:w-[103px]' alt="" /></a>
                            <a href="https://zimomeet.com/">  <img src="/assets/ZIMO-MEET-masked-W.svg" className='w-[40px] lg:w-[60px] 2xl:w-[79px]' alt="" /></a>
                        </div>
                    </footer>



                </div>
            }
        </React.Fragment >

        {/* **************Section for Mobile screen */}

        <div className=' flex h-[100dvh] flex-col bg-black  items-center justify-between  sm:hidden overflow-hidden'>
            <nav className='flex flex-row w-full items-center justify-between pt-3  px-5    '>
                <img onClick={testHandler} src="/assets/arrow.svg" className={`w-[18px] ${isClicked ? 'opacity-100' : 'opacity-0'} `} alt="" />
                <img src="/assets/ZF-logo.svg" className='w-[48px] cursor-pointer' alt="" />
                <img src={visitor?.visitor_data.country.app_icon} className='w-[25px] lg:w-[30px] 2xl:w-[50px] ' alt="" />
            </nav>
            <div>
                <div className={`  text-[#ffff] text-center ${isClicked ? 'block' : 'hidden'}   text-[12px] tracking-[1.5px] `}>
                    <p className='uppercase '>more information</p>
                </div>
                <div className={`block text-[#ffff] text-center -mt-[100px] sm:hidden text-[12px] tracking-[1.5px]   ${!isClicked ? 'block' : 'hidden'}  `}>
                    <p>YOUR INTERNET SPEED</p>
                </div>
            </div>



            <div className='-'>

                <section className={` text-[#ffff] sm:hidden  flex justify-center items-start -mt-[100px] ${!isClicked ? 'block' : 'hidden'}`}>

                    <div className='flex flex-col  items-center '>

                        <div className='flex flex-col items-center  '>
                            <span className='text-[120px] -mb-8  ' ref={countUpRefTwo}> {count || 0}</span>
                            <span className='text-[30px]'>Mbps</span>
                        </div>

                        <div>
                            <div onClick={testHandler} className={`mt-10 tracking-[2px]`}>
                                <p className='uppercase text-[#ffff] text-[12px] opacity-70'>more information</p>
                            </div>
                        </div>

                        <div className=''>
                            <div className={`relative ${isBtnClick ? "block" : "hidden"}`}>
                                <button className='cursor-pointer'><img src="/assets/ZIFI-Circle-Download-Green.svg" className='w-[80px]  mt-10' alt="" /></button>
                            </div>

                            <div className={`relative ${!isBtnClick ? "block" : "hidden"}`} onClick={countHandlerTwo} >
                                <button className=' cursor-pointer'><img src="/assets/ZIFI Circle Test.svg" className='w-[80px]  mt-10' alt="" /></button>
                                <p className='text-[#ffff] text-[25px]  absolute top-[63px] right-[23px]'>GO</p>
                            </div>


                        </div>
                    </div>


                </section>

                <section className={` flex flex-col jusitfy-between ${isClicked ? 'block' : 'hidden'} `}>

                    <div >
                        <div className='relative flex flex-col justify-center items-center text-white  '>
                            <div className='flex flex-col items-center '>
                                <div className='flex flex-col items-center space-x-3'>
                                    <p className='text-[80px] '>175.31</p>
                                    <div className='sm:hidden'><p className='text-[14px]  -mt-3  tracking-[2px] '>DOWNLOAD</p></div>

                                    <div className='flex items-center text-[24px] tracking-[2px] space-x-2 '>
                                        <button onClick={'testHandler'} className='block cursor-pointer '>
                                            <img src="/assets/ZIFI-Arrow-Green.svg" className=' w-[14px] ' alt="" />
                                        </button>
                                        <p>Mbps</p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col items-center  '>
                                <div className='flex flex-col  items-center space-x-3'>
                                    <p className='text-[80px] '>52.97</p>
                                    <div className='sm:hidden'><p className='text-[14px]  -mt-3 lg:mt-0 tracking-[2px]'>UPLOAD</p></div>

                                    <div className='flex items-center text-[24px] tracking-[2px]  space-x-2'>
                                        <button onClick={'testHandler'} className='block sm:hidden cursor-pointer '>
                                            <img src="/assets/ZIFI-Upload-Arrow-Purple.svg" className=' w-[14px]  ' alt="" />
                                        </button>
                                        <p>Mbps</p>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='-ml-9 mt-5'>
                        <div className='flex   tracking-[1.5px] leading-[20px]'>
                            <div className='space-y-7'>
                                <div className='flex items-center space-x-5 '>
                                    <div>
                                        <img src={visitor?.visitor_data.country.app_icon} className='w-[25px] ' alt="" />
                                    </div>
                                    <div className='flex text-[10px] items-center space-x-[77px] '>
                                        <div className='  text-[#ffff] opacity-50'>
                                            <p>CITY</p>
                                            <p>COUNTRY</p>

                                        </div>
                                        <div className=' text-[#ffff] uppercase'>
                                            <p>{visitor?.visitor_data.cityName} </p>
                                            <p>{visitor?.visitor_data.country.name}</p>
                                        </div>
                                    </div>

                                </div>


                                <div className='flex space-x-6 items-center'>
                                    <div>
                                        <img src="/assets/ZIFI-User-Icon.svg" className='w-[22px] ' alt="" />
                                    </div>
                                    <div className='flex text-[10px] items-center space-x-[52px] '>
                                        <div className=' text-[#ffff] opacity-50'>
                                            <p>LATITUDE</p>
                                            <p>LONGITUDE</p>
                                            <p>INTERNAL IP</p>
                                            <p>EXTERNAL IP</p>
                                            <p>MAC ADDRESS</p>
                                        </div>
                                        <div className='  text-[#ffff]'>
                                            <p>{location?.latitude}</p>
                                            <p>{location?.longitude}</p>
                                            <p>10.0.0.186</p>
                                            <p>82.41.174.63</p>
                                            <p>5D:C3:07:7A:C4:88</p>
                                        </div>
                                    </div>

                                </div>


                                <div className='flex items-center space-x-6 '>
                                    <div>
                                        <img src="/assets/ZIFI-WiFi-Ico-W.svg" className='w-[22px] ' alt="" />
                                    </div>
                                    <div className='flex text-[10px] items-center space-x-[52px] '>
                                        <div className='  text-[#ffff] opacity-50'>
                                            <div >
                                                <p>PROVIDER</p>
                                                <p>ROUTER NAME</p>
                                                <p>SERVER</p>
                                                <p>PING</p>
                                            </div>
                                        </div>
                                        <div className='  text-[#ffff]'>
                                            <p>VIRGIN MEDIA</p>
                                            <p>TP LINK</p>
                                            <p>LONDON</p>
                                            <p>12 ms</p>
                                        </div>
                                    </div>

                                </div>

                                <div className='flex text-[10px] items-center space-x-[45px] '>
                                    <div>
                                    </div>
                                    <div className='flex items-center text-[10px] space-x-[100px] '>
                                        <div className='  text-[#ffff] opacity-50'>
                                            <p>DATE</p>
                                            <p>TIME</p>

                                        </div>
                                        <div className=' text-[#ffff]'>
                                            <p>27/03/2024</p>
                                            <p>15:45</p>

                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </section>


            </div>


            {/* Mobile screen */}
            <footer className='flex items-center justify-between w-full px-5 pb-3    sm:hidden'>
                <a href="https://zitransfer.com/"><img src="/assets/ZTFR-w.svg" className=' w-[59px] cursor-pointer' alt="" /></a>

                <a href="https://zimomeet.com/"> <img src="/assets/ZIG-ZIMO-GROUP-W.svg" className='w-[84px] cursor-pointer' alt="" />
                </a>

                <a href="https://zimomeet.com/"> <img src="/assets/ZIMO-MEET-masked-W.svg" className='w-[45px] cursor-pointer' alt="" /></a>
            </footer>
        </div>

    </React.Fragment>


}

export default PageOne