'use server';

import { API_URL } from '@/utils/constants';
import { cookies } from 'next/headers';

type FormStateProps = {
  ok: boolean;
  error: string | null;
  data: {
    token: string;
  } | null;
};

export default async function login(
  state: FormStateProps,
  formData: FormData,
): Promise<FormStateProps> {
  try {
    const username = formData.get('username');
    const password = formData.get('password');

    if (!username || !password) {
      throw new Error('Todos os campos devem ser preenchidos');
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Falha ao realizar login');
    }

    const { token = '' } = await response.json();

    if (!token) {
      throw new Error('Falha ao obter o token');
    }

    cookies().set('token', token);

    return {
      ok: true,
      error: null,
      data: {
        token,
      },
    };
  } catch (error) {
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
}
