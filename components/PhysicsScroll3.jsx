import { useRef, useState, useEffect, useLayoutEffect, useCallback, useContext } from 'react';
import { useComponentSize } from 'react-use-size';
// import useResizeObserver from 'use-resize-observer';
import useResizeObserver from '@react-hook/resize-observer'
import { useResizeDetector } from 'react-resize-detector'
import {
    useMotionValue,
    useElementScroll,
    useSpring,
    useTransform,
    useAnimation,
    useMotionTemplate,
    Keyframes,
    animate,
    motion
} from 'framer-motion';
import { debounce } from 'lodash';
import { scrollContext } from '../pages/_app';
// import { Transition } from '@vue/runtime-dom';

function ScrollBar({ scrollBarAreaRef, isScrolling, scrollThumb, height, scrollBarAreaHeight }) {
    return (
        <span className={"c-scrollbar" + (isScrolling ? ' has-scroll-scrolling' : '')}
            ref={scrollBarAreaRef}
        >
            <motion.span className="c-scrollbar_thumb"
                drag='y'
                dragConstraints={{
                    top: 0,
                    bottom: scrollBarAreaHeight - height,
                }}
                // dragMomentum={false}
                style={{
                    y: scrollThumb,
                    height: height,
                    zIndex: '9999999999999999999'
                }}
            >
            </motion.span>
        </span>
    )
}

export default function PhysicsScroll({ children, scrollRef, classes, physics, isScrolling, setIsScrolling, snapElements = [] }) {
    const [scrollBarHeight, setScrollBarHeight] = useState(100)
    const [scrollHeight, setScrollHeight] = useState(2000)
    const [height, setHeight] = useState(1000)
    const [scrollBarAreaHeight, setScrollBarAreaHeight] = useState(900)
    const scrollBarAreaRef = useRef(null)
    const contentAreaRef = useRef(null)

    // console.log(scrollHeight, scrollBarAreaHeight, scrollBarHeight)

    useResizeObserver(contentAreaRef, (entry) => setScrollHeight(entry.contentRect.height))
    useResizeObserver(scrollRef, (entry) => setHeight(entry.contentRect.height))
    useResizeObserver(scrollBarAreaRef, (entry) => setScrollBarAreaHeight(entry.contentRect.height))
    useEffect(() => {
        if (scrollBarAreaHeight && scrollHeight) {
            setScrollBarHeight(scrollBarAreaHeight * scrollBarAreaHeight / scrollHeight)
        }
    }, [scrollBarAreaHeight, scrollHeight])
    /********************************/
    // const scrollY = useMotionValue(0)
    // const { scrollYProgress } = useElementScroll(scrollRef)
    // const scrollThumb = useTransform(scrollYProgress, x => x * (scrollBarAreaHeight - scrollBarHeight - 5))
    const scrollThumb = useMotionValue(0)
    const scrollY = useTransform(scrollThumb, [0, scrollBarAreaHeight - scrollBarHeight - 3], [0, scrollHeight - scrollBarAreaHeight],
        // {duration:1}
        // {type:'inertia',velocity:50}
    )
    // const spring = useSpring(scrollY, physics)
    const spring = scrollY
    const setScroll = (a, b) => {
        animate(a, b, 
        {
            type:'spring',
            stiffness:500,
            // mass:0.1,
            // type:'physics',
            // velocity:500,
            damping:30,
            // duration:b<20?b*0.00001:b*0.001
            // ease:'easeInOut',
            // duration:0.0005*b
        }
        )
        // a.set(b)
    }
    const debounceFunc = useCallback(
        debounce(() => {
            setIsScrolling(false)
            animate(scrollThumb,scrollRef.current.scrollTop*((scrollBarAreaHeight - scrollBarHeight - 3)/(scrollHeight - scrollBarAreaHeight)),
            {duration:.5}
            )
            // scrollY.set(scrollRef.current.scrollTop)
            // setScroll(scrollY, scrollRef.current.scrollTop)
        }, 500),
        [scrollBarAreaHeight,scrollBarHeight])

    const debounceFunc2 = useCallback(
        debounce((f) => {
            f()
        }, 1000),
        [])
    /********************************/
    useEffect(() => {
        if (scrollBarAreaHeight && scrollHeight && scrollBarHeight && height) {
            const y = spring.onChange(value => {
                setIsScrolling(true)
                debounceFunc()
                // console.log(isScrolling)
                scrollRef.current.scrollTo(0,value)
            })

            function handleWheel(e) {
                // const scrollHeight = scrollRef.current.scrollHeight - scrollRef.current.clientHeight
                // const scrollTop = scrollY.get()
                // const scroll = scrollRef.current.scrollTop
                // console.log(e)
                const motionValueRange = scrollBarAreaHeight - scrollBarHeight - 3
                const scrollTop = scrollThumb.get()
                const scroll = scrollTop
                if (scrollTop <= motionValueRange && scrollTop >= 0) {
                    const nextScroll = scrollTop + (e.deltaY * (motionValueRange / scrollHeight) * 2)
                    if ((nextScroll > 0 || scroll > 0) && (scroll < (motionValueRange - 1) || nextScroll < motionValueRange)) {
                        e.preventDefault()
                        e.stopPropagation()
                    }
                    if (nextScroll < 0) {
                        setScroll(scrollThumb, 0)
                    }
                    else if (nextScroll > motionValueRange) {
                        setScroll(scrollThumb, motionValueRange)
                    }
                    else {
                        setScroll(scrollThumb, nextScroll)
                    }
                }
            }
            scrollRef.current.addEventListener('wheel', handleWheel, false)
            return () => {
                scrollRef.current.removeEventListener('wheel', handleWheel, false)
                y()
            }
        }
    }, [scrollBarAreaHeight, scrollBarHeight])
    return (
        <div
            className={classes + ' hide-scroll'}
            style={{
                overflowY: 'auto',
                scrollSnapType: 'y',
                scrollPaddingTop: '6.5rem',
                scrollBehavior: 'auto',
                scrollSnapMarginTop: '6.5rem',
                scrollMarginTop: '6.5rem',
            }}
            ref={scrollRef}
        >
            <div className=" navbg mdx:h-6.5rem h-8rem w-full"
            ></div>
            <div
                ref={contentAreaRef}
            >
                {children}
            </div>
            <ScrollBar
                scrollBarAreaRef={scrollBarAreaRef}
                isScrolling={isScrolling}
                scrollThumb={scrollThumb}
                height={scrollBarHeight}
                scrollBarAreaHeight={scrollBarAreaHeight}
            ></ScrollBar>
        </div>
    )
}
