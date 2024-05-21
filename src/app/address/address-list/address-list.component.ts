import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Address } from '../../models/address';
import { AddressService } from '../../services/adress.service';
import { MatDialog } from '@angular/material/dialog';
import { AddressDetailComponent } from '../address-detail/address-detail.component';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
})
export class AddressListComponent implements OnInit {
  dataSource = new MatTableDataSource<Address>();
  addressesSubscription: Subscription | undefined;
  loading = true;
  displayedColumns = ['id', 'streetName', 'number', 'zipCode', 'city', 'country', 'actions'];
  pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    public utils: UtilsService,
    public dialog: MatDialog,
    private readonly adressService: AddressService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.addressesSubscription = this.adressService.getAddresses().subscribe((addresses) => {
      this.dataSource = new MatTableDataSource<Address>(addresses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  onDeleteAddress(id: number) {
    this.loading = true;
    this.adressService.deleteAddress(id)
      .subscribe(() => {
        this.loading = false;
        let snackBarRef = this.utils.openSnackBar(`Address #${id} has been deleted`);
        this.getData();
      });
  }

  onEditAddress(address: Address) {
    const dialogRef = this.dialog.open(AddressDetailComponent, {
      data: address,
      height: '100%',
      width: '30%',
      position: {
        right: '0',
        top: '0'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  onAddAddress(): void {
    const dialogRef = this.dialog.open(AddressDetailComponent, {
      data: null,
      height: '100%',
      width: '30%',
      position: {
        right: '0',
        top: '0'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }
}
