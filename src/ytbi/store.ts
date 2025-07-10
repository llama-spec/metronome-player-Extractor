import { createStore } from "zustand/vanilla";
import { Player } from "youtubei.js";
import { ICache } from "youtubei.js/dist/src/types";

const DEFAULT_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0";

interface YTBIStore {
  playerURL: string;
  cachedPlayer: Uint8Array;
}

const store = createStore<YTBIStore>(() => ({
  playerURL: "",
  cachedPlayer: new Uint8Array(),
}));

let cachedVal: ArrayBuffer;

const fakeCache: ICache = {
  cache_dir: "",
  get: async () => undefined,
  set: async (k, v) => {
    cachedVal = v;
  },
  remove: async () => undefined,
};

const getPlayer = async (newPlayerURL?: string) => {
  const { playerURL, cachedPlayer } = store.getState();
  if (newPlayerURL === undefined || playerURL === newPlayerURL) {
    return { id: playerURL, data: cachedPlayer };
  }
  const newPlayer = await Player.create(fakeCache);
  // @ts-expect-error
  store.setState({ playerURL: newPlayer.player_id, cachedPlayer: cachedVal });
  console.log(`[getPlayer] Player created for ${newPlayer.player_id}`);
  return { id: newPlayer.player_id, data: cachedVal };
};

export default getPlayer;
