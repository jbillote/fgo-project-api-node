import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { Servant } from "../models/servant";

const searchServant = async (req: Request, res: Response, next: NextFunction) => {
    let query = req.query.query;
    let result: AxiosResponse = await axios.get(`https://api.atlasacademy.io/nice/JP/servant/search?name=${query}&lang=en`);
    let servants: Array<Servant> = []

    result.data.forEach((o: { [x: string]: any; }) => {
        servants.push({
            id: o["id"],
            name: o["name"],
            classIcon: `https://static.atlasacademy.io/JP/ClassIcons/class${o["rarity"] > 3 ? 3 : o["rarity"]}_${o["classId"]}.png`,
            icon: o["extraAssets"]["faces"]["ascension"]["1"]
        })
    });

    return res.status(200).json(servants);
}

export default { searchServant };
