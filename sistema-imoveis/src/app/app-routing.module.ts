import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImovelComponent } from './imovel/imovel.component';

const routes: Routes = [{ path: 'imoveis', component: ImovelComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
