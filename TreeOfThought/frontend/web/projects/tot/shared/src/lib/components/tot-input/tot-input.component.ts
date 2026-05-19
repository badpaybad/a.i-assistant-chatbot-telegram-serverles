import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'tot-input',
  standalone: true,
  imports: [CommonModule, FormsModule, NzInputModule, NzIconModule],
  templateUrl: './tot-input.component.html',
  styleUrls: ['./tot-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TotInputComponent),
      multi: true
    }
  ]
})
export class TotInputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'password' | 'textarea' = 'text';
  @Input() placeholder = '';
  @Input() prefixIcon: string | null = null;
  @Input() rows = 4;
  @Input() disabled = false;

  value: string = '';
  passwordVisible = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }

  onBlur(): void {
    this.onTouched();
  }
}
