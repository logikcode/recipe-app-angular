import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import {ShoppingService} from './shopping-list/shopping.service';
import { EmbeddedAppOneComponent } from './embedded-app-one/embedded-app-one.component';
import {HomeComponent} from './embedded-app-one/home/home.component';
import {ServersComponent} from './embedded-app-one/servers/servers.component';
import {UsersComponent} from './embedded-app-one/users/users.component';
import {ServerComponent} from './embedded-app-one/servers/server/server.component';
import {RouterModule, Routes} from '@angular/router';
import {EditServerComponent} from './embedded-app-one/servers/edit-server/edit-server.component';
import {UserComponent} from './embedded-app-one/users/user/user.component';
import {ServersService} from './embedded-app-one/servers/servers.service';


const appRoutes: Routes = [
  {path: 'embedded', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'servers', component: ServerComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    EmbeddedAppOneComponent,
    HomeComponent,
    ServersComponent,
    UsersComponent,
    EditServerComponent,
    ServerComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ShoppingService, ServersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
