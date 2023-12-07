import fetch from "node-fetch";
import { useState, ChangeEvent } from "react";

interface Collection {
  id: number;
  name: string;
}

export function Pesquisar() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Collection[]>([]);

  const handleSearch = async () => {
    const url = `https://api.themoviedb.org/3/search/collection?query=${query}&include_adult=true&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer YOUR_API_KEY",
      },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      setResults(json.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}
