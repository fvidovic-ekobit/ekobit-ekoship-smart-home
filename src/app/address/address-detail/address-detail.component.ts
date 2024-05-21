import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from "src/app/models/address";
import { AddressService } from "src/app/services/adress.service";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: 'address-detail',
  templateUrl: 'address-detail.component.html',
})

export class AddressDetailComponent {
  model: Address = new Address();
  isEdit: boolean = false;

  constructor(
    private readonly adressService: AddressService,
    public utils: UtilsService,
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
        this.utils.openSnackBar('Address was successfully edited');
      });
    } else {
      this.adressService.addAddress(this.model).subscribe(() => {
        this.dialogRef.close();
        this.utils.openSnackBar('Address was successfully added');
      });
    }
  }
}