import { useState } from "react"
import { NavLink } from "./NavLink"
import { MenuButton } from "./MenuButton"
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion"
import Link from "next/link"

export default function NavFloatingMenu() {
  const [btn, setbtn] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [btnId, setBtnId] = useState(1)
  const btns = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'Collections', path: '/collections' },
  ]
  const variants = {
    hidden: { width: '5rem'},
    visible: {
      width: 'auto',
      transition: {
        // when: "beforeChildren",
        delayChildren: 0.2,
        staggerChildren: 0.1,
        type: 'spring',
        stiffness: 500,
        damping: 20,

      }
    },
    exit: {
      padding: 0,
      width: '6rem', transition: { duration: .2, when: 'afterChildren' }
    },
  };

  const btnVariants = {
    hidden: { opacity: 0, x: '10vw' },
    visible: {
      opacity: 1,
      x: 0
    },
    exit: { opacity: 0 }
  }
  return (
    <>


      {/* <div className="mynav2">
        <div className={`menu-btn ${btn ? 'open' : ''}`} onClick={() => setbtn(!btn)} >
          <div className="menu-btn__burger"></div>
        </div>
        <div className="mymenu">
          <div className="inside flex flex-col justify-around">
            {[
              { name: 'Home', path: '/' },
              { name: 'Collections', path: '/collections' },
              // { name: 'Calculator & Packing Details', path: '/utility' },
            ].map((e) =>
              <NavLink key={e.name} href={e.path} className="flex px-1.5em mybtn2 align-center items-center text-center">{e.name}</NavLink>
            )}
            <NavLink href='/utility' className="flex px-1.5em mybtn2 align-center items-center text-center">'Calculator & Packing Details'</NavLink> 
          </div>
        </div>
      </div> */}
      <div
        className='fixed bottom-2rem right-2rem'
        style={{ zIndex: 99999999999999 }}
      >
        <div
          className='h-5rem w-5rem flex items-center justify-center rounded-full relative gradient'
          style={{
            boxShadow: 'inset 0 0 10px 0 #0005, 0 0 10px 0 #000a',
            // background: '#0003',
            backdropFilter: 'blur(10px)',
          }}
        >
          <MenuButton
            isOpen={isOpen}
            onClick={() => setOpen(!isOpen)}
            strokeWidth='.4rem'
            color="#ff6666"
            color='#000'
            lineProps={{ strokeLinecap: "round" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            width='2rem'
            whRation={1}
            height='2rem'
          />
        </div>
        <AnimatePresence>
          {
            isOpen &&
            <motion.div
              className='backdrop-filter backdrop-blur-lg absolute h-6rem rounded-full flex justify-around items-center pr-9rem'
              style={{
                zIndex: -1, bottom: '-0.5rem', right: '-0.5rem', overflow: 'hidden',
                boxShadow: 'inset 0 0 10px 0 #0005, 0 0 10px 0 #000a',
                background: '#99f3',
              }}
              variants={variants}
              initial='hidden'
              animate='visible'
              exit='exit'
            >
              <AnimateSharedLayout>
                {btns.map(e =>
                  <NavLink key={e.id} href={e.path} setBtn={()=>setBtnId(e.id)}>
                    <motion.div
                      className={'min-h-3.5rem px-1.5em ml-5rem flex items-center justify-center text-center rounded-full relative ' + (btnId === e.id ? 'mymenubtn-active' : 'mymenubtn')}
                      variants={btnVariants}
                      style={{
                        // color: '#111',a
                        boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.5)',
                      }}
                      whileHover={{
                        scale: 1.1,
                        // fontSize:'110%'
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setBtnId(e.id)}
                    >
                      {e.name}
                      {btnId === e.id &&
                        <motion.div
                          className='absolute -inset-2 border-2 border-gray-900 rounded-full'
                          transition={{ type: 'spring',stiffness:500,damping:20 }}
                          layoutId='otl'
                        ></motion.div>
                      }
                    </motion.div>
                  </NavLink>
                )}
              </AnimateSharedLayout>

            </motion.div>
          }
        </AnimatePresence>
      </div>
    </>
  )
}
