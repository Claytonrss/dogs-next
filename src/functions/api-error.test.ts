import { describe, it, expect } from 'vitest';
import { apiError } from './api-error';

describe('api-error', () => {
  it('deve retornar mensagem de erro quando o erro é uma instância de Error', () => {
    const error = new Error('Teste de erro');
    const result = apiError(error);
    expect(result).toEqual({
      ok: false,
      error: 'Teste de erro',
      data: null,
    });
  });

  it('deve retornar "Erro desconhecido" quando o erro não é uma instância de Error', () => {
    const error = 'Erro não identificado';
    const result = apiError(error);
    expect(result).toEqual({
      ok: false,
      error: 'Erro desconhecido',
      data: null,
    });
  });

  it('deve retornar "Erro desconhecido" quando o erro é null', () => {
    const error = null;
    const result = apiError(error);
    expect(result).toEqual({
      ok: false,
      error: 'Erro desconhecido',
      data: null,
    });
  });

  it('deve retornar "Erro desconhecido" quando o erro é undefined', () => {
    const error = undefined;
    const result = apiError(error);
    expect(result).toEqual({
      ok: false,
      error: 'Erro desconhecido',
      data: null,
    });
  });
});
