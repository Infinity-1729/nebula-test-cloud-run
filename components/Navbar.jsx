import { NavLink } from "./NavLink"
import { motion, AnimateSharedLayout } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [btnId, setBtnId] = useState(1)
  const btns = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'Collections', path: '/collections' },
  ]

  return (
    <nav className="mynav fixed inset-0 w-full mdx:h-6.5rem h-8rem" style={{ background: '#fff3' }}>
      <div className="flex mx-24 items-center flex-row flex-nowrap">
        <img src="/nebula3.png" className="mt-1 flex-grow-0 mdx:h-6.5rem h-8rem mx-auto" alt="" />
        <div className="mdx:flex hidden flex-row justify-end items-strech flex-grow gap-2em">
          {/* {[
              { name: 'Home', path: '/' },
              { name: 'Collections', path: '/collections' },
              // { name: 'Calculator & Packing Details', path: '/utility' },
            ].map((e) =>
              <NavLink key={e.name} href={e.path} className="flex px-1.5em mybtn align-center items-center min-h-3.5rem text-center">{e.name}
              </NavLink>
            )}
            <div onClick={() => myRef.current.scrollIntoView({ behavior: 'smooth' })} className="flex px-1.5em mybtn align-center items-center text-center">Contacts Us
            </div> */}
              <AnimateSharedLayout>
          {btns.map(e =>
            <NavLink key={e.id} href={e.path} setBtn={()=>setBtnId(e.id)}>
                <motion.div
                  className={'min-h-3.5rem px-1.5em flex items-center justify-center text-center rounded-full relative ' + (btnId === e.id ?'mymenubtn-active':'mymenubtn')}
                  style={{
                    // color: '#111',
                  }}
                  initial={{
                    fontSize: '1.1em',
                    boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.5)',
                  }}
                  whileHover={{
                    scale: 1.1,
                    // fontSize:'110%'
                  }}
                  whileTap={{scale:0.9}}
                  onClick={() => setBtnId(e.id)}
                >
                  {e.name}
                  {btnId === e.id &&
                    <motion.div
                      className='absolute -inset-2 border-2 border-gray-900 rounded-full'
                      transition={{type:'spring',stiffness:500,damping:20}}
                      layoutId='otl'
                    ></motion.div>
                  }
                </motion.div>
            </NavLink>
          )}
          </AnimateSharedLayout>
        </div>
      </div>
    </nav>
  )
}
