'use client';
import { useFormState } from 'react-dom';
import { ButtonForm } from '@/components/forms/button';
import login from '@/actions/login';
import { Input } from '@/components/input';

export function LoginForm() {
  const [state, action] = useFormState(login, {
    ok: false,
    error: null,
    data: null,
  });

  return (
    <>
      <form action={action} data-testid="login-form">
        <Input label="Usu&#xe1;rio" type="text" name="username" id="username" />
        <Input label="Senha" type="password" name="password" id="password" />
        <ButtonForm>Login</ButtonForm>
      </form>
      {state.error && <p>{state.error}</p>}
    </>
  );
}
