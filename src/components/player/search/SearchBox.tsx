import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBox({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) {
  return (
    <>
      <div className="flex justify-center my-16">
        <form className="w-md" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="w-[85%] outline-none bg-none border border-primary py-2 px-3 mt-4 mb-3 rounded-l-xl text-primary placeholder:text-primary placeholder:font-semibold"
            name="search"
            id="search"
            value={searchTerm}
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="w-[15%] bg-primary text-primary-foreground border border-primary p-2 rounded-r-xl cursor-pointer hover:bg-primary/80 transition duration-300"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    </>
  );
}
