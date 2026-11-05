'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const path=require('node:path');process.chdir(path.resolve(__dirname,'..'));
const html=fs.readFileSync('index.html','utf8'),script=fs.readFileSync('pix.js','utf8');
const code=html.match(/<textarea[^>]*id="pix-code"[^>]*>([^<]+)<\/textarea>/)[1];
// CRC-16/CCITT-FALSE: verify Pix structure without printing payment data.
assert.match(code,/6304[0-9A-F]{4}$/);let crc=0xffff;
for(const b of Buffer.from(code.slice(0,-4))){crc^=b<<8;for(let i=0;i<8;i++)crc=((crc<<1)^((crc&0x8000)?0x1021:0))&0xffff;}
assert.equal(crc.toString(16).toUpperCase().padStart(4,'0'),code.slice(-4));
(async()=>{
for(const mode of ['success','denied','absent','manual','fallbackThrows']){
 let click,writes=0,selected=0,fallback=0;
 const field={value:code,select(){selected++;}},feedback={textContent:''};
 const navigator=mode==='absent'?{}:{clipboard:{async writeText(value){writes++;assert.equal(value,code);if(mode!=='success')throw Error('denied');}}};
 const document={getElementById:id=>id==='btn-copy-pix'?{addEventListener:(event,fn)=>{assert.equal(event,'click');click=fn;}}:id==='pix-code'?field:feedback,
 execCommand(action){fallback++;assert.equal(action,'copy');if(mode==='fallbackThrows')throw Error('unsupported');return mode!=='manual';}};
 vm.runInNewContext(script,{navigator,document});
 // Each scenario awaits the real async event handler.
 await click();assert.ok(feedback.textContent);assert.equal(selected,mode==='success'?0:1);assert.equal(fallback,mode==='success'?0:1);
 assert.equal(feedback.textContent.includes('copiado!'),!['manual','fallbackThrows'].includes(mode));
}
console.log('PASS Pix CRC and five clipboard/fallback cases (synthetic APIs; no transfer).');
})().catch(e=>{console.error(e);process.exitCode=1;});
