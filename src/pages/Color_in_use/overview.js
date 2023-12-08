import React from 'react';
import '../../components/global/button.scss';
import './overview.scss';
import starry from '../../assets/images/starry.png';
import Picasso from '../../assets/images/Picasso.png';
import Murillo from '../../assets/images/Murillo.jpeg';
import Hiroshige from '../../assets/images/Hiroshige.png';
import Henri from '../../assets/images/Henri.jpeg';
import { useRef } from 'react';

function Overview() {
    const inuseRef = useRef(null);

    function handleImageClick(imageSrc) {
        const encodedImageSrc = encodeURIComponent(imageSrc);
        inuseRef.current.href = `/inuse?image=${encodedImageSrc}`;
        inuseRef.current.click();
    }

    return (
        <div className="Content">
            <div className="ContentSection">
                <div className="first">
                    <h1>Color in Use</h1>
                    <p>
                        The Color in Use Tool lets you see how colors are being used in real paintings.
                        <br /><br />
                        Separate famous masterpieces into layers by clicking on a color.
                    </p>
                </div>
                <img src={starry} alt="Starry Night by Vincent Van Gogh" width="50%" loading="lazy" />
            </div>
            <div className="ContentSection">
                <div className="horizontal">
                    <div className="artwork_card" onClick={() => handleImageClick(Hiroshige)}>
                        <img src={Hiroshige} alt="" width="256px" loading="lazy" />
                        <span className="artwork_title" >UTAGAWA HIROSHIGE</span>
                        <p>Sudden Shower over Shin-Ohashi Bridge and Atake (Ohashi Atake no yudachi)</p>
                    </div>
                    <div className="artwork_card" onClick={() => handleImageClick(Picasso)}>
                        <img src={Picasso} alt="" width="256px" loading="lazy" />
                        <span className="artwork_title" >PABLO PICASSO</span>
                        <p>Weeping woman (1937) <br />oil on canvas <br />55.2 x 46.2 cm</p>
                    </div>
                    <div className="artwork_card" onClick={() => handleImageClick(Henri)}>
                        <img src={Henri} alt="" width="256px" loading="lazy" />
                        <span className="artwork_title">ROBERT HENRI</span>
                        <p>Indian Girl in White Blanket (1917) <br />oil on canvas <br />81.28 × 66.04 cm</p>
                    </div>
                    <div className="artwork_card" onClick={() => handleImageClick(Murillo)}>
                        <img src={Murillo} alt="" width="256px" loading="lazy" />
                        <span className="artwork_title">BARTOLOMÉ ESTEBAN MURILLO </span>
                        <p>Two Women at a Window (c. 1655/1660) <br />oil on canvas <br />125.1 x 104.5 cm</p>
                    </div>
                </div>
            </div>
            <a href="/inuse" ref={inuseRef} style={{ display: 'none' }}></a>
        </div>
    );
}

export default Overview;
