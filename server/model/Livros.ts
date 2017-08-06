export class Livros {
    public titulo: string;
    public autor: string;
    public preco: number;
    public qtde: number;
    public id: number;
    public precoTotal?: number;
    public vlrDesconto?: number;

    constructor(id: number, titulo: string, autor: string, preco: number, qtde: number) {
        this.titulo = titulo;
        this.autor = autor;
        this.preco = preco;
        this.qtde = qtde;
        this.id = id;
    }    

    static getLivros() : Livros[] {
        return [
                new Livros(1,'The Pragmatic Programmer: From Journeyman to Master', 'Andrew Hunt & Dave Thomas', 40.00, 12),
                new Livros(2, 'The Mythical Man-Month: Essays on Software Engineering', 'Frederick P. Brooks', 80.00, 1),
                new Livros(3, 'Expressões Regulares - Uma Abordagem Divertida', 'Aurelio Marinho Jargas', 20.00, 13),
                new Livros(4, 'Domain Driven Design: Tackling Complexity in the Heart of Software', 'Eric Evans', 120.00, 42),
                new Livros(5, 'Patterns of Enterprise Application Architecture', 'Martin FowIer', 32.00, 42),
                new Livros(6, 'Epigrams in Programming', 'Alan Perils', 31.00, 0),
                new Livros(7, 'Implementing Domain-Driven Design', 'Vaughn Vernon', 31.00, 42),
                new Livros(8, 'Vaughn Vernon', 'Vaughn Vernon', 22.00, 42),
                new Livros(9, 'Scalable Internet Architectures', 'Theo Schlossnagle', 18.00, 4),
                new Livros(10, 'Refactoring: Improving the Design of Existing Code', 'Martin Fowler', 33.00, 2),
                new Livros(11, 'Treinamento Em C', 'Victorine Viviane Mizrahi', 42.00, 6),
                new Livros(12, 'Algoritmos: Teoria e Prática', 'Thomas H. Cormen', 4.60, 1)
            ]
    }
}
