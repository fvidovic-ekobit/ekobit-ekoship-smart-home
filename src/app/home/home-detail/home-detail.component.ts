import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Home } from '../../models/home';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'home-detail',
  templateUrl: 'home-detail.component.html',
})

export class HomeDetailComponent {
  model: Home = new Home();
  isEdit: boolean = false;

  constructor(
    private readonly adressService: HomeService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<HomeDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Home) { }

  ngOnInit() {
    this.isEdit = !!this.data;
    this.model = this.isEdit ? this.data : new Home();
    console.log('HomeDetailComponent', this.model);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveHome() {
    console.log('save Home', this.model, this.isEdit);
    if (this.isEdit) {
      this.adressService.editHome(this.model).subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open('Home was successfully edited');
      });
    } else {
      this.adressService.addHome(this.model).subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open('Home was successfully added');
      });
    }
  }
}