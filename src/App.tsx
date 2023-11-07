import Header from "./components/Header";
import CocktailCards from "./components/CocktailCards";
import data from "./cocktails";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useState, useRef, useCallback, useEffect } from "react";


function App() {
  const [cocktails, setCocktails] = useState(data);
  const [sorted, setSorted] = useState({ sorted: "name", reversed: false });
  const [searchPhrase, setSearchPhrase] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState(cocktails);
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null!);

  const sortByName = () => {
    const cocktailsCopy = [...cocktails];
    cocktailsCopy.sort((cocktailA, cocktailB) => {
      const cocktailNameA = cocktailA.name;
      const cocktailNameB = cocktailB.name;
      if (sorted.reversed) {
        return cocktailNameB.localeCompare(cocktailNameA);
      }
      return cocktailNameA.localeCompare(cocktailNameB);
    });
    setCocktails(cocktailsCopy);
    setSorted({ sorted: "name", reversed: !sorted.reversed });
  }

  const setFilters = useCallback(() => {
    const handleFilterClick = (selectedFilter:string) => {
      if (selectedFilters.includes(selectedFilter)) {
        const filters = selectedFilters.filter((val) => val !== selectedFilter);
        setSelectedFilters(filters);
      } else {
        setSelectedFilters([...selectedFilters, selectedFilter]);
      }
    }
    const newCocktails:string[] = [];
    cocktails.map((cocktail) => newCocktails.push(cocktail.standard_drinkware[0]));
    const removeDuplicates = Array.from(new Set(newCocktails)).sort();

    return (
      removeDuplicates.map((standard_drinkware, id) => (
        <button
          onClick={() => handleFilterClick(standard_drinkware)}
          key={id}
          className={`button ${selectedFilters?.includes(standard_drinkware) ? "bg-stone-500 p-3 transition-all rounded-lg" : "p-3 hover:bg-stone-400 transition-all rounded-lg"}`}
        >{standard_drinkware}</button>
      ))
    );
  }, [cocktails, selectedFilters]);


  useEffect(() => {
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
    };
    filterItems();
    setFilters();
  }, [cocktails, selectedFilters, setFilters]);


  const renderArrow = () => {
    if (sorted.reversed) return <FaArrowUp />;
    return <FaArrowDown />;
  }

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-stone-200">
      <Header />
      <div className="flex flex-wrap justify-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
          ref={inputRef}
          name="search"
          className="m-2 p-2 w-2/5 border border-stone-300 text-stone-700 rounded-xl"
        />
      </div>
      <div className="flex flex-wrap justify-center">
      <div className="p-4 border border-stone-300 flex flex-wrap justify-center w-[80vw] rounded-xl bg-stone-100">
        <p onClick={sortByName} className="hover:cursor-pointer flex flex-wrap items-center">
          <span className="mr-2">Sort by Name</span>
            {sorted.sorted === "name" && renderArrow()}
        </p>
      </div>
      <div className="p-4 border border-stone-300 bg-stone-100 flex flex-wrap justify-center mt-2 w-[80vw] rounded-xl">
        <div className="text-center flex justify-center pb-4 w-full">
          <button onClick={() => setShowFilters(!showFilters)} className="hover:bg-stone-400 transition-all p-2 rounded-lg">Filter by Glassware</button>
        </div>
        <div className="text-center flex justify-center w-full">
          {showFilters ? (
            <div className="border-t border-stone-300 m-auto text-center p-4 bg-stone-100">
              {setFilters()}
            </div>
          ) : null}
        </div>
      </div>
      </div>
      <div>
        <CocktailCards
          filteredItems={filteredItems}
          searchPhrase={searchPhrase}
        />
      </div>
    </div>
  );
}

export default App;