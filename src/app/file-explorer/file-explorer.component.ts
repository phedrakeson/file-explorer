import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { NewFolderDialogComponent } from './modals/new-folder-dialog/new-folder-dialog.component';
import { RenameDialogComponent } from './modals/rename-dialog/rename-dialog.component';
import { FileElement } from './model/file-element';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit {

  @Input() fileElements: FileElement[] = [];
  @Input() canNavigateUp: string = '';
  @Input() path: string = '';

  @Output() folderAdded = new EventEmitter<{ name: string }>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  @Output() elementMoved = new EventEmitter< { element: FileElement, moveTo: FileElement } >();
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
  }

  public navigate(element: FileElement) {
    if(element.isFolder) {
      this.navigatedDown.emit(element);
    }
  }

  public navigateUp() {
    this.navigatedUp.emit();
  }

  public moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  public openNewFolderDialog() {
    let dialogRef = this.dialog.open(NewFolderDialogComponent);
    dialogRef.afterClosed().subscribe( data => {
      if (data) {
        this.folderAdded.emit({ name: data });
      } else {
        throw new Error('Um erro inesperado ocorreu.');
      }
    });
  }

  public openRenameDialog(element: FileElement) {
    let dialogRef = this.dialog.open(RenameDialogComponent);
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        element.name = data;
        this.elementRenamed.emit(element);
      } else {
        throw new Error('Um erro inesperado ocorreu.');
      }
    });
  }

  public openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }

}
