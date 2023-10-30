
type PaginationType = {
  totalCards: number;
  cardsPerPage: number;
  setCurrentPage: (page:number) => void;
  currentPage: number;
}

const Pagination = ({
  totalCards, cardsPerPage, setCurrentPage, currentPage
}:PaginationType) => {

  const pages = [];

  for (let i=1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="w-full h-[20vh] bg-stone-100 flex flex-wrap justify-center items-center">
      <ul className="flex flex-wrap justify-center items-center p-5 w-full">
        {pages.map((page:number, index:number) => (
          <li key={index}>
            <button
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={page === currentPage ? "bg-stone-400 py-3 px-4 mx-1" : "py-3 px-4 mx-1 hover:bg-stone-500 hover:cursor-pointer transition-all"}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
export default Pagination;