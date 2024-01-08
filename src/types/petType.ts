import SpecieEnum from "../enum/SpecieEnum";

    type petType = {
        id: number;
        nome: string;
        especie: SpecieEnum;
        adotado: string;
        idade: number;
    }

    export default petType;