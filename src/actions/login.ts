'use server';

import { apiError } from '@/functions/api-error';
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

    const loginURL = `${API_URL}/jwt-auth/v1/token`;

    const response = await fetch(loginURL, {
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
      throw new Error('Senha ou usuário inválidos');
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
    return apiError(error);
  }
}
