import { useState, useEffect } from "react";

import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";

const App = () => {
  const [searchFieldText, setSearchFieldText] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setMonsters(data);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const filterMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchFieldText);
    });
    setFilteredMonsters(filterMonsters);
  }, [searchFieldText, monsters]);

  const onChangeHandler = (event) => {
    const searchText = event.target.value.toLocaleLowerCase();
    setSearchFieldText(searchText);
  };

  return (
    <div className="container-fluid">
      <h1 className="display-4 text-center">Monster Rolodex</h1>
      <SearchBox
        onChangeHandler={onChangeHandler}
        placeholder="search monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
