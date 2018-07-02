import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-partidas',
  templateUrl: 'partidas.html'
})
export class PartidasPage {


  PartidasRef: AngularFireList<any>;
  partidas;
  items;

  searchQuery: string = '';

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {

    this.PartidasRef = this.database.list('partidas');

    this.database.list('partidas').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).subscribe(items => {
      this.partidas = items.map(item => ({
        nombre: item.nombre,
        key: item.key
      }));  
      this.initializeItems();
    });
  }

  initializeItems() {
    this.items = this.partidas;
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        if(item.nombre && val) {
          if (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1) {
            
            return true;
          }
          return false;
        }
       // return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  

  
   

  createPartida() {
    let newCuentaModal = this.alertCtrl.create({
      title: 'Nueva Partida',
      message: "Nombre Partida",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre de la partida'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.PartidasRef.push({
              nombre: data.nombre,
              done: false
            });
          }
        }
      ]
    });
    newCuentaModal.present(newCuentaModal);
  }

  removePartida(partida) {
    //console.log( task );
    this.PartidasRef.remove(partida.key);
  }


}

