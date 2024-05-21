import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  openSnackBar(message: string, time = 3000): void {
    const action = 'dismiss';
    this.snackBar.open(message, action, {
      duration: time
    });
  }
}
