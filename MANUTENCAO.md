# Manutenção da página de apoio

## Escopo

Página pública de apoio voluntário por Pix do PapaAnúncio / AdChomper. Responsável pelo produto e dados de pagamento: Marco.elev. Não há backend de cobrança, confirmação automática de pagamento ou código privado da extensão neste repositório.

## Fonte e prévia

index.html contém as instruções e o copia e cola; qr.svg é o QR; style.css define a apresentação; pix.js implementa cópia e alternativa manual.

```sh
python3 -m http.server 8000
node scripts/test-support.cjs
```

Acesse localhost:8000 para a prévia e encerre o servidor com Ctrl+C. Não enviar dinheiro para testar.

## CI e publicação

[validate.yml](.github/workflows/validate.yml) roda em PR/push na main. Confere CRC do Pix e cinco cenários de Clipboard/fallback. O teste de navegador usa Playwright 1.56.1 e jsqr 1.4.0, compara QR decodificado ao texto e verifica largura/zoom CSS/teclado em fixtures locais. Capturas ficam por 14 dias.

GitHub Pages está habilitado; a página é [bixcoit0.github.io/apoio-AD-BLOCK](https://bixcoit0.github.io/apoio-AD-BLOCK/). O workflow de validação e o deploy Pages são execuções distintas. Depois de integrar um PR, conferir o resultado do Pages e o endereço publicado; CI verde sozinha não comprova deploy. A origem de publicação pode ser conferida em Settings → Pages.

## Alterações

- Layout/script: branch curta, PR, testes, conferir cópia manual, foco e QR proporcional, integrar e verificar Pages.
- Chave/beneficiário/QR: somente com instrução explícita do responsável; alterar os dados coerentemente e repetir CRC/decodificação e conferência no banco.
- Abrir a página/copiar o código não prova uma doação. O aceite manual anterior se aplica aos dados então testados; qualquer mudança exige nova conferência.
- Manter a URL consumida pela extensão e preservar a margem branca do QR.
- Branches de trabalho encerradas podem ser removidas quando incorporadas à main; as referências antigas foram preservadas por tag.

## Recuperação

Reverter o commit que causou a regressão por um novo PR e repetir a validação. Conferir o deploy do revert e a página pública. Em inconsistência de pagamento, preservar os dados anteriores e avisar o responsável; não substituir por uma chave de exemplo. Manter privados diagnósticos, credenciais e dados pessoais de visitantes.
