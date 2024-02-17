import Image from "next/image";
import { GetAllProducts } from './config/firebase';
import Card from './Cards/page';

export default async function Home() {

  const res = await GetAllProducts();

  return (
    <div className='dash_baap' style={{ backgroundColor: theme }}>
      <div className="dashboard">
        {products.map((item) => {
          return <Card item={item} />
        })}
      </div>
    </div>

  );
}
