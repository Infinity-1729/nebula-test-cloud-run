import { useRef, useState, useEffect, useLayoutEffect, useCallback, useContext } from 'react';
import {
    useMotionValue,
    useElementScroll,
    useSpring,
} from 'framer-motion';
import { debounce } from 'lodash';
// import useResizeObserver from "use-resize-observer";

export default function PhysicsScroll({ children, scrollRef, classes, physics, setIsScrolling }) {
    // const h = <div></div>
    // const { height:h } = useResizeObserver({ref:scrollRef});

    // const scrollRef = useRef(null)
    const refOuter = useRef(null)
    const [height, setHeight] = useState(0)
    function adjustHeight() {
        setHeight(scrollRef.current.scrollHeight - scrollRef.current.clientHeight)
        // console.log(height)
    }
    /********************************/
    // useLayoutEffect(() => {
    //     adjustHeight()
    //     // console.log(refOuter.current.scrollHeight,scrollRef.current.scrollHeight,scrollRef.current.clientHeight)
    // })
    useEffect(() => {
        adjustHeight()
    })
    const { scrollY } = useElementScroll(refOuter)
    const spring = useSpring(scrollY, physics)
    const debounceFunc1 = useCallback(
        debounce(() => {
            setIsScrolling(false)
            refOuter.current.scrollTop = scrollRef.current.scrollTop
        }, 50),
        [])
    /********************************/
    function handleWheel(e) {
        const scrollTop = refOuter.current.scrollTop
        if (scrollTop < height && scrollTop > 0) {
            // console.log(scrollTop, height)
            e.preventDefault()
        }
        refOuter.current.scrollTop += e.deltaY
        // console.log(scrollTop,height)
        // console.log(height, e.deltaY)
    }
    useEffect(() => {
        spring.onChange(value => {
            setIsScrolling(true)
            debounceFunc1()
            scrollRef.current.scrollTop = value
        })
        refOuter.current.addEventListener('wheel', handleWheel, true)
        return () => {
            refOuter.current.removeEventListener('wheel', handleWheel, true)
        }
    }, [height])
    /********************************/
    useEffect(() => {
        window.addEventListener('resize', adjustHeight)
        // scrollRef.current.addEventListener('resize', adjustHeight)
        return () => {
            window.removeEventListener('resize', adjustHeight)
            // scrollRef.current.removeEventListener('resize', adjustHeight)
        }
    }, [])
    // useEffect(() => {
    //     // window.addEventListener('resize', () => { setHeight(scrollRef.current.scrollHeight) })
    //     // scrollRef.current.addEventListener('resize', () => { setHeight(scrollRef.current.scrollHeight) })
    // }, [])
    /********************************/
    return (
        <>
            <div
                className={classes + ' relative hide-scroll'}
                style={{ overflowY: 'scroll' }}
                ref={refOuter}
            >
                <div
                    className='sticky top-0 h-full'
                    style={{
                        overflowY: 'scroll',
                        scrollSnapType: 'y',
                        scrollBehavior: 'auto',
                    }}
                    ref={scrollRef}
                >
                    {children}
                </div>
                <div
                    style={{ height: height }}
                >
                </div>
            </div>
        </>
    )
}
