import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'country-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Output() isClicked = new EventEmitter<boolean>();

  clicked(): void{
    this.isClicked.emit(true);
  }
}
