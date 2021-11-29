import Carousel from '../components/Carousel'
import Carousel2 from '../components/Carousel2'
import Swipercarousel2 from '../components/Swipercarousel2'
import Swipercarousel3 from '../components/Swipercarousel3'
import { useMediaQuery } from 'react-responsive'
import { scrollContext } from './_app'
import SwiperCore, {
  Pagination,
  Mousewheel
} from 'swiper/core';
import { useContext } from 'react'
SwiperCore.use([Mousewheel, Pagination]);

export default function Home() {
  const { snap } = useContext(scrollContext)
  const sm = useMediaQuery({ query: '(max-width: 640px)' })
  return (
    <>
      <Carousel />
      <Carousel2 />
      <Swipercarousel2 />
      <Swipercarousel3 />

      <div className='relative' style={{ scrollSnapAlign: snap }}>
        <video className='h-80vh w-full object-cover object-center' muted autoPlay loop>
          <source src='/export.mp4' type='video/mp4' />
        </video>
        <p className='absolute inset-0 text-center font-bold z-50' style={{ fontSize: `${sm ? '8vw' : '8vw'}`, color: '#fff5' }}>EXPORT</p>
        <div className='absolute bg-opacity-30 flex flex-col items-center justify-center bg-gray-900 inset-0 text-white'>
          <p className='font-bold'>
            INDIAN BY BIRTH, GLOBAL BY DESIGN
          </p>
          <p className='font-bold' style={{ fontSize: '2.5rem' }}>
            GLOBAL REACH
          </p>
          <p className='w-50% text-center mt-1rem'>
            We want to expand our reach to more and more countries. We will always try to get product suitable for every countries and customer’s needs.
          </p>
        </div>
      </div>
      <div className='flex justify-center flex-wrap gap-3rem pt-3rem'>
        <div className='flex flex-col w-40rem p-1rem gap-1rem' style={{ lineHeight: '2rem' }}>
          <p className='text-4xl'><span className='font-bold'>UNIVERSAL</span> MARKET</p>
          <p>
            Nebula Ceramic exports spread across an ever-growing network of more than 20 countries. Nebula Ceramic has spread its wings ahead to deliver its best product globally. We have been exporting to many countries, and we know that every country has a different set of rules for imports. Can it possible to satisfy all customers’ requirements? Sometimes their criteria and our products are not able to fit. But we give our best to fulfill them. Our future vision is to assemble a home like your heart and always trying to execute your wish to come home.
          </p>
          <p>
            We are the fastest growing in the market with daily innovate our products and quality with the help of technology and natural resources. In our global market, we desire to increase the market ratio for selling.
          </p>
        </div>
        <img className='w-40rem' style={{ boxShadow: '0 0 2rem 0 #0009' }} src="/containers-at-port.jpg" alt="" />
      </div>
      <p className='text-center pt-2rem' style={{ color: '#999', fontSize: '2.5rem' }}>WE <span className='font-bold'>EXPORT</span> WORLDWIDE</p>
      <div className='flex flex-wrap gap-2rem justify-center items-center mdx:px-20rem  px-3rem py-3rem'>
        {['Poland', 'UAE', 'USA', 'Turkey', 'Australia', 'Greece', 'Cyprus', 'Libya', 'Oman', 'Tunisiaq', 'Canada', 'Yemen', 'Qatar', 'Israel', 'Mauritius', 'Bahrain', 'Serbia', 'South Africa', 'Kuwait', 'UK', 'Albania', 'Jordan', 'Vietnam', 'Malta', 'Romania', 'Chile', 'Morocco'].map(
          e => <div key={e} className='w-10rem'>
            <img style={{ border: '2px solid #999' }} className='w-4rem block m-auto' src={`/flags/${e}.png`} alt={e} />
            <p className='text-center p-1'>{e}</p>
          </div>
        )}
      </div>
    </>
  )
}