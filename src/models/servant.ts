import { MaterialList } from "./material_list";
import { Skill } from "./skill";

export interface Servant {
    id: number,
    name: string,
    classIcon: string,
    icon: string,
    portraits: Array<string>,
    skills: Array<Skill>,
    appends:            Array<Skill>,
    ascensionMaterials: Array<MaterialList>,
    skillMaterials:     Array<MaterialList>,
    appendMaterials:    Array<MaterialList>
}
