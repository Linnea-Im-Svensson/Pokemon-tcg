import { PokemonCard, Rarity } from "@prisma/client";

export const randomizeCards = (allCards: PokemonCard[]) => {
  let common: PokemonCard[] = [];
  let uncommon: PokemonCard[] = [];
  let rare: PokemonCard[] = [];
  let doubleRare: PokemonCard[] = [];
  let superRare: PokemonCard[] = [];
  let artRare: PokemonCard[] = [];
  let secretArtRare: PokemonCard[] = [];
  let ultraRare: PokemonCard[] = [];

  const pokemonPack: PokemonCard[] = [];

  const randomRarity = () => {
    const rarity: Rarity[] = [];

    for (let i = 1; i <= 10; i++) {
      let randomNr;
      if (i <= 8) {
        randomNr = Math.floor(Math.random() * 2);
        if (randomNr === 0) {
          rarity.push("common");
        } else {
          rarity.push("uncommon");
        }
      }
      if (i === 9) {
        randomNr = Math.floor(Math.random() * 3.2);

        switch (randomNr) {
          case 0:
          case 1:
            rarity.push("rare");
            break;
          case 2:
            rarity.push("doubleRare");
            break;
          case 3:
            rarity.push("superRare");
            break;
        }
      }
      if (i === 10) {
        randomNr = Math.floor(Math.random() * 3.2);

        switch (randomNr) {
          case 0:
          case 1:
            rarity.push("rare");
            break;
          case 2:
            rarity.push("artRare");
            break;
          case 3:
            rarity.push("secretArtRare");
            break;
        }
      }
    }
    return rarity;
  };

  const rarity = randomRarity();

  allCards.forEach((card) => {
    switch (card.rarity) {
      case "common":
        common.push(card);
        break;
      case "uncommon":
        uncommon.push(card);
        break;
      case "rare":
        rare.push(card);
        break;
      case "doubleRare":
        doubleRare.push(card);
        break;
      case "superRare":
        superRare.push(card);
        break;
      case "artRare":
        artRare.push(card);
        break;
      case "secretArtRare":
        secretArtRare.push(card);
        break;
      case "ultraRare":
        ultraRare.push(card);
        break;
    }
  });
  rarity.forEach((rarity: Rarity) => {
    switch (rarity) {
      case "common":
        pokemonPack.push(
          common[Math.floor(Math.random() * (common.length + 0.2))]!,
        );
        break;
      case "uncommon":
        pokemonPack.push(
          uncommon[Math.floor(Math.random() * (uncommon.length + 0.2))]!,
        );
        break;
      case "rare":
        pokemonPack.push(
          rare[Math.floor(Math.random() * (rare.length + 0.4))]!,
        );
        break;
      case "doubleRare":
        pokemonPack.push(
          doubleRare[Math.floor(Math.random() * (doubleRare.length + 0.4))]!,
        );
        break;
      case "superRare":
        pokemonPack.push(
          superRare[Math.floor(Math.random() * (superRare.length + 0.4))]!,
        );
        break;
      case "artRare":
        pokemonPack.push(
          artRare[Math.floor(Math.random() * (artRare.length + 0.4))]!,
        );
        break;
      case "secretArtRare":
        pokemonPack.push(
          secretArtRare[
            Math.floor(Math.random() * (secretArtRare.length + 0.4))
          ]!,
        );
        break;
      case "ultraRare":
        pokemonPack.push(
          ultraRare[Math.floor(Math.random() * (ultraRare.length + 0.4))]!,
        );
        break;
    }
  });

  return pokemonPack;
};
