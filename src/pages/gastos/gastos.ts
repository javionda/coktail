import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';


@Component({
  selector: 'page-gastos',
  templateUrl: 'gastos.html'
})
export class GastosPage {

  PartidasRef: AngularFireList<any>;
  partidas;
  items;

  cuentasRef: AngularFireList<any>;
  cuentas;

  gastosRef: AngularFireList<any>;
  gastos;


  searchQuery: string = '';

  cuenta_sel;

  gasto = {
    partida: '',
    descripcion: '',
    fijo: '',
    importe: 0,
  };

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {

    this.cuentasRef = this.database.list('cuentas');

    this.database.list('cuentas').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).subscribe(items => {
      this.cuentas = items.map(item => ({
        nombre: item.nombre,
        key: item.key
      }));
     
    });

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

  selPartida(partida){
    this.gasto.partida=partida;
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


  

  
   

  createGasto() {
    this.gastosRef = this.database.list('gastos/'+this.cuenta_sel);




     this.gastosRef.push({
      descripcion: this.gasto.descripcion,
      importe: this.gasto.importe,
      partida: this.gasto.partida
    });
  }

}
