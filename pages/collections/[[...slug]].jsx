import { useEffect, useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive'
import Tiles from '../../components/Tiles'
import { useRouter } from 'next/router'

import {
    useViewportScroll,
    motion,
    useTransform,
    useMotionValue,
    useElementScroll,
    AnimateSharedLayout,
    useSpring,
} from 'framer-motion';
import { scrollContext } from '../_app';


const categorySizes = {
    'gvt pgvt': ['600x600', '600x1200', '800x800'],
    'porcelain slab': ['800x1600', '1200x1200', '1200x2400',],
    'wall tiles': ['12"x18"', '12"x24"'],
    'elevation wall tiles': ['12"x18"', '12"x24"'],
};

const dimentions = {
    'gvt pgvt': {
        '600x600': {
            'tilesPerBox': 4,
            'sqMtrPerBox': 1.44,
            'weightPerBox': 28,
            'container': [
                {
                    'boxPerPallet': 40,
                    'palletsInContainer': 24
                }
            ],
            'boxInContainer': 960
        },
        '600x1200': {
            'tilesPerBox': 2,
            'sqMtrPerBox': 1.44,
            'weightPerBox': 31,
            'container': [
                {
                    'boxPerPallet': 68,
                    'palletsInContainer': 10
                },
                {
                    'boxPerPallet': 20,
                    'palletsInContainer': 10
                }
            ],
            'boxInContainer': 880
        },
        '800x800': {
            'tilesPerBox': 3,
            'sqMtrPerBox': 1.92,
            'weightPerBox': 49,
            'container': [
                {
                    'boxPerPallet': 26,
                    'palletsInContainer': 20
                }
            ],
            'boxInContainer': 520
        }
    },
    'porcelain slab': {
        '800x1600': {
            'tilesPerBox': 2,
            'sqMtrPerBox': 2.56,
            'weightPerBox': 53,
            'container': [
                {
                    'boxPerPallet': 28,
                    'palletsInContainer': 18
                }
            ],
            'boxInContainer': 504
        },
        '1200x1200': {
            'tilesPerBox': 2,
            'sqMtrPerBox': 2.88,
            'weightPerBox': 61,
            'container': [
                {
                    'boxPerPallet': 28,
                    'palletsInContainer': 12
                },
                {
                    'boxPerPallet': 15,
                    'palletsInContainer': 4
                }
            ],
            'boxInContainer': 396
        },
        '1200x2400': {
            'tilesPerBox': 1,
            'sqMtrPerBox': 2.88,
            'weightPerBox': 61,
            'container': [
                {
                    'boxPerPallet': 15,
                    'palletsInContainer': 14
                },
            ],
            'boxInContainer': 210
        }
    },
    'wall tiles': {
        '12"x18"': {
            'tilesPerBox': 6,
            'sqMtrPerBox': 1.44,
            'weightPerBox': 0.81,
            'container': [
                {
                    'boxPerPallet': 90,
                    'palletsInContainer': 22
                }
            ],
            'boxInContainer': 2484
        },
        '12"x24"': {
            'tilesPerBox': 5,
            'sqMtrPerBox': 1.44,
            'weightPerBox': 0.90,
            'container': [
                {
                    'boxPerPallet': 60,
                    'palletsInContainer': 23
                }
            ],
            'boxInContainer': 1980
        },
    },
    'elevation wall tiles': {
        '12"x18"': {
            'tilesPerBox': 6,
            'sqMtrPerBox': 1.44,
            'weightPerBox': 0.81,
            'container': [
                {
                    'boxPerPallet': 90,
                    'palletsInContainer': 22
                }
            ],
            'boxInContainer': 2484
        },
        '12"x24"': {
            'tilesPerBox': 5,
            'sqMtrPerBox': 1.44,
            'weightPerBox': 0.90,
            'container': [
                {
                    'boxPerPallet': 60,
                    'palletsInContainer': 23
                }
            ],
            'boxInContainer': 1980
        },
    },
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { slug: [] } }, ...Object.keys(categorySizes).flatMap(e => categorySizes[e].map(l => { return { params: { slug: [e, l] } } }))],
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    if (!params.slug) {
        return {
            props: { category: 'gvt pgvt', size: '600x600' }
        }
    }
    return {
        props: { category: params.slug[0], size: params.slug[1] }
    }
}

