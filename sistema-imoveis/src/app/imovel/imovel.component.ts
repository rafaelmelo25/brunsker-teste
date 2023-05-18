import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Imovel } from '../models/imovel.model';

@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.css'],
})
export class ImovelComponent implements OnInit {
  imoveis: Imovel[] = [];
  imovelForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.imovelForm = this.formBuilder.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      valor: ['', Validators.required],
      condominio: [''],
      quartos: ['', Validators.required],
      banheiros: ['', Validators.required],
      mobiliado: [''],
      area: ['', Validators.required],
      venda: [false],
      aluguel: [false],
      dataAnuncio: [''],
      endereco: this.formBuilder.group({
        rua: [''],
        numero: [''],
        bairro: [''],
        cidade: [''],
        uf: [''],
        cep: ['', Validators.required],
      }),
      proprietarioId: [''],
    });
  }

  ngOnInit(): void {
    this.loadImoveis();
  }

  loadImoveis(): void {
    this.apiService.getImoveis().subscribe((imoveis) => {
      this.imoveis = imoveis;
    });
  }

  onSubmit(): void {
    if (this.imovelForm.valid) {
      const imovel: Imovel = this.imovelForm.value;
      this.apiService.createImovel(imovel).subscribe(() => {
        this.imovelForm.reset();
        this.loadImoveis();
      });
    }
  }

  deleteImovel(id: number): void {
    this.apiService.deleteImovel(id).subscribe(() => {
      this.loadImoveis();
    });
  }
}
