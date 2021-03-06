import {Component} from 'angular2/core';

class Day {
  static fromMoment(m): Day {
    return new Day(m.year(), m.month(), m.date());
  }

  constructor(
    public year: number,
    public month: number,
    public date: number) { }

  toMoment() {
    return moment([this.year, this.month, this.date]);
  }

  toDate() {
    return this.toMoment().toDate();
  }

  equals(other: Day) {
    return this.year === other.year
      && this.month === other.month
      && this.date === other.date;
  }

  isSame(other: Day) {
    return this.equals(other);
  }
}

class Week {
  public week: number;
  public days: Day[];

  static from(m) {
    let days = _.range(0, 7)
      .map(x => m.clone().add(x, 'day'))
      .map(x => Day.fromMoment(x));

    return new Week(days);
  }

  constructor(days: Day[]) {
    this.days = days;
    this.week = this.firstDay.toMoment().week();
  }

  get firstDay() {
    return _.first(this.days);
  }
}

class Month {
  static fromMoment(m) {
    return new Month(m.year(), m.month());
  }

  constructor(public year: number, public month: number) { }
  
  toDate() {
    return this.toMoment().toDate();
  }
  
  toMoment() {
    return moment([this.year, this.month]);
  }
  
  isSame(other: Month) {
    return this.year === other.year 
      && this.month === other.month;
  }
}

function monthsFrom(m, number) {
  return _.range(0, number)
    .map(x => m.clone().add(x, 'month'))
    .map(x => new Month(x.year(), x.month()));
}

@Component({
  selector: 'day-picker',
  styles: [
    'table { width: 100% }',
    'button { width: 100% }'
  ],
  template: `
    <table>
      <tr>
        <td>
          <button class="btn btn-default" (click)="prev()">&lt;</button>
        </td>
        <td colspan="6">
          <button class="btn btn-default">
            {{cursor.toDate() | date}}
          </button>
        </td>
        <td>
          <button class="btn btn-default" (click)="next()">&gt;</button>
        </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td *ngFor="#day of weekdays" class="text-center">
          {{day}}
        </td>
      </tr>
      <tr *ngFor="#wk of weeks">
        <td class="text-center">{{wk.week}}</td>
        <td *ngFor="#day of wk.days">
          <button class="btn btn-default" (click)="select(day)"
            [class.btn-primary]="value.isSame(day)">
              {{day.date}}
          </button>
        </td>
      </tr>
    </table>
    `
})
export class DayPickerComponent {
  private _cursor: Day;
  private _value: Day;

  constructor() {
    let m = moment();
    this._cursor = Day.fromMoment(m);
    this._value = Day.fromMoment(m);
  }

  get cursor() {
    return this._cursor;
  }

  set value(newValue: Day) {
    this._cursor = newValue;
    this._value = newValue;
  }

  get value() {
    return this._value;
  }

  get weeks() {
    // This can be increased but anything below 6 is not supported
    const numberOfWeeks = 6;
    let startOfMonth = moment([this.cursor.year, this.cursor.month]);    
    // Offset the view a little bit so it aligns nicely
    let startOfView = startOfMonth.clone().add(-startOfMonth.weekday(), 'day');
    return _.range(0, numberOfWeeks)
      .map(x => startOfView.clone().add(x * 7, 'day'))
      .map(x => Week.from(x));
  }

  get weekdays() {
    return moment.weekdaysShort();
  }

  prev() {
    this.moveCursor(-1, 'month');
  }

  next() {
    this.moveCursor(1, 'month');
  }

  select(day: Day) {
    this._cursor = day;
    this._value = day;
  }

  moveCursor(amount: number, unitOfTime: string) {
    let m = this._cursor.toMoment().add(amount, unitOfTime);
    this._cursor = Day.fromMoment(m);
  }
}

@Component({
  selector: 'month-picker',
  styles: [
    'table { width: 100% }',
    'button { width: 100% }'
  ],  
  template: `
    <table>
      <tr>
        <td>
          <button class="btn btn-default" (click)="prev()">&lt;</button>
        </td>
        <td colspan="2">
          <button class="btn btn-default">
            {{cursor.year}}
          </button>
        </td>
        <td>
          <button class="btn btn-default" (click)="next()">&gt;</button>
        </td>
      </tr>
      <tr *ngFor="#row of months">
        <td *ngFor="#month of row">
          <button class="btn btn-default" 
            (click)="select(month)"
            [class.btn-primary]="value.isSame(month)">
              {{month.toDate() | date:'MMM'}}
          </button>
        </td>
      </tr>
    </table>
    `
})
export class MonthPickerComponent {
  private _cursor: Month;
  private _value: Month;
  
  constructor() { 
    let m = moment();
    this._cursor = Month.fromMoment(m);
    this._value = Month.fromMoment(m);
  }
  
  next() {
    this._moveCursor(1, 'year');
  }
  
  prev() {
    this._moveCursor(-1, 'year');
  }
  
  select(m: Month) {
    this._cursor = m;
    this._value = m;
  }
  
  private _moveCursor(amount: number, unitOfTime: string) {
    let m = this._cursor.toMoment().clone().add(amount, unitOfTime);
    this._cursor = Month.fromMoment(m);
  }
  
  get value() {
    return this._value;
  }
  
  get cursor() {
    return this._cursor;
  }
  
  get months(): Month[][] {
    const numberOfRows = 4;
    const monthsPerRow = 4;
    let startOfView = moment([this._cursor.year - 1, 8]);
    return _.range(numberOfRows)
      .map(x => startOfView.clone().add(x * monthsPerRow, 'month'))
      .map(x => monthsFrom(x, monthsPerRow));
  }
}