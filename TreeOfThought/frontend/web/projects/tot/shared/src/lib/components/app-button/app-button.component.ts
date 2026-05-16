import { Component, Input, ContentChild, TemplateRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule, NzButtonType, NzButtonSize } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Observable, Subscription, from, isObservable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule],
  template: `
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
      (click)="handleClick($event)"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class AppButtonComponent implements OnDestroy {
  @Input() nzType: NzButtonType = 'default';
  @Input() nzSize: NzButtonSize = 'default';
  @Input() nzDanger = false;
  @Input() nzShape: 'circle' | 'round' | null = null;
  @Input() nzBlock = false;
  @Input() nzGhost = false;
  @Input() disabled = false;

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
    this.subscription = obs$.pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      error: () => {
        this.isLoading = false;
      }
    });
  }

  isLoading = false;
  private subscription?: Subscription;

  handleClick(event: MouseEvent): void {
    if (this.isLoading) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
