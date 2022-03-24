import axios from "axios";

export const getPokemonsList = (url: string | null) => {
    if (url) {
        return axios
            .get(url)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
    }
    return Promise.reject(() => {
        return "Nie ma kolejnych rekordow";
    });
};

export const getPokemonDetails = (name: string) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}/`;
    return axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
};

export const getPokemonTypes = () => {
    const url = `https://pokeapi.co/api/v2/type/`;
    return axios
        .get(url)
        .then((response) => {
            console.log(response);
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
};
