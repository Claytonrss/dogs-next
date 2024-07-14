export function apiError(error: unknown): {
  data: null;
  error: string;
  ok: false;
} {
  if (error instanceof Error) {
    return {
      ok: false,
      error: error.message,
      data: null,
    };
  }
  return {
    ok: false,
    error: 'Erro desconhecido',
    data: null,
  };
}
