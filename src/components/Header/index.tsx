import Image from 'next/image';
import Link from 'next/link';
import {
  HeaderContainer,
  loginNavHeaderStyles,
  logoNavHeaderStyles,
  NavHeader,
} from './styles';

export function Header() {
  const user = true;

  return (
    <HeaderContainer>
      <NavHeader className="container">
        <Link className={logoNavHeaderStyles} href="/" aria-label="Dogs - Home">
          <Image
            src="/assets/dogs.svg"
            alt="Dogs - Home"
            width={28}
            height={22}
            priority
          />
        </Link>
        {user ? (
          <Link
            className={loginNavHeaderStyles}
            href="/conta"
            data-testid="link-to-account"
          >
            Dogs
          </Link>
        ) : (
          <Link className={loginNavHeaderStyles} href="/login">
            Login / Criar
          </Link>
        )}
      </NavHeader>
    </HeaderContainer>
  );
}
