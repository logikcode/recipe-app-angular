import { Component, OnInit } from '@angular/core';
import {ServersService} from './servers/servers.service';

@Component({
  selector: 'app-embedded-app-one',
  templateUrl: './embedded-app-one.component.html',
  styleUrls: ['./embedded-app-one.component.css'],
  providers: [ServersService]
})
export class EmbeddedAppOneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
