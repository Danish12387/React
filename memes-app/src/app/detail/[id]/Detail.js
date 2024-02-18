'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import './index.css';

const Detail = ({ memesData, id }) => {
    const [data, setData] = useState();
    const [text1, setText1] = useState();
    const [text2, setText2] = useState();
    const [result, setResult] = useState();
    const [Loading, setLoading] = useState(true);

    const getSingleMeme = () => {
        memesData.map((item) => {
            if (id === item.id) {
                return setData(item)
            }
        })
    }

    useEffect(() => {
        memesData.filter(getSingleMeme);
    }, [])

    const generateMeme = async () => {
        if (Loading) {
            return <div class="spinner">
                <div class="spinnerin"></div>
            </div>
        }
        if (!text1 || !text2) return alert('All fields must be filled!')
        const res = await fetch(`https://api.imgflip.com/caption_image?template_id=${id}&username=DanishKing&password=kinganonymous&text0=${text1}&text1=${text2}`);
        const result = await res.json()
        setResult(result);

    }

    if (!data) return <h1 style={{ textAlign: 'center' }} >Loading...</h1>

    const { name, url, width, height } = data;
    return (
        <div style={{ backgroundColor: '#222', paddingBottom: '50px' }} >
            <div className='detail_main_div'>
                <div className='detail_left_div'>
                    <h1>{name}</h1>
                    <img src={url} />
                </div>
                <div className='detail_right_div'>
                    <h1>Enter the first and second text and then click on generate button to generate the meme!</h1>
                    <input placeholder='Enter the first text' onChange={(e) => setText1(e.target.value)} />
                    <input placeholder='Enter the second text' onChange={(e) => setText2(e.target.value)} />
                    <button onClick={generateMeme} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2">Generate</button>
                </div>
            </div>
            <div>
                <img className='meme_img' src={result?.data?.url} />
            </div>

        </div>
    )
}

export default Detail;
