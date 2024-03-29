import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeListComponent} from './recipes/recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipes/recipe-list/recipe-item/recipe-item.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {ShoppingService} from './shopping-list/shopping.service';
import {EmbeddedAppOneComponent} from './embedded-app-one/embedded-app-one.component';
import {HomeComponent} from './embedded-app-one/home/home.component';
import {ServersComponent} from './embedded-app-one/servers/servers.component';
import {UsersComponent} from './embedded-app-one/users/users.component';
import {ServerComponent} from './embedded-app-one/servers/server/server.component';
import {EditServerComponent} from './embedded-app-one/servers/edit-server/edit-server.component';
import {UserComponent} from './embedded-app-one/users/user/user.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuardService} from './auth-guard.service';
import {AuthService} from './AuthService';
import {CanDeactivateGuardService} from './embedded-app-one/can-deactivate-guard.service';
import {ServerResolverService} from './embedded-app-one/servers/server/server-resolver.service';
import {ServersService} from './embedded-app-one/servers/servers.service';
import {EmptyRecipeDetailComponent} from './recipes/empty-recipe-detail/empty-recipe-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {FormComponent} from './form.component';
import {ReactiveFormComponent} from './reactive-form/reactive-form.component';
import {App2HeaderComponent} from './embedded-app-one/app2-header/app2-header.component';
import {RecipesService} from './recipes/recipes.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthComponent} from './auth/auth.component';
import {LoadingSpinnerComponent} from './shared/spinner/loading-spinner.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';


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
    UserComponent,
    PageNotFoundComponent,
    EmptyRecipeDetailComponent,
    RecipeEditComponent,
    FormComponent,
    ReactiveFormComponent,
    App2HeaderComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [RecipesService, ShoppingService, AuthGuardService, AuthService, CanDeactivateGuardService,
    ServerResolverService, ServersService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
