# Back-end VNW

Este repositório contém anotações e desafios desenvolvidos durante o curso de Back-end do Vai na Web. Está organizado em pastas para facilitar a navegação e execução de cada módulo ou desafio de forma independente.

## Estrutura de Pastas

- **`desafios/`**: Contém os desafios práticos do curso, cada um em seu próprio subdiretório. Isso permite executar e testar cada desafio separadamente sem interferir nos outros projetos.
  - **`cadastro_medicos_dentistas/`**: API para cadastro de médicos e dentistas voluntários, desenvolvida com Node.js e Express.
- **`fundamentos/`**: Arquivos relacionados aos fundamentos do node com express, como estrutura básica e middlewares.

## Como Usar

Para executar um desafio específico, navegue até o diretório correspondente e siga as instruções no README.md de cada pasta. Por exemplo, para o desafio de cadastro de médicos e dentistas:

```
pnpm run desafio:cadastro_medico
```

Ou diretamente:

```
node desafios/cadastro_medicos_dentistas/server.js
```

## Perguntas e Respostas

**Por que usar essa estrutura de pastas?**

Este repositório faz parte de um curso e está organizado em subpastas para armazenar os desafios passados. Cada desafio fica em seu próprio diretório dentro de `desafios/`, facilitando a organização, manutenção e execução individual de cada projeto sem interferir nos outros.