import { describe, it, expect } from 'vitest';
import { SUPPORTED_DEVICES } from '../src/components/preview/DeviceEmulator';

describe('Security & Defensive Access Control Audit', () => {
  it('SEC-1: Customer app has zero admin mode switchers or triggers', async () => {
    // Read BurgundyInteractiveApp module source or verify exported types
    const fs = await import('fs');
    const path = await import('path');
    const appSource = fs.readFileSync(
      path.resolve(__dirname, '../src/components/burgundy-app/BurgundyInteractiveApp.tsx'),
      'utf-8'
    );

    // Ensure no setAppMode or appMode state exists in the customer component
    expect(appSource).not.toContain("setAppMode('admin')");
    expect(appSource).not.toContain("setAppMode('customer')");
    expect(appSource).not.toContain("setAppMode");
    expect(appSource).not.toContain("<AdminApp");
    expect(appSource).not.toContain("Switch to Admin CRM");
    expect(appSource).not.toContain("دخول لوحة الإدارة");
  });

  it('SEC-2: Secret Admin Portal route exists and delegates authentication to secure server API', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const portalSource = fs.readFileSync(
      path.resolve(__dirname, '../src/app/[lang]/atelier-portal/page.tsx'),
      'utf-8'
    );
    const serverAuthSource = fs.readFileSync(
      path.resolve(__dirname, '../src/lib/server/auth/session.ts'),
      'utf-8'
    );

    // Verify Master PIN is NOT leaked in client source
    expect(portalSource).not.toContain("const MASTER_PIN = '9740'");
    expect(portalSource).toContain("fetch('/api/atelier/auth'");

    // Verify Server enforces timing-safe PIN check and brute-force lockout constants
    expect(serverAuthSource).toContain("crypto.timingSafeEqual");
    expect(serverAuthSource).toContain("MAX_ATTEMPTS = 5");
    expect(serverAuthSource).toContain("LOCKOUT_MS = 5 * 60 * 1000");
  });

  it('SEC-3: Public /admin route does not display open dashboard and redirects to home', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const adminRouteSource = fs.readFileSync(
      path.resolve(__dirname, '../src/app/[lang]/admin/page.tsx'),
      'utf-8'
    );

    // Should redirect unauthenticated attempts
    expect(adminRouteSource).toContain('redirect(');
  });
});

describe('Multi-Device Responsive Matrix UI/UX Verification', () => {
  it('calibrates all 5 required flagship devices with pixel-accurate viewports', () => {
    const deviceIds = SUPPORTED_DEVICES.map((d) => d.id);
    expect(deviceIds).toContain('iphone-17-pro-max');
    expect(deviceIds).toContain('iphone-18');
    expect(deviceIds).toContain('s24-ultra');
    expect(deviceIds).toContain('pixel-9');
    expect(deviceIds).toContain('pixel-9-pro-max');

    // 1. iPhone 17 Pro Max
    const iphone17 = SUPPORTED_DEVICES.find((d) => d.id === 'iphone-17-pro-max')!;
    expect(iphone17.width).toBe(440);
    expect(iphone17.height).toBe(956);
    expect(iphone17.cameraType).toBe('dynamic-island');
    expect(iphone17.safeAreaBottom).toBe(34);

    // 2. iPhone 18 (Standard)
    const iphone18 = SUPPORTED_DEVICES.find((d) => d.id === 'iphone-18')!;
    expect(iphone18.width).toBe(393);
    expect(iphone18.height).toBe(852);
    expect(iphone18.cameraType).toBe('dynamic-island');
    expect(iphone18.safeAreaBottom).toBe(34);

    // 3. Samsung Galaxy S24 Ultra
    const s24Ultra = SUPPORTED_DEVICES.find((d) => d.id === 's24-ultra')!;
    expect(s24Ultra.width).toBe(412);
    expect(s24Ultra.height).toBe(915);
    expect(s24Ultra.cameraType).toBe('punch-hole');
    expect(s24Ultra.borderRadius).toBe('rounded-[14px]'); // Sharp Ultra corners

    // 4. Google Pixel 9
    const pixel9 = SUPPORTED_DEVICES.find((d) => d.id === 'pixel-9')!;
    expect(pixel9.width).toBe(412);
    expect(pixel9.height).toBe(924);
    expect(pixel9.cameraType).toBe('punch-hole');
    expect(pixel9.safeAreaBottom).toBe(24);

    // 5. Google Pixel 9 Pro Max / XL
    const pixel9ProMax = SUPPORTED_DEVICES.find((d) => d.id === 'pixel-9-pro-max')!;
    expect(pixel9ProMax.width).toBe(448);
    expect(pixel9ProMax.height).toBe(996);
    expect(pixel9ProMax.cameraType).toBe('punch-hole');
    expect(pixel9ProMax.safeAreaBottom).toBe(24);
  });

  it('ensures safe-area bottom clearances exceed minimum mobile navigation height', () => {
    SUPPORTED_DEVICES.forEach((device) => {
      // Bottom navigation requires clearance above the hardware home indicator
      expect(device.safeAreaBottom).toBeGreaterThanOrEqual(24);
      expect(device.safeAreaTop).toBeGreaterThanOrEqual(40);
    });
  });

  it('validates typography hierarchy tokens across responsive viewports', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const tailwindConfig = fs.readFileSync(
      path.resolve(__dirname, '../tailwind.config.ts'),
      'utf-8'
    );

    // Verify font family registrations
    expect(tailwindConfig).toContain('amiri:');
    expect(tailwindConfig).toContain('almarai:');
    expect(tailwindConfig).toContain('cormorant:');
    expect(tailwindConfig).toContain('jakarta:');
  });
});
