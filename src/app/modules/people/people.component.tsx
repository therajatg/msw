import { Person } from "./model";
import { usePeopleQuery } from "./query";
import { useState } from "react";
import "./people.css";

export function People() {
  const { data: people, loading, error } = usePeopleQuery();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >("ascending");

  const renderCells = ({ name, show, actor, movies, dob }: Person) => (
    <>
      <td>{name}</td>
      <td>{show}</td>
      <td>{actor}</td>
      <td>{dob}</td>
      <td
        dangerouslySetInnerHTML={{
          __html: movies.map(({ title }) => title).join(", "),
        }}
      ></td>
    </>
  );

  if (loading) {
    return <p>Fetching People...</p>;
  }

  if (people === undefined || error) {
    return <h2>Oops! looks like something went wrong!</h2>;
  }

  if (people.length === 0) {
    return <p>No People Available.</p>;
  }

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPeople = filteredPeople.sort((a, b) => {
    if (sortDirection === "ascending") {
      return a["name"] > b["name"] ? 1 : -1;
    }
    return a["name"] < b["name"] ? 1 : -1;
  });

  const totalItems = sortedPeople.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentPeople = sortedPeople.slice(startIndex, endIndex);

  const handleSort = (key: keyof Person) => {
    setSortDirection((prev) =>
      prev === "ascending" ? "descending" : "ascending"
    );
  };

  return (
    <div>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search"
        />
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")} aria-sort={sortDirection}>
              Name
            </th>
            <th>Show</th>
            <th>Actor/Actress</th>
            <th>Date of birth</th>
            <th>Movies</th>
          </tr>
        </thead>

        <tbody>
          {currentPeople.map((people, index) => (
            <tr key={index}>{renderCells(people)}</tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <p>
          Showing {startIndex + 1}-{endIndex} of {totalItems}
        </p>
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          First
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}
