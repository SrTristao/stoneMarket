export class Cupons {
    public id: number;
    public cupom: string;
    public autores: string[];
    public desconto: number;

    constructor(id:number, cupom: string, autores: string[], desconto: number) {
        this.id = id;
        this.cupom = cupom;
        this.autores = autores;
        this.desconto = desconto;
    }

    static getCupons() {
        return [
            new Cupons(1, 'TrabalheNaStone', ['Martin Fowler'], 10)
        ]
    }
}