import { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import {
    useViewportScroll,
    motion,
    useTransform,
    useMotionValue,
    useElementScroll,
    AnimateSharedLayout,
    useSpring,
    Inertia,
} from 'framer-motion';
import { debounce } from 'lodash';
export default function ab() {


    // one way
    const refOuter1 = useRef(null)
    const refInner1 = useRef(null)
    const [height1, setHeight1] = useState(0)
    useLayoutEffect(() => {
        setHeight1(refInner1.current.scrollHeight)
    })
    /********************************/
    const { scrollY: scrollY1 } = useElementScroll(refOuter1)
    const physics1 = { damping: 20, mass: .5, stiffness: 200 }
    const spring1 = useSpring(scrollY1, physics1)
    // const spring1 = useTransform(scrollY1,[0,100],[0,10],[{clamp:false,ease:'circOut'}])
    const [isScrolling1, setIsScrolling1] = useState(false)
    const debounceFunc1 = useCallback(
        debounce(() => {
            setIsScrolling1(false)
            refOuter1.current.scrollTop = refInner1.current.scrollTop
        }, 20),
        [])
    /********************************/
    useEffect(() => {
        spring1.onChange(value => {
            setIsScrolling1(true)
            debounceFunc1()
            refInner1.current.scrollTop = value
        })
        refInner1.current.addEventListener('wheel', (e) => {
            e.preventDefault()
            e.stopPropagation()
            refOuter1.current.scrollTop += e.deltaY
        }, false)
    }, [height1])
    /********************************/


    // another way with analysis
    const refOuter2 = useRef(null)
    const refInner2 = useRef(null)
    const [height2, setHeight2] = useState(0)
    useLayoutEffect(() => {
        setHeight2(refInner2.current.scrollHeight)
    })
    /********************************/
    const scrollY2 = useMotionValue(0)
    const physics2 = { damping: 20, mass: .5, stiffness: 200 }
    const spring2 = useSpring(scrollY2, physics2)
    const [isScrolling2, setIsScrolling2] = useState(false)
    const debounceFunc2 = useCallback(
        debounce(() => {
            setIsScrolling2(false)
            scrollY2.set(refInner2.current.scrollTop)
            refOuter2.current.scrollTo(0, refInner2.current.scrollTop)
        }, 20),
        [])
    /********************************/
    useEffect(() => {
        spring2.onChange(value => {
            setIsScrolling2(true)
            debounceFunc2()
            refInner2.current.scrollTop = value
        })
        refInner2.current.addEventListener('wheel', (e) => {
            e.preventDefault()
            e.stopPropagation()
            if (scrollY2.get() < height2 && scrollY2.get() >= 0) {
                scrollY2.set(scrollY2.get() + e.deltaY)
                refOuter2.current.scrollTop += e.deltaY
            }
        }, false)
    }, [height2])
    // /********************************/


    // same another way without analysis // final
    const scrollRef = useRef(null)
    const [height, setHeight] = useState(0)
    useLayoutEffect(() => {
        setHeight(scrollRef.current.scrollHeight)
    })
    /********************************/
    const scrollY = useMotionValue(0)
    const physics = { damping: 10, mass: .2, stiffness: 200 }
    const spring = useSpring(scrollY, physics)
    const [isScrolling, setIsScrolling] = useState(false)
    const debounceFunc = useCallback(
        debounce(() => {
            setIsScrolling(false)
            scrollY.set(scrollRef.current.scrollTop)
        }, 20),
        [])
    /********************************/
    useEffect(() => {
        spring.onChange(value => {
            setIsScrolling(true)
            debounceFunc()
            scrollRef.current.scrollTop = value
        })
        scrollRef.current.addEventListener('wheel', (e) => {
            e.preventDefault()
            e.stopPropagation()
            if (scrollY.get() < height && scrollY.get() >= 0) {
                scrollY.set(scrollY.get() + e.deltaY)
            }
        }, false)
    }, [height])
    /********************************/

    useEffect(() => {
        window.addEventListener('resize', () => {
            setHeight1(refInner1.current.scrollHeight)
            setHeight2(refInner2.current.scrollHeight)
            setHeight(scrollRef.current.scrollHeight)
        })
    }, [])

    const cref = useRef(null)
        useEffect(() => {
            console.log(cref)
        }, [cref])

    return (
        <>
            <div className='w-full h-80vh bg-gray-300 gap-3vw flex flex-row items-center justify-center'>

                {/* // one way */}
                <div
                    className='relative w-30vw h-50vh bg-red-100'
                    style={{ overflowY: 'scroll' }}
                    ref={refOuter1}
                >
                    <div
                        className='sticky top-0 h-full'
                        style={{
                            overflowY: 'scroll',
                            scrollSnapType: 'y',
                            scrollBehavior: 'auto'
                        }}
                        ref={refInner1}
                        onScroll={()=>console.log(refInner1.current.scrollTop)}
                    >
                        <div className="w-full h-10rem bg-blue-100"
                            style={{ scrollSnapAlign: `${isScrolling1 ? 'none' : 'start'}`, }}
                        ></div>
                        <div className="w-full h-10rem bg-blue-200"></div>
                        <div className="w-full h-10rem bg-blue-300"></div>
                        <div className="w-full h-10rem bg-blue-400"
                            style={{ scrollSnapAlign: `${isScrolling1 ? 'none' : 'start'}`, }}
                        ></div>
                        <div className="w-full h-10rem bg-blue-500"
                            style={{ scrollSnapAlign: `${isScrolling1 ? 'none' : 'start'}`, }}
                        ></div>
                        <div className="w-full h-10rem bg-red-600"
                        style={{ scrollSnapAlign: `${isScrolling1 ? 'none' : 'start'}`, }}
                        ref={cref}
                        ></div>
                        <div className="w-full h-10rem bg-blue-700"></div>
                        <div className="w-full h-10rem bg-blue-800"></div>
                        <div className="w-full h-10rem bg-blue-900"></div>
                        <div className="w-full h-10rem bg-blue-100"></div>
                        <div className="w-full h-10rem bg-blue-200"></div>
                        <div className="w-full h-10rem bg-blue-300"></div>
                        <div className="w-full h-10rem bg-blue-400"></div>
                        <div className="w-full h-10rem bg-blue-500"></div>
                        <div className="w-full h-10rem bg-blue-600"></div>
                        <div className="w-full h-10rem bg-blue-700"></div>
                        <div className="w-full h-10rem bg-blue-800"></div>
                        <div className="w-full h-10rem bg-blue-900"></div>
                    </div>
                    <div
                        style={{ height: `calc(${height1}px - 50vh)` }}
                    >
                    </div>
                </div>

                {/* // another way with analysis */}
                <div
                    className='relative w-30vw h-50vh bg-red-100'
                    style={{ overflowY: 'scroll' }}
                    ref={refOuter2}
                >
                    <div
                        className='sticky top-0 h-full'
                        style={{
                            overflowY: 'scroll', scrollSnapType: 'y',
                            scrollBehavior: 'auto'
                        }}
                        ref={refInner2}
                    >
                        <div className="w-full h-10rem bg-blue-100"
                            style={{ scrollSnapAlign: `${isScrolling2 ? 'none' : 'start'}`, }}
                        ></div>
                        <div className="w-full h-10rem bg-blue-200"></div>
                        <div className="w-full h-10rem bg-blue-300"></div>
                        <div className="w-full h-10rem bg-blue-400"
                            style={{ scrollSnapAlign: `${isScrolling2 ? 'none' : 'start'}`, }}
                        ></div>
                        <div className="w-full h-10rem bg-blue-500"
                            style={{ scrollSnapAlign: `${isScrolling2 ? 'none' : 'start'}`, }}
                        ></div>
                        <div className="w-full h-10rem bg-blue-600"></div>
                        <div className="w-full h-10rem bg-blue-700"></div>
                        <div className="w-full h-10rem bg-blue-800"></div>
                        <div className="w-full h-10rem bg-blue-900"></div>
                        <div className="w-full h-10rem bg-blue-100"></div>
                        <div className="w-full h-10rem bg-blue-200"></div>
                        <div className="w-full h-10rem bg-blue-300"></div>
                        <div className="w-full h-10rem bg-blue-400"></div>
                        <div className="w-full h-10rem bg-blue-500"></div>
                        <div className="w-full h-10rem bg-blue-600"></div>
                        <div className="w-full h-10rem bg-blue-700"></div>
                        <div className="w-full h-10rem bg-blue-800"></div>
                        <div className="w-full h-10rem bg-blue-900"></div>
                    </div>
                    <div
                        style={{ height: `calc(${height2}px - 50vh)` }}
                    >
                    </div>
                </div>

                {/* // same another way without analysis // final */}
                <div
                    className='w-30vw h-50vh'
                    style={{
                        overflowY: 'scroll', scrollSnapType: 'y',
                        scrollBehavior: 'auto'
                    }}
                    ref={scrollRef}
                >
                    <div className="w-full h-10rem bg-blue-100"
                        style={{ scrollSnapAlign: `${isScrolling ? 'none' : 'start'}`, }}
                    ></div>
                    <div className="w-full h-10rem bg-blue-200"></div>
                    <div className="w-full h-10rem bg-blue-300"></div>
                    <div className="w-full h-10rem bg-blue-400"
                        style={{ scrollSnapAlign: `${isScrolling ? 'none' : 'start'}`, }}
                    ></div>
                    <div className="w-full h-10rem bg-blue-500"
                        style={{ 
                            scrollSnapAlign: `${isScrolling ? 'none' : 'start'}`, 
                        }}
                    ></div>
                    <div className="w-full h-10rem bg-blue-600"></div>
                    <div className="w-full h-10rem bg-blue-700"></div>
                    <div className="w-full h-10rem bg-blue-800"></div>
                    <div className="w-full h-10rem bg-blue-900"></div>
                    <div className="w-full h-10rem bg-blue-100"></div>
                    <div className="w-full h-10rem bg-blue-200"></div>
                    <div className="w-full h-10rem bg-blue-300"></div>
                    <div className="w-full h-10rem bg-blue-400"></div>
                    <div className="w-full h-10rem bg-blue-500"></div>
                    <div className="w-full h-10rem bg-blue-600"></div>
                    <div className="w-full h-10rem bg-blue-700"></div>
                    <div className="w-full h-10rem bg-blue-800"></div>
                    <div className="w-full h-10rem bg-blue-900"></div>
                </div>

            </div>
        </>
    )

}