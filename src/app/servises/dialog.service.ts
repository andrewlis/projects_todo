import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(
    private matDialogService: MatDialog
  ) {
  }
  openDialog(dialogComponent, data: any | null = null, panelClass?: string): Observable<any> {

    return this.matDialogService.open(dialogComponent, {data: data, panelClass: panelClass}).beforeClose();
  }
}
