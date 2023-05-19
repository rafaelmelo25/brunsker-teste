import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { ImovelComponent } from './imovel.component';
import { Imovel } from '../models/imovel.model';
import { Endereco } from '../models/endereco.model';

describe('ImovelComponent', () => {
  let component: ImovelComponent;
  let fixture: ComponentFixture<ImovelComponent>;
  let apiService: ApiService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImovelComponent],
      imports: [ReactiveFormsModule],
      providers: [ApiService, FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImovelComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save imovel', () => {
    spyOn(apiService, 'createImovel').and.returnValue(of({} as Imovel));
    component.imovelForm.patchValue({
      nome: 'Imóvel 1',
      tipo: 'Casa',
      valor: 100000,
      cep: '12345678',
      rua: 'Rua Teste',
      cidade: 'Cidade Teste',
      // Adicione outras propriedades necessárias
    });
    component.saveImovel();
    expect(apiService.createImovel).toHaveBeenCalledWith(component.imovelForm.value);
  });

  it('should update imovel', () => {
    spyOn(apiService, 'updateImovel').and.returnValue(of({} as Imovel));
    component.imovelForm.patchValue({
      id: 1,
      nome: 'Imóvel 1',
      tipo: 'Casa',
      valor: 100000,
      cep: '12345678',
      rua: 'Rua Teste',
      cidade: 'Cidade Teste',
      // Adicione outras propriedades necessárias
    });
    component.updateImovel();
    expect(apiService.updateImovel).toHaveBeenCalledWith(component.imovelForm.value.id, component.imovelForm.value);
  });

  it('should delete imovel', () => {
    spyOn(apiService, 'deleteImovel').and.returnValue(of({}));
    const mockImovel: Imovel = {
      id: 1,
      nome: 'Imóvel 1',
      tipo: 'Casa',
      valor: 100000,
      // Adicione outras propriedades necessárias
    };
    component.deleteImovel(mockImovel);
    expect(apiService.deleteImovel).toHaveBeenCalledWith(mockImovel.id);
  });

  it('should get endereco by cep', () => {
    const cep = '12345678';
    const mockEndereco: Endereco = {
      logradouro: 'Rua Teste',
      localidade: 'Cidade Teste',
      // Adicione outras propriedades do endereço se necessário
    };
    spyOn(apiService, 'getEnderecoByCep').and.returnValue(of(mockEndereco));
    component.imovelForm.patchValue({ cep });
    component.getCep();
    expect(apiService.getEnderecoByCep).toHaveBeenCalledWith(cep);
    expect(component.imovelForm.value.rua).toEqual(mockEndereco.logradouro);
    expect(component.imovelForm.value.cidade).toEqual(mockEndereco.localidade);
  });
});
