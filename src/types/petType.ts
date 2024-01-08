import SpecieEnum from "../enum/SpecieEnum";

    type petType = {
        id: number;
        nome: string;
        especie: SpecieEnum;
        adotado: string;
        dataNasc: Date;
    }

    export default petType;