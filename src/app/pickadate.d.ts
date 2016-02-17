/// <reference path="../../typings/tsd.d.ts" />

interface JQuery {
  pickadate(opts?: Object): pickadate.Pickadate;
}

declare module pickadate {
  interface Pickadate {
    pickadate(methodName: string, ...args: string[]): DatePicker;
    pickadate(objectName: string): DatePicker;
  }

  export interface DatePicker {
    $node: JQuery;
    $root: JQuery;
    open(focus?: boolean): DatePicker;
    close(focus?: boolean): DatePicker;
    set(thing: string, value: any): DatePicker;
    get(thing: string, format?: string): any;
    start(): DatePicker;
    stop(): DatePicker;
    render(all?: boolean): DatePicker;
    clear(): DatePicker;
    on(methodName: string, fn: () => void): DatePicker;
    on(cfg: Object): DatePicker;
    off(...methodNames: string[]): DatePicker;
    trigget(methodName: string, data?: Object): DatePicker;
  }
}