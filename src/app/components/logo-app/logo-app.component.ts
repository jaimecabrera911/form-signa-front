import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-app',
  templateUrl: './logo-app.component.html',
  styleUrls: ['./logo-app.component.scss']
})
export class LogoAppComponent implements OnInit {

    @Input() sizeImage: any;

  constructor() { }

  ngOnInit(): void {
  }

}
