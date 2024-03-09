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
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {EmbeddedAppOneComponent} from './embedded-app-one/embedded-app-one.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {EmptyRecipeDetailComponent} from './recipes/empty-recipe-detail/empty-recipe-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  {path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: EmptyRecipeDetailComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent}
    ]},
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'shopping', component: ShoppingListComponent},
  {path: 'app2', component: EmbeddedAppOneComponent},
  {path: 'app2/users', component: UsersComponent, children: [
      {path: ':id', component: UserComponent}
    ]},
  {path: 'app2/home', redirectTo: 'app2'},
  {path: 'app2/servers', canActivate: [AuthGuardService], canActivateChild: [AuthGuardService], component: ServersComponent, children: [
      {path: ':id', component: ServerComponent, resolve: {theServer: ServerResolverService}}, // using resolver approach to get data
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuardService]}]
  },
  {path: 'not-found', component: PageNotFoundComponent},
  // {path: '**', redirectTo: '/not-found'}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
