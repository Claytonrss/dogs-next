import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FaviconChanger from '.';

function createMockMatchMedia(initialMatches: boolean) {
  let matches = initialMatches;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();

  const mediaQueryList: MediaQueryList & {
    simulateChange: (newMatches: boolean) => void;
  } = {
    matches,
    media: '',
    onchange: null,
    addEventListener: vi.fn((event, listener) => {
      if (event === 'change') {
        listeners.add(listener as (event: MediaQueryListEvent) => void);
      }
    }),
    removeEventListener: vi.fn((event, listener) => {
      if (event === 'change') {
        listeners.delete(listener as (event: MediaQueryListEvent) => void);
      }
    }),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    simulateChange(newMatches: boolean) {
      matches = newMatches;
      Object.defineProperty(this, 'matches', {
        get: () => matches,
        configurable: true,
      });
      listeners.forEach((listener) => {
        listener({ matches: newMatches } as MediaQueryListEvent);
      });
    },
  };

  return mediaQueryList;
}

describe('Componente FaviconChanger', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  it('define o favicon com base na preferência inicial do esquema de cores', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => {
      return createMockMatchMedia(query === '(prefers-color-scheme: dark)');
    });

    const linkElement = document.createElement('link');
    linkElement.id = 'favicon-link';
    linkElement.href = '/other-favicon.ico';
    document.head.appendChild(linkElement);

    render(<FaviconChanger />);

    expect(linkElement.href).toContain('/favicon-dark.ico');
  });

  it('atualiza o favicon quando a preferência do esquema de cores muda', () => {
    const mockMediaQueryList = createMockMatchMedia(true);
    window.matchMedia = vi.fn().mockImplementation(() => mockMediaQueryList);

    const linkElement = document.createElement('link');
    linkElement.id = 'favicon-link';
    linkElement.href = 'other-favicon.ico';
    document.head.appendChild(linkElement);

    render(<FaviconChanger />);

    mockMediaQueryList.simulateChange(false);
    const expectedUrl = new URL('/favicon-light.ico', window.location.href)
      .href;
    expect(linkElement.href).toBe(expectedUrl);
  });

  it('remove o listener de evento ao desmontar', () => {
    const mockMediaQueryList = createMockMatchMedia(true);
    window.matchMedia = vi.fn().mockImplementation(() => mockMediaQueryList);

    const linkElement = document.createElement('link');
    linkElement.id = 'favicon-link';
    linkElement.href = 'other-favicon.ico';
    document.head.appendChild(linkElement);

    const { unmount } = render(<FaviconChanger />);

    unmount();

    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });
});
