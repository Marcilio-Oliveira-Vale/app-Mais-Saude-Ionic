import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { MedicoProvider } from '../../providers/medico/medico';


@IonicPage()
@Component({
  selector: 'page-medicos-list',
  templateUrl: 'medicos-list.html',
})
export class MedicosListPage {

  medicos = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public medicoProvider: MedicoProvider,
    public modalCtrl: ModalController
    ) {

      this.medicoProvider.listarFS().subscribe(_data => {
        console.log(_data);

        this.medicos = _data;
     })
  }
  addItem() {
    this.navCtrl.push('MedicosFormPage');
  }

  editItem(item) {
    const medicoID = item.key;
    const medico = item.value;

    this.navCtrl.push('MedicosFormPage', { itemID: medicoID, item: medico } );
  }
  openFilter() {
    const modal = this.modalCtrl.create('MedicosFilterPage');

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
          
          this.medicoProvider.buscarFS(uf, cidade).subscribe(_data => {
            console.log('buscar', _data);
            this.medicos = _data;
          });
        }

      }
    });

    modal.present();
  }
  carregaLista() {
    this.medicoProvider.listarFS().subscribe(_data => {
      console.log(_data);
      this.medicos = _data;
    })
  }


}
