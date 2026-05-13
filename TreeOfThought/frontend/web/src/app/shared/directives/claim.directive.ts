import { Directive, Input, TemplateRef, ViewContainerRef, inject, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Directive({
  selector: '[appClaim]',
  standalone: true
})
export class ClaimDirective implements OnDestroy {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private authService = inject(AuthService);
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  private claims: string | string[] = [];
  private mode: 'OR' | 'AND' = 'OR';
  private denialEl: HTMLElement | null = null;

  @Input() set appClaim(value: string | string[]) {
    this.claims = value;
    this.updateView();
  }

  @Input() set appClaimMode(value: 'OR' | 'AND') {
    this.mode = value;
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear();
    this.removeDenialMessage();

    if (this.authService.hasClaim(this.claims, this.mode)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.renderDenialMessage();
    }
  }

  private renderDenialMessage() {
    const claimsArray = Array.isArray(this.claims) ? this.claims : [this.claims];
    const claimListStr = claimsArray.join(', ');
    const parent = this.renderer.parentNode(this.el.nativeElement);

    if (!parent) return;

    this.denialEl = this.renderer.createElement('div');
    this.renderer.addClass(this.denialEl, 'claim-denied-message');
    
    // Premium styling for the denial message
    this.renderer.setStyle(this.denialEl, 'padding', '16px');
    this.renderer.setStyle(this.denialEl, 'border', '1px solid #ffa39e');
    this.renderer.setStyle(this.denialEl, 'background-color', '#fff1f0');
    this.renderer.setStyle(this.denialEl, 'color', '#cf1322');
    this.renderer.setStyle(this.denialEl, 'border-radius', '8px');
    this.renderer.setStyle(this.denialEl, 'margin', '12px 0');
    this.renderer.setStyle(this.denialEl, 'font-family', 'inherit');
    this.renderer.setStyle(this.denialEl, 'font-size', '14px');
    this.renderer.setStyle(this.denialEl, 'line-height', '1.5');
    this.renderer.setStyle(this.denialEl, 'box-shadow', '0 2px 8px rgba(0,0,0,0.05)');

    this.denialEl!.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 12px;">
        <span style="font-size: 20px; line-height: 1;">🚫</span>
        <div>
          <div style="font-weight: 600; margin-bottom: 4px; font-size: 15px;">Truy cập bị hạn chế</div>
          <p style="margin: 0 0 8px 0;">Bạn không có quyền truy cập tính năng. Bạn cần các quyền sau: <code style="background: #fff; padding: 2px 6px; border-radius: 4px; border: 1px solid #ffccc7; font-weight: 600;">${claimListStr}</code> để có thể truy cập tính năng.</p>
          <p style="margin: 0 0 8px 0;">Vui lòng liên hệ với quản trị viên để yêu cầu cấp quyền.</p>
          <p style="margin: 0;">Để login <a href="/auth/login" style="color: #1890ff; font-weight: 600; text-decoration: underline;">click vào đây để login</a>.</p>
        </div>
      </div>
    `;

    this.renderer.insertBefore(parent, this.denialEl, this.renderer.nextSibling(this.el.nativeElement));
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
  }
}

