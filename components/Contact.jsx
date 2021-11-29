// import styles from '../styles/Carousel.module.css'
export default function Contecr({ tile, ol, className, width, ...props }) {
    return (
        <>
            <div style={{height:'calc(100vh - 6.5rem)'}} className='flex flex-col'>

                <div className='w-full p-2rem flex justify-center items-center text-5xl bg-blue-300'>
                    <h1>Do you have any Question? We are ready to help you.</h1>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeeX9DeYvdpDr6hZ9EGDQjNVdeCLY8NzsOyl-kNtdBNxpU4xA/viewform?usp=sf_link">
                        <button className='ml-5rem'>WRITE US</button>
                    </a>
                </div>
                <div className='w-full gap-5rem py-5rem px-10rem rem flex justify-around text-lg bg-blue-100 flex-wrap'>
                    <div className='flex flex-col mdx:w-25% w-100% justify-items-start  items-center'>
                        <i className="fas fa-map-marker-alt icon-3d mb-2rem" style={{ fontSize: '4.5rem', color: 'black' }} />
                        <p className='mb-1rem font-bold'> ADDRESSES </p>
                        <address className='text-center'> Nebula Ceramic, National Highway 8-A, Morbi, Gujarat, India - 363642</address>
                        <address className='text-center'> Nebula Ceramic, Pipli-Bela Road, Morbi-2, Gujarat, India - 363642</address>
                    </div>
                    <div className='flex flex-col mdx:w-25% w-100% justify-items-start  items-center'>
                        <i className="fas fa-phone icon-3d mb-2rem" style={{ fontSize: '4.5rem', color: 'black' }} />
                        <p className='mb-1rem font-bold'> CALL US</p>
                        <h4>Export</h4>
                        <span>+91 70169 69514</span>
                        <span>+91 87995 94108</span>
                        <h4>Domestic</h4>
                        <span>+91 81600 62231</span>
                    </div>
                    <div className='flex flex-col mdx:w-25% w-100% justify-items-start  items-center'>
                        <i className="fas fa-envelope icon-3d mb-2rem" style={{ fontSize: '4.5rem', color: 'black' }} />
                        <p className='mb-1rem font-bold'> EMAIL </p>
                        <p>info@nebulaceramics.com</p>
                        <p>export@nebulaceramics.com</p>
                    </div>
                </div>
                    <div className="bg-blue-100 flex-center flex-grow">
                        {/* <FontAwesomeIcon className='aicon-3d' icon={faEnvelope} style={{ fontSize: '4.5rem' }} />
                    <FontAwesomeIcon className='aicon-3d' icon={faEnvelope} style={{ fontSize: '4.5rem' }} />
                <
                FontAwesomeIcon className='aicon-3d' icon={faEnvelope} style={{ fontSize: '4.5rem' }} /> */}

                        {/* <p className='icon-3d'>
                        hellow
                    </p> */}    
                        <a href="https://www.facebook.com/Nebula-Ceramic-149335843913503/"><i className="fab fa-facebook fa-4x icon-3d"></i></a>
                        <a href="https://www.instagram.com/nebulaceramics/?utm_medium=copy_link"><i className="fab fa-instagram fa-4x icon-3d"></i></a>
                        <a href="https://api.whatsapp.com/send?phone=918160062231"><i className="fab fa-whatsapp fa-4x icon-3d"></i></a>
                    </div>
                <div className='w-full p-1rem pb-1 flex flex-col justify-center items-center bg-blue-300'>
                    <img src="/nebula3.png" className="flex-grow-0 mb-1 h-4rem mx-auto" alt="" />
                    <p className='mdx:w-50% w-90% mb-1 text-center'>We are biggest Exporter of ceramic, porcelain tiles & sanitaryware from India. Our Production plant is with modern technology we also have products with ISO & CE certification, where we produce always innovative Tiles which make your home look wonderstruck.</p>
                    <p> &copy; 2021 Nebula Ceramics | All rights reserved </p>
                </div>

            </div>
        </>
    )
}