# Trabalho na página pública de apoio

Página estática index.html/style.css/pix.js, com QR e copia e cola. Não incluir código privado da extensão, logs de usuários ou analytics.

- Preservar a URL pública usada pela extensão.
- Não alterar chave/beneficiário/Pix sem instrução explícita aplicável do responsável. Conferir coerência QR/código; não realizar transferência para testar.
- Abrir página ou copiar código não confirma pagamento.
- Prévia: python3 -m http.server 8000. Testar clipboard permitido, recusado/ausente e cópia manual.
- Testar teclado, foco, feedback, viewport 320/375px e zoom 200%.
- Não remover a margem de leitura do QR nem deformar sua proporção.
- Conferir configuração Pages antes de assumir deploy. Preparar PR com resultado e rollback.
- Mudanças reversíveis de documentação/layout seguem a tarefa autorizada; publicação e dados de pagamento têm escopo próprio.
