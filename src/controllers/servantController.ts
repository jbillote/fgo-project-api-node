import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import { Material } from "../models/material";
import { MaterialList } from "../models/material_list";
import { Servant, ServantDetails } from "../models/servant";
import { Skill } from "../models/skill";

const searchServant = async (req: Request, res: Response, next: NextFunction) => {
    let query = req.query.query;
    let result: AxiosResponse = await axios.get(`https://api.atlasacademy.io/nice/JP/servant/search?name=${query}&lang=en`);
    let servants: Array<Servant> = [];

    result.data.forEach((o: { [x: string]: any; }) => {
        servants.push({
            id: o["id"],
            name: o["name"],
            classIcon: `https://static.atlasacademy.io/JP/ClassIcons/class${classIcon(o["rarity"], o["classId"])}.png`,
            icon: o["extraAssets"]["faces"]["ascension"]["1"]
        });
    });

    return res.status(200).json(servants);
}

const getServant = async (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    let result: AxiosResponse = await axios.get(`https://api.atlasacademy.io/nice/JP/servant/${id}?lang=en`);
    let data: {[x: string]: any} = result.data;

    let portraits: Array<string> = [];
    for (const k in data["extraAssets"]["charaGraph"]["ascension"]) {
        portraits.splice(parseInt(k), 0, data["extraAssets"]["charaGraph"]["ascension"][k])
    }

    let skills: Array<Skill> = [];
    data["skills"].forEach((o: { [x: string]: any; }) => {
        skills.push({
            name: o["name"],
            icon: o["icon"]
        });
    });

    let appends: Array<Skill> = [];
    data["appendPassive"].forEach((o: { [x: string]: any; }) => {
        appends.push({
            name: o["skill"]["name"],
            icon: o["skill"]["icon"]
        });
    });

    let servant: ServantDetails = {
        id: result.data["id"],
        name: result.data["name"],
        classIcon: `https://static.atlasacademy.io/JP/ClassIcons/class${classIcon(result.data["rarity"], result.data["classId"])}.png`,
        icon: result.data["extraAssets"]["faces"]["ascension"]["1"],
        portraits: portraits,
        skills: skills,
        appends: appends,
        ascensionMaterials: processMaterials(data["ascensionMaterials"]),
        skillMaterials: processMaterials(data["skillMaterials"]),
        appendMaterials: processMaterials(data["appendSkillMaterials"])
    }

    return res.status(200).json(servant);
}

function classIcon(rarity: number, classId: number): string {
    if (rarity == 3 || rarity == 2) {
        rarity--;
    } else {
        rarity = Math.min(3, rarity);
    }

    return `${rarity}_${classId}`
}

function processMaterials(data: { [x: string]: any }): Array<MaterialList> {
    let materials: Array<MaterialList> = [];

    for (const k in data) {
        let items: Array<Material> = [];
        data[k]["items"].forEach((o: { [x: string]: any; }) => {
            items.push({
                id: o["item"]["id"],
                name: o["item"]["name"],
                icon: o["item"]["icon"],
                amount: o["amount"]
            });
        });

        materials.push({
            materials: items,
            qp: data[k]["qp"]
        })
    }

    return materials;
}

export default { searchServant, getServant };
