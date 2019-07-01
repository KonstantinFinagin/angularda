import {ElementRef, HostBinding, Component, Input, OnChanges} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'smooth-height',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: block;
      overflow: hidden;
    }
  `],
  animations: [
    trigger('grow', [
      transition('void <=> *', []),
      transition('* <=> *', [
        style({height: '{{startHeight}}px', opacity: 0}),
        animate('.5s ease'),
      ], {params: {startHeight: 0}})
    ])
  ]
})
export class SmoothHeightComponent implements OnChanges {
  @Input()
  trigger: string;

  startHeight: number;

  constructor(private element: ElementRef) {}  

  @HostBinding('@grow') get grow() {
    return {value: this.trigger, params: {startHeight: this.startHeight}};
  }

  setStartHeight(){
    this.startHeight = this.element.nativeElement.clientHeight;
  }

  ngOnChanges(){
    this.setStartHeight();
  }
}