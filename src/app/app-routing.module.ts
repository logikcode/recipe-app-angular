import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './embedded-app-one/home/home.component';
import {UsersComponent} from './embedded-app-one/users/users.component';
import {UserComponent} from './embedded-app-one/users/user/user.component';
import {ServersComponent} from './embedded-app-one/servers/servers.component';
import {ServerComponent} from './embedded-app-one/servers/server/server.component';
import {EditServerComponent} from './embedded-app-one/servers/edit-server/edit-server.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuardService} from './auth-guard.service';
import {CanDeactivateGuardService} from './embedded-app-one/can-deactivate-guard.service';
import {ServerResolverService} from './embedded-app-one/servers/server/server-resolver.service';

const appRoutes: Routes = [
  {path: 'embedded', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
      {path: ':id', component: UserComponent}
    ]},
  {path: 'servers', canActivate: [AuthGuardService], canActivateChild: [AuthGuardService], component: ServersComponent, children: [
      {path: ':id', component: ServerComponent, resolve: {theServer: ServerResolverService}}, // using resolver approach to get data
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuardService]}]
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
