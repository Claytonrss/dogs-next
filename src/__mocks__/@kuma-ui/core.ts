
import React, {
  ComponentType,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import { vi } from "vitest";

// Interface que estende o tipo ForwardRefExoticComponent e adiciona uma propriedade opcional 'styles'
interface StyledComponentProps
  extends ForwardRefExoticComponent<RefAttributes<any>> {
  styles?: string;
}

// Mock do `@kuma-ui/core`
vi.mock("@kuma-ui/core", () => {
  // Função styled mockada
  const styled = <T extends ComponentType<any>>(component: T) => {
    // Retorna uma função que aceita template literals e cria um componente React válido
    return (
      strings: TemplateStringsArray,
      ...expressions: any[]
    ): StyledComponentProps => {
      // Cria um componente estilizado com `React.forwardRef` e associa as propriedades recebidas
      const StyledComponent = React.forwardRef((props, ref) =>
        React.createElement(component, { ...props, ref })
      ) as StyledComponentProps;

      // Adiciona um nome de exibição (displayName) ao componente para facilitar a depuração
      StyledComponent.displayName = `Styled(${
        typeof component === "string"
          ? component
          : component.displayName || component.name || "Component"
      })`;

      // Adiciona a propriedade 'styles' ao componente
      StyledComponent.styles = strings.join("") + expressions.join("");

      return StyledComponent;
    };
  };

  // Retorna os mocks das funções 'styled' e 'css'
  return {
    styled,
    css: () => "", // Mock da função 'css' retornando uma string vazia
  };
});