export default function Collections({ category, size, mainRef, scrollYProgress }) {
    const sm = useMediaQuery({ query: '(max-width: 780px)' })

    const router = useRouter()
    const [height, setHeight] = useState(200)
    function seth(h) {
        setHeight(h);
        // console.log(h);
    }
    const springyY = useTransform(scrollYProgress, [0, 1], [0, -(height / 2)]);
    // const physics = { damping: 15, mass: 0.27, stiffness: 55 }
    // const springyY = useSpring(y1, physics)

    const spring = {
        type: "spring",
        stiffness: 500,
        damping: 20,
    }
    // const x=useMotionValue(0)
    // const {scrollObj} = useContext(scrollContext)
    // const springyY = useTransform(scrollObj.spring===undefined?x:scrollObj.spring, [0, height], [0, -(height / 2)]);

    const { snap } = useContext(scrollContext)
    // useEffect(() => {
    //     console.log(scrollYProgress)
    // }, [scrollYProgress])
    useEffect(() => {
        // console.log(mainRef)
        mainRef.current.scrollTop = 0
    }, [router])

    return (
        <>

            <div
                // data-scroll-section
                // id="stick"
                style={{ scrollSnapAlign: snap }}
            >
                <div
                    // data-scroll-sticky
                    // data-scroll-target="#stick"
                    className={`sticky w-100% top-8rem mdx:top-6.5rem p-1rem flex flex-col text-base mr-10rem gap-1rem uppercase mdx:text-md mdx:h-7rem h-17rem mdx:flex-row w-full bg-opacity-10`}
                    style={{
                        zIndex: '89',
                        // scrollSnapAlign:'start'
                    }}
                >
                    <AnimateSharedLayout>
                        <div className='flex-grow bg-opacity-50 rounded-2xl p-1rem flex flex-wrap items-center justify-around bg-gray-800 backdrop-filter backdrop-blur-lg'>
                            {Object.keys(categorySizes).map(e =>
                                <motion.div
                                    key={e}
                                    className={
                                        `relative text-gray-100 font-semibold py-2 px-6 border rounded-full
                                        ${e == category ? 'bg-gray-900 border-gray-900' : 'bg-tranparent border-gray'}`
                                    }
                                    onClick={() => router.push(`${e}/${categorySizes[e][0]}`)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {e}
                                    {e == category && (
                                        <motion.div
                                            layoutId="out1"
                                            className="outline"
                                            // initial={false}
                                            // animate={{ borderColor: color }}
                                            transition={spring}
                                        />
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </AnimateSharedLayout>
                    <AnimateSharedLayout>
                        <div className='flex-grow bg-opacity-50 rounded-2xl flex flex-wrap items-center justify-around bg-gray-100 backdrop-filter backdrop-blur-lg'>
                            {categorySizes[category].map(e =>
                                <motion.div
                                    key={e}
                                    className={
                                        `relative font-semibold py-2 px-6 border border-gray-900 rounded-full
                                            ${e == size ? 'bg-gray-900 text-gray-100' : 'bg-tranparent text-gray-900'}`
                                    }
                                    onClick={() => router.push(`${category}/${e}`)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {e}
                                    {e == size && (
                                        <motion.div
                                            layoutId="out2"
                                            className="outline2"
                                            // initial={false}
                                            // animate={{ borderColor: color }}
                                            transition={spring}
                                        />
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </AnimateSharedLayout>
                </div>
                <div
                    // className='absolute top-0 right-0 left-0'
                    style={{
                        overflow: 'hidden',
                        zIndex: '1',
                        // scrollSnapAlign:'start',
                    }}
                >
                    <motion.div
                        className='absolute top-0'
                        style={{
                            y: springyY,
                            zIndex: '-1',
                            height: height * 1.7,
                            width: '100%',
                            backgroundImage: "url('/bg-7.jpeg')",
                            backgroundRepeat: 'repeat-y',
                            backgroundSize: '100% auto',
                            filter: 'blur(5px)'
                        }}
                    >
                    </motion.div>
                    <Tiles
                        seth={(h) => seth(h)} dimentions={dimentions} category={category} size={size} />
                </div>
            </div>
        </>
    )
}