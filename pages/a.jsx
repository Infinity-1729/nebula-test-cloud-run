import { useState } from "react";
import {
    motion,
    AnimateSharedLayout,
    animate,
    useAnimation,
    AnimatePresence,
} from "framer-motion";

export default function A() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const control = useAnimation()
    const boxVariant = {
        init: {
            y: 100
        },
        final: {
            y: 0,
        },
        show: {
            x: 100
        }
    }
    return (
        <div className="x-container absolute inset-0 bg-blue-100"
            style={{ zIndex: 9999999999999999 }}>
            <div className="dates">
                <div className="card-container">
                    <AnimateSharedLayout>
                        {isExpanded ? (
                            <motion.div
                                className="card expanded"
                                layoutId="expandable-card"
                                onClick={() => setIsExpanded(false)}
                            >
                                <motion.h1
                                    className="title"
                                    layoutId="title"
                                >
                                    25
                                </motion.h1>
                            </motion.div>
                        ) : <motion.div
                            className="compact card"
                            layoutId="expandable-card"
                            onClick={() => setIsExpanded(true)}
                        >
                            <motion.h1
                                className="title"
                                layoutId="title"
                            >
                                25
                            </motion.h1>
                        </motion.div>
                        }
                    </AnimateSharedLayout>
                </div>
            </div>

            <div
                className='flex justify-center m-5rem gap-5rem'
            >
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>

            <motion.div
                className='flex flex-row justify-center items-center gap-5rem m-5rem'
                variants={{
                    final: {
                        transition: {
                            staggerChildren: 0.2
                        }
                    },
                }}
                initial='init'
                animate='final'
            >
                {
                    [1, 2, 3, 4, 5].map(e =>
                        <motion.div
                            key={e}
                            className='bg-gray-900 h-5rem w-5rem'
                            variants={boxVariant}
                        >
                        </motion.div>
                    )
                }
                {
                    [6, 7, 8].map(e =>
                        <AnimatePresence>
                            {isOpen && <motion.div
                                key={e}
                                className='bg-gray-900 h-5rem w-5rem'
                                variants={boxVariant}
                            >
                            </motion.div>}
                        </AnimatePresence>
                    )
                }

            </motion.div>
            <button
                onClick={() => { setIsOpen(!isOpen) }}
            >
                click
            </button>
        </div >
    )
}

function Card() {
    const [show, setShow] = useState(false)
    return <>

        <motion.div
            className='h-3rem w-3rem bg-red-500 relative'
            // layoutId='xx'
            animate={{ opacity: 1 }}
            onClick={() => setShow(false)}
        >
            <AnimateSharedLayout type='crossfade'>
                {show ?
                    <motion.div
                        className='h-3rem w-3rem bg-blue-500 fixed inset-0'
                        layoutId='xx'
                    // onClick={() => setShow(true)}
                    ></motion.div> :
                    <motion.div
                        className='absolute inset-0'
                        layoutId='xx'
                        // animate={{ opacity: 1 }}
                        // exit={{ opacity: 0 }}
                        onClick={(e) => {
                            setShow(true)
                            e.stopPropagation()
                            console.log('hi')
                        }}
                    >
                    </motion.div>
                }
            </AnimateSharedLayout>
        </motion.div>
    </>
}