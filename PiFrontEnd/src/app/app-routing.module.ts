import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MarketplaceComponent } from './MarketPlacee/marketplace/marketplace.component';
import { ProductDetailsComponent } from './MarketPlacee/product-details/product-details.component';
import { RegisterProductComponent } from './MarketPlacee/register-product/register-product.component';
import { ListProduitComponent } from './BackOffice/alltemplate-back/list-produit/list-produit.component';
import { ShowProductDetailsComponent } from './MarketPlacee/show-product-details/show-product-details.component';
import { AddProductBackComponent } from './MarketPlacee/add-product-back/add-product-back.component';
import { ProductResolveBackService } from './image/product-resolve-back.service';
import { DetaitlsbackComponent } from './MarketPlacee/detaitlsback/detaitlsback.component';
import { VaryingmodalcontentComponent } from './MarketPlacee/varyingmodalcontent/varyingmodalcontent.component';
import { AlltemplateBackComponent } from './BackOffice/alltemplate-back/alltemplate-back.component';
import { AlltemplatefrontComponent } from './FrontOffice/alltemplatefront/alltemplatefront.component';
import { RegisterCarpoolingComponent } from './Carpooling/register-carpooling/register-carpooling.component';
import { ListCarpoolingComponent } from './Carpooling/list-carpooling/list-carpooling.component';
import { DetailsCarpoolingComponent } from './Carpooling/details-carpooling/details-carpooling.component';
import { CarpoolingResolveService } from './imageCarpooling/carpooling-resolve.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthGuardService } from './Service/auth-guard.service';
import { CartComponent } from './MarketPlacee/cart/cart.component';
import { BuyProductComponent } from './MarketPlacee/buy-product/buy-product.component';
import { BuyProductResolverService } from './buy-product-resolver.service';
import { MyOrdersComponent } from './MarketPlacee/my-orders/my-orders.component';
import { OrderDetaisComponent } from './MarketPlacee/order-detais/order-detais.component';
import { PaymentComponent } from './MarketPlacee/payment/payment.component';
import { ListCollocationComponent } from './Collocation/list-collocation/list-collocation.component';
import { CollocationResolveService } from './Collocation/ImageCollocation/collocation-resolve.service';
import { AddCollocationComponent } from './Collocation/add-collocation/add-collocation.component';
import { DetailsCollocationComponent } from './Collocation/details-collocation/details-collocation.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { QRDialogComponent } from './qrdialog/qrdialog.component';
import { ChatbotComponent } from './MarketPlacee/chatbot/chatbot.component';
import { StatistiqueComponent } from './MarketPlacee/statistique/statistique.component';
import { ChattComponent } from './chatt/chatt.component';
import { MapComponent } from './map/map.component';
import { MapleafletComponent } from './mapleaflet/mapleaflet.component';
import { PostComponent } from './Forum-Event/post/post/post.component';
import { AddPostsComponent } from './Forum-Event/post/post/add-posts/add-posts.component';
import { EditPostsComponent } from './Forum-Event/post/post/edit-posts/edit-posts.component';
import { EventsComponent } from './Forum-Event/event/events/events.component';
import { EventFrontComponent } from './Forum-Event/event-front/event-front.component';
import { EditEventsComponent } from './Forum-Event/event/events/edit-events/edit-events.component';
import { PostdetailComponent } from './Forum-Event/post/post/postdetail/postdetail.component';
import { AddPostFileComponent } from './Forum-Event/add-post-file/add-post-file.component';
import { PostFrontComponent } from './Forum-Event/post-front/post-front.component';
import { NavbarFrontComponent } from './FrontOffice/navbar-front/navbar-front.component';

