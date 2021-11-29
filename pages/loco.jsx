import { useRef } from 'react'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'


export default function loco() {
    const containerRef = useRef(null)
    return (
        <div
            // className='fixed inset-0'
            style={{ zIndex: '999999999999999999999999' }}
        >
            <LocomotiveScrollProvider
                options={
                    {
                        smooth: true,
                    }
                }
                watch={
                    [
                    ]
                }
                containerRef={containerRef}
            >
                <main
                    data-scroll-container
                    ref={containerRef}
                    className=''
                    id="js-scroll"
                >
                    <div
                        // data-scroll
                        // data-scroll-class='inView'
                        // data-scroll-sticky
                        className="w-full h-30rem bg-blue-200 border border-gray-900"></div>
                    {/* <div
                        // data-scroll
                        // data-scroll-sticky
                        data-scroll-section
                        id="scroll-direction"
                    > */}
                        <div
                            data-scroll
                            data-scroll-sticky
                            data-scroll-target="#js-scroll"
                            className="w-full h-30rem bg-red-100">hi</div>
                        <div className="w-full h-30rem bg-red-200"></div>
                        <div className="w-full h-30rem bg-red-300"></div>
                        <div className="w-full h-30rem bg-red-400"></div>
                        <div className="w-full h-30rem bg-red-500"></div>
                        <div className="w-full h-30rem bg-red-600"></div>
                        <div className="w-full h-30rem bg-red-700"></div>
                        <div className="w-full h-30rem bg-red-800"></div>
                        <div className="w-full h-30rem bg-red-900"></div>
                        <div className="w-full h-30rem bg-red-100"></div>
                        <div className="w-full h-30rem bg-red-200"></div>
                        <div className="w-full h-30rem bg-red-300"></div>
                        <div className="w-full h-30rem bg-red-400"></div>
                        <div className="w-full h-30rem bg-red-500"></div>
                        <div className="w-full h-30rem bg-red-600"></div>
                        <div className="w-full h-30rem bg-red-700"></div>
                        <div className="w-full h-30rem bg-red-800"></div>
                        <div className="w-full h-30rem bg-red-900"></div>
                        <div className="w-full h-30rem bg-red-100"></div>
                        <div className="w-full h-30rem bg-red-200"></div>
                        <div className="w-full h-30rem bg-red-300"></div>
                    {/* </div> */}
                    <div className="w-full h-30rem bg-red-400"></div>
                    <div className="w-full h-30rem bg-red-500"></div>
                    <div className="w-full h-30rem bg-red-600"></div>
                    <div className="w-full h-30rem bg-red-700"></div>
                    <div className="w-full h-30rem bg-red-800"></div>
                    <div className="w-full h-30rem bg-red-900"></div>
                    <div className="w-full h-30rem bg-red-100"></div>
                    <div className="w-full h-30rem bg-red-200"></div>
                    <div className="w-full h-30rem bg-red-300"></div>
                    <div className="w-full h-30rem bg-red-400"></div>
                    <div className="w-full h-30rem bg-red-500"></div>
                    <div className="w-full h-30rem bg-red-600"></div>
                    <div className="w-full h-30rem bg-red-700"></div>
                    <div className="w-full h-30rem bg-red-800"></div>
                    <div className="w-full h-30rem bg-red-900"></div>
                    <div className="w-full h-30rem bg-red-100"></div>
                    <div className="w-full h-30rem bg-red-200"></div>
                    <div className="w-full h-30rem bg-red-300"></div>
                    <div className="w-full h-30rem bg-red-400"></div>
                    <div className="w-full h-30rem bg-red-500"></div>
                    <div className="w-full h-30rem bg-red-600"></div>
                    <div className="w-full h-30rem bg-red-700"></div>
                    <div className="w-full h-30rem bg-red-800"></div>
                    <div className="w-full h-30rem bg-red-900"></div>
                    <div className="w-full h-30rem bg-red-100"></div>
                    <div className="w-full h-30rem bg-red-200"></div>
                    <div className="w-full h-30rem bg-red-300"></div>
                    <div className="w-full h-30rem bg-red-400"></div>
                    <div className="w-full h-30rem bg-red-500"></div>
                    <div className="w-full h-30rem bg-red-600"></div>
                    <div className="w-full h-30rem bg-red-700"></div>
                    <div className="w-full h-30rem bg-red-800"></div>
                    <div className="w-full h-30rem bg-red-900"></div>
                    <div className="w-full h-30rem bg-red-100"></div>
                    <div className="w-full h-30rem bg-red-200"></div>
                    <div className="w-full h-30rem bg-red-300"></div>
                    <div className="w-full h-30rem bg-red-400"></div>
                    <div className="w-full h-30rem bg-red-500"></div>
                    <div className="w-full h-30rem bg-red-600"></div>
                    <div className="w-full h-30rem bg-red-700"></div>
                    <div className="w-full h-30rem bg-red-800"></div>
                    <div className="w-full h-30rem bg-red-900"></div>
                    <div className="w-full h-30rem bg-red-100"></div>
                    <div className="w-full h-30rem bg-red-200"></div>
                    <div className="w-full h-30rem bg-red-300"></div>
                    <div className="w-full h-30rem bg-red-400"></div>
                    <div className="w-full h-30rem bg-red-500"></div>
                    <div className="w-full h-30rem bg-red-600"></div>
                    <div className="w-full h-30rem bg-red-700"></div>
                    <div className="w-full h-30rem bg-red-800"></div>
                    <div className="w-full h-30rem bg-red-900"></div>
                    <div className="w-full h-30rem bg-red-100"></div>
                    <div className="w-full h-30rem bg-red-200"></div>
                    <div className="w-full h-30rem bg-red-300"></div>
                    <div className="w-full h-30rem bg-red-400"></div>
                    <div className="w-full h-30rem bg-red-500"></div>
                    <div className="w-full h-30rem bg-red-600"></div>
                    <div className="w-full h-30rem bg-red-700"></div>
                    <div className="w-full h-30rem bg-red-800"></div>
                    <div className="w-full h-30rem bg-red-900"></div>
                    <div className="w-full h-30rem bg-red-100"></div>
                    <div className="w-full h-30rem bg-red-200"></div>
                    <div className="w-full h-30rem bg-red-300"></div>
                    <div className="w-full h-30rem bg-red-400"></div>
                    <div className="w-full h-30rem bg-red-500"></div>
                    <div className="w-full h-30rem bg-red-600"></div>
                    <div className="w-full h-30rem bg-red-700"></div>
                    <div className="w-full h-30rem bg-red-800"></div>
                    <div className="w-full h-30rem bg-red-900"></div>
                </main>
            </LocomotiveScrollProvider>
        </div>
    )
}
