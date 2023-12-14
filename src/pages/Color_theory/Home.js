import React from 'react';


function Home() {
    return (
        <div className="Content">
            <div className="ContentSection">
                <h1 style={{ fontSize: '7rem', lineHeight: '7.8rem' }}>
                    <span style={{ color: 'rgba(0, 33, 133, 1)' }}>Color </span>
                    theory is the study of how
                    <span style={{ color: 'rgba(0, 33, 133, 1)' }}> colors </span>
                    <span style={{ color: 'rgba(252, 211, 0, 1)' }}>interact </span> and
                    <span style={{ color: 'rgba(255, 39, 2, 1)' }}> create </span>visual impact. </h1>
            </div>
            <div className="ContentSection" style={{ padding: '0% 10% 0% 10%', flexDirection: 'column' }}>
                <h6>
                    It encompasses concepts such as color mixing, color psychology, and the cultural and symbolic meanings associated with different hues.
                </h6>
                <p>There are numerous color theories found in physics, phenomenology, psychology, linguistics, vision science, art, and design. According to a definition by lecturer Robert Hirschler, color science refers to the “knowledge [regarding color] obtained by observation and testing of facts” (Hirschler et. al, 2018). Although our modern understanding of color has been aided by the extensive color research conducted in the 20th century, the color pedagogy taught at this time may not be completely scientifically accurate. Color researcher Zeta O'Connor points out the lack of alignment with the science of color and the oversimplified nature of the conceptual models and constructs of one specific branch of color theory, known as "traditional color theory" (O'Connor, 2020). However, it is also the branch with the most applications in art and applied design.</p>
                <br />

                <h6>Goethe’s Perception of Color</h6>
                <p>In 1810, Johann Wolfgang von Goethe published Theory of Colors (in German: "Zur Farbenlehre"), which emphasized the subjective and emotional aspects of color perception. He believed that color was not solely determined by the physical properties of light but also influenced by the human eye, mind, and emotions. In his book, Goethe argued that colors have symbolic and emotional qualities that can evoke specific moods and sensations. Goethe's color theory argued that color arises from the interaction between light and darkness and that the perception of color is influenced by the contrast and harmony between different hues. Goethe's theory proposed a new understanding of color as a holistic and dynamic phenomenon, rather than a mere collection of individual spectral colors. While Goethe's ideas were initially met with skepticism by the scientific community, his work shaped how color theory pedagogy was presented in the art community. This would later influence Josef Alber’s pedagogical practices. </p>
                <br />
                <h6>Munsell’s Color System</h6>
                <p>In the early 20th century, Albert H. Munsell introduced the Munsell Color System, a systematic approach to color notation. It provides a systematic and objective way to describe and communicate colors based on three dimensions: hue, value, and chroma. Hue represents the dominant wavelength of light and corresponds to the perceived color, such as red, yellow, green, etc. Value refers to the lightness or darkness of a color, ranging from black to white. Chroma, also known as saturation or intensity, represents the purity or strength of a color, ranging from dull to vivid. By using specific notation, such as "5R 6/8," colors can be precisely identified and communicated. The number and letter combinations represent the hue, value, and chroma, respectively. The Munsell notation allows for consistent and standardized color communication across various industries, including art, design, manufacturing, and scientific research (Munsell, 1913).</p>
                <br />
                <h6> Itten's Color Pedgagogy</h6>
                <p>Around the same time, Swiss artist and educator Johannes Itten developed his color theory at the Bauhaus School, a renowned German art and design school from 1919 to 1933. Key principles of Itten's color theory include contrast, color harmonies, subjective effects, and symbolism.  Itten identified seven types of color contrast: hue contrast, light-dark contrast, cold-warm contrast, complementary contrast, simultaneous contrast, saturation contrast, and extension contrast. These contrasts describe how colors interact with each other and influence perception. Itten also developed color harmonies based on the color wheel. These harmonies include complementary colors (opposite on the color wheel), analogous colors (adjacent on the color wheel), and triadic colors (equally spaced on the color wheel). Itten believed that harmonious color combinations create a sense of balance and unity. Furthermore, Itten recognized that colors can evoke subjective responses and emotions. He associated warm colors (such as red and yellow) with excitement and energy, while cool colors (such as blue and green) were linked to calmness and tranquility. Itten's color theory explored the psychological impact of colors on individuals and how they can be used to create desired moods or atmospheres. Finally, Itten attributed symbolic meanings to colors, suggesting that colors can convey specific messages or associations. For example, he associated red with passion and love, blue with spirituality and calmness, and yellow with joy and happiness. </p>
                <br />
                <h6>Alber's Interaction of Colors</h6>
                <p>Josef Albers, a student of Itten at the Bauhaus school, furthered the study of color with his work on the Interaction of Colors. Published in 1963, Albers' book challenged the prevailing understanding of color as an absolute, instead emphasizing its relativity and subjective nature. Interaction of Colors provides practical exercises and examples that allow readers to engage directly with color and its interactions. Albers presents a series of color plates and challenges readers to observe and experiment with color relationships. This hands-on approach made the book accessible and valuable for artists, designers, and educators. The systematic approach to teaching color theory that Albers presented became a foundational principles in many art and design programs. One such program was the Yale School of Art. During his tenure from 1950 to 1958, Albers established the Department of Design (now the Department of Graphic Design) and served as the dean of the Yale School of Art. The influence of Albers and his emphasis on color theory and experimentation can be seen in the ongoing commitment to innovative and rigorous art education at the Yale School of Art</p>

            </div>
        </div>
    );
}
export default Home;