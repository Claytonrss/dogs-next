import { describe, expect, it, vi } from 'vitest';
import { type_second } from './fonts';

vi.mock('next/font/google', () => ({
  Spectral: vi.fn().mockImplementation((config) => ({
    ...config,
  })),
}));

describe('fonts', () => {
  it('Deve carregar a fonte corretamente', () => {
    expect(type_second).toBeDefined();
    expect(type_second).toHaveProperty('subsets', ['latin']);
    expect(type_second).toHaveProperty('weight', '700');
    expect(type_second).toHaveProperty('variable', '--type-second-spectral');
    expect(type_second).toHaveProperty('display', 'swap');
  });
});
