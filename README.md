# SORO Lanches — Cardápio digital

Primeira versão de um cardápio digital responsivo feito com HTML, CSS e JavaScript puro.

## Funcionalidades

- Categorias para cachorro-quente prensado, lanches prensados, pizzas, pizzas doces, sucos naturais e bebidas.
- Busca de produtos.
- Carrinho com controle de quantidade.
- Montagem de pedido para envio pelo WhatsApp.
- Área do responsável para adicionar, editar, ocultar e excluir produtos, cadastrar preços e configurar o WhatsApp.
- Exportação de backup do cardápio em JSON.

## Como executar

Abra o arquivo `index.html` em um navegador moderno. Também é possível publicar os arquivos em uma hospedagem estática, como GitHub Pages.

## Importante sobre as atualizações

Esta versão utiliza `localStorage`: alterações no cardápio e no contato ficam salvas somente no navegador e dispositivo em que foram feitas. A área de edição ainda não tem autenticação e serve como protótipo local. Para que o responsável atualize os produtos uma vez e todos os clientes vejam as mudanças em seus celulares, será necessário integrar uma base de dados e autenticação (por exemplo, Supabase ou Firebase).

Os preços estão inicialmente em branco para serem preenchidos depois. O WhatsApp também precisa ser configurado na Área do responsável antes de usar o botão de envio de pedido.
