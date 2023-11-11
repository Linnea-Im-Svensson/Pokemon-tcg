import { GamePokemon } from "~/app/_components/games/chooseYourStarter/Pokeball";

export type Result = "Won" | "Lost" | "Draw";

export const getCpuPokemon = () => {
  const nr = Math.ceil(Math.random() * 3);
  const cpuPokemon: GamePokemon =
    nr === 1 ? "charmander1" : nr === 2 ? "squirtle" : "bulbasaur";
  return cpuPokemon;
};

export const getResults = (
  userPokemon: GamePokemon,
  cpuPokemon: GamePokemon,
) => {
  if (userPokemon === "charmander1") {
    switch (cpuPokemon) {
      case "bulbasaur":
        return "Won";
      case "squirtle":
        return "Lost";
      case "charmander1":
        return "Draw";
      default: {
        const exhaustiveCheck: never = cpuPokemon;

        throw new Error(exhaustiveCheck);
      }
    }
  }
  if (userPokemon === "squirtle") {
    switch (cpuPokemon) {
      case "bulbasaur":
        return "Lost";
      case "squirtle":
        return "Draw";
      case "charmander1":
        return "Won";
      default: {
        const exhaustiveCheck: never = cpuPokemon;

        throw new Error(exhaustiveCheck);
      }
    }
  }
  if (userPokemon === "bulbasaur") {
    switch (cpuPokemon) {
      case "bulbasaur":
        return "Draw";
      case "squirtle":
        return "Won";
      case "charmander1":
        return "Lost";
      default: {
        const exhaustiveCheck: never = cpuPokemon;

        throw new Error(exhaustiveCheck);
      }
    }
  }
};
