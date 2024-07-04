import { Html } from "@react-three/drei";

const Intro: React.FC = () => {
    return (
        <Html
            as='div'
            position={[0, 0, 5]}
            className="wrapper"
        >
            {/* Designer &#38; Engineer */}
            <div className='introCopy' style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><h3 style={{textWrap: 'nowrap'}}>CONNOR WHITE</h3><hr style={{width: '100%', margin: '0 5px'}}/><h3>STUDIO</h3></div>
                <h2>Independent designer and engineer <br/> building interactive web experiences.</h2>
                <h3>Los Angeles, California</h3>
            </div>
        </Html>
    )
};

export default Intro;