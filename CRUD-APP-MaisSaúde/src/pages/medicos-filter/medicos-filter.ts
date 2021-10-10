import { Component } from '@angular/core';
 import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the MedicosFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicos-filter',
  templateUrl: 'medicos-filter.html',
})
export class MedicosFilterPage {

  uf = '';
  cidade = '';

  ufArr = [
    'CE',
    'PE',
    'PI',
    'MA',
    'SP',
  ]

  cidadeArr = [
    'Fortaleza',
    'Boa Viagem',
    'Aquiraz',
    'Quixeramobim',
    'Eusébio',
    'Canidé',
    'Madalena',
    'Cascavel',
    'Pedra Branca',
    'Independencia',
    'Recife'

  ];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicosFilterPage');
  }

  filtrar() {
    const params = { 
      uf: this.uf,
      cidade: this.cidade,
      isLimpar: false
    };
    this.viewCtrl.dismiss(params);
  }

  limpar() {
    const params = { 
      uf: this.uf,
      cidade: this.cidade,
      isLimpar: true
    };
    this.viewCtrl.dismiss(params);
  }

  fechar() {
    this.viewCtrl.dismiss();
  }

}

