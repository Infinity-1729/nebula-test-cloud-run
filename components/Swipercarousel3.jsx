
import React, { useContext } from "react";
import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import { scrollContext } from "../pages/_app";
import SwiperCore, {
    Autoplay,
    Pagination
} from 'swiper/core';
SwiperCore.use([Autoplay, Pagination]);
export default function Swipercarousel3() {
    const { snap } = useContext(scrollContext)
    return (
        <>
            <h1 style={{
                scrollSnapAlign: snap
            }} className='text-center bg-purple-300 mt-1rem py-1rem text-4xl'>
                Quality Control
            </h1>
            <div>
                <Swiper
                    slidesPerView={1}
                    centeredSlides={true}
                    pagination={{
                        "clickable": true
                    }}
                    loop={true}
                    autoplay={{ "delay": 1500, disableOnInteraction: false }}
                    className="mySwiper3">
                    {[
                        {
                            heading: 'Pre Production Inspection',
                            content: `<p style="text-align:justify;">It’s important to verify whether raw material quality is ok or not, it will also help to verify the production with all your interests including:</p>
                    <p>1. Are samples matched with master tile or reference tile?
                        <br />2. Is everything well prepared before the production starts?
                        <br />3. Are Buyer’s requirements and specifications (material, color, etc.) well understood?
                        <br />4. Any unexpected delays?
                    </p>
                    <p style="text-align:justify;">Benefits of Pre-Production Inspection (PPI Inspection):
                        Solve the quality problems which may occur during manufacturing process.
                    </p>`
                        },
                        {
                            heading: 'Initial Production Inspection',
                            content: `<p style="text-align:justify;">The main objective of an IPI is to make sure the production process is keeping up with Buyer’s specifications from the very beginning. Our Merraki Inspectors are willing to deliver excellence and quality by carefully inspecting the materials and parameters of your goods.</p>
                    <p>1. Ensure that vendor meets your requirements
                        <br />2. sure the quality of your goods from the beginning
                        <br />3. Avoid miscommunication
                        <br />4. Inspect the Packaging & Labelling as per Buyer’s requirement and suggestion
                        <br />5. Barcode Verification (if applicable)
                        <br />6. Benefits of Initial production Inspection (IPI INSPECTION)
                        <br />7. Confirm the effectiveness of the production process
                        <br />8. Mitigating non-conformities and timely correction of the production process
                        <br />9. Solve the quality problems in the beginning to prevent further issues or defects
                    </p>`
                        },
                        {
                            heading: 'During Production Inspection',
                            content: `<p style="text-align:justify;">The main objective of this examination is to timely apply corrective actions if needed. In addition, DPI gives you the opportunity to do improvements in quality.</p>
                    <p>1. This inspection service verify the entire production process in detail
                        <br />2. Re-assure that Required Quality Parameters Maintained or not
                        <br />3. Keep control of production process
                        <br />4. Take corrective actions if needed
                        <br />5. Assure that the mass production quality is the same as the master sample
                        <br />6. Benefits of During production Inspection (DPI INSPECTION)
                        <br />7. It Prevents expansion of faults moving in full production
                    </p>`
                        },
                        {
                            heading: 'Pre Shipment Inspection',
                            content: `<p style="text-align:justify;">Pre-shipment inspection is the final line of defence before a low-quality product leaves the factory Premise.</p>
                    <p style="text-align:justify;">Pre-Shipment Inspection (PSI), also known as Final Random Inspection (FRI), checks your finished products in order to assess problems with finished and packaged goods. This procedure is done through randomly selected pieces/boxes from Produced Goods and each pieces/boxes are carefully examined in order to ensure it meets Buyer’s expectations or not. the PSI ensures that the products comply with your specifications including overall appearance, size, color, sharpness, packing, labelling, etc.</p>
                    <p>
                        1. Ensure that ordered goods met all requirements
                        <br />2. Maintain your reputation by delivering high quality products to your customers
                        <br />3. Ensure your order has been produced correctly as per specifications before shipping
                        <br />4. Verify quality at the source and avoid payment for defective goods
                        <br />5. Know whether the shipping marks, packing, and labelling are correct.
                    </p>`
                        },
                        {
                            heading: 'Container Loading Supervision',
                            content: `<p style="text-align:justify;">Container Loading Supervision or CLS is carried out at the time when the final consignment is ready to be loaded in the container.</p>
                    <p>1. Benefits of Container Loading Supervision:
                        <br />2. Ensure that container is dry, clean and odour free
                        <br />3. Verify that loading is done as per buyer’s guidelines or not
                        <br />4. Ensures that the consignment will reach to the destination in exact ordered quantity and quality
                        <br />5. Reduce the risk of loading of Wrong Products
                        <br />6. Ensure that Internal and external packing have all the information that helps to maintain product at buyer’s ware house
                        <br />7. Check condition of export cartons and pallets to avoid damage of goods
                        <br />8. CLS is a transparent and unbiased process that helps both buyers and suppliers to fulfil their mutually agreed duties
                        <br />9. CLS is a crucial step of quality control because incorrect loading can result in damaged goods
                    </p>`
                        },
                        {
                            heading: 'Vendor Audit',
                            content: `<p style="text-align:justify;">Tile manufacturing industry is on an exponential rise in India. Increasing fascination for a variety of indoor and outdoor tiles has benefitted both manufacturers and suppliers over the years.</p>
                    <p style="text-align:justify;">In contemporary competitive environment,manufacturers and buyer complement each other’s business, but from buyer’s point of view, choosing the right tile manufacturer is extremely important.</p>
                    <p style="text-align:justify;">a vendor audit & verification is essential step for selection of new vendor.</p>
                    <p style="text-align:justify;">Meraaki inspector conduct assesment of plant to present you analysis about reliability of your potential vendor.</p>`
                        }
                    ].map(e =>
                        <SwiperSlide key={e.heading}>
                            <div className='flex mdx:flex-row flex-col justify-center justify-items-center items-center mdx:h-45rem'>
                                <div className='p-8 w-40rem mb-2rem'>
                                    <h2 className='text-left text-4xl mb-0.5em'>
                                        {e.heading}
                                    </h2>
                                    {parse(e.content)}
                                </div>
                                <img src={`/quality control/${e.heading}.jpg`} className='w-35rem mdx:w-40rem' alt="" />
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </>
    )
}