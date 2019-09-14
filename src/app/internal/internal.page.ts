import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.page.html',
  styleUrls: ['./internal.page.scss'],
})
export class InternalPage implements OnInit {

  public activeUrl: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.activeUrl = this.router.url;
      console.log(this.activeUrl);
    });
  }

}
