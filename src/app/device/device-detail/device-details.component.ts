import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Address } from '../../../app/models/address';
import { DeviceService } from 'src/app/services/device.service';
import { DeviceCreate, DeviceDetails, DeviceUpdate } from 'src/app/models/device';

@Component({
  selector: 'device-details',
  templateUrl: 'device-details.component.html',
})

export class DeviceDetailsComponent {
  id!: number;
  name!: string;
  serialNr!: string;
  isEdit: boolean = false;

  constructor(
    private readonly service: DeviceService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeviceDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit() {
    this.isEdit = !!this.data;

    if(this.isEdit) {
      this.id = this.data;
      this.service.getDevice(this.id).subscribe((device: DeviceDetails) => {
        this.name = device.name;
        this.serialNr = device.serialNr;
      })
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveDevice() {
    if (this.isEdit) {
      const editModel: DeviceUpdate = {
        name: this.name,
        serialNr: this.serialNr
      }

      this.service.editDevice(this.id, editModel).subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open('Home was successfully edited');
      });
    } else {
      const addModel: DeviceCreate = {
        name: this.name,
        serialNr: this.serialNr
      }

      this.service.addDevice(addModel).subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open('Home was successfully added');
      });
    }
  }
}