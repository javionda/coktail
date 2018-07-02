
import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform, NavController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CuentasPage } from './../pages/cuentas/cuentas';
import { PartidasPage } from './../pages/partidas/partidas';

import { IngresosPage } from '../pages/ingresos/ingresos';
import { GastosPage } from '../pages/gastos/gastos';

import { TabsPage } from '../pages/tabs/tabs';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  appPages: PageInterface[] = [
    { title: 'Inicio', component: TabsPage, tabComponent: HomePage, icon: 'home' },
    { title: 'Gastos', component: TabsPage, tabComponent: GastosPage, index: 1, icon: 'card' },
    { title: 'Ingresos', component: TabsPage, tabComponent: IngresosPage, index: 2, icon: 'cash' },
   
  ];

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, index: Number}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,

    public menu: MenuController,
    //public navCtrl: NavController,

    //public storage: Storage
  ) {
    this.rootPage = TabsPage;
    //this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage,  index: 0 },
      { title: 'Cuentas', component: CuentasPage,  index: 1 },
      { title: 'Partidas', component: PartidasPage,  index: 2 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.navCtrl.push(TabsPage);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });
    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }
  }

  isActive(page: PageInterface) {
    // let childNav = this.nav.getActiveChildNav();
    let childNav = this.nav.getActiveChildNavs()[0];
    

    // // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
    
    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'primary';
    }
    return;
  }
}
