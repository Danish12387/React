import './index.css';
import { useState, useEffect } from 'react';
import search from '../../search.png';
import { useNavigate } from 'react-router-dom';
import { updateTheme } from '../../store/themeSlice';
import { useDispatch } from 'react-redux';
import { PostAdd, signout } from '../../config/firebase';
import { onAuthStateChangedHandler } from '../../config/firebase';
import { getSingleUser } from '../../config/firebase';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

function Navbar() {
    const [userName, setUserName] = useState('Login');
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isTrue, setIsTrue] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        try {
            onAuthStateChangedHandler(async (isLoggedIn, id, user) => {
                if (!isLoggedIn) return;
                const res = await getSingleUser(id)
                setUserName(res.userName);
            });
        } catch (e) {
            toast.error(e.message);
        }
    }, [])

    function SignOut() {
        signout()
    }

    const [color, setColor] = useState();

    const randomColor = () => {
        let random1 = Math.ceil(Math.random() * 256);
        let random2 = Math.ceil(Math.random() * 256);
        let random3 = Math.ceil(Math.random() * 256);
        setColor(`rgb(${random1}, ${random2}, ${random3})`);
    }

    const clicked = () => {
        randomColor()
        dispatch(updateTheme(color))
    }

    return <nav className={scrollPosition > 20 ? 'scroll-on' : ''}>
        <div className='nav_father_div'>
            <div className='overlay' id={isTrue ? 'dsply_sh' : ''} onClick={() => setIsTrue(!isTrue)}></div>
            <div className='nav_top_div'>
                <a href="/"><img className='logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQchAaWJ73dbvQzpd2ICNfedLHaEo7Pxd0fmOJoIxabUQ&s' /></a>
                <div className='motors'>
                    <div className='img_div'>
                        <img src='/motor.jpeg' alt='not loading' />
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
                    <img style={{ cursor: 'pointer', marginRight: '15px', height: '15px', width: '15px' }} src='https://static.thenounproject.com/png/551749-200.png' />
                </div>
                <div className='nav_input_div _2'>
                    <input placeholder='Find Cars, Mobile Phones and more...' />
                    <div className='nav_inp_img_div'>
                        <img src={search} />
                    </div>
                </div>
                <div className='nav_side_div'>
                    <ShoppingCart onClick={() => navigate('/cart')} />
                    <img style={{ marginLeft: '7px' }} src="https://www.olx.com.pk/assets/iconNotifications_noinline.4444f6b42acbe30d772d80ef1225f574.svg" />
                    <div className='nav_prof_img_div' onClick={() => setIsTrue(!isTrue)}>
                        <img src='https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png' />
                        <img className='down_arrow' src='https://static.thenounproject.com/png/551749-200.png' id={isTrue ? 'set_arrow' : 'set_arrow_again'} />
                    </div>
                    <div className='acc_info' id={isTrue ? 'dsply_sh' : ''}>
                        <div className='upper_div'>
                            <img src='https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png' />
                            <div style={{ textAlign: 'left', marginLeft: '15px' }}>
                                <p style={{ margin: 0, padding: 0 }}>Hello,</p>
                                <h3 style={{ margin: 0, padding: 0, marginTop: '8px' }}>{userName}</h3>
                            </div>
                        </div>
                        <div id='logout'>
                            <img src='https://cdn.iconscout.com/icon/free/png-256/free-logout-2477642-2061904.png' />
                            <button onClick={SignOut}>Logout</button>
                        </div>
                    </div>
                </div>
                <div className='btn_div'>
                    <img src='https://www.olx.com.pk/assets/iconSellBorder_noinline.d9eebe038fbfae9f90fd61d971037e02.svg' />
                    <button onClick={() => navigate('/postAdd')} class="my-button" ><img src='https://www.olx.com.pk/assets/iconPlusSell_noinline.75fc7ea23e80b50447cf5757d8ef083a.svg' /> SELL</button>
                </div>
            </div>
        </div>
    </nav>
}

export default Navbar;