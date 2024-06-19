import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-sgfr32',
  templateUrl: './sgfr32.component.html',
  styleUrls: ['./sgfr32.component.scss']
})
export class Sgfr32Component implements OnInit {

    title = '';
    subtitle = '';
    code = this.router.url.split('/').pop().toUpperCase();
    uploadFiles: boolean = false;
    listFiles: boolean = true;

  constructor(private router: Router,
              protected api: ApiService
  ) { }

  ngOnInit(): void {
  }


}
