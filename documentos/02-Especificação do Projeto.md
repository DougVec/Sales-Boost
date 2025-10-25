# Especificação do Projeto

## Perfis de Usuários

<table>
<tbody>
<tr align=center>
<th colspan="2">Vendedor </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Profissional de vendas com experiência intermediária, responsável por realizar vendas e enviar propostas. </td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>Agilidade na criação de propostas.<br>Personalização de modelos de propostas.<br>Acesso rápido a informações de clientes e produtos.<br> Acompanhamento do status das propostas.<br>Geração de relatórios de desempenho para acompanhar suas vendas. </td>
</tr>
</tbody>
</table>


## Histórias de Usuários

| EU COMO... `QUEM`         | QUERO/PRECISO ... `O QUE`                                                                                                                                                                                                                        | PARA ... `PORQUE`                                                                                                                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vendedor                   | Montar um orçamento com condições de pagamentos tanto a vista quanto a prazo e consultar preço e estoque de um determinado produto                                                                                                               | Oferecer flexibilidade ao cliente, permitindo que ele escolha a opção que melhor se adapta a sua situação financeira. Além disso, consultar o preço e o estoque de um determinado produto é essencial para garantir que o orçamento seja preciso. |
| Vendedor                  | Cadastrar clientes com informações completas (nome, contato, endereço etc.)                                                                                                                                                                      | Manter um banco de dados organizado para facilitar a comunicação com o cliente                                                                                                                                                                    |
| Vendedor                  | Exportar orçamentos em PDF ou outros formatos                                                                                                                                                                                                    | Compartilhar facilmente com clientes ou colegas.                                                                                                                                                                                                  |
| Vendedor                  | Duplicar orçamentos já criados para clientes semelhantes                                                                                                                                                                                         | Economizar tempo ao criar propostas repetitivas                                                                                                                                                                                                   |
| Vendedor                  | Ter acesso a uma lista de produtos/serviços com preços atualizados                                                                                                                                                                               | Garantir que os orçamentos estejam sempre com valores corretos e com datas de validade e promoções em vigor                                                                                                                                       |                     |

## Requisitos do Projeto

### Requisitos Funcionais

| ID    | Descrição                                                                                                                                                              | Prioridade |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| RF-01 | A aplicação deverá ser responsiva permitindo a visualização em dispositivos diversos de forma adequada para todos os usuários.                                         | Alta       |
| RF-02 | A aplicação deve permitir ao usuário gerar e consultar orçamentos                                                                                                      | Alta       |
| RF-03 | A aplicação deve permitir ao usuário aplicar descontos e escolher a forma de pagamento                                                                                 | Alta       |
| RF-04 | O Sistema deve emitir um relatório de vendas indicando a data da compra, descrição do produto, quantidade vendida, valor unitário, valor total e desconto se aplicável | Alta       |
| RF-05 | A aplicação deve permitir ao usuário a replicação de orçamentos                                                                                                        | média      |
| RF-06 | A aplicação deve permitir a alteração do prazo de validade do orçamento                                                                                                | Média      |
| RF-07 | A aplicação deve permitir consulta e alteração de preços dos produtos em estoque                                                                                       | Alta       |
| RF-08 | A aplicação deve ter distinção entre os usuários com login e senha próprios                                                                                            | Baixa      |
| RF-09 | A aplicação deve permitir gerar e consultar vendas                                                                                                                     | Alta       |
| RF-10 | A Aplicação deve permitir cadastro de usuários e fornecedores                                                                                                          | Alta       |

\*\*Prioridade: Alta / Média / Baixa.

### Requisitos não Funcionais

| ID     | Descrição                                                                                                                           | Prioridade |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| RNF-01 | A aplicação deverá ser responsiva permitindo a visualização em dispositivos diversos de forma adequada para todos os usuários.      | Alta       |
| RNF-02 | O sistema deve ser capaz de gerar orçamentos em menos de 5 segundos, independentemente do número de itens incluídos.                | Alta       |
| RNF-03 | Os campos devem ter validação de dados para evitar erros de cadastros                                                               | Alta       |
| RNF-04 | As informações do cadastro de clientes devem apresentar opções de filtro.Exemplo: CPF, Nome e Telefone                              | Baixa      |
| RNF-05 | Os relatórios de venda devem ter a opção de ser gerados em extensões PDF, Excel e CSV                                               | Baixa      |
| RNF-06 | Consultas ao histórico de orçamentos e vendas devem ser realizadas em menos de 5 segundos                                           | Média      |
| RNF-07 | Deve ser possível adicionar novos produtos/serviços ao catálogo sem impactar o desempenho do sistema                                | Alta       |
| RNF-08 | Deve haver um sistema de busca com autocompletar para produtos, clientes e orçamentos anteriores                                    | Baixa      |
| RNF-09 | Deve ser possível exportar orçamentos em formatos como PDF, Excel e CSV.                                                            | Média      |
| RNF-10 | O sistema deve permitir o envio de orçamentos por e-mail diretamente da plataforma e integração com serviços como Gmail ou Outlook. | Alta       |

\*\*Prioridade: Alta / Média / Baixa.
