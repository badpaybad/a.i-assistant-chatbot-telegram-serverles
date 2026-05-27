import { Component, Input, Output, EventEmitter, TemplateRef, ContentChildren, QueryList, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { TranslocoModule } from '@jsverse/transloco';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';

@Directive({
  selector: '[totCell]',
  standalone: true
})
export class TotCellDirective {
  @Input('totCell') columnKey!: string;
  constructor(public template: TemplateRef<any>) {}
}

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
  imports: [CommonModule, NzTableModule, TranslocoModule, NzTooltipModule, NzIconModule, NzCardModule],
  template: `
    <nz-card [nzTitle]="titleTpl" [nzExtra]="extra || undefined">
      <ng-template #titleTpl>
        <ng-container *ngIf="isString(title); else refTpl">
          {{ title }}
        </ng-container>
        <ng-template #refTpl>
          <ng-container *ngTemplateOutlet="asTemplate(title)"></ng-container>
        </ng-template>
      </ng-template>

      <nz-table
        #basicTable
        [nzData]="data"
        [nzLoading]="loading"
        [nzTotal]="total"
        [(nzPageIndex)]="pageIndex"
        [(nzPageSize)]="pageSize"
        [nzFrontPagination]="frontPagination"
        [nzShowPagination]="showPagination"
        [nzBordered]="true"
        [nzSize]="nzSize"
        [nzScroll]="tableScroll"
        [nzShowSizeChanger]="true"
        [nzPageSizeOptions]="[5, 10, 20, 25, 50, 100, 200]"
        [nzHideOnSinglePage]="false"
        (nzQueryParamsChange)="onQueryParamsChange($any($event))"
        nzTableLayout="fixed"
      >
        <thead>
          <tr>
            <th *ngIf="expandTemplate" nzWidth="40px"></th>
            <th
              *ngFor="let col of columns"
              [nzWidth]="col.width || (isActionColumn(col) ? '150px' : null)"
              [nzSortFn]="col.sortable || null"
              [nzShowSort]="col.sortable || false"
              [nzAlign]="col.align || 'left'"
              [nzLeft]="col.left === true ? '0px' : col.left || false"
              [nzRight]="(col.right === true || isActionColumn(col)) ? '0px' : col.right || false"
            >
              {{ col.title | transloco }}
            </th>
          </tr>
        </thead>
        <tbody>
          <ng-container *ngFor="let item of basicTable.data; let i = index">
            <tr>
              <td *ngIf="expandTemplate" [nzExpand]="item.expand" (nzExpandChange)="onExpandChange(item, $event)"></td>
              <td
                *ngFor="let col of columns"
                [nzAlign]="col.align || 'left'"
                [nzLeft]="col.left === true ? '0px' : col.left || false"
                [nzRight]="(col.right === true || isActionColumn(col)) ? '0px' : col.right || false"
              >
                <ng-container *ngIf="getColTemplate(col); else textOnly">
                  <ng-container
                    *ngTemplateOutlet="getColTemplate(col)!; context: { $implicit: item, index: i, key: col.key }"
                  ></ng-container>
                </ng-container>
                <ng-template #textOnly>
                  {{ getFieldValue(item, col.key) }}
                </ng-template>
              </td>
            </tr>
            <tr [nzExpand]="item.expand" *ngIf="expandTemplate">
              <ng-container *ngTemplateOutlet="expandTemplate; context: { $implicit: item }"></ng-container>
            </tr>
          </ng-container>
        </tbody>
      </nz-table>
    </nz-card>
  `,
  styles: [`
    :host ::ng-deep .ant-card-head-title {
      font-weight: 600;
      font-size: 16px;
    }
    :host ::ng-deep .ant-table-thead > tr > th {
      background: #fafafa !important;
      font-weight: 600;
      white-space: normal;
      word-break: break-word;
    }
    :host ::ng-deep .ant-table-tbody > tr > td {
      background: #fff;
      white-space: normal;
      word-break: break-word;
      overflow: visible;
    }
    /* Fixed/sticky columns must also have identical background colors and remain solid */
    :host ::ng-deep .ant-table-cell-fix-left,
    :host ::ng-deep .ant-table-cell-fix-right {
      background: #fff !important;
    }
    :host ::ng-deep .ant-table-thead > tr > th.ant-table-cell-fix-left,
    :host ::ng-deep .ant-table-thead > tr > th.ant-table-cell-fix-right {
      background: #fafafa !important;
    }
    /* Keep row hover effect uniform and beautiful */
    :host ::ng-deep .ant-table-tbody > tr:hover > td,
    :host ::ng-deep .ant-table-tbody > tr:hover > td.ant-table-cell-fix-left,
    :host ::ng-deep .ant-table-tbody > tr:hover > td.ant-table-cell-fix-right {
      background: #fafafa !important;
    }
    /* Vertical button layout with gap inside action columns */
    :host ::ng-deep .ant-table-cell-fix-right > div,
    :host ::ng-deep .ant-table-cell-fix-right .tot-btn-wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
    }
    .worker-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .handler-grid {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .handler-tag-item {
      display: flex;
      flex-direction: column;
      padding: 4px 8px;
      background: #f0f5ff;
      border: 1px solid #adc6ff;
      border-radius: 4px;
      font-size: 12px;
    }
    .h-name {
      font-weight: 600;
      color: #003a8c;
    }
    .m-name {
      color: #595959;
      font-family: monospace;
    }
    @media (max-width: 767px) {
      /* Keep standard display settings for overflow handling on small screens */
      :host ::ng-deep .ant-table-content {
        overflow-x: auto !important;
      }
      :host ::ng-deep .ant-table table {
        min-width: 768px;
      }
    }
  `]
})
export class TotTableComponent {
  @Input() data: any[] = [];
  @Input() columns: TotTableColumn[] = [];
  @Input() loading = false;
  @Input() total = 0;
  @Input() pageIndex = 1;
  @Input() pageSize = 10;
  @Input() title: string | TemplateRef<any> = '';
  @Input() extra: TemplateRef<any> | string | null | undefined = undefined;
  @Input() frontPagination = false;
  @Input() showPagination = true;
  @Input() nzSize: 'middle' | 'small' | 'default' = 'default';
  @Input() scroll: { x?: string | null; y?: string | null } = { x: null, y: null };
  @Input() expandTemplate: TemplateRef<any> | null = null;

