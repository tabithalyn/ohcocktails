
export type CocktailType = {
  name: string;
  ingredients: string[];
  standard_drinkware: string[];
  method: string;
  category: string;
  served?: string | undefined;
}

const Card = ({
  name, ingredients, standard_drinkware, method, category, served
}:CocktailType) => {
  return (
    <>
    <div
      className="md:w-1/4 sm:w-1/3 m-3 flex justify-center flex-wrap bg-slate-100 p-2"
    >
      <h1 className="w-full bg-stone-200 h-7 text-xl text-center font-montserrat font-light">{name}</h1>
      <div className="w-full flex justify-center items-center h-1/4">
        <img src="src/assets/cocktails/cocktail-1.png" alt={name} className="h-full flex overflow-hidden" />
      </div>
      <div className="bg-orange-100 w-full text-sm">{served}</div>
      <div className="bg-neutral-200 w-full">
        {ingredients.map((ingredient, id) => (
          <ul key={id}>
            <li>{ingredient}</li>
          </ul>
        ))}
      </div>
      <div className="bg-stone-300 w-full">{method}</div>
      <div className="bg-gray-200 w-full p-2 flex items-center justify-between">
        <img
          src={standard_drinkware[1]}
          className={
            standard_drinkware[1] === "src/assets/glasses/flute-glass.png" ||
            standard_drinkware[1] === "src/assets/glasses/zombie-glass.png" ||
            standard_drinkware[1] === "src/assets/glasses/highball-glass.png" ||
            standard_drinkware[1] === "src/assets/glasses/collins-glass.png" ||
            standard_drinkware[1] === "src/assets/glasses/hurricane-glass.png" ||
            standard_drinkware[1] === "src/assets/glasses/red-wine-glass.png"
            ? "w-1/12 float-left" : "w-1/6 float-left"
          }
        />
        <div className="bg-amber-100 h-full flex items-center px-5">{category}</div>
      </div>
    </div>
    </>
  );
}
 
export default Card;