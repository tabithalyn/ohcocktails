import { useEffect, useMemo, useState } from "react";
import { CocktailType } from "./Card";

const Filters = ({ category, standard_drinkware }:CocktailType) => {
  const [categoryList, setCategoryList] = useState<CocktailType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const [drinkwareList, setDrinkwareList] = useState<CocktailType[]>([]);
  const [selectedDrinkware, setSelectedDrinkware] = useState<string>();

  useEffect(() => {
    setCategoryList(category);
    setDrinkwareList(standard_drinkware);
  }, [category, standard_drinkware]);

  function handleCategoryChange(e:{target:{value:string}}) {
    setSelectedCategory(e.target.value);
  }
  function handleDrinkwareChange(e:{target:{value:string}}) {
    setSelectedDrinkware(e.target.value);
  }

  function getFilteredCategories() {
    if (!selectedCategory) return categoryList;
    return categoryList.filter((cat) => cat.category === selectedCategory);
  }

  function getFilteredDrinkware() {
    if (!selectedDrinkware) return drinkwareList;
    return drinkwareList.filter((drink) => drink.standard_drinkware[0] === selectedDrinkware);
  }

  // filter animation:
  // https://codesandbox.io/s/react-filter-animation-framer-motion-0vgu9f?file=/src/App.js
  // https://codesandbox.io/s/ifojy?file=/src/Example.jsx
  // https://www.youtube.com/watch?v=sClYgoPOpaI


  const filteredCategories = useMemo(getFilteredCategories, [selectedCategory, categoryList]);

  const filteredDrinkware = useMemo(getFilteredDrinkware, [selectedDrinkware, drinkwareList]);

  return (
    <>
    <div>
      <h4>Filter by Category:</h4>
      <input type="radio" name="category" id="contemporary" onChange={handleCategoryChange} />
      <label htmlFor="contemporary">Contemporary classics</label>
      <input type="radio" name="category" id="unforgettables" onChange={handleCategoryChange} />
      <label htmlFor="unforgettables">The Unforgettables</label>
      <input type="radio" name="category" id="newera" onChange={handleCategoryChange} />
      <label htmlFor="newera">New era drinks</label>
    </div>
    </>
  );
}
 
export default Filters;