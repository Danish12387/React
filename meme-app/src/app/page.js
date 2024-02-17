import Image from "next/image";
import Card from '../component/Card';
import Link from "next/link";

export default async function Home() {
  const res = await fetch("https://api.imgflip.com/get_memes");
  const result = await res.json();
  const { memes } = result.data;

  return (
    <div className="cards_main_div">
      <h1>Find any meme here!</h1>
      {memes.map((item) => {
        return <Link
          href={`/detail/${item.id}`}
          className=""
          rel="noopener noreferrer"
        ><Card items={item} /></Link>
      })}
    </div>
  );
}

