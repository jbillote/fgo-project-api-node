import { MaterialList } from "./material_list";
import { Skill } from "./skill";

interface Servant {
    id:        number,
    name:      string,
    classIcon: string,
    icon:      string
}

interface ServantDetails extends Servant  {
    portraits:          Array<string>,
    skills:             Array<Skill>,
    appends:            Array<Skill>,
    ascensionMaterials: Array<MaterialList>,
    skillMaterials:     Array<MaterialList>,
    appendMaterials:    Array<MaterialList>
}

export { Servant, ServantDetails };
