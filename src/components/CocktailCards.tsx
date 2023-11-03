// import ReactPaginate from "react-paginate";
import cocktails from "../cocktails";
import Card, { CocktailType } from "./Card";
import { useState, useEffect, useMemo } from "react";
import Pagination from "./Pagination";

const CocktailCards = ({filteredItems, searchPhrase}:{filteredItems:CocktailType[]; searchPhrase:string;}) => {
  const [data, setData] = useState<CocktailType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(12);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / cardsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * cardsPerPage;
  const indexOfFirstItem = indexOfLastItem - cardsPerPage;

  useEffect(() => {
    return setData(cocktails);
  }, []);

  const search = useMemo(() => {
    const newFilteredItems = [...filteredItems];
    return newFilteredItems.filter((cocktail) => {
      return (
        cocktail.name.toLowerCase().includes(searchPhrase.toLowerCase())
        || cocktail.ingredients[0].toLowerCase().includes(searchPhrase.toLowerCase())
        || cocktail.category.toLowerCase().includes(searchPhrase.toLowerCase())
        || cocktail.standard_drinkware[0].toLowerCase().includes(searchPhrase.toLowerCase()));
    });
  }, [filteredItems, searchPhrase]);

  return(
    <>
    <div className="flex flex-wrap justify-center w-full text-sm font-rubik pb-[20vh]">
      {
        search.slice(indexOfFirstItem, indexOfLastItem).map((cocktail:CocktailType, id:number) => (
          <Card
            name={cocktail.name}
            ingredients={cocktail.ingredients}
            standard_drinkware={cocktail.standard_drinkware}
            method={cocktail.method}
            category={cocktail.category}
            served={cocktail.served}
            key={id}
          />
        ))
      }
    </div>
    <div className="fixed bottom-0 left-0 z-20 w-full">
    <Pagination
      totalCards={search.length}
      cardsPerPage={cardsPerPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
    />
    </div>
  </>
  );
}

export default CocktailCards;