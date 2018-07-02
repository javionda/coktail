

import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { HomePage } from './../home/home';
import { IngresosPage } from './../ingresos/ingresos';
import { GastosPage } from './../gastos/gastos';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = HomePage;
  tab2Root: any =  GastosPage;
  tab3Root: any = IngresosPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
