import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LoginLayout from './layout';

describe('<LoginLayout />', () => {
  it('Deve renderizar o layout corretamente', async () => {
    render(await LoginLayout({ children: <div>Test Child</div> }));

    const childElement = screen.getByText('Test Child');
    expect(childElement).toBeInTheDocument();
  });
});
