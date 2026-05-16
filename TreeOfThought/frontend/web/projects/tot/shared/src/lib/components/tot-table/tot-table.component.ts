import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { TranslateModule } from '@ngx-translate/core';

export interface TotTableColumn {
  title: string;
  key?: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: Array<{ text: string; value: any }>;
  align?: 'left' | 'right' | 'center';
  template?: TemplateRef<any>;
}

@Component({
  selector: 'tot-table',
  standalone: true,
  imports: [CommonModule, NzTableModule, TranslateModule],
  template: `
    <nz-table
      #basicTable
      [nzData]="data"
      [nzLoading]="loading"
      [nzTotal]="total"
      [nzPageIndex]="pageIndex"
      [nzPageSize]="pageSize"
      [nzShowSizeChanger]="true"
      [nzPageSizeOptions]="[5, 10, 20, 25, 50, 100, 200]"
      [nzFrontPagination]="frontPagination"
      (nzQueryParams)="onQueryParamsChange($event)"
      [nzScroll]="scroll"
    >
      <thead>
        <tr>
          <th
            *ngFor="let col of columns"
            [nzWidth]="col.width || null"
            [nzShowSort]="col.sortable"
            [nzSortFn]="col.sortable ? true : null"
            [nzColumnKey]="col.key"
            [nzShowFilter]="col.filterable"
            [nzFilters]="col.filterOptions || []"
            [nzFilterFn]="col.filterable ? true : null"
            [nzAlign]="col.align || 'left'"
          >
            {{ col.title | translate }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of basicTable.data; let i = index">
          <td *ngFor="let col of columns" [nzAlign]="col.align || 'left'">
            <ng-container *ngIf="col.template; else textOnly">
              <ng-container *ngTemplateOutlet="col.template; context: { $implicit: item, index: i }"></ng-container>
            </ng-container>
            <ng-template #textOnly>
              {{ getFieldValue(item, col.key) }}
            </ng-template>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class TotTableComponent {
  @Input() data: any[] = [];
  @Input() columns: TotTableColumn[] = [];
  @Input() loading = false;
  @Input() total = 0;
  @Input() pageIndex = 1;
  @Input() pageSize = 25;
  @Input() frontPagination = false;
  @Input() scroll: { x?: string; y?: string } = { x: '1000px' };

  @Output() queryParamsChange = new EventEmitter<NzTableQueryParams>();

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.queryParamsChange.emit(params);
  }

  getFieldValue(item: any, key?: string): any {
    if (!key || !item) return '';
    return key.split('.').reduce((obj, k) => obj?.[k], item) || '';
  }
}
