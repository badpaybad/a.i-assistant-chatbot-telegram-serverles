import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule, NzButtonType, NzButtonSize } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Observable, Subscription, from, isObservable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'tot-button',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule],
  template: `
    <ng-container *ngIf="!href; else linkTpl">
      <button
        nz-button
        [nzType]="nzType"
        [nzSize]="nzSize"
        [nzDanger]="nzDanger"
        [nzShape]="nzShape"
        [nzBlock]="nzBlock"
        [nzGhost]="nzGhost"
        [nzLoading]="isLoading"
        [disabled]="disabled || isLoading"
        [attr.type]="nzHtmlType"
        (click)="handleClick($event)"
      >
        <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
      </button>
    </ng-container>

    <ng-template #linkTpl>
      <a
        nz-button
        [href]="href"
        [target]="target"
        [nzType]="nzType"
        [nzSize]="nzSize"
        [nzDanger]="nzDanger"
        [nzShape]="nzShape"
        [nzBlock]="nzBlock"
        [nzGhost]="nzGhost"
        [nzLoading]="isLoading"
        [class.ant-btn-disabled]="disabled || isLoading"
        (click)="handleClick($event)"
      >
        <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
      </a>
    </ng-template>

    <ng-template #contentTpl>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class TotButtonComponent implements OnDestroy {
  @Input() nzType: NzButtonType = 'default';
  @Input() nzSize: NzButtonSize = 'default';
  @Input() nzDanger = false;
  @Input() nzShape: 'circle' | 'round' | null = null;
  @Input() nzBlock = false;
  @Input() nzGhost = false;
  @Input() disabled = false;
  @Input() nzHtmlType: 'button' | 'submit' | 'reset' = 'button';

  @Input() href: string | null = null;
  @Input() target: string | null = null;

  @Input() set loading(value: boolean | Observable<any> | Promise<any> | null | undefined) {
    if (value === null || value === undefined) {
      this.isLoading = false;
      return;
    }

    if (typeof value === 'boolean') {
      this.isLoading = value;
      return;
    }

    // Handle Observable or Promise
    this.isLoading = true;
    const obs$ = isObservable(value) ? value : from(value);

    this.subscription?.unsubscribe();
    this.subscription = obs$
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        error: () => {
          this.isLoading = false;
        },
      });
  }

  isLoading = false;
  private subscription?: Subscription;

  handleClick(event: MouseEvent): void {
    if (this.isLoading || (this.disabled && this.href)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
