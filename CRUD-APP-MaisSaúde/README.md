# safehealth
Ionic APP de saúde, CRUD de Clínicas, Médicos e Pacientes, autenticação (telas de login, cadastro, esqueci a senha).
<!--


import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClinicaProvider } from '../../providers/clinica/clinica';
import { UserProvider } from '../../providers/user/user';
import { ExportProvider } from '../../providers/export/export';


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef; 
  map; 

  constructor(
      public navCtrl: NavController,
      public userProvider: UserProvider,
      public clinicaProvider: ClinicaProvider,
      public exportProvider: ExportProvider,
    ) {

  }

  ionViewDidLoad() {
    this.map = this.createMap(this.mapElement);

    this.clinicaProvider.listarFS().subscribe(_data => {
      console.log('clinicas', _data);

      for (let i = 0; i < _data.length; i++) {
        const element = _data[i];

        let _lat = element.value.lat;
        let _lng = element.value.lng;
        let _nome = element.value.nome;

        let itemMarker = {
          lat: _lat,
          lng: _lng,
          nome: _nome,
          abrev: _nome[0]
        }
        
        this.carregaDadosMapa(itemMarker);
      }
    })
  }

  carregaDadosMapa(itemMarker) {

    const marker = this.addMarker(itemMarker.lat, itemMarker.lng, itemMarker.nome, itemMarker.abrev);

    const infowindow = this.addInfoWindow(itemMarker.nome);

    marker.addListener("click", () => { 
      
      infowindow.open({
        anchor: marker,
        map: this.map,
      });
    });

    marker.setMap(this.map); 
  }

  createMap(mapElement) {
    if(mapElement !== null && mapElement.nativeElement !== null && google) {
      let options = {
        zoom: 7,
        center: {lat: -5.081357184675141, lng: -39.70482921223503}
      };

      return new google.maps.Map(mapElement.nativeElement, options);
    }

    return undefined;
  }

  addMarker(_lat, _lng, nome, abrev) {
    return new google.maps.Marker({
      position: {lat: _lat, lng: _lng},
      title: nome,
      icon: new google.maps.MarkerImage(
        'https://mt.google.com/vt/icon?psize=16&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=48&scale=1&text=' + abrev
      )
    })
  }

  addInfoWindow(texto: string) {
    let contentHtml = `
      Clinica: ${texto}
    `;

    return new google.maps.InfoWindow({
      content: contentHtml
    })
  }
  gerarCSV() {
    this.exportProvider.gerarCSV(this.exportarDados(), 'clinicas');
  }

  gerarExcel() {
    // console.log('jsonArr', jsonArr);
    this.exportProvider.gerarExcel(this.exportarDados(), 'clinicas');
  }

  gerarPDF() {
    this.exportProvider.gerarPDF(this.exportarDados(), 'clinicas');
  }

  private exportarDados() {
    let jsonArr = [];

    for (let i = 0; i < this.clinicasArr.length; i++) {
      const element = this.clinicasArr[i];
      
      const key = element.key;
      const value = element.value;

      let _item = {
        'nome': value.nome,
        'latitude': value.lat,
        'longitude': value.lng,
        'clinica': value.clinica,
        'qtd clinicas': value.clinicasArr ? value.clinicasArr.length : 0,
        'link': 'https://www.google.com/maps/?q=' + value.lat + ',' + value.lng,
      };

      jsonArr.push(_item);
    }

    return jsonArr;
  }



}























<!--

<ion-header>
  <ion-navbar transparent>
    <ion-title></ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding class="conteudo">

  <ion-grid class="grid-logo">
    <ion-row align-items-center justify-content-center>
      <ion-col col-12 align-self-center>
        <img src="../../assets/imgs/logo.png" />        
      </ion-col>
    </ion-row>
  </ion-grid>

  <ion-grid class="grid-list">
    <ion-row align-items-center justify-content-center>
      <ion-col align-self-center col-12 col-lg-4 col-xl-4>

        <ion-list class="conteudo-input">
    
          <ion-item class="margem-input-top">
            <ion-input type="text" [(ngModel)]="email" placeholder="E-mail"></ion-input>
          </ion-item>
        
          <ion-item class="margem-input-top">
            <ion-input type="password" [(ngModel)]="senha" placeholder="Senha"></ion-input>
          </ion-item>
      
          <button ion-button block color="vinho" (click)="entrar()" class="margem-btn-top btn">Entrar</button>
        
      
          <button class="btn-link margem-btnlink-top" ion-button block color="primary" clear (click)="esqueciSenha()">Recuperar senha? Clique aqui</button>
      
        </ion-list>

      </ion-col>
    </ion-row>
  </ion-grid>

</ion-content>

<ion-footer>
  <ion-toolbar transparent>
    <ion-title>
      <button class="btn-link" ion-button block color="primary" clear (click)="cadastro()">Não possui conta? Cadastre-se</button>
    </ion-title>
  </ion-toolbar>
</ion-footer>


<ion-header>
  <ion-navbar class="navbar" transparent>
  </ion-navbar>
</ion-header>

<ion-content padding class="conteudo">
  <ion-grid align-itens-center justify-content-center class="grid-logo">
    <ion-row>
      <ion-col col-12 align-self-center class="grid-logo">
        <ion-row>
          <ion-col col-12 align-self-center>
            <img src="../../assets/imgs/icon.png" class="img-logo">
        </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>
<!--    
  <ion-grid class="grid-list">
    <ion-row align-items-center justify-content-center>
      <ion-col align-self-center col-12 col-lg-4 col-xl-4>
        <ion-list class="conteudo-input">
          <ion-item class="margem-input-top">
            <ion-label ></ion-label>
            <ion-input type="text" [(ngModel)]="email"placeholder="Email"></ion-input>
          </ion-item>
            
          <ion-item class="margem-input-top">
            <ion-input type="password" [(ngModel)]="senha"placeholder="Senha"></ion-input>
          </ion-item>
          
          <button ion-button block color="vinho" (click)="entrar()" class="margem-btn-button btn">Entrar</button>
          <button  class="btn-link margem-btn-button" ion-button block clear  outline (click)="cadastro()">Fazer Cadastro</button>
          <button class="btn-link margem-btn-button" ion-button block clear outline (click)="esqueciSenha()">Esqueci a senha</button>
       </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>
