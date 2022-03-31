import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { CatalogComponent } from './products/catalog/catalog.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemComponent } from './products/catalog/item/item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './_helpers/auth.interceptor';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BasketComponent } from './account/basket/basket.component';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { SignUpModalComponent } from './modals/sign-up-modal/sign-up-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddBasketModalComponent } from './modals/add-basket-modal/add-basket-modal.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AddProductModalComponent } from './modals/add-product-modal/add-product-modal.component';
import { AddBrandModalComponent } from './modals/add-brand-modal/add-brand-modal.component';
import { ErrorComponent } from './modals/error/error.component';
import { SuccessComponent } from './modals/success/success.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { pencil, xLg, eye, trash, chevronLeft, chevronRight  } from 'ngx-bootstrap-icons';
import { AccountDetailsComponent } from './account/account-details/account-details.component';
// Select some icons (use an object, not an array)
const icons = {
  pencil,
  xLg,
  eye,
  trash,
  chevronLeft,
  chevronRight
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    CatalogComponent,
    ProductDetailsComponent,
    ItemComponent,
    BasketComponent,
    SignUpModalComponent,
    AddBasketModalComponent,
    AddProductComponent,
    AddProductModalComponent,
    AddBrandModalComponent,
    ErrorComponent,
    SuccessComponent,
    AccountDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalDialogModule.forRoot(),
    NgxBootstrapIconsModule.pick(icons)
  ],
  providers: [NgxBootstrapIconsModule, BsModalService, HeaderComponent, TokenInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
