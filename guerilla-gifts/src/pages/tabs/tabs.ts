import { Component } from '@angular/core';

import { FaqPage } from '../faq/faq';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FaqPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
