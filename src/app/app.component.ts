import {Component} from 'angular2/core';
import {DayPickerComponent, MonthPickerComponent} from './sparkle';

@Component({
  selector: 'app',
  directives: [
    DayPickerComponent, 
    MonthPickerComponent
  ],
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
          <div class="row">
            <p>
              These <em>pickers</em> also have a <code>cursor</code> property which
              controls where we are <em>looking</em> at.
            </p>
          </div>
          <div class="row">
            <pre>{{p1.cursor.toDate() | date}}</pre>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <h3>month-picker</h3>      
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <month-picker #p2></month-picker>
        </div>
        <div class="col-sm-6">
          <div class="row">
            <p>
              The value below is the <em>cursor</em> value which is not the
              same as the <em>selected</em> value. The former controls what we
              are looking at and the latter is what actually is stored.
            </p>
          </div>
          <div class="row">
            <p>
              And although you can use the <code>month-picker</code> as a 
              standalone component it is normally intended as an intermediate
              step to quickly select a month for the <code>day-picker</code> view.
            </p>
          </div>
          <div class="row">
            <pre>{{p2.cursor.toDate() | date}}</pre>
          </div>
          <div class="row">
            <p>
              The actual selected month is below, it's available as the 
              <code>value</code> property of the <code>month-picker</code>
              component.
            </p>
          </div>
          <div class="row">
            <pre>{{p2.value.toDate() | date}}</pre>
          </div>
        </div>
      </div>
    </div>
    `
})
export class AppComponent {
}