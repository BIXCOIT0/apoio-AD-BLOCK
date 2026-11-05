# Apoio ao PapaAnúncio / AdChomper

Página estática de doação voluntária via Pix, desenvolvida por Marco.elev.

[Abrir página de apoio](https://bixcoit0.github.io/apoio-AD-BLOCK/) · [Privacidade e suporte](https://github.com/BIXCOIT0/ad-block-privacy)

## Arquivos

- index.html: instruções, beneficiário, QR e código copia e cola.
- style.css: apresentação.
- pix.js: cópia por Clipboard API, com fallback de seleção/cópia manual.
- qr.svg: QR referenciado pela página.

A página não verifica pagamentos e não deve apresentar confirmação de doação com base em um clique.

## Prévia local

Execute `python3 -m http.server 8000` na raiz e abra http://localhost:8000. Interrompa com Ctrl+C. Clipboard pode depender das permissões e do contexto seguro do navegador; a alternativa manual deve continuar disponível.

## Verificações antes de publicar

1. Conferir QR, código e beneficiário com o responsável. Não realizar transferência para testar.
2. Verificar a cópia com permissão concedida/recusada e a alternativa manual.
3. Testar teclado, foco e feedback, telas de 320/375px e zoom 200%.
4. Confirmar que links e endereço público continuam funcionando.
5. Registrar commit testado e capturas; verificar configuração do GitHub Pages antes de assumir deploy automático.

## Alterar dados Pix

Mudança de chave, beneficiário ou código exige instrução explícita do responsável e nova conferência de coerência QR/copia e cola. Não inferir dados a partir de exemplos. Preservar a margem de leitura do QR e não editar apenas o texto enquanto mantém QR antigo.

## Publicação e recuperação

Preparar PR com resultado dos testes. Confirmar a origem de publicação em Settings → Pages. Após merge, verificar a página publicada. Em regressão de layout/script, reverter o commit e conferir a página; em problema de dados Pix, avisar o responsável e preservar o histórico.

## Escopo

Repositório público dedicado ao apoio. Não incluir código privado da extensão, diagnósticos de usuários, analytics ou backend de pagamento durante a organização documental.

## Testes automatizados

Execute `node scripts/test-support.cjs`: verifica CRC do Pix e cinco cenários simulados de Clipboard/fallback, sem transferência. No CI, ferramentas de teste são instaladas com versões explícitas fora dos arquivos publicados; `scripts/test-browser.cjs` abre apenas fixtures locais, decodifica o QR e compara com o campo exibido, verifica quatro larguras e zoom CSS 1x/2x e salva capturas.

O workflow de validação não publica a página. Zoom CSS não substitui teste de zoom real do navegador nem leitor de tela. A conferência de beneficiário pelo responsável continua necessária. QR/code iguais não provam identidade do destinatário.
