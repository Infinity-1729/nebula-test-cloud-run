import { useEffect, useState } from 'react'

const categorySizes = {
    'gvt pgvt': ['600x600', '600x1200', '800x800'],
    'porcelain slab': ['800x1600', '1200x1200', '1200x2400',],
    'wall tiles': ['12"x18"', '12"x24"'],
    'elevation wall tiles': ['12"x18"', '12"x24"'],
};
const sqMtrToFeet = 10.7639
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
}

export default function calc() {
    const initialState = ''
    const [aprice, setAprice] = useState(initialState)
    const [kharcho, setKharcho] = useState(initialState)
    const [profit, setProfit] = useState(initialState)
    const [netPrice, setNetPrice] = useState(initialState)
    const [priceUnit, setPriceUnit] = useState('foot')
    const [category, setCategory] = useState(Object.keys(categorySizes)[0])
    const [size, setSize] = useState(categorySizes[category][0])

    useEffect(()=>{
        calculate()
    },[priceUnit,category,size])
    
    function onSubmitForm(v) {
        console.log(v)
    }
    function calculate() {
        // console.log(priceUnit)
        let x
        if(priceUnit=='foot'){
            x = aprice * sqMtrToFeet
        }
        else{
            x=aprice/dimentions[category][size].sqMtrPerBox
        }
        let y = kharcho / (dimentions[category][size].sqMtrPerBox * dimentions[category][size].boxInContainer)
        let z = profit / dimentions[category][size].sqMtrPerBox
        //   console.log(x,y,z)
        setNetPrice(x + y + z)
    }
    return (
        <>
            <div className='asdf top-8rem mdx:top-6.5rem flex flex-col text-base uppercase mdx:text-md mdx:h-5rem h-15rem mdx:flex-row backdrop-filter backdrop-blur-lg w-full bg-opacity-10'>
                <div className='flex-grow gap-0.5em bg-opacity-50 flex flex-wrap items-center justify-around px-10 py-4 bg-gray-800'>
                    {Object.keys(categorySizes).map(e =>
                        <div
                            key={e}
                            className={e === category ?
                                "bg-gray-900 text-gray-100 font-semibold py-2 px-6 border border-gray-900 rounded-full mr-2" :
                                "bg-tranparent text-gray-100 font-semibold py-2 px-6 border border-gray rounded-full mr-2"
                            }
                            onClick={() => { setCategory(e); setSize(categorySizes[e][0]); }}>
                            {e}
                        </div>
                    )}
                </div>
                <div className='flex-grow gap-0.5em bg-opacity-50 flex flex-wrap items-center justify-around p-4 bg-gray-100'>
                    {categorySizes[category].map(e =>
                        <div
                            key={e}
                            className={e === size ?
                                "bg-gray-900 text-gray-100 font-semibold py-2 px-6 border border-gray-900 rounded-full mr-2" :
                                "bg-tranparent text-gray-900 font-semibold py-2 px-6 border border-gray-900 rounded-full mr-2"
                            }
                            onClick={() => setSize(e)}>
                            {e}
                        </div>
                    )}
                </div>
            </div>
            <div className='w-full mdx:h-5rem h-15rem'></div>
            <div className="flex m-5 justify-center">
                <div className="tabs" onChange={(e) => {
                    // console.log(e.target.value)
                    setPriceUnit(e.target.value)
                    if(priceUnit=='box'){
                        setAprice(aprice/(dimentions[category][size].sqMtrPerBox*sqMtrToFeet))
                    }
                    else{
                        setAprice(aprice*dimentions[category][size].sqMtrPerBox*sqMtrToFeet)
                    }
                    // console.log(priceUnit)
                }}>
                    <input type="radio" id="radio-1" value='foot' name="tabs" defaultChecked={priceUnit=='foot'} />
                    <label className="tab" htmlFor="radio-1">price per sq foot
                        {/* <span className="notification">2</span> */}
                    </label>
                    <input type="radio" id="radio-2" value='box' name="tabs" defaultChecked={!priceUnit=='box'} />
                    <label className="tab" htmlFor="radio-2">price per box</label>
                    <span className="glider"></span>
                </div>
            </div>
                <form className='flex flex-col gap-5 h-screen px-8 items-center'>
                    <label htmlFor="name" className="sr-only">Full name</label>
                    <input
                        className='block shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2'
                        name='aprice'
                        type='text'
                        // aria-label='email address'
                        placeholder='Enter Price'
                        value={aprice}
                        onChange={e => setAprice(e.target.value)}
                    />
                    <input
                        className='block shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2'
                        name='kharcho'
                        type='text'
                        // aria-label='email address'
                        placeholder='Enter Kharcho'
                        value={kharcho}
                        onChange={e => setKharcho(e.target.value)}
                    /><input
                        className='block shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2'
                        name='profit'
                        type='text'
                        // aria-label='email address'
                        placeholder='Enter Profit'
                        value={profit}
                        onChange={e => setProfit(e.target.value)}
                    />
                    <button className='py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        type='button'
                        onClick={calculate}
                    >
                        Calculate
                    </button>
                    <div className='tabs w-max'>
                        <p className='px-8 select-text'> price per square meter : {netPrice}</p>
                    </div>
                </form>
        </>
    )
}