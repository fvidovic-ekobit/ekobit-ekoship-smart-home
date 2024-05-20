import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressListComponent } from './address/address-list/address-list.component';
import { HomeListComponent } from './home/home-list/home-list.component';
import { DeviceListComponent } from './device/device-list/device-list.component';

const routes: Routes = [
  {
    path: 'home-list',
    component: HomeListComponent
  },
  {
    path: 'address-list',
    component: AddressListComponent
  },
  {
    path: 'device-list',
    component: DeviceListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
