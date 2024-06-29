'use client';
import login from '@/actions/login';
import ButtonForm from '@/components/Forms/Button';
import { useFormState } from 'react-dom';

export default function LoginForm() {
  const [state, action] = useFormState(login, {
    ok: false,
    error: null,
    data: null,
  });

  return (
    <>
      <form action={action} data-testid="login-form">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="usuario"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="senha"
        />
        <ButtonForm>Login</ButtonForm>
      </form>
      {state.error && <p>{state.error}</p>}
    </>
  );
}