import { RegisterDefiComponent } from './Defi/register-defi/register-defi.component';
import { ListDefiComponent } from './Defi/list-defi/list-defi.component';
import { DetailsDefiComponent } from './Defi/details-defi/details-defi.component';
import { DefiResolveService } from './Defi/ImageDefi/defi-resolve.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },// Rediriger vers la page de connexion par défaut
  //{path:'msg',component:MessageFormComponent},

  {path:'chat',component:ChattComponent},
 // {path:'map',component:MapComponent},
 { path: 'posts', component: PostComponent},
    {path: 'addpost', component: AddPostsComponent},
    { path: 'editPost/:id', component: EditPostsComponent },
    {path: 'events', component: EventsComponent},
    {path: 'eventsFront', component: EventFrontComponent},

    { path: 'editEvent/:id', component: EditEventsComponent },

    { path:'detailPost/:id',component:PostdetailComponent},
    { path: 'addPostFile/:id', component: AddPostFileComponent },
  {path:'',component:AlltemplatefrontComponent, children:[

    { path: 'postFront', component: PostFrontComponent},
    {path: 'ListDefi', component: ListDefiComponent,  canActivate: [AuthGuardService]},/////////////////
    {path: 'detailsdefi/:id',  canActivate: [AuthGuardService],component: DetailsDefiComponent ,resolve: { product: DefiResolveService }},
    {path: 'registerDefi',  canActivate: [AuthGuardService], component: RegisterDefiComponent},
    {path:'stat',component:StatistiqueComponent},

  {path:'home', canActivate: [AuthGuardService], component: HomeComponent },
  {path:'chat', canActivate: [AuthGuardService], component: ChatbotComponent },
  {path:'map',component:MapleafletComponent, canActivate: [AuthGuardService]},

  {path:'Carpooling', canActivate: [AuthGuardService], component: RegisterCarpoolingComponent},
  {path:'listCarppoling', canActivate: [AuthGuardService], component: ListCarpoolingComponent},
  {path: 'detailCarp/:id',  canActivate: [AuthGuardService],component: DetailsCarpoolingComponent ,resolve: { product: CarpoolingResolveService }},
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'signup', component: SignupComponent },
  {
    path: 'profile',canActivate: [AuthGuardService],

    component: ProfilComponent,

  },

  {path:'listCollocation',  canActivate: [AuthGuardService],component: ListCollocationComponent},
  {path:'detailsColl',  canActivate: [AuthGuardService],component: DetailsCollocationComponent,resolve: { product: CollocationResolveService }},
  {path:'addCollocation',  canActivate: [AuthGuardService],component: AddCollocationComponent},
  {path:'marketplace',  canActivate: [AuthGuardService],component: MarketplaceComponent},
  {path:'cart',  canActivate: [AuthGuardService],component: CartComponent},
{path:'buyProduct',  canActivate: [AuthGuardService],component:BuyProductComponent,  resolve: {
  productDetails: BuyProductResolverService} },
  { path: 'myOrders', component: MyOrdersComponent ,  canActivate:[AuthGuardService] },
{path:'paiment',component:PaymentComponent ,  canActivate:[AuthGuardService]},
  {path:'registerproduct',  canActivate: [AuthGuardService] ,component: RegisterProductComponent},
  {path: 'detail', component: ProductDetailsComponent ,resolve: { product: ProductResolveBackService }},
  {path: 'detailback', component: DetaitlsbackComponent ,resolve: { product: ProductResolveBackService }},
  {path:'qrcode',component:QRDialogComponent},
  {path:'chat',component:ChatbotComponent},

]},





{path:'back' ,component:AlltemplateBackComponent, canActivate: [AuthGuardService], children:[
  {path:'showback',component:ShowProductDetailsComponent},
  {path:'list',component:ListProduitComponent},
  {path :'addproduitBack', component:AddProductBackComponent,

  resolve:{
    product:ProductResolveBackService
  }},
  { path: 'orderInformation' , component: OrderDetaisComponent ,  canActivate:[AuthGuardService]},


{path: 'detailback', component: DetaitlsbackComponent ,resolve: { product: ProductResolveBackService }},


]

},{path:'varying' ,component:VaryingmodalcontentComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
