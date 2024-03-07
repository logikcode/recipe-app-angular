import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowedEdit = false;
  serverId: number;
  constructor(private serversService: ServersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.allowedEdit = this.route.queryParams['allowEdit'] === 2;
    this.route.queryParams.subscribe(
      (queryParam) => {
        this.allowedEdit = +queryParam['allowedEdit'] === 2;
      }
    );

    this.route.params.subscribe((pathParam: Params) => {
      this.serverId = +pathParam['id'];
    });

    this.server = this.serversService.getServer(this.serverId);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }
  reloadServer() {
    this.router.navigate(['servers'], {relativeTo: this.route});
  }
}
