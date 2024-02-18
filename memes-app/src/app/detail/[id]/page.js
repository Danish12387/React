import React from 'react';
import Detail from './Detail';

const DetailCont = async ({params}) => {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const result = await res.json();
    const { memes } = result.data;

    return <Detail memesData={memes} id={params.id}/>
}

export default DetailCont;
