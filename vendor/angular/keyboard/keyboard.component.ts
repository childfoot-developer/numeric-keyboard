import { Component,  EventEmitter, Input, Output, OnInit } from '@angular/core'
import { Options, Mixins } from 'lib/keyboard'

const template = `
<div class="numeric-keyboard">
  <table>
    <tr *ngFor="let r of ks.layout">
      <td *ngFor="let c of r"
        [attr.rowspan]="c.rowspan"
        [attr.colspan]="c.colspan"
        [attr.data-icon]="ks.keys[c.key].icon"
        [ngStyle]="ks.keys[c.key].style"
        (touchstart)="onTouchstart(ks.keys[c.key], $event)"
        (touchend)="onTouchend(ks.keys[c.key], $event)">
      </td>
    </tr>
  </table>
</div>
`


class Parent {
  init: Function
}
Parent.prototype = Mixins

@Component({
  selector: 'numeric-keyboard',
  template: template,
  styleUrls: [ '../../../lib/style/keyboard.styl', './keyboard.component.styl' ]
})
export class NumericKeyboard extends Parent implements OnInit {
  @Input() layout: string | Array<Array<any>> = Options.layout
  @Input() theme: string | { global: any, key: any } = Options.theme
  @Input() entertext: string = Options.entertext
  @Output() onPress = new EventEmitter<number | string>()

  public ks: any
  public kp: any

  ngOnInit() {
    this.init({
      layout: this.layout,
      theme: this.theme,
      entertext: this.entertext
    })
  }

  dispatch(event, ...args) {
    this.onPress.emit(...args)
  }
}