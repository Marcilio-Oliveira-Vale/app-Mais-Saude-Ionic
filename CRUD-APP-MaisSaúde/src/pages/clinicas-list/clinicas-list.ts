import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ClinicaProvider } from '../../providers/clinica/clinica';

@IonicPage()
@Component({
  selector: 'page-clinicas-list',
  templateUrl: 'clinicas-list.html',
})
export class ClinicasListPage {

  clinicas = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public clinicaProvider: ClinicaProvider,
    public modalCtrl: ModalController
    ) {

      this.clinicaProvider.listarFS().subscribe(_data => {
        console.log(_data);

        this.clinicas = _data;
     })
  }
  addItem() {
    this.navCtrl.push('ClinicasFormPage');
  }

  editItem(item) {
    const clinicaID = item.key;
    const clinica = item.value;

    this.navCtrl.push('ClinicasFormPage', { itemID: clinicaID, item: clinica } );
  }
  openFilter() {
    const modal = this.modalCtrl.create('ClinicasFilterPage');

    modal.onDidDismiss(_params => {

      if(_params !== undefined) {

        if(_params.isLimpar) {
          console.log('islimpar');
          this.carregaLista();

        } else {
          
          let uf = _params.uf;
          let cidade = _params.cidade;
          console.log('uf', uf);
          console.log('cidade', cidade);
          
          this.clinicaProvider.buscarFS(uf, cidade).subscribe(_data => {
            console.log('buscar', _data);
            this.clinicas = _data;
          });
        }

      }
    });

    modal.present();
  }
  carregaLista() {
    this.clinicaProvider.listarFS().subscribe(_data => {
      console.log(_data);
      this.clinicas = _data;
    })
  }

}
