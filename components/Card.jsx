import { animate, motion, useAnimation, AnimatePresence } from "framer-motion"
import InView, { useInView } from "react-intersection-observer"
import { useEffect, useMemo, useState } from "react"
// import { Transition } from "@vue/runtime-dom"
import { stagger } from "animejs"
import { Controller } from "swiper"
export default function Card({ enter, leave, setEnter, setLeave, staggerEnter, staggerLeave, showDetailsFunc, category, size, tile, ol, className, width, ...props }) {
    const { ref, inView } = useInView({ threshold: [.1]})
    // console.log(cardVariant)
    const control = useAnimation()

    // const cardVariant = useMemo(() => {
    //     return {
    //         init: { y: 100 },
    //         final: { y: (inView ? 0 : 100) }
    //     }
    // }, [inView])

    const cardVariant = {
        leave: { y: 50, scale: 0.8 },
        enter: { y: 0, scale: 1 },
    }

    // const variant1 = {
    //     init: { y: 100 },
    //     final: { y: 0 }
    // }

    // const variant2 = {
    //     init: { y: 0 },
    //     final: { y: 100 }
    // }

    // const [show, setShow] = useState(true)
    // useEffect(() => {
        // setTimeout(() => {
        //     setShow(v => !v)
        //     console.log('hi')
        // }, 2000);
    // }, [inView])
    return (
        <>
            <motion.div
                className={`${className} ${width}`} {...props}
                ref={ref}
                // initial='leave'
                variants={cardVariant}
                animate={inView?'enter':'leave'}
                // custom={inView}
                // animate={inView ? 'final' : 'init'}      
                whileHover={{ scale: 1.1 }}
            >
                <img src={'/' + tile.thumb}
                    className='h-auto'
                    alt="" />
                <div className="mt-8 flex flex-col items-start flex-wrap px-4">
                    <div className="mb-5 bg-gray-200 rounded-full p-2 px-5">
                        {tile.name}
                    </div>
                    <div className="mb-5 bg-gray-200 rounded-full p-2 px-5">
                        surface : {tile.surface}
                    </div>
                    <div className="mb-5 bg-gray-200 rounded-full p-2 px-5">
                        thickness : {tile.thickness}
                    </div>
                    <div onClick={showDetailsFunc} className="mb-5 bg-red-200 rounded-full p-2 px-5">
                        view packing details -&gt;
                    </div>
                    <a onClick={(e) => e.stopPropagation()} href={`https://wa.me/918160062231?text=${encodeURI(`category: ${category}\nsize: ${size}\nname: ${tile.name}\nlink: ${encodeURI(`www.nebulaceramics.com/collections/${category}/${size}`)}`)}`}>
                        <div className="mb-5 bg-green-200 rounded-full p-2 px-5">
                            discuss this product with us -&gt;
                        </div>
                    </a>
                </div>
            </motion.div>
        </>
    )
}