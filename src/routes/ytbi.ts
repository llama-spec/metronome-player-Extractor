import { Request, Response, Router } from "express";
import getPlayer from "../ytbi/store.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const playerURL = req.query ? String(req.query.playerURL) : undefined;
    console.log(`[findFunction] parsing ${playerURL}`);
    return res.send(await getPlayer(playerURL));
  } catch {
    return res.status(500);
  }
});

export default router;
