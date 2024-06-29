import { FormsWrapper, LoginWrapper } from './styles';

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoginWrapper>
      <FormsWrapper>{children}</FormsWrapper>
    </LoginWrapper>
  );
}
