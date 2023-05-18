export interface Imovel {
    id: number;
    nome: string;
    tipo: string[];
    valor: number;
    condominio: number;
    quartos: number;
    banheiros: number;
    mobiliado: boolean;
    area: number;
    venda: boolean;
    aluguel: boolean;
    dataAnuncio: Date;
    endereco: Endereco[];
    proprietarioId: number;
  }
  
  export interface Endereco {
    id: number;
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  }
  
  export interface Proprietario {
    id: number;
    nome: string;
    imovelId: number;
  }
  