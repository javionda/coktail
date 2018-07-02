import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-cuentas',
  templateUrl: 'cuentas.html'
})
export class CuentasPage {


  cuentasRef: AngularFireList<any>;
  cuentas;

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




  }

  createCuenta() {
    let newCuentaModal = this.alertCtrl.create({
      title: 'Nueva Cuenta',
      message: "Nombre Cuenta",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre de la cuenta'
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
            this.cuentasRef.push({
              nombre: data.nombre,
              done: false
            });
          }
        }
      ]
    });
    newCuentaModal.present(newCuentaModal);
  }

  removeCuenta(cuenta) {
    //console.log( task );
    this.cuentasRef.remove(cuenta.key);
  }


}

