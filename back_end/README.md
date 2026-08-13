# Orbe Back-end

Backend Java 21 sem framework, organizado em camadas e preparado para MySQL via JDBC.

## Estrutura

- `model`: as 12 entidades persistidas como classes Java tradicionais;
- `dao`: `GenericDao<T, ID>` e contratos especializados;
- `service`: regras de negócio e transações;
- `controller`: camada de entrada, independente do protocolo HTTP;
- `dto`: objetos de entrada e saída;
- `config`: conexão e propriedades;
- `exception`: erros de domínio e persistência;
- `resources/db/migration`: schema SQL versionado.

## Configuração

Variáveis de ambiente:

```text
ORBE_DB_URL=jdbc:mysql://localhost:3306/orbe?useSSL=false&serverTimezone=America/Sao_Paulo
ORBE_DB_USER=root
ORBE_DB_PASSWORD=sua_senha
```

Os models seguem o padrão JavaBeans, com atributos privados, construtor vazio, getters e setters. Os `record` são usados somente nos DTOs imutáveis.

O frontend não deve acessar os models diretamente. Controllers recebem DTOs, services aplicam regras e DAOs persistem os models.
