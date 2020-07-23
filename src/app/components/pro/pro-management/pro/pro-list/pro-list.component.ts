import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProService } from 'src/app/service/pro.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Pro } from 'src/app/models/pro';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/service/alerte.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'kt-pro-list',
  templateUrl: './pro-list.component.html',
  styleUrls: ['./pro-list.component.css']
})
export class ProListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'username', 'email', 'firstname', 'phone', 'actions'];
  dataSource = new MatTableDataSource<Pro>();
  selection = new SelectionModel<Pro>(true, []);
  data = Object.assign(Pro);
  currentScreenWidth = '';
  flexMediaWatcher: Subscription;
  result: string = '';

  isLoading : boolean;
 pros : Pro[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private proService: ProService,
    private tokenStorage: TokenStorageService,
    private mediaObserver: MediaObserver,
    private alertService: AlertService,
    public dialog: MatDialog) {
    this.flexMediaWatcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      this.currentScreenWidth = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if ( change.mqAlias == 'xs') {
        this.setupTable();
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    const token = this.tokenStorage.getToken();
    this.proService.getAllUsers(token).subscribe(data =>{
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data= data['hydra:member'];
      this.isLoading = false;
    });

  }
  setupTable() {
    this.displayedColumns = ['select', 'id', 'username', 'firstname', 'actions'];
  };
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Pro): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /** Search Filter */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeSelectedRows(selectedUser: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: selectedUser
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true){
        this.isLoading = true;
        const token = this.tokenStorage.getToken();

        this.selection.selected.forEach(item => {
          if (item.nom === 'admin'){
            return this.alertService.success('L\'administrateur ' + item.nom + ' ne peut pas etre supprimé.', true);
          }
          this.proService.deleteUser(token,item).subscribe((data: Pro) => {
            this.proService.getAllUsers(token).subscribe((allUser: Pro[]) => {
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.dataSource.data= allUser['hydra:member'];
              this.alertService.success('L\'utilisateur ' + item.nom + ' a bien été supprimé.', true);
              this.isLoading = false;
              this.selection.clear();
              this.isLoading = false;
            });
          });
        });
      }
    });

  }

  confirmDialog(user: Pro): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true){
        const token = this.tokenStorage.getToken();
        this.isLoading = true;
        this.proService.deleteUser(token,user).subscribe((data: Pro) => {
          this.proService.getAllUsers(token).subscribe((allUser: Pro[]) => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.dataSource.data= allUser['hydra:member'];
            this.alertService.success('L\'utilisateur '+ user.nom + ' a bien été supprimé.', true);
            this.selection.clear();
            this.isLoading = false;
          });
        });
      }
    });
  }
  ngOnDestroy() {
    this.flexMediaWatcher.unsubscribe();
  }

}
