import Images from "./Images";

export type CocktailType = {
  name: string;
  ingredients: string[];
  image: string;
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
      className="md:w-1/4 sm:w-1/3 m-3 flex justify-center items-start flex-wrap p-2 rounded-xl bg-gradient-to-br from-stone-300 to-stone-500"
    >
      <h1 className="w-full text-xl text-center font-montserrat font-light pt-1">{name}</h1>
      <div className="w-full h-1/3 flex justify-center items-center">
        <Images cocktail={name} />
      </div>
      <div className="w-full text-sm p-2 italic rounded-lg bg-stone-200 font-light">{served}</div>
      <div className="bg-stone-100 w-full px-2 py-0 rounded-lg">
        {ingredients.map((ingredient, id) => (
          <ul key={id} className="list-inside list-disc">
            <li className="py-1">{ingredient}</li>
          </ul>
        ))}
      </div>
      <div className="bg-stone-300 w-full p-3 rounded-lg">{method}</div>
      <div className="w-full p-2 flex rounded-lg items-center justify-between">
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
        <div className="bg-stone-400 h-full flex items-center px-5 rounded-lg font-montserrat">{category}</div>
      </div>
    </div>
    </>
  );
}
 
export default Card;