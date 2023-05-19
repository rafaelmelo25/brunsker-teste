import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Endereco } from '../models/endereco.model';
import { Imovel } from '../models/imovel.model';


@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.sass']
})
export class ImovelComponent implements OnInit {
  imovel!: Imovel;
  editarImovel: boolean = false;
  imovelForm!: FormGroup;
  imoveis: Imovel[] = [];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.imovelForm = this.formBuilder.group({
      id: null,
      nome: '',
      tipo: '',
      valor: null,
      cep: '',
      rua: '',
      cidade: '',
      localidade: '',
      // outras propriedades necessárias
    });

    this.apiService.getImoveis().subscribe((imoveis: Imovel[]) => {
      this.imoveis = imoveis;
    });
  }

  saveImovel(): void {
    this.apiService.createImovel(this.imovelForm.value).subscribe((response) => {
      // Lógica após salvar o imóvel
    });
  }

  toggleEditarImovel(): void {
    this.editarImovel = !this.editarImovel;
  }

  updateImovel(): void {
    const id = this.imovelForm.value.id;
    this.apiService.updateImovel(id, this.imovelForm.value).subscribe((response) => {
      // Lógica após atualizar o imóvel
    });
  }

  deleteImovel(imovel: Imovel): void {
    this.apiService.deleteImovel(imovel.id).subscribe(() => {
      // Lógica adicional, se necessário
    });
  }

  getCep(): void {
    const cep = this.imovelForm.value.cep;
    this.apiService.getEnderecoByCep(cep).subscribe((endereco: Endereco) => {
      this.imovelForm.patchValue({
        rua: endereco.logradouro,
        cidade: endereco.cidade,
        localidade: endereco.localidade,
        // atualize outras propriedades do endereço conforme necessário
      });
    });
  }

  onSubmit(): void {
    if (this.imovelForm.invalid) {
      return;
    }

    // Lógica para manipular o formulário enviado
  }
}
