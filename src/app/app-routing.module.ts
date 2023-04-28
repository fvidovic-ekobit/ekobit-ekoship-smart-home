import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressListComponent } from './address/address-list/address-list.component';
import { HomeListComponent } from './home/home-list/home-list.component';

const routes: Routes = [
  {
    path: 'home-list',
    component: HomeListComponent
  },
  {
    path: 'address-list',
    component: AddressListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
