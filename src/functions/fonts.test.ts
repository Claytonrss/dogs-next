import { expect, test, vi } from 'vitest';
import { type_second } from './fonts';

vi.mock('next/font/google', () => ({
  Spectral: vi.fn().mockImplementation((config) => ({
    ...config,
  })),
}));

test('type_second font configuration', () => {
  expect(type_second).toBeDefined();
  expect(type_second).toHaveProperty('subsets', ['latin']);
  expect(type_second).toHaveProperty('weight', '700');
  expect(type_second).toHaveProperty('variable', '--type-second-spectral');
  expect(type_second).toHaveProperty('display', 'swap');
});
