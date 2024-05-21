import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Home } from '../../models/home';
import { HomeService } from '../../services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { HomeDetailComponent } from '../home-detail/home-detail.component';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'home-list',
  templateUrl: './home-list.component.html'
})
export class HomeListComponent implements OnInit {
  dataSource = new MatTableDataSource<Home>();
  homeSubscription: Subscription | undefined;
  loading = true;
  displayedColumns = ['id', 'name', 'actions'];
  pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    public utils: UtilsService,
    public dialog: MatDialog,
    private readonly homeService: HomeService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.homeSubscription = this.homeService.getHomes().subscribe((homes) => {
      this.dataSource = new MatTableDataSource<Home>(homes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  onDeleteHome(id: number) {
    this.loading = true;
    this.homeService.deleteHome(id)
      .subscribe(() => {
        this.loading = false;
        this.utils.openSnackBar(`Home #${id} has been deleted`);
        this.getData();
      });
  }

  onEditHome(home: Home) {
    const dialogRef = this.dialog.open(HomeDetailComponent, {
      data: home.id,
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

  onAddHome(): void {
    const dialogRef = this.dialog.open(HomeDetailComponent, {
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
