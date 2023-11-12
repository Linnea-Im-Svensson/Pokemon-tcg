import { AnimatePresence, motion } from "framer-motion";
import VSStripe from "./VSStripe";
import Image from "next/image";
import { GamePokemon } from "./Pokeball";
import { useEffect, useState } from "react";
import {
  Result,
  getCpuPokemon,
  getResults,
} from "~/utils/chooseYourStarterGame";
import { api } from "~/trpc/react";
import { BsArrowClockwise } from "react-icons/bs";

const BattleScreen = ({
  chosenPokemon,
  setShowBattleScreen,
  setChosenPokemon,
}: {
  chosenPokemon: GamePokemon;
  setShowBattleScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setChosenPokemon: React.Dispatch<React.SetStateAction<GamePokemon | null>>;
}) => {
  const [cpuPokemon, setCpuPokemon] = useState<GamePokemon>(getCpuPokemon());
  const [initialResult, setInitalResult] = useState<boolean>(true);
  const [updatedResult, setUpdatedResult] = useState<Result | undefined>(
    getResults(chosenPokemon, cpuPokemon),
  );
  const ctx = api.useUtils();
  const { mutate } = api.user.addCoins.useMutation({
    onSuccess: () => {
      ctx.user.getPokeCoins.invalidate();
    },
  });
  const game = api.dashboard.getGameDetails.useQuery().data;

  useEffect(() => {
    setTimeout(() => {
      setInitalResult(false);
    }, 1500);
    //put half the amount bc of strict mode
    updatedResult === "Won" &&
      game &&
      game[0]?.winValue &&
      mutate({ amountOfCoins: game[0]?.winValue / 2 });
  }, []);

  const handleReset = () => {
    setShowBattleScreen(false);
    setChosenPokemon(null);
  };

  return (
    <>
      {/* Background */}
      <div className="absolute right-0 top-0 flex h-full w-full flex-col items-center justify-between bg-black bg-opacity-30 pb-16 pt-28">
        <motion.div
          initial={{ translateX: -2000 }}
          animate={{ translateX: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex h-60 w-full flex-col justify-around border-y-4 border-blue-100 bg-gradient-to-t from-blue-400 via-blue-800 to-blue-400"
        >
          <VSStripe />
        </motion.div>
        <div>
          {/* results */}
          <AnimatePresence mode="popLayout">
            {initialResult && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute left-[50%] top-[54%] z-20 -translate-x-[50%] -translate-y-[50%]"
              >
                <Image
                  src="/vs.png"
                  alt="vs"
                  height={150}
                  width={150}
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
          {updatedResult && (
            <>
              {updatedResult === "Won" ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="fixed left-[50%] top-[53%] z-20 flex h-96 -translate-x-[50%] -translate-y-[50%] flex-col items-center justify-center"
                >
                  <Image
                    src="/win1.png"
                    alt="vs"
                    height={400}
                    width={400}
                    priority
                  />
                  <button
                    onClick={handleReset}
                    className="absolute bottom-0 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-200 font-bold"
                  >
                    <BsArrowClockwise size={40} />
                  </button>
                </motion.div>
              ) : updatedResult === "Lost" ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="fixed left-[50%] top-[52%] z-20 flex h-96 -translate-x-[50%] -translate-y-[50%] flex-col items-center justify-center "
                >
                  <Image
                    src="/lose.png"
                    alt="vs"
                    height={500}
                    width={500}
                    priority
                  />
                  <button
                    onClick={handleReset}
                    className="absolute bottom-0 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-200 font-bold"
                  >
                    <BsArrowClockwise size={40} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="fixed left-[50%] top-[54%] z-20 flex h-96 -translate-x-[50%] -translate-y-[50%] flex-col items-center justify-center"
                >
                  <Image
                    src="/tryagain.png"
                    alt="vs"
                    height={500}
                    width={500}
                    priority
                  />
                  <button
                    onClick={handleReset}
                    className="absolute bottom-0 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-200 font-bold"
                  >
                    <BsArrowClockwise size={40} />
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
        <motion.div
          initial={{ translateX: 2000 }}
          animate={{ translateX: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex h-60 w-full flex-col justify-around border-y-4 border-blue-100 bg-gradient-to-t from-blue-400 via-blue-800 to-blue-400"
        >
          <VSStripe />
        </motion.div>
      </div>
      <div className="fixed left-0 top-0 flex h-full w-full pt-14 lg:pt-0">
        {/* Pokemon chosen by player */}
        {chosenPokemon && (
          <motion.div
            initial={{ translateX: 2000 }}
            animate={{ translateX: 0 }}
            transition={{ duration: 0.7, ease: "linear", delay: 0.1 }}
            className=" flex h-full w-full items-end justify-center pb-4"
          >
            <Image
              src={`/${chosenPokemon}.png`}
              height={chosenPokemon === "bulbasaur" ? 100 : 200}
              width={chosenPokemon === "bulbasaur" ? 100 : 200}
              alt={chosenPokemon}
              priority
              className={`${
                chosenPokemon !== "charmander1"
                  ? "mt-10 h-40 lg:mt-20 lg:h-64"
                  : "h-60 lg:h-96"
              } w-auto ${chosenPokemon !== "squirtle" && "-scale-x-100"} ${
                chosenPokemon !== "charmander1" && "mb-20 lg:mb-10"
              } ${chosenPokemon === "squirtle" && "mix-blend-multiply"}`}
            />
          </motion.div>
        )}
        {/* Pokemon chosen by cpu */}
        {cpuPokemon && (
          <motion.div
            initial={{ translateX: -2000 }}
            animate={{ translateX: 0 }}
            transition={{ duration: 0.7, ease: "linear", delay: 0.1 }}
            className=" flex h-full w-full items-start justify-center py-10"
          >
            <Image
              src={`/${cpuPokemon}.png`}
              height={200}
              width={200}
              alt={cpuPokemon}
              priority
              className={`${
                cpuPokemon !== "charmander1"
                  ? "mt-10 h-40 lg:mt-20 lg:h-64"
                  : "h-60 lg:h-96"
              } w-auto ${chosenPokemon === "squirtle" && " -scale-x-100"} `}
            />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default BattleScreen;

// ${chosenPokemon !== "squirtle" && " -scale-x-100"}
