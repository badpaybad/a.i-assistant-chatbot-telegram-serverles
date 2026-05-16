import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[totCell]',
  standalone: true
})
export class TotCellDirective {
  @Input('totCell') columnKey!: string;
  constructor(public template: TemplateRef<any>) {}
}
