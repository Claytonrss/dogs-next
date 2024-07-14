import Image from 'next/image';
import { FooterContainer } from './styles';

export function Footer() {
  return (
    <FooterContainer>
      <Image
        src="/assets/dogs-footer.svg"
        alt="Dogs - Home"
        width={28}
        height={22}
      />
      <p>Dogs. Alguns direitos reservados.</p>
    </FooterContainer>
  );
}
