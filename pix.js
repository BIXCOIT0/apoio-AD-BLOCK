// Página Pix: copia o código copia e cola para a área de transferência.
document.getElementById('btn-copy-pix').addEventListener('click', async () => {
    const code = document.getElementById('pix-code');
    const feedback = document.getElementById('pix-copy-feedback');
    let copied = false;
    try {
        await navigator.clipboard.writeText(code.value);
        copied = true;
    } catch {
        code.select();
        try { copied = document.execCommand('copy'); } catch { copied = false; }
    }
    feedback.textContent = copied ? 'Código Pix copiado!' : 'Não foi possível copiar automaticamente — selecione o código e copie manualmente.';
});
