import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Address } from "src/app/models/address";
import { AddressService } from "src/app/services/adress.service";

@Component({
  selector: 'address-detail',
  templateUrl: 'address-detail.component.html',
})

export class AddressDetailComponent {
  model: Address = new Address();
  isEdit: boolean = false;

  constructor(
    private readonly adressService: AddressService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddressDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Address) { }

  ngOnInit() {
    this.isEdit = !!this.data;
    this.model = this.isEdit ? this.data : new Address();
    console.log('AddressDetailComponent', this.model);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveAddress() {
    console.log('save address', this.model, this.isEdit);
    if (this.isEdit) {
      this.adressService.editAddress(this.model).subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open('Address was successfully edited');
      });
    } else {
      this.adressService.addAddress(this.model).subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open('Address was successfully added');
      });
    }
  }
}