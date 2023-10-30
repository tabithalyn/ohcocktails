import { useEffect, useMemo, useRef, useState } from "react";
import data from "../cocktails";
import CocktailCards from "./CocktailCards";

const SearchFilter = () => {
  const [cocktails] = useState(data);
  const [query, setQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState(cocktails);
  const inputRef = useRef<HTMLInputElement>(null!);

  const setFilters = () => {
    const newCocktails:string[] = [];
    cocktails.map((cocktail) => newCocktails.push(cocktail.standard_drinkware[0]));
    const removedDuplicates = Array.from(new Set(newCocktails));

    return (
      removedDuplicates.map((cocktail, id) => (
        <button
          onClick={() => handleFilterClick(cocktail)}
          key={id}
          className={`button ${selectedFilters?.includes(cocktail) ? "active" : ""}`}
          style={{ margin: "3px" }}
        >
          {cocktail}
        </button>
      ))
    );
  }

  useEffect(() => {
    filterItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters]);

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      const tempItems = selectedFilters.map((selectedCategory) => {
        const temp = cocktails.filter((cocktail) => cocktail.standard_drinkware[0] === selectedCategory);
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...cocktails]);
    }
  }

  const handleFilterClick = (selectedFilter:string) => {
    if (selectedFilters.includes(selectedFilter)) {
      const filters = selectedFilters.filter((val) => val !== selectedFilter);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedFilter]);
    }
  }

  const search = useMemo(() => {
    const newFilteredItems = [...filteredItems];
    return newFilteredItems.filter((cocktail) => {
      return cocktail.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [filteredItems, query]);

  return (
    <>
    <div>
      <div style={{ height: "100px", overflowY: "auto", border: "2px solid #ccc" }}>
        {setFilters()}
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
      />
    </div>
    <div>
      {search.map((cocktail) => (
        <CocktailCards key={cocktail.id} />
      ))}
    </div>
    </>
  );
}
 
export default SearchFilter;