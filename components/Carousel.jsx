import { useRef, useState, useEffect, useContext } from 'react';
import { scrollContext } from '../pages/_app';

export default function Carousel() {
    const [activeSlide, setActiveSlide] = useState(1)
    const myTimer = useRef(null)
    function myFunc() {
        activeSlide > 4 ? setActiveSlide(1) : setActiveSlide(activeSlide + 1)
    }
    useEffect(() => {
        myTimer.current = setInterval(myFunc, 8800)
        return () => clearInterval(myTimer.current)

    }, [activeSlide])
    const { snap } = useContext(scrollContext)
    return (
        <>
            <div style={{ height: 'min(100vh - 6.5rem, 100vw)', scrollSnapAlign: snap }} className='flex'>
                <div className="responsive">
                    <section id="kslider" >
                        <label id='ks1' className={activeSlide == 1 ? 'active' : ''}></label>
                        <label id='ks2' className={activeSlide == 2 ? 'active' : ''}></label>
                        <label id='ks3' className={activeSlide == 3 ? 'active' : ''}></label>
                        <label id='ks4' className={activeSlide == 4 ? 'active' : ''}></label>
                        <label id='ks5' className={activeSlide == 5 ? 'active' : ''}></label>
                        <div onClick={() => setActiveSlide(1)} id='kslide1'></div>
                        <div onClick={() => setActiveSlide(2)} id='kslide2'></div>
                        <div onClick={() => setActiveSlide(3)} id='kslide3'></div>
                        <div onClick={() => setActiveSlide(4)} id='kslide4'></div>
                        <div onClick={() => setActiveSlide(5)} id='kslide5'></div>
                    </section>
                </div>
            </div>
        </>
    )
}