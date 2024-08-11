import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MarketplaceComponent } from './MarketPlacee/marketplace/marketplace.component';
import { RegisterProductComponent } from './MarketPlacee/register-product/register-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './image/filter.pipe';
import {MatGridListModule} from '@angular/material/grid-list';
import { DragDirective } from './drag.directive';
import { ListProduitComponent } from './BackOffice/alltemplate-back/list-produit/list-produit.component';
import { ShowProductDetailsComponent } from './MarketPlacee/show-product-details/show-product-details.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { ProdutShowDialogComponent } from './MarketPlacee/produt-show-dialog/produt-show-dialog.component';
import { AddProductBackComponent } from './MarketPlacee/add-product-back/add-product-back.component';
import { CommonModule, DatePipe } from '@angular/common';
import { DetaitlsbackComponent } from './MarketPlacee/detaitlsback/detaitlsback.component';
import { MatCardModule } from '@angular/material/card';
import { VaryingmodalcontentComponent } from './MarketPlacee/varyingmodalcontent/varyingmodalcontent.component';
import { AlltemplateBackComponent } from './BackOffice/alltemplate-back/alltemplate-back.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarFrontComponent } from './FrontOffice/navbar-front/navbar-front.component';
import { AlltemplatefrontComponent } from './FrontOffice/alltemplatefront/alltemplatefront.component';
import { FooterfrontComponent } from './FrontOffice/footerfront/footerfront.component'; // Importez NgxPaginationModule depuis ngx-pagination
import * as QRCode from 'qrcode';
import { RegisterCarpoolingComponent } from './Carpooling/register-carpooling/register-carpooling.component';
import { ListCarpoolingComponent } from './Carpooling/list-carpooling/list-carpooling.component';
import { DetailsCarpoolingComponent } from './Carpooling/details-carpooling/details-carpooling.component';
import { DateFormatPipe } from './date-format.pipe'; // Importez la bibliothèque qrcode
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SignupComponent } from './signup/signup.component';
import { GuardComponent } from './guard/guard.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { GoogleRecaptchaComponent } from './google-recaptcha/google-recaptcha.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CartComponent } from './MarketPlacee/cart/cart.component';
import { BuyProductComponent } from './MarketPlacee/buy-product/buy-product.component';
import { MyOrdersComponent } from './MarketPlacee/my-orders/my-orders.component';
import { OrderDetaisComponent } from './MarketPlacee/order-detais/order-detais.component';
import { PaymentComponent } from './MarketPlacee/payment/payment.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddCollocationComponent } from './Collocation/add-collocation/add-collocation.component';
import { ListCollocationComponent } from './Collocation/list-collocation/list-collocation.component';
import { DetailsCollocationComponent } from './Collocation/details-collocation/details-collocation.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { QRDialogComponent } from './qrdialog/qrdialog.component';
import { CommentDialogComponent } from './MarketPlacee/comment-dialog/comment-dialog.component';
import { ChatbotComponent } from './MarketPlacee/chatbot/chatbot.component';
import { StatistiqueComponent } from './MarketPlacee/statistique/statistique.component';
import { RatingChartComponent } from './MarketPlacee/rating-chart/rating-chart.component';
import { IconModule } from '@acpaas-ui/ngx-icon';
import { ChattComponent } from './chatt/chatt.component';
import { MapComponent } from './map/map.component';
import { MapleafletComponent } from './mapleaflet/mapleaflet.component';
import { AddPostFileComponent } from './Forum-Event/add-post-file/add-post-file.component';
import { AddPostsComponent } from './Forum-Event/post/post/add-posts/add-posts.component';
import { SearchPostsComponent } from './Forum-Event/search-posts/search-posts.component';
import { PostComponent } from './Forum-Event/post/post/post.component';
import { PostdetailComponent } from './Forum-Event/post/post/postdetail/postdetail.component';
import { EditPostsComponent } from './Forum-Event/post/post/edit-posts/edit-posts.component';
import { CustomDatePipe } from './Forum-Event/event/CustomDatePipe';
import { EventsComponent } from './Forum-Event/event/events/events.component';
import { EditEventsComponent } from './Forum-Event/event/events/edit-events/edit-events.component';
import { DetailEventsComponent } from './Forum-Event/event/events/detail-event/detail-event.component';
import { PopContentComponent } from './pop-content/pop-content.component';
import { PostFrontComponent } from './Forum-Event/post-front/post-front.component';
import { NotificationsDialogComponent } from './notifications-dialog/notifications-dialog.component';

import { RegisterDefiComponent } from './Defi/register-defi/register-defi.component';
import { ListDefiComponent } from './Defi/list-defi/list-defi.component';
import { DetailsDefiComponent } from './Defi/details-defi/details-defi.component';
import { AcceptedUsersDialogComponent } from './Defi/accepted-users-dialog/accepted-users-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MarketplaceComponent,
    RegisterProductComponent,

    FilterPipe,
    DragDirective,
    ListProduitComponent,
    ShowProductDetailsComponent,
    ProdutShowDialogComponent,
    AddProductBackComponent,
    DetaitlsbackComponent,
    VaryingmodalcontentComponent,
    AlltemplateBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    NavbarFrontComponent,
    AlltemplatefrontComponent,
    FooterfrontComponent,
    RegisterCarpoolingComponent,
    ListCarpoolingComponent,
    DetailsCarpoolingComponent,
    DateFormatPipe,
    SignupComponent,
    GuardComponent,
    LoginComponent,
    ProfilComponent,
    GoogleRecaptchaComponent,
    CartComponent,
    BuyProductComponent,
    MyOrdersComponent,
    OrderDetaisComponent,
    PaymentComponent,
    SnackbarComponent,
    AddCollocationComponent,
    ListCollocationComponent,
    DetailsCollocationComponent,
    MessageFormComponent,
    QRDialogComponent,
    CommentDialogComponent,
    ChatbotComponent,
    StatistiqueComponent,
    RatingChartComponent,
    ChattComponent,
    MapComponent,
    MapleafletComponent,
    AddPostsComponent,
    SearchPostsComponent,
    PostComponent,
    PostdetailComponent,
    EditPostsComponent,
    AddPostFileComponent,
    CustomDatePipe,
    EventsComponent,
    EditEventsComponent,
    DetailEventsComponent,
    PopContentComponent,
    PostFrontComponent,
    NotificationsDialogComponent,

    RegisterDefiComponent,
    ListDefiComponent,
    DetailsDefiComponent,
    AcceptedUsersDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    IconModule,
    FormsModule,
    MatGridListModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
    MatCardModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
