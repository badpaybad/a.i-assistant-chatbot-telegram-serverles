import { Directive, Input, TemplateRef, ViewContainerRef, inject, Renderer2, ElementRef, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[totClaimCheck]',
  standalone: true
})
export class TotClaimDirective implements OnDestroy, OnInit {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private authService = inject(AuthService);
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);
  private sanitizer = inject(DomSanitizer);

  private claims: string | string[] = [];
  private mode: 'OR' | 'AND' = 'OR';
  private hideOnly = false;
  private denialEl: HTMLElement | null = null;
  private claimsSubscription?: Subscription;

  @Input() set totClaimCheck(value: string | string[]) {
    this.claims = value;
    this.updateView();
  }

  @Input() set totClaimCheckMode(value: 'OR' | 'AND') {
    this.mode = value;
    this.updateView();
  }

  @Input() set totClaimCheckHide(value: boolean | string) {
    this.hideOnly = value === '' || value === true || value === 'true';
    this.updateView();
  }

  constructor() {}

  ngOnInit() {
    this.claimsSubscription = this.authService.claimsUpdated$.subscribe(() => {
      this.updateView();
    });
  }

  private updateView() {
    this.viewContainer.clear();
    this.removeDenialMessage();

    if (this.authService.hasClaim(this.claims, this.mode)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!this.hideOnly) {
      this.renderDenialMessage();
    }
  }

  private renderDenialMessage() {
    const claimsArray = Array.isArray(this.claims) ? this.claims.filter(c => !!c) : (this.claims ? [this.claims] : []);
    const claimListStr = claimsArray.length > 0 ? claimsArray.join(', ') : 'Yêu cầu đăng nhập';
    
    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, 'claim-denied-message');
    this.renderer.setStyle(div, 'padding', '12px');
    this.renderer.setStyle(div, 'border', '1px solid #ffa39e');
    this.renderer.setStyle(div, 'background-color', '#fff1f0');
    this.renderer.setStyle(div, 'color', '#cf1322');
    this.renderer.setStyle(div, 'border-radius', '8px');
    this.renderer.setStyle(div, 'margin', '8px');
    this.renderer.setStyle(div, 'box-shadow', '0 2px 4px rgba(0,0,0,0.05)');
    
    const rawHtml = `
      <div style="display: flex; align-items: flex-start; gap: 10px;">
        <span style="font-size: 18px;">🚫</span>
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 14px; margin-bottom: 2px;">Truy cập bị hạn chế</div>
          <div style="font-size: 12px; line-height: 1.4;">
            ${claimsArray.length > 0 
              ? `Thiếu quyền: <code style="background: white; padding: 1px 4px; border-radius: 3px; border: 1px solid #ffccc7;">${claimListStr}</code>` 
              : 'Vui lòng đăng nhập để sử dụng tính năng này.'}
          </div>
          <div style="margin-top: 6px; font-size: 12px;">
            <a href="/auth/login" style="color: #1890ff; font-weight: 600; text-decoration: underline;">Đăng nhập ngay</a>
          </div>
        </div>
      </div>
    `;
    
    div.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(rawHtml)) || '';

    const anchor = this.el.nativeElement;
    const parent = this.renderer.parentNode(anchor);
    
    if (parent && parent.tagName === 'UL') {
      const li = this.renderer.createElement('li');
      this.renderer.setStyle(li, 'list-style', 'none');
      this.renderer.appendChild(li, div);
      this.renderer.insertBefore(parent, li, anchor);
      this.denialEl = li;
    } else if (parent) {
      this.renderer.insertBefore(parent, div, anchor);
      this.denialEl = div;
    }
  }

  private removeDenialMessage() {
    if (this.denialEl) {
      const parent = this.renderer.parentNode(this.denialEl);
      if (parent) {
        this.renderer.removeChild(parent, this.denialEl);
      }
      this.denialEl = null;
    }
  }

  ngOnDestroy() {
    this.removeDenialMessage();
    this.claimsSubscription?.unsubscribe();
  }
}
