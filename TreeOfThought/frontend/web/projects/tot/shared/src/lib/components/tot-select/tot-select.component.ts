import { Component, Input, Output, EventEmitter, forwardRef, OnInit, OnDestroy, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { HttpClientService } from '@tot/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tot-select',
  standalone: true,
  imports: [CommonModule, FormsModule, NzSelectModule, NzCheckboxModule, NzSpinModule, TranslateModule],
  templateUrl: './tot-select.component.html',
  styleUrl: './tot-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TotSelectComponent),
      multi: true
    }
  ]
})
export class TotSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private httpService = inject(HttpClientService);
  private destroy$ = new Subject<void>();
  private search$ = new Subject<string>();

  @Input() apiUrl: string = '';
  @Input() params: any = {};
  @Input() mode: 'default' | 'multiple' = 'default';
  @Input() placeholder: string = 'Vui lòng chọn';
  @Input() labelField: string = 'name';
  @Input() valueField: string = 'id';
  @Input() pageSize: number = 25;

  @Output() valueChange = new EventEmitter<any>();

  options: any[] = [];
  selectedValue: any = null;
  loading = false;
  pageIndex = 1;
  hasMore = true;
  searchTerm = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  private getCacheKey(): string {
    const paramsStr = JSON.stringify(this.params || {});
    return `tot_select_cache_${this.apiUrl}_${paramsStr}`;
  }

  private getCache(): any[] {
    try {
      const data = sessionStorage.getItem(this.getCacheKey());
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  private setCache(data: any[]) {
    try {
      sessionStorage.setItem(this.getCacheKey(), JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save to sessionStorage', e);
    }
  }

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

    const cached = this.getCache();
    if (cached.length > 0) {
      this.options = cached.slice(0, this.pageSize);
      this.hasMore = cached.length > this.options.length;
    } else {
      this.fetchData();
    }
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
    if (this.loading) return;

    const cached = this.getCache();
    // Nếu không search và còn data trong cache chưa show hết thì show thêm
    if (!this.searchTerm && cached.length > this.options.length) {
      this.pageIndex++;
      this.options = cached.slice(0, this.pageIndex * this.pageSize);
      this.hasMore = cached.length > this.options.length;
      return;
    }

    if (this.hasMore) {
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
      
      const newItems = Array.isArray(res) ? res : (res?.items || []);
      const total = res?.total ?? 0;

      // Cập nhật cache: append dữ liệu mới và de-duplicate
      let allCached = this.getCache();
      newItems.forEach((item: any) => {
        const val = this.getFieldValue(item, this.valueField);
        if (!allCached.find((c: any) => this.getFieldValue(c, this.valueField) === val)) {
          allCached.push(item);
        }
      });
      this.setCache(allCached);

      // Cập nhật hiển thị
      if (this.searchTerm) {
        // Filter local để fix lỗi BE không filter theo keyword
        const term = this.searchTerm.toLowerCase();
        this.options = allCached.filter(item => 
          this.getFieldValue(item, this.labelField).toLowerCase().includes(term)
        );
        this.hasMore = false; // Khi search thì ưu tiên kết quả tìm kiếm, có thể mở rộng sau nếu BE hỗ trợ phân trang search
      } else {
        this.options = allCached.slice(0, this.pageIndex * this.pageSize);
        
        if (Array.isArray(res)) {
          this.hasMore = allCached.length > this.options.length;
        } else {
          this.hasMore = this.options.length < total || allCached.length > this.options.length;
        }
      }
    } catch (error) {
      console.error('Error fetching select options:', error);
    } finally {
      this.loading = false;
    }
  }

  // Helper to get nested properties if field is like 'user.name'
  getFieldValue(item: any, field: string): string {
    if (!item) return '';
    return field.split('.').reduce((obj, key) => obj?.[key], item) || '';
  }

  isSelected(item: any): boolean {
    if (this.selectedValue === null || this.selectedValue === undefined) return false;
    const itemValue = this.getFieldValue(item, this.valueField);
    
    if (this.mode === 'multiple' && Array.isArray(this.selectedValue)) {
      return this.selectedValue.includes(itemValue);
    }
    return this.selectedValue === itemValue;
  }
}

