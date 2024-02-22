'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import './index.css';

const Detail = ({ memesData, id }) => {
    const [data, setData] = useState();
    const [text1, setText1] = useState();
    const [text2, setText2] = useState();
    const [result, setResult] = useState();
    const [Loading, setLoading] = useState(false);

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
        if (!text1 || !text2) return alert('All fields must be filled!')
        setLoading(true)
        const res = await fetch(`https://api.imgflip.com/caption_image?template_id=${id}&username=DanishKing&password=kinganonymous&text0=${text1}&text1=${text2}`);
        const result = await res.json()
        setResult(result);
        setLoading(false)
    }

    function downloadImg() {
        let imgPath = result?.data?.url;
        let fileName = getFileName(imgPath);
        saveAs(imgPath, fileName)
    }

    function getFileName(str) {
        return str.substring(str.lastIndexOf('/') + 1);
    }

    if (!data) return <h1 style={{ textAlign: 'center' }} >Loading...</h1>

    const { name, url, width, height } = data;
    return (
        <div style={{ paddingBottom: '50px' }} >
            <div className='detail_main_div'>
                <div className='detail_left_div'>
                    <h1>{name}</h1>
                    <img src={url} />
                </div>
                <div className='detail_right_div'>
                    <h1>Enter the first and second text and then click on generate button to generate the meme!</h1>
                    <label>
                        Text 1:
                        <input placeholder='Enter the first text' onChange={(e) => setText1(e.target.value)} />
                    </label>
                    <label>
                        Text 2:
                        <input placeholder='Enter the second text' onChange={(e) => setText2(e.target.value)} />
                    </label>
                    <button onClick={generateMeme} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2">Generate</button>
                </div>
            </div>
            <div>
                <div className='spinner_div'>
                    {Loading && <div className="spinner">
                        <div className="spinnerin"></div>
                    </div>}
                </div>
                {!Loading && <div className='down_img_div'>
                    <img className='meme_img' src={result?.data?.url} />
                    {/* <button onClick={downloadImg} className='img_download_btn'>Download</button> */}
                    <button onClick={downloadImg} className="button" style={{verticalAlign: 'middle'}}><span>Download</span></button>
                </div>}
            </div>

        </div>
    )
}

export default Detail;
