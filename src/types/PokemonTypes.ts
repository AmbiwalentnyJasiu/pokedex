export type TPokemonList = {
    name: string;
    url: string;
    availableTypes: Array<string> | undefined;
};

export type TPokemon = {
    name: string;
    types: Array<{
        slot: number;
        type: TPokemonType;
    }>;
    sprites: {
        front_default: string | null;
        front_shiny: string | null;
        front_female: string | null;
        front_shiny_female: string | null;
        back_default: string | null;
        back_shiny: string | null;
        back_female: string | null;
        back_shiny_female: string | null;
    };
    weight: number;
    height: number;
};

export type TPokemonType = {
    name: string;
    url: string;
};

export type TPokemonOptionType = {
    label: string;
    value: string;
};
