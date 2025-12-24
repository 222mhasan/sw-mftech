import React from 'react';
import Slider from "../components/Slider";
import OngoingLinks from '../components/OngoingLinks';

const Gallery = () => {



    return (
        <div className='min-h-screen'>
            <Slider />

            <div>
                <OngoingLinks />
            </div>
        </div>
    );
};

export default Gallery;