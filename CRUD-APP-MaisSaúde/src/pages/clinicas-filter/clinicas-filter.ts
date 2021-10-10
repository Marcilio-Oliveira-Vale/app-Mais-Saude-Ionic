import { Component } from '@angular/core';
import { IonicPage,ViewController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ClinicasFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clinicas-filter',
  templateUrl: 'clinicas-filter.html',
})
export class ClinicasFilterPage {
  uf = '';
  cidade = '';

  ufArr = [
    'CE',
    'PI',
    'MA',
    'SP',
    'PE',
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
    console.log('ionViewDidLoad PacienteFilterPage');
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
