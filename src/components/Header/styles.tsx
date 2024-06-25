import { css, styled } from '@kuma-ui/core';

export const HeaderContainer = styled('header')`
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  z-index: 100;
  background: white;
  top: 0;
`;

export const NavHeader = styled('nav')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

export const logoNavHeaderStyles = css`
  padding: 0.5rem 0;
`;

export const loginNavHeaderStyles = css`
  color: #333;
  display: flex;
  align-items: center;

  &::after {
    content: '';
    display: inline-block;
    width: 14px;
    height: 17px;
    background: url('/assets/usuario.svg') no-repeat center center;
    margin-left: 0.5rem;
    position: relative;
    top: -1px;
  }
`;
