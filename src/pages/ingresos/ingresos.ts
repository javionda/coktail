import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-ingresos',
  templateUrl: 'ingresos.html'
})
export class IngresosPage {

  ingresosRef: AngularFireList<any>;
  ingresos;

  cuentasRef: AngularFireList<any>;
  cuentas;



  ingreso = {
    cuenta: '',
    descripcion: '',
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

  }

  selCuenta(){
    
      console.log('cuenta Sel:'+this.ingreso.cuenta);
      this.ingresosRef = this.database.list(this.ingreso.cuenta);

      this.database.list(this.ingreso.cuenta).snapshotChanges().pipe(
        map(actions =>
          actions.map(a => ({ key: a.key, ...a.payload.val() }))
        )
      ).subscribe(items => {
        this.ingresos = items.map(item => ({
          descripcion: item.descripcion,
          importe: item.importe,
          key: item.key
        }));
      });

    
  }

  createIngreso() {
    // let newIngresoModal = this.alertCtrl.create({
    //   title: 'Nuevo Ingreso',
    //   message: "Título Ingreso",
    //   inputs: [
    //     {
    //       name: 'desc',
    //       placeholder: 'Título'
    //     },
    //     {
    //       name: 'imp',
    //       placeholder: 'Importe'
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancelar',
    //       handler: data => {
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: 'Guardar',
    //       handler: data => {
    //         this.ingresosRef.push({
    //           desc: data.desc,
    //           imp: data.imp,
    //           done: false
    //         });
    //       }
    //     }
    //   ]
    // });
    // newIngresoModal.present( newIngresoModal );
    console.log(this.ingreso);
    this.ingresosRef = this.database.list(this.ingreso.cuenta);

    this.database.list(this.ingreso.cuenta).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).subscribe(items => {
      this.ingresos = items.map(item => ({
        descripcion: item.descripcion,
        importe: item.importe,
        key: item.key
      }));
    });


     this.ingresosRef.push({
      descripcion: this.ingreso.descripcion,
      importe: this.ingreso.importe,
    });
  }

  removeIngreso(ingreso) {
    //console.log( task );
    this.ingresosRef.remove(ingreso.key);
  }


}

