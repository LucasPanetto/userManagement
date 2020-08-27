import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';
import { HomeComponent } from './paginas/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from 'src/app/services/UsuarioService';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ModalGerenciarUsuarioComponent } from './componentes/modal-gerenciar-usuario/modal-gerenciar-usuario.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ModalRecuperarSenhaComponent } from './componentes/modal-recuperar-senha/modal-recuperar-senha.component'

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ModalGerenciarUsuarioComponent,
    ModalRecuperarSenhaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [HttpClientModule, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
