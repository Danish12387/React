import './index.css';
import { useState, useEffect } from 'react';
import search from '../../search.png';
import { useNavigate } from 'react-router-dom';
import { updateTheme } from '../../store/themeSlice';
import { useDispatch } from 'react-redux'; 

function Navbar() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [color, setColor ] = useState();

    const randomColor = ()=>{
        let random1 = Math.ceil(Math.random() * 256);
        let random2 = Math.ceil(Math.random() * 256);
        let random3 = Math.ceil(Math.random() * 256);
        setColor(`rgb(${random1}, ${random2}, ${random3})`);
    }

    const clicked = ()=>{
        randomColor()
        dispatch(updateTheme(color))
    }

    return <nav className={scrollPosition > 20 ? 'scroll-on' : ''}>
        <div className='nav_father_div'>
            <div>

            </div>
            <div className='nav_top_div'>
                <a href="/"><img className='logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQchAaWJ73dbvQzpd2ICNfedLHaEo7Pxd0fmOJoIxabUQ&s' /></a>
                <div className='motors'>
                    <div className='img_div'>
                        <img src='https://p1.hiclipart.com/preview/112/763/614/performance-icon-car-sports-car-car-dealership-silhouette-silhouette-racing-car-motor-vehicle-service-icon-design-png-clipart.jpg' alt='not loading' />
                    </div>
                    <span style={{ 'fontSize': 11, 'fontWeight': 'bold' }}>MOTORS</span>
                </div>
                <div className='motors'>
                    <div className='img_div'>
                        <img src='https://www.iconpacks.net/icons/1/free-building-icon-1062-thumb.png' />
                    </div>
                    <span style={{ 'fontSize': 11, 'fontWeight': 'bold' }}>PROPERTY</span>
                </div>
                {/* <button onClick={clicked}>Theme</button> */}
            </div>
            <div className='nav_main_div'>
                <div>
                    <a href="/"><svg height="35" viewBox="0 0 36.289 20.768" alt="Logo"><path d="M18.9 20.77V0h4.93v20.77zM0 10.39a8.56 8.56 0 1 1 8.56 8.56A8.56 8.56 0 0 1 0 10.4zm5.97-.01a2.6 2.6 0 1 0 2.6-2.6 2.6 2.6 0 0 0-2.6 2.6zm27 5.2l-1.88-1.87-1.87 1.88H25.9V12.3l1.9-1.9-1.9-1.89V5.18h3.27l1.92 1.92 1.93-1.92h3.27v3.33l-1.9 1.9 1.9 1.9v3.27z"></path></svg></a>
                </div>
                <div className='nav_input_div'>
                    <img src='https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png' />
                    <input placeholder='Search city, area or locality' value="Pakistan" />
                    <img style={{ cursor: 'pointer', marginRight: '15px', height: '15px', width: '15px' }} src='https://w7.pngwing.com/pngs/175/947/png-transparent-arrow-computer-icons-down-arrow-angle-black-desktop-wallpaper-thumbnail.png' />
                </div>
                <div className='nav_input_div _2'>
                    <input placeholder='Find Cars, Mobile Phones and more...' />
                    <div className='nav_inp_img_div'>
                        <img src={search} />
                    </div>
                </div>
                <div className='nav_side_div'>
                    <img onClick={()=> navigate('/cart')}  src="https://www.olx.com.pk/assets/iconChat_noinline.31f5df4a6a21fc770ed6863958662677.svg" alt="Go to chat" />
                    <img style={{ marginLeft: '7px' }} src="https://www.olx.com.pk/assets/iconNotifications_noinline.4444f6b42acbe30d772d80ef1225f574.svg" />
                    <div className='nav_prof_img_div'>
                        <img src='https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png' />
                        <img className='down_arrow' src='https://w7.pngwing.com/pngs/175/947/png-transparent-arrow-computer-icons-down-arrow-angle-black-desktop-wallpaper-thumbnail.png' />
                    </div>
                </div>
                <div className='btn_div'>
                    <img src='https://www.olx.com.pk/assets/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg' />
                    <button onClick={()=> navigate('/postAdd')} class="my-button" ><img src='https://www.olx.com.pk/assets/iconPlusSell_noinline.75fc7ea23e80b50447cf5757d8ef083a.svg' /> SELL</button>
                </div>
            </div>
        </div>
    </nav>
}

export default Navbar;