import { Component } from '@angular/core';

@Component({
  selector: 'software-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  signedIn: boolean = true;

  // expanding links
  programExpanded: boolean = false;
  resourcesExpanded: boolean = false;
  libraryExpanded: boolean = false;

  // getCurrentYear
  currentYear: number = new Date().getFullYear();
}
