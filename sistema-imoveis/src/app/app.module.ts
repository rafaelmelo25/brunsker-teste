import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImovelComponent } from './imovel/imovel.component';
// import { ImovelComponent } from './imovel/imovel.component';


@NgModule({
  declarations: [
    AppComponent,
    ImovelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // ImovelComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
