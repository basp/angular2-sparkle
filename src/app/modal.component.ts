import {Component} from 'angular2/core';

@Component({
  selector: 'modal',
  template: `
    <div class="modal">
      <ng-content></ng-content>
    </div>
    `
})
export class ModalComponent {
}