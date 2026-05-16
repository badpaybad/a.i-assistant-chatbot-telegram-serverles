import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { TranslateModule } from '@ngx-translate/core';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';

export interface TotTableColumn {
  title: string;
  key?: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: Array<{ text: string; value: any }>;
  align?: 'left' | 'right' | 'center';
  template?: TemplateRef<any>;
  left?: string | boolean;
  right?: string | boolean;
}

@Component({
  selector: 'tot-table',
  standalone: true,
  imports: [CommonModule, NzTableModule, TranslateModule, NzTooltipModule, NzIconModule],
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
      [nzSize]="size"
      [nzShowPagination]="showPagination"
      (nzCurrentPageDataChange)="onCurrentPageDataChange($event)"
    >
      <thead>
        <tr>
          <th
            *ngIf="showSelection"
            nzWidth="40px"
            [nzLeft]="true"
            [nzShowCheckbox]="true"
            [nzChecked]="allChecked"
            [nzIndeterminate]="indeterminate"
            (nzCheckedChange)="onAllChecked($event)"
          ></th>
          <th *ngIf="expandTemplate" nzWidth="40px" [nzLeft]="showSelection ? '40px' : true"></th>
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
            [nzLeft]="col.left || false"
            [nzRight]="col.right || false"
          >
            {{ col.title | translate }}
          </th>
        </tr>
      </thead>
      <tbody>
        <ng-container *ngFor="let item of basicTable.data; let i = index">
          <tr>
            <td
              *ngIf="showSelection"
              [nzLeft]="true"
              [nzShowCheckbox]="true"
              [nzChecked]="setOfCheckedId.has(item[idKey])"
              (nzCheckedChange)="onItemChecked(item, $event)"
            ></td>
            <td
              *ngIf="expandTemplate"
              [nzLeft]="showSelection ? '40px' : true"
              [nzExpand]="item.expand"
              (nzExpandChange)="onExpandChange(item, $event)"
            ></td>
            <td
              *ngFor="let col of columns"
              [nzAlign]="col.align || 'left'"
              [nzLeft]="col.left || false"
              [nzRight]="col.right || false"
            >
              <ng-container *ngIf="col.template; else textOnly">
                <ng-container
                  *ngTemplateOutlet="col.template; context: { $implicit: item, index: i, key: col.key }"
                ></ng-container>
              </ng-container>
              <ng-template #textOnly>
                {{ getFieldValue(item, col.key) }}
              </ng-template>
            </td>
          </tr>
          <tr *ngIf="expandTemplate" [nzExpand]="item.expand">
            <td [attr.colspan]="columns.length + (showSelection ? 1 : 0) + 1">
              <ng-container
                *ngTemplateOutlet="expandTemplate; context: { $implicit: item, index: i }"
              ></ng-container>
            </td>
          </tr>
        </ng-container>
      </tbody>
    </nz-table>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
      ::ng-deep .ant-table-thead > tr > th {
        white-space: nowrap;
      }
    `,
  ],
})
export class TotTableComponent {
  @Input() data: any[] = [];
  @Input() columns: TotTableColumn[] = [];
  @Input() loading = false;
  @Input() total = 0;
  @Input() pageIndex = 1;
  @Input() pageSize = 10;
  @Input() frontPagination = false;
  @Input() scroll: { x?: string | null; y?: string | null } = { x: '1000px' };
  @Input() size: 'default' | 'middle' | 'small' = 'default';
  @Input() showPagination = true;
  @Input() expandTemplate?: TemplateRef<any>;

  // Selection
  @Input() showSelection = false;
  @Input() idKey = 'id';
  @Output() selectionChange = new EventEmitter<any[]>();

  @Output() queryParamsChange = new EventEmitter<NzTableQueryParams>();

  checked = false;
  indeterminate = false;
  allChecked = false;
  setOfCheckedId = new Set<any>();

  private currentPageData: readonly any[] = [];

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.queryParamsChange.emit(params);
  }

  onCurrentPageDataChange(data: readonly any[]): void {
    this.currentPageData = data;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.currentPageData;
    this.allChecked = listOfEnabledData.length > 0 && listOfEnabledData.every((item) => this.setOfCheckedId.has(item[this.idKey]));
    this.indeterminate = listOfEnabledData.some((item) => this.setOfCheckedId.has(item[this.idKey])) && !this.allChecked;
  }

  onAllChecked(checked: boolean): void {
    this.currentPageData.forEach((item) => this.updateCheckedSet(item, checked));
    this.refreshCheckedStatus();
    this.emitSelection();
  }

  onItemChecked(item: any, checked: boolean): void {
    this.updateCheckedSet(item, checked);
    this.refreshCheckedStatus();
    this.emitSelection();
  }

  updateCheckedSet(item: any, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(item[this.idKey]);
    } else {
      this.setOfCheckedId.delete(item[this.idKey]);
    }
  }

  emitSelection(): void {
    const selectedItems = this.data.filter((item) => this.setOfCheckedId.has(item[this.idKey]));
    this.selectionChange.emit(selectedItems);
  }

  onExpandChange(item: any, checked: boolean): void {
    item.expand = checked;
  }

  getFieldValue(item: any, key?: string): any {
    if (!key || !item) return '';
    const value = key.split('.').reduce((obj, k) => obj?.[k], item);
    return value === undefined || value === null ? '' : value;
  }
}
