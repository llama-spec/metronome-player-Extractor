import fs from "fs";
import getPlayer from "./ytbi/store";

getPlayer("getNew").then((data) => {
  // console.log(data)
  fs.writeFile(
    `./cachedPlayers/${data.id}`,
    // 💡 This is the corrected line
    Buffer.from(new Uint8Array(data.data)),
    () => undefined
  );
  fs.writeFile(`./cachedPlayers/latest`, data.id, () => undefined);
});
