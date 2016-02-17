import {Component} from 'angular2/core';
import {DayPickerComponent} from './sparkle';

@Component({
  selector: 'app',
  directives: [DayPickerComponent],
  template: `
    <div class="container">
      <h1>Sandbox</h1>
        <div class="row">
          <div class="col-sm-12">
            <h3>day-picker</h3>      
          </div>
        </div>
      <div class="row">
        <div class="col-sm-6">
          <day-picker #p1></day-picker>
        </div>
        <div class="col-sm-6">
          <div class="row">
            <div style="margin-bottom: 16px">
              <button (click)="p1.prev()" class="btn btn-default">Previous</button>
              <button (click)="p1.next()" class="btn btn-default">Next</button>
            </div>
          </div>
          <div class="row">
            <p>
              The buttons above control the <code>day-picker</code> from the outside.
              These are equivalent to using the &lt; and &gt; buttons on the picker itself.
            </p>
            <p>The value below is the currently selected day.</p>
            <pre>{{p1.value.toDate() | date}}</pre>
          </div>
        </div>
      </div>
    </div>
    `
})
export class AppComponent {
}