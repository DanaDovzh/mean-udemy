import { ChangeDetectorRef, Component } from "@angular/core";
import {MediaMatcher} from '@angular/cdk/layout';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  fillerNav = [
    {
      route: 'posts',
      title: 'Posts'
    },
    {
      route: 'create-post',
      title: 'Create a post'
    }
  ];

  constructor( media: MediaMatcher, changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 100vw)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }
  ngOnInit() {
    console.log(this.fillerNav)
  }

  click(valur) {
    console.log(valur)
  }
}

