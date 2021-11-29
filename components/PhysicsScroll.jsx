import { useRef, useState, useEffect, useLayoutEffect, useCallback, useContext } from 'react';
import { useComponentSize } from 'react-use-size';
import useDimensions from 'use-react-dimensions';
import useResizeObserver from 'use-resize-observer';
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

export default function PhysicsScroll({ children, scrollRef, classes, physics, isScrolling, setIsScrolling, snapElements = [] }) {
    // const scrollRef = useRef(null)
    const [height, setHeight] = useState(0)
    const [scrollHeight, setScrollHeight] = useState(0)
    const { width, height: h, ref: inRef } = useResizeDetector();



    function adjustHeight() {
        setHeight(scrollRef.current.clientHeight)
        setScrollHeight(scrollRef.current.scrollHeight)
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
    /********************************/
    const scrollY = useMotionValue(0)
    // const { scrollYProgress } = useElementScroll(scrollRef)

    // const scrollThumb = useTransform(scroll,[0,1],[])

    // const spring = useSpring(scrollY, physics)
    const scrollThumb = useTransform(scrollY, x => (x/(scrollHeight-height)) * (h-5-(.8*h*h/scrollHeight)))


    // const scrollThumb = useTransform(scrollY, x => x)
    // const spring = scrollY   
    // const spring = useTransform(scrollY,[0,10000],[0,10000],[{clamp:false,ease:'easein'}])
    const setScroll = (a, b) => {
        animate(a, b, {duration:0.02})
        // a.set(b)
    }
    const debounceFunc = useCallback(
        debounce(() => {
            setIsScrolling(false)
            scrollY.set(scrollRef.current.scrollTop)
            // const scrollTop = scrollRef.current.scrollTop
            // for (var ref in snapElements) {
            //     const offset = ref.current.offsetTop
            //     if (scrollTop > offset - 200 && scrollTop < offset + 200) {
            //         scrollRef.current.screenTop = offset
            //     }
            // }
            // setScroll(scrollY, scrollRef.current.screenTop)
            // console.log('d', scrollY.get(), scrollRef.current.scrollTop)
        }, 500),
        [])

    const debounceFunc2 = useCallback(
        debounce((f) => {
            f()
        }, 1000),
        [])

    useEffect(() => {
        debounceFunc2(() => {
            // console.log(height)
            console.log(h)
        })
    }, [height,h])
    /********************************/
    useEffect(() => {
        // scrollY.set(3000)
        // scrollThumb.onChange(x=>{
        //     scrollY.set((x*scrollHeight)/height)
        // })       
        const y = scrollY.onChange(value => {
            setIsScrolling(true)
            debounceFunc()
            // console.log('h',value)
            console.log(isScrolling)
            scrollRef.current.scrollTop = value
            // console.log(scroll.get())
        })
        function handleWheel(e) {
            // const scrollHeight = scrollRef.current.scrollHeight
            // const scrollMax = scrollHeight - scrollRef.current.clientHeight
            // debounceFunc2(()=>console.log('hi'))
            const scrollHeight = scrollRef.current.scrollHeight - scrollRef.current.clientHeight
            const scrollTop = scrollY.get()
            const scroll = scrollRef.current.scrollTop
            // const scrolll = scroll.get()
            // console.log(scrollTop,scroll,e.deltaY,scrollHeight)
            // debounceFunc2(()=>console.log(scrollTop,scroll,e.deltaY))
            // if (scrolll < scrollMax && scrolll > 0) {
            if (scrollTop <= scrollHeight && scrollTop >= 0) {
                const nextScroll = scrollTop + e.deltaY / 2
                // console.log(scrollTop,nextScroll)
                // if ((nextScroll < 0 && scroll!=0) && ( scrollTop < scrollHeight-1)) {
                if ((nextScroll > 0 || scroll > 0) && (scroll < (scrollHeight - 1) || nextScroll < scrollHeight)) {
                    e.preventDefault()
                    // console.log(scroll!=scrollHeight-1)
                    e.stopPropagation()
                }
                if (nextScroll < 0) {
                    // if (scrollTop != 0) {
                    //     e.preventDefault()
                    // }
                    // scrollRef.current.scrollTop=0
                    // animate(scrollY, 0, { type: 'spring', mass: 2.35, stiffness: 500, damping: 25 })
                    setScroll(scrollY, 0)
                }
                else if (nextScroll > scrollHeight) {
                    // scrollRef.current.scrollTop=scrollHeight
                    // animate(scrollY, scrollHeight, { type: 'spring', mass: 2.35, stiffness: 500, damping: 25 })
                    setScroll(scrollY, scrollHeight)
                }
                else {
                    // animate(scrollY, nextScroll, { type: 'spring', mass: 2.35, stiffness: 500, damping: 25 })
                    setScroll(scrollY, nextScroll)
                    // console.log(scrolll, scrollTop, scrollMax, scrollHeight, scrollRef.current.clientHeight)

                }
                // debounceFunc2(scrolll, scrollTop, scrollMax, scrollHeight, scrollRef.current.clientHeight)
            }
            else {
                // console.log(scrolll, scrollTop, scrollMax, scrollHeight, scrollRef.current.clientHeight)
            }
        }
        scrollRef.current.addEventListener('wheel', handleWheel, false)
        // const x = scrollThumb.onChange((v)=>{
        // if(!isScrolling){
        // setScroll(scrollY,v*(scrollHeight/height))
        // }
        // })
        return () => {
            scrollRef.current.removeEventListener('wheel', handleWheel, false)
            y()
            // x()
        }
    }, [])
    // const [unsub, setUnsub] = useState(null)
    // let x={}

    // function s(x) {
    //     console.log(x)
    //     scrollY.set((x/height)*(scrollHeight-height-105))
    // }

    /********************************/
    // useEffect(() => {
    //     window.addEventListener('resize', adjustHeight)
    //     // scrollRef.current.addEventListener('resize', adjustHeight)
    //     return () => {
    //         window.removeEventListener('resize', adjustHeight)
    //         // scrollRef.current.removeEventListener('resize', adjustHeight)
    //     }
    // }, [])
    /********************************/
    return (
        <div
            className={classes + ''}
            style={{
                overflowY: 'hidden',
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
            >
                {children}
            </div>
            <span className={"c-scrollbar" + (isScrolling ? ' has-scroll-scrolling' : '')}
                ref={inRef}
            >
                <motion.span className="c-scrollbar_thumb"
                    // drag='y'
                    // dragConstraints={{
                    //     top: 0,
                    //     bottom: height,
                    // }}
                    dragMomentum={false}
                    style={{
                        y: scrollThumb,
                        height: .8*h*h/scrollHeight,
                        zIndex: '9999999999999999999'
                    }}
                // onDragStart={() => {
                //     // setIsScrolling(true)
                //     const x = scrollThumb.onChange(s)
                //     setUnsub({x})
                // }}
                // onDragEnd={() => {
                //     // setIsScrolling(false)
                //     unsub.x()
                // }}
                >
                </motion.span>
            </span>
        </div>
    )
}
