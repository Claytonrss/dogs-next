import { describe, it, expect, vi, Mock } from 'vitest';
import login from './login';

global.fetch = vi.fn();
const mockCookiesSet = vi.fn();

vi.mock('next/headers', () => ({
  cookies: () => ({
    set: mockCookiesSet,
  }),
}));

describe('login', () => {
  it('deve realizar login com sucesso', async () => {
    const mockFormData = new FormData();

    mockFormData.set('username', 'dog');
    mockFormData.set('password', 'dog');

    const mockResponse = {
      ok: true,
      json: async () => ({ token: 'fakeToken' }),
    };

    (global.fetch as Mock).mockResolvedValueOnce(mockResponse);

    const state = { ok: false, error: null, data: null };
    const result = await login(state, mockFormData);

    expect(result).toEqual({
      ok: true,
      error: null,
      data: {
        token: 'fakeToken',
      },
    });
    expect(mockCookiesSet).toHaveBeenCalledWith('token', 'fakeToken');
  });

  it('deve retornar erro ao não preencher os campos', async () => {
    const mockFormData = new FormData();

    const state = { ok: false, error: null, data: null };
    const result = await login(state, mockFormData);

    expect(result).toEqual({
      ok: false,
      error: 'Todos os campos devem ser preenchidos',
      data: null,
    });
  });

  it('deve retornar erro ao falhar no login', async () => {
    const mockFormData = new FormData();
    mockFormData.set('username', 'dog');
    mockFormData.set('password', 'noDog');

    const mockResponse = {
      ok: false,
    };

    (global.fetch as Mock).mockResolvedValueOnce(mockResponse);

    const state = { ok: false, error: null, data: null };
    const result = await login(state, mockFormData);

    expect(result).toEqual({
      ok: false,
      error: 'Falha ao realizar login',
      data: null,
    });
  });

  it('deve retornar erro ao não obter o token', async () => {
    const mockFormData = new FormData();
    mockFormData.set('username', 'dog');
    mockFormData.set('password', 'dog');

    const mockResponse = {
      ok: true,
      json: async () => ({}),
    };

    (global.fetch as Mock).mockResolvedValueOnce(mockResponse);

    const state = { ok: false, error: null, data: null };
    const result = await login(state, mockFormData);

    expect(result).toEqual({
      ok: false,
      error: 'Falha ao obter o token',
      data: null,
    });
  });

  it('deve retornar erro desconhecido', async () => {
    const mockFormData = new FormData();
    mockFormData.set('username', 'dog');
    mockFormData.set('password', 'dog');

    (global.fetch as Mock).mockRejectedValueOnce(
      new Error('Erro desconhecido'),
    );

    const state = { ok: false, error: null, data: null };
    const result = await login(state, mockFormData);

    expect(result).toEqual({
      ok: false,
      error: 'Erro desconhecido',
      data: null,
    });
  });
});
