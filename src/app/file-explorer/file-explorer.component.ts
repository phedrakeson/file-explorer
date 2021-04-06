import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
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

  constructor() { }

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

  }

  public openRenameDialog(element: FileElement) {

  }

  public openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
    
  }

}
