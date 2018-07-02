import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tasksRef: AngularFireList<any>;
  tasks;
  elementos;

  ingresosRef: AngularFireList<any>;
  ingresos;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    this.tasksRef = this.database.list('tasks');


    this.ingresosRef = this.database.list('ingresos');

    this.database.list('ingresos').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).subscribe(items => {
      this.ingresos=items.map(item => ({title:item.title}));
    });


    this.tasks=this.database.list('tasks').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).subscribe(items => {
      this.elementos=items.map(item => ({title:item.title}));
      
    });

  
  }

  createIngreso(){
    let newIngresoModal = this.alertCtrl.create({
      title: 'Nuevo Ingreso',
      message: "Título Ingreso",
      inputs: [
        {
          name: 'desc',
          placeholder: 'Título'
        },
        {
          name: 'imp',
          placeholder: 'Importe'
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
            this.ingresosRef.push({
              desc: data.desc,
              imp: data.imp,
              done: false
            });
          }
        }
      ]
    });
    newIngresoModal.present( newIngresoModal );
  }

  createTask(){
    let newTaskModal = this.alertCtrl.create({
      title: 'New Task',
      message: "Enter a title for your new task",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.tasksRef.push({
              title: data.title,
              done: false
            });
          }
        }
      ]
    });
    newTaskModal.present( newTaskModal );
  }

  updateTask( task ){
    this.tasksRef.update( task.key,{
      title: task.title,
      done: !task.done
    });
  }

  removeTask( task ){
    console.log( task );
    this.tasksRef.remove( task.key );
  }
}

