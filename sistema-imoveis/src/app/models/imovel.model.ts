export interface Imovel {
  id: number;
  nome: string;
  tipo: string;
  valor: number;
  condominio?: number;
  quartos: number;
  banheiros: number;
  mobiliado?: boolean;
  area: number;
  venda: boolean;
  aluguel: boolean;
  dataAnuncio?: string;
  endereco: Endereco;
  proprietarioId?: string;
  telefone: string;
}

export interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}
