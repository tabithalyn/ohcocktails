import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

const Images = ({cocktail}:{cocktail:string}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<[]>([]);

  const url = `https://the-cocktail-db.p.rapidapi.com/search.php?s=${cocktail}`;

  const fetchCocktail = useCallback(() => {
    setLoading(true);

    const options = {
      headers: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
      }
    }

    axios
      .get(url, options)
      .then((res:AxiosResponse) => setData([res.data.drinks[0]]))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [url]);

  useEffect(() => {
    fetchCocktail();
  }, [fetchCocktail]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
    {
      data.map((cocktail:{
        idDrink: string;
        strDrinkThumb: string;
        strDrink: string;
      }) => (
        <div key={cocktail.idDrink} className="w-full h-full flex justify-center overflow-hidden">
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="rounded-lg" />
        </div>
      ))
    }
    </>
  );
}
 
export default Images;