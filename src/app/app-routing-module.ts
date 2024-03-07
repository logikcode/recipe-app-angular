import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './embedded-app-one/home/home.component';
import {UsersComponent} from './embedded-app-one/users/users.component';
import {UserComponent} from './embedded-app-one/users/user/user.component';
import {ServersComponent} from './embedded-app-one/servers/servers.component';
import {ServerComponent} from './embedded-app-one/servers/server/server.component';
import {EditServerComponent} from './embedded-app-one/servers/edit-server/edit-server.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: 'embedded', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
      {path: ':id', component: UserComponent}
    ]},
  {path: 'servers', component: ServersComponent, children: [
      {path: ':id', component: ServerComponent},
      {path: ':id/edit', component: EditServerComponent}]
  },
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
