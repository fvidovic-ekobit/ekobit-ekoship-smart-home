import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DeviceService } from '../../services/device.service';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetailsComponent } from '../device-detail/device-details.component';
import { DeviceDetails, DeviceList } from 'src/app/models/device';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html'
})
export class DeviceListComponent implements OnInit {
  dataSource = new MatTableDataSource<DeviceList>();
  deviceSubscription: Subscription | undefined;
  loading = true;
  displayedColumns = ['id', 'name', 'actions'];
  pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    public utils: UtilsService,
    public dialog: MatDialog,
    private readonly deviceService: DeviceService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.deviceSubscription = this.deviceService.getDevices().subscribe((devices) => {
      this.dataSource = new MatTableDataSource<DeviceList>(devices);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  onDeleteDevice(id: number) {
    this.loading = true;
    this.deviceService.deleteDevice(id)
      .subscribe(() => {
        this.loading = false;
        this.utils.openSnackBar(`Device #${id} has been deleted`);
        this.getData();
      });
  }

  onEditDevice(device: DeviceDetails) {
    const dialogRef = this.dialog.open(DeviceDetailsComponent, {
      data: device.id,
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

  onAddDevice(): void {
    const dialogRef = this.dialog.open(DeviceDetailsComponent, {
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