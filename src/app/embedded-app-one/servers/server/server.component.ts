import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };
  serverId: number;

  constructor(private serversService: ServersService, private currentRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.serverId = +this.currentRoute.snapshot.params['id'];
    this.server = this.serversService.getServer(this.serverId);

    this.currentRoute.params.subscribe((params: Params) => {
      this.serverId = +params['id'];

      this.currentRoute.data.subscribe((data: Data) => {
        this.server = data['theServer'];
      });
    });

  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.currentRoute, queryParamsHandling: 'preserve'});
  }
}
