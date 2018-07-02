import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { TabsPage } from '../pages/tabs/tabs';

import { IngresosPage } from '../pages/ingresos/ingresos';
import { GastosPage } from '../pages/gastos/gastos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { NoteListService } from '../services/note-list.service';
import { CuentasPage } from '../pages/cuentas/cuentas';
import { PartidasPage } from './../pages/partidas/partidas';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyC25T40y9vvnzPQZI8ZxFMMZAzt-LNfhKs",
  authDomain: "cash-56ab4.firebaseapp.com",
  databaseURL: "https://cash-56ab4.firebaseio.com",
  projectId: "cash-56ab4",
  storageBucket: "cash-56ab4.appspot.com",
  messagingSenderId: "1056443199256"
};



// const myFirebaseAuthConfig = {
//   provider: AuthProviders.Anonymous,
//   method: AuthMethods.Anonymous
// }

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    IngresosPage,
    GastosPage,
    TabsPage,
    CuentasPage,
    PartidasPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig,'urg2'),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TabsPage,
    IngresosPage,
    GastosPage,
    CuentasPage,
    PartidasPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NoteListService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
