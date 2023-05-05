import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Address } from '../../../app/models/address';
import { AddressService } from '../../services/adress.service';
import { AddHome, EditHome, Home, HomeDetails } from '../../models/home';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'home-detail',
  templateUrl: 'home-detail.component.html',
  styleUrls: ['./home-detail.component.scss'],
})

export class HomeDetailComponent {
  id!: number;
  name!: string;
  isEdit: boolean = false;
  addresses$: Observable<Array<Address>> | undefined;
  selectedAddress!: number;

  constructor(
    private readonly homeService: HomeService,
    private readonly adressService: AddressService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<HomeDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit() {
    this.isEdit = !!this.data;

    if(this.isEdit) {
      this.id = this.data;
      this.homeService.getHome(this.id).subscribe((home: HomeDetails) => {
        this.name = home.name;
        this.selectedAddress = home.addressId;
      })
    }
  
    this.addresses$ = this.adressService.getAddresses();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveHome() {
    if (this.isEdit) {
      const editModel: EditHome = {
        name: this.name,
        addressId: this.selectedAddress
      }

      this.homeService.editHome(this.id, editModel).subscribe({
        complete: () => {
          this.dialogRef.close();
          this.snackBar.open('Home was successfully edited');
        },
        error: (err) => { 
          console.log('home edit error', err);
          this.dialogRef.close();
          this.snackBar.open('Error while editing home');
        }
    });
    } else {
      const addModel: AddHome = {
        name: this.name,
      }

      this.homeService.addHome(addModel).subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open('Home was successfully added');
      });
    }
  }
}