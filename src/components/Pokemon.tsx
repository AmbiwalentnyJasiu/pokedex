import React, { useState, useEffect } from "react";
import { TPokemonList, TPokemon } from "../types/PokemonTypes";
import { getPokemonDetails } from "../api/pokemon.api";
import {
    PokemonData,
    PokemonName,
    PokemonCard,
    PokemonTypes,
    Modal,
    ModalContent,
    CloseButton,
} from "./StyledComponents";

const GeneralPokemonData: React.FC<TPokemon> = (pokemonData) => {
    const sprite =
        pokemonData?.sprites.front_default || pokemonData?.sprites.front_female;
    const { name } = pokemonData || {};
    return (
        <PokemonData>
            {sprite && <img src={sprite} alt={name} />}
            <PokemonName>{name}</PokemonName>
            <PokemonTypes>
                Types:{" "}
                {pokemonData?.types
                    .map((type) => {
                        return type.type.name;
                    })
                    .join(", ")}
            </PokemonTypes>
        </PokemonData>
    );
};

const Pokemon: React.FC<TPokemonList> = (props) => {
    const { name, availableTypes } = props;
    const [pokemonData, setPokemonData] = useState<TPokemon>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const showByType = checkTypeToShow();

    function checkTypeToShow() {
        const pokemonTypes = pokemonData?.types.map((type) => type.type.name);
        if (pokemonTypes && availableTypes?.length) {
            return !!pokemonTypes?.filter((x) => availableTypes.includes(x)).length;
        }
        return true;
    }

    // pobieranie szczegolowych danych pokemona
    useEffect(() => {
        getPokemonDetails(name).then((data) => {
            setPokemonData(data);
        });
    }, [name]);

    return (
        <>
            {isOpen && pokemonData && (
                <Modal>
                    <ModalContent>
                        <GeneralPokemonData {...pokemonData} />
                        <div>Weigth: {pokemonData.weight}</div>
                        <div>Height: {pokemonData.height}</div>
                        <CloseButton type={"button"} onClick={() => setIsOpen(false)}>
                            Close
                        </CloseButton>
                    </ModalContent>
                </Modal>
            )}
            {pokemonData && showByType && (
                <PokemonCard onClick={() => setIsOpen(true)}>
                    <GeneralPokemonData {...pokemonData} />
                </PokemonCard>
            )}
        </>
    );
};

export default Pokemon;
