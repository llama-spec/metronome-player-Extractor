import fs from "fs";
import getPlayer from "./ytbi/store";

getPlayer("getNew").then((data) => {
  // @ts-expect-error
  fs.writeFile(`./cachedPlayers/${data.id}`, data.data, () => undefined);
  fs.writeFile(`./cachedPlayers/latest`, data.id, () => undefined);
});
