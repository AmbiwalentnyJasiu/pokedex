import React, { useState, useEffect } from "react";
import { getPokemonsList, getPokemonTypes } from "./api/pokemon.api";
import Pokemon from "./components/Pokemon";
import {
  TPokemonList,
  TPokemonOptionType,
  TPokemonType,
} from "./types/PokemonTypes";
import Select, { MultiValue } from "react-select";
import useDebounce from "./utils/useDebounce";
import {
  AppContainer,
  Filters,
  InputContainer,
  LoadingScreen,
  LoadMoreButton,
  PokemonListContainer,
} from "./components/StyledComponents";

const RequestFetchStatuses = {
  NULL: null,
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

function App() {
  const [pokemonsData, setPokemonsData] = useState<Array<TPokemonList>>([]); // glowne dane pokemonow
  const [pokemonsDataFetchStatus, setPokemonsDataFetchStatus] = useState<
      string | null
      >(); // status requesta
  const [filteredPokemonsData, setFilteredPokemonsData] = useState<
      Array<TPokemonList>
      >([]); // przefiltorowane dane pokemonow po nazwie i uzyte do wyrenderowania listy pokoemonow
  const [urlData, setUrlData] = useState<string | null>(
      `https://pokeapi.co/api/v2/pokemon/`
  ); // url do pobierania danych
  const [pokemonTypes, setPokemonTypes] = useState<Array<TPokemonType>>(); // typy pokemonow do wygenerowania opcji w select
  const [selectValue, setSelectValue] =
      useState<MultiValue<TPokemonOptionType>>(); // stan wartosci selecta typu
  const [selectInputValue, setSelectInputValue] = useState<string>(""); // szukajka w select typu
  const [nameInput, setNameInput] = useState<string>(""); // stan wartosci inputa name
  const debouncedNameInput = useDebounce<string>(nameInput, 300); // debounced wartosc inputa name wykorzystywana do filtrowania

  // pobieranie danych pokemonow
  const loadPokemonData = () => {
    setPokemonsDataFetchStatus(RequestFetchStatuses.PENDING); // status requesta
    getPokemonsList(urlData)
        .then((data) => {
          setPokemonsDataFetchStatus(RequestFetchStatuses.SUCCESS); // status requesta
          setUrlData(data.next); // ustawianie kolejnego urla do pobierania pokemownow
          setPokemonsData((prev) => [...prev, ...data.results]); // zapisywanie pokemonow
        })
        .catch((error) => {
          setPokemonsDataFetchStatus(RequestFetchStatuses.ERROR); // status requesta
          console.log(error);
        });
  };

  // pobieranie danych pokemonow przy zaladowaniu aplikacji
  useEffect(() => {
    loadPokemonData();
  });

  // filtorwanie pokemonow po nazwie
  useEffect(() => {
    let newFilteredData = [...pokemonsData];
    if (debouncedNameInput) {
      if (debouncedNameInput.length === 1) {
        newFilteredData = newFilteredData.filter(
            (pokemonData) =>
                pokemonData.name.toLowerCase()[0] ===
                debouncedNameInput.toLowerCase()
        ); // nazwa pokemona zaczyna sie od literki w inpucie
      }
      if (debouncedNameInput.length > 1) {
        newFilteredData = newFilteredData.filter((pokemonData) =>
            pokemonData.name
                .toLowerCase()
                .includes(debouncedNameInput.toLowerCase())
        ); // nazwa pokemona posiada stringa z inputa nazwy
      }
    }
    setFilteredPokemonsData(newFilteredData); // ustawianie przefiltorwanych pokemonow
  }, [pokemonsData, debouncedNameInput]);

  // pobieranie typow pokemonow przy zaladowaniu aplikacji
  useEffect(() => {
    getPokemonTypes()
        .then((data) => {
          setPokemonTypes(data.results);
        })
        .catch((error) => console.log(error));
  }, []);

  return (
      <AppContainer>
        {pokemonsDataFetchStatus === RequestFetchStatuses.PENDING && (
            <LoadingScreen>Loading...</LoadingScreen> // loading page jezeli request leci
        )}
        <Filters>
          <InputContainer>
            <label>Name</label>
            <input
                name={"name"}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <label>Type</label>
            <Select
                isMulti
                name="colors"
                options={pokemonTypes?.map((type: TPokemonType) => ({
                  label: type.name,
                  value: type.name,
                }))} // przerobienie typow pod opcji selecta
                className="basic-multi-select"
                classNamePrefix="select"
                value={selectValue ?? null}
                inputValue={selectInputValue}
                onChange={(newValue) => setSelectValue(newValue)}
                onInputChange={(newValue) => setSelectInputValue(newValue)}
                onMenuClose={() => {}}
                onMenuOpen={() => {}}
            />
          </InputContainer>
        </Filters>
        <PokemonListContainer>
          {filteredPokemonsData.map((pokemon: any) => (
              <Pokemon
                  key={pokemon.name}
                  name={pokemon.name}
                  url={pokemon.url}
                  availableTypes={selectValue?.map((option) => option.value)} // przekazywanie dozwolonych typow do przefiltrowania
              />
          ))}
        </PokemonListContainer>
        <LoadMoreButton onClick={() => loadPokemonData()}>
          Load More
        </LoadMoreButton>
      </AppContainer>
  );
}

export default App;
