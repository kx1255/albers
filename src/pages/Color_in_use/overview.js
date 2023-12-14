import React from 'react';
import '../../components/global/button.scss';
import './overview.scss';
import sample from '../../assets/images/sample.png';
import Picasso from '../../assets/images/Picasso.png';
import Murillo from '../../assets/images/Murillo.jpeg';
import Hiroshige from '../../assets/images/Hiroshige.png';
import Henri from '../../assets/images/Henri.jpeg';
import Munch from '../../assets/images/Munch.jpg';
import SherGil from '../../assets/images/SherGil.jpg';
import Basquiat from '../../assets/images/Basquiat.png';
import Dali from '../../assets/images/Dali.jpg';
import Sargent from '../../assets/images/Sargent.jpeg';
import Okeefe from '../../assets/images/OKEEFE.jpg';
import CASSATT from '../../assets/images/Cassatt.jpg';
import KAHLO from '../../assets/images/Kahlo.png';



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
                    <h3>Color in Use</h3>
                    <p>
                        The Color in Use Tool lets you see how colors are being used in real paintings.
                        <br /><br />
                        Separate famous masterpieces into layers by clicking on a color.
                    </p>
                </div>
                <img src={sample} alt="An example of the application in use" width="50%" loading="lazy" />
            </div>
            <div className="ContentSection" style={{ flexDirection: "column" }}>
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
                <div className="horizontal">
                    <div className="artwork_card" onClick={() => handleImageClick(Munch)}>
                        <img src={Munch} alt="" width="256px" loading="lazy" />
                        <span className="artwork_title" >EDVARD MUNCH</span>
                        <p>The Scream (1895) <br /> pastel on cardboard <br />91 x 73 cm</p>
                    </div>
                    <div className="artwork_card" onClick={() => handleImageClick(Sargent)}>
                        <img src={Sargent} alt="" width="256px" loading="lazy" />
                        <span className="artwork_title" > JOHN SINGER SARGENT</span>
                        <p>Lady Agnew of Lochnaw (1895)  <br />oil on canvas <br />127 x 101 cm</p>
                    </div>
                    <div className="artwork_card" onClick={() => handleImageClick(Basquiat)}>
                        <img src={Basquiat} alt="" width="256px" loading="lazy" />
                        <span className="artwork_title">JEAN-MICHEL BASQUIAT</span>
                        <p>Warrior (1982) <br />acrylic and oilstick on wood panel <br />180 x 120 cm</p>
                    </div>
                    <div className="artwork_card" onClick={() => handleImageClick(Dali)}>
                        <img src={Dali} alt="" width="256px" loading="lazy" />
                        <span className="artwork_title">SALVADOR DALÍ </span>
                        <p>The Hallucinogenic Toreador (1969/1970) <br />oil on canvas <br />157 x 118 in</p>
                    </div>
                </div>
                <div className="horizontal">
                    <div className="artwork_card" onClick={() => handleImageClick(Okeefe)}>
                        <img src={Okeefe} alt="" width="256px" loading="lazy" />
                        <span className="artwork_title" >GEORGIA O'KEEFE</span>
                        <p>Radiator Building-Night (1927) <br /> oil on canvas <br />121.9 x 76.2 cm</p>
                    </div>
                    <div className="artwork_card" onClick={() => handleImageClick(SherGil)}>
                        <img src={SherGil} alt="" width="256px" loading="lazy" />
                        <span className="artwork_title" >   AMRITA SHER-GIL</span>
                        <p>Group of Three Girls (1935) <br />oil on canvas <br />73.5 x 99.5 cm</p>
                    </div>
                    <div className="artwork_card" onClick={() => handleImageClick(CASSATT)}>
                        <img src={CASSATT} alt="" width="256px" loading="lazy" />
                        <span className="artwork_title">MARY CASSATT</span>
                        <p>The Child's Bath (1893) <br />oil on canvas <br />100.3 x 66.1 cm</p>
                    </div>
                    <div className="artwork_card" onClick={() => handleImageClick(KAHLO)}>
                        <img src={KAHLO} alt="" width="256px" loading="lazy" />
                        <span className="artwork_title"> FRIDA KAHLO </span>
                        <p>The Frame(1938) <br />oil on glass <br />28.5 x 20.7 cm</p>
                    </div>
                </div>
            </div>
            <a href="/inuse" ref={inuseRef} style={{ display: 'none' }}></a>
        </div>
    );
}

export default Overview;
