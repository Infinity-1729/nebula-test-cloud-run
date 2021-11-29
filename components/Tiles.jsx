import Card from '../components/Card'
import useSWR from "swr";
import axios from 'axios'
import { useEffect, useState, useRef, useMemo } from 'react';
import {
    motion,
    AnimateSharedLayout,
    useMotionValue,
    useElementScroll,
    useSpring,
    useAnimation
} from 'framer-motion';

export default function Tiles({ dimentions, seth, category, size }) {
    const node = useRef()
    let mounted = false
    const [show, setShow] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(true)
    const fetcher = (url) => axios.get(url).then((response) => { return response.data });
    const { data, error } = useSWR("/products/dir_tree.json", fetcher);
    useEffect(() => {
        if (mounted) {
            ol()
        }
    }, [])
    useEffect(() => {
        if (mounted) {
            ol()
        }
    }, [category, size])

    if (error) return <div>Failed to Load</div>;
    if (!data) return <div>loading...</div>;

    mounted = true
    const tiles = data.products[category][size]
    // window.addEventListener("resize", ol);
    function ol() {
        let h = node.current.getBoundingClientRect().height
        seth(h)
    };
    function chuchu(e) {
        e.preventDefault();
        setShow(!show);
    }
    function chichi(e) {
        e.preventDefault();
        setShowDetails(!showDetails);
    }


    return (
        <>
            <div onClick={chuchu} className={show ? "overlay overlay2" : "overlay"}>
                <div className="popup" onClick={(event) => {
                    event.stopPropagation()
                }}>
                    <a className="close" onClick={chuchu}>&times;</a>
                    {loading && <div className="lcontainer">
                        <div className="item">
                            <i className="loader l8"></i>
                        </div>
                    </div>
                    }
                    <img
                        src={image}
                        className={loading ? 'hidden' : 'block'}
                        alt="NebulaCeramics"
                        onLoad={() => setLoading(false)}
                    />
                </div>
            </div>
            <div
                onClick={chichi}
                className={showDetails ? "overlay overlay2" : "overlay"}
            >
                <div
                    className="popup"
                    onClick={(event) => {
                        event.stopPropagation()
                    }}
                >
                    <a
                        className="close"
                        onClick={chichi}
                    >
                        &times;
                    </a>
                    <div className='p-1rem bg-red-200'>
                        <p> tiles per box : {dimentions[category][size].tilesPerBox}</p>
                        <p> square meters per box : {dimentions[category][size].sqMtrPerBox}</p>
                        <p> weight per box : {dimentions[category][size].weightPerBox}</p>
                        {dimentions[category][size].container.map(e =>
                            <p key={e.boxPerPallet}> {e.palletsInContainer} pallets containing {e.boxPerPallet} box </p>
                        )}
                        <p> total box per container: {dimentions[category][size].boxInContainer}</p>
                        <p> total square meters per container: {dimentions[category][size].sqMtrPerBox * dimentions[category][size].boxInContainer}</p>
                        <p> total weight per container: {dimentions[category][size].weightPerBox * dimentions[category][size].boxInContainer}</p>
                    </div>
                </div>
            </div>
            {/* <AnimateSharedLayout type='crossfade'> */}
            <div
                ref={node}
                onLoad={ol}
                className='customgrid'
            >
                {
                    tiles.map((tile) =>
                        <Card
                            tile={tile}
                            // enter={enter}
                            // leave={leave}
                            // staggerEnter={staggerEnter}
                            // staggerLeave={staggerLeave}
                            onClick={() => {
                                setShow(!show)
                                setImage('/nebula3.png')
                                setLoading(true)
                                setTimeout(() => setImage('/' + tile.path), 1)
                                // console.log(tile.path)
                            }}
                            showDetailsFunc={(e) => {
                                e.stopPropagation()
                                setShowDetails(!showDetails)
                            }}
                            category={category}
                            size={size}
                            width='cardwidth'
                            key={tile.path}
                            className="shadow-2xl bg-white rounded-lg overflow-hidden"
                        />
                    )
                }
            </div>
            {/* </AnimateSharedLayout> */}
        </>)
}