  @Output() queryParamsChange = new EventEmitter<NzTableQueryParams>();
  @Output() expandChange = new EventEmitter<{ item: any; expanded: boolean }>();

  @ContentChildren(TotCellDirective) cellDirectives!: QueryList<TotCellDirective>;

  isActionColumn(col: TotTableColumn): boolean {
    const key = col.key?.toLowerCase();
    const title = col.title?.toLowerCase();
    return (
      key === 'action' ||
      key === 'actions' ||
      key === 'operation' ||
      key === 'operations' ||
      key === 'thao-tac' ||
      key === 'thaotac' ||
      title === 'hành động' ||
      title === 'thao tác' ||
      title === 'action' ||
      title === 'actions' ||
      title === 'operation' ||
      title === 'operations'
    );
  }

  get tableScroll(): { x?: string | null; y?: string | null } {
    if (this.scroll && this.scroll.x) {
      return this.scroll;
    }
    const hasSticky = this.columns.some(col => col.left || col.right || this.isActionColumn(col));
    if (hasSticky) {
      return { ...this.scroll, x: 'max-content' };
    }
    return this.scroll;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.queryParamsChange.emit(params);
  }

  getColTemplate(col: TotTableColumn): TemplateRef<any> | undefined {
    if (col.template) return col.template;
    if (!this.cellDirectives) return undefined;
    
    // 1. Exact match on key or title
    let directive = this.cellDirectives.find(d => 
      (!!col.key && d.columnKey === col.key) || 
      (!!col.title && d.columnKey === col.title)
    );
    
    // 2. Fallback: case-insensitive and trimmed match
    if (!directive) {
      const targetKey = col.key?.trim().toLowerCase();
      const targetTitle = col.title?.trim().toLowerCase();
      
      directive = this.cellDirectives.find(d => {
        const dk = d.columnKey?.trim().toLowerCase();
        return (!!targetKey && dk === targetKey) || (!!targetTitle && dk === targetTitle);
      });
    }
    
    return directive?.template;
  }

  getFieldValue(item: any, key?: string): any {
    if (!key) return '';
    const keys = key.split('.');
    let value = item;
    for (const k of keys) {
      if (value === null || value === undefined) return '';
      value = value[k];
    }
    return value;
  }

  onExpandChange(item: any, checked: boolean): void {
    item.expand = checked;
    this.expandChange.emit({ item, expanded: checked });
  }

  isString(val: any): boolean {
    return typeof val === 'string';
  }

  asTemplate(val: any): TemplateRef<any> {
    return val as TemplateRef<any>;
  }
}
