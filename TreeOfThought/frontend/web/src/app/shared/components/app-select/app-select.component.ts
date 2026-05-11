import { Component, Input, Output, EventEmitter, forwardRef, OnInit, OnDestroy, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { HttpClientService } from '../../../core/http/http-client.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, NzSelectModule, NzCheckboxModule, NzSpinModule, TranslateModule],
  templateUrl: './app-select.component.html',
  styleUrl: './app-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSelectComponent),
      multi: true
    }
  ]
})
export class AppSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private httpService = inject(HttpClientService);
  private destroy$ = new Subject<void>();
  private search$ = new Subject<string>();

  @Input() apiUrl: string = '';
  @Input() params: any = {};
  @Input() mode: 'default' | 'multiple' = 'default';
  @Input() placeholder: string = 'Vui lòng chọn';
  @Input() labelField: string = 'name';
  @Input() valueField: string = 'id';
  @Input() pageSize: number = 20;

  @Output() valueChange = new EventEmitter<any>();

  options: any[] = [];
  selectedValue: any = null;
  loading = false;
  pageIndex = 1;
  hasMore = true;
  searchTerm = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit() {
    this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(term => {
        this.searchTerm = term;
        this.resetAndFetch();
      });

    this.fetchData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement if needed
  }

  onValueChange(value: any) {
    this.selectedValue = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }

  onSearch(value: string) {
    this.search$.next(value);
  }

  onScrollToBottom() {
    if (!this.loading && this.hasMore) {
      this.pageIndex++;
      this.fetchData();
    }
  }

  resetAndFetch() {
    this.pageIndex = 1;
    this.options = [];
    this.hasMore = true;
    this.fetchData();
  }

  async fetchData() {
    if (!this.apiUrl || this.loading) return;

    this.loading = true;
    try {
      const queryParams = {
        ...this.params,
        keyword: this.searchTerm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };

      const res = await this.httpService.get(this.apiUrl, { params: queryParams });
      
      // Giả định BE trả về format: { items: [], total: 0 }
      // Hoặc nếu BE trả về array trực tiếp (không phân trang)
      const newItems = Array.isArray(res) ? res : (res?.items || []);
      const total = res?.total ?? 0;

      if (this.pageIndex === 1) {
        this.options = newItems;
      } else {
        this.options = [...this.options, ...newItems];
      }

      // Kiểm tra xem còn dữ liệu không
      if (Array.isArray(res)) {
        this.hasMore = false; // Nếu trả về array thì coi như không có phân trang
      } else {
        this.hasMore = this.options.length < total;
      }
    } catch (error) {
      console.error('Error fetching select options:', error);
    } finally {
      this.loading = false;
    }
  }

  // Helper to get nested properties if field is like 'user.name'
  getFieldValue(item: any, field: string): string {
    return field.split('.').reduce((obj, key) => obj?.[key], item) || '';
  }

  isSelected(item: any): boolean {
    if (!this.selectedValue) return false;
    const itemValue = this.getFieldValue(item, this.valueField);
    
    if (this.mode === 'multiple' && Array.isArray(this.selectedValue)) {
      return this.selectedValue.includes(itemValue);
    }
    return this.selectedValue === itemValue;
  }
}
