import SpecieEnum from "../enum/SpecieEnum";

    type petType = {
        id: number;
        nome: string;
        especie: SpecieEnum;
        adotado: boolean;
        dataNasc: Date;
    }

    export default petType;