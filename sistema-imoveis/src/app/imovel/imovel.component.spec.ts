import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImovelComponent } from './imovel.component';
import { ApiService } from '../services/api.service';
import { of } from 'rxjs';

describe('ImovelComponent', () => {
  let component: ImovelComponent;
  let fixture: ComponentFixture<ImovelComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ImovelComponent],
      providers: [ApiService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImovelComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load imoveis on initialization', () => {
    const mockImoveis = [
      { id: 1, nome: 'Imóvel 1' },
      { id: 2, nome: 'Imóvel 2' },
    ];

    spyOn(apiService, 'getImoveis').and.returnValue(of(mockImoveis));

    component.ngOnInit();

    expect(component.imoveis).toEqual(mockImoveis);
    expect(apiService.getImoveis).toHaveBeenCalled();
  });

  it('should reset imovelForm and load imoveis on form submission', () => {
    const mockImovel = { nome: 'Imóvel 1', tipo: 'Casa' };

    spyOn(apiService, 'createImovel').and.returnValue(of({}));
    spyOn(component, 'loadImoveis');

    component.imovelForm.setValue(mockImovel);
    component.onSubmit();

    expect(apiService.createImovel).toHaveBeenCalledWith(mockImovel);
    expect(component.imovelForm.valid).toBe(true);
    expect(component.imovelForm.value).toEqual({
      nome: '',
      tipo: '',
      valor: '',
      condominio: '',
      quartos: '',
      banheiros: '',
      mobiliado: '',
      area: '',
      venda: false,
      aluguel: false,
      dataAnuncio: '',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: '',
      },
      proprietarioId: '',
    });
    expect(component.loadImoveis).toHaveBeenCalled();
  });

  it('should load imoveis on imovel deletion', () => {
    const mockImovelId = 1;

    spyOn(apiService, 'deleteImovel').and.returnValue(of({}));
    spyOn(component, 'loadImoveis');

    component.deleteImovel(mockImovelId);

    expect(apiService.deleteImovel).toHaveBeenCalledWith(mockImovelId);
    expect(component.loadImoveis).toHaveBeenCalled();
  });
});
