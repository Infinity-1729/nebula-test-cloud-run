import { NavLink } from '../components/NavLink'
import Contact from '../components/Contact'
import PhysicsScroll from '../components/PhysicsScroll3';
// import PhysicsScroll from '../components/PhysicsScroll2';
import NavFloatingMenu from '../components/NavFloatingMenu';
import Navbar from '../components/Navbar';
import WhatsappFloatingIcon from '../components/WhatsappFloatingIcon';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'

// import "swiper/components/pagination/pagination.min.css"
// import "swiper/css/swiper.min.css";
import '@fortawesome/fontawesome-free/css/all.css';
import 'swiper/css'
import 'swiper/css/bundle'
import 'tailwindcss/tailwind.css'

// import 'locomotive-scroll/dist/locomotive-scroll.css'


import '../styles/globals.css'
import '../styles/carousel.css'
import '../styles/carousel2.css'
import '../styles/carousel3.css'
import '../styles/swipercarousel.css'
import '../styles/navbar.css'
import '../styles/a.scss'
import '../styles/b.scss'
import '../styles/utility.scss'
import '../styles/tabs.scss'
import '../styles/collections.css'
import '../styles/tiles.css'
import '../styles/ham.css'
import '../styles/loco.css'

import { useRef, useState, useEffect, useLayoutEffect, createContext } from 'react';

import {
  useViewportScroll,
  motion,
  useTransform,
  useMotionValue,
  useElementScroll,
  AnimateSharedLayout,
  useSpring,
} from 'framer-motion';
// import useResizeObserver from "use-resize-observer";




export const scrollContext = createContext({})

function MyApp({ Component, pageProps }) {
  const mainRef = useRef(null)
  const containerRef = useRef(null)
  const myRef = useRef(null)
  const { scrollY, scrollYProgress } = useElementScroll(mainRef)
  const [isScrolling, setIsScrolling] = useState(false)

  // const h = <div></div>
  // const { ref:mainRef,width,height } = useResizeObserver<h>({});


  const snap = `${isScrolling ? 'none' : 'start'}`
  return (
    <>
      <NavFloatingMenu />
      <WhatsappFloatingIcon />
      {/* <LocomotiveScrollProvider
        containerRef={containerRef}
        options={
          {
            smooth: true,
            // ... all available Locomotive Scroll instance options 
          }
        }
        watch={ 
          [
            //...all the dependencies you want to watch to update the scroll EXCEPT the location one
          ]
        }
      > */}

        <main
          className={'w-full homemain fixed inset-0'
            // top-8rem mdx:top-6.5rem'

          }
          // ref={mainRef}
          style={{
            // overflowY: 'auto',
            scrollSnapType: 'y',
            scrollPaddingTop: '6.5rem',
            scrollBehavior: 'auto',
            scrollSnapMarginTop: '6.5rem',
            scrollMarginTop: '6.5rem',
          }}

        >

          <scrollContext.Provider value={{ snap }}>
            <PhysicsScroll
            scrollRef={mainRef}
            classes='w-full h-full'
            physics={{ damping: 50, mass: 2.35, stiffness: 400 }}
            isScrolling={isScrolling}
            setIsScrolling={(e) => setIsScrolling(e)}
          >
            <Navbar />
            <div
              // data-scroll-container
              // ref={containerRef}
            >
              {/* <div className=" navbg mdx:h-6.5rem h-8rem w-full" */}
              {/* ></div> */}
              <Component {...pageProps}
                mainRef={mainRef}
                scrollYProgress={scrollYProgress} />
              <footer ref={myRef}
                style={{
                  scrollSnapAlign: snap,
                }}>
                <Contact />
              </footer>
            </div>
            </PhysicsScroll>
          </scrollContext.Provider>
        </main>
      {/* </LocomotiveScrollProvider> */}
    </>
  )
}

export default MyApp;