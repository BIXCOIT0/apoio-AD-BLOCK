'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage();
  await page.route('**/*',async route=>{
   const u=new URL(route.request().url());if(u.origin!=='https://support.test')throw Error('Unexpected external request');
   const name=u.pathname==='/'?'index.html':u.pathname.slice(1);
   if(!['index.html','style.css','pix.js','qr.svg'].includes(name))return route.fulfill({status:404,body:''});
   const type=name.endsWith('.svg')?'image/svg+xml':name.endsWith('.css')?'text/css':name.endsWith('.js')?'text/javascript':'text/html';
   await route.fulfill({status:200,contentType:type,body:await fs.readFile(path.join(root,name))});
  });
  await page.goto('https://support.test/');await page.locator('img').evaluate(img=>img.decode());
  await page.addScriptTag({path:require.resolve('jsqr')});
  const coherent=await page.evaluate(()=>{const img=document.querySelector('img'),c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);const data=ctx.getImageData(0,0,c.width,c.height);return window.jsQR(data.data,c.width,c.height)?.data===document.querySelector('#pix-code').value;});
  assert.equal(coherent,true,'QR must decode to the exact displayed code');
  await fs.mkdir(path.join(root,'test-results'),{recursive:true});
  for(const width of [320,375,768,1440])for(const zoom of [1,2]){
   await page.setViewportSize({width,height:900});await page.evaluate(z=>document.documentElement.style.zoom=String(z),zoom);
   const sizes=await page.evaluate(()=>{const img=document.querySelector('img'),box=img.getBoundingClientRect();return {scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,ratio:box.width/box.height};});
   assert.ok(sizes.scroll<=sizes.client+1,`horizontal overflow ${width}/${zoom}`);assert.ok(Math.abs(sizes.ratio-1)<0.01);
   await page.screenshot({path:path.join(root,`test-results/support-${width}-${zoom}.png`),fullPage:true});
  }
  await page.evaluate(()=>document.documentElement.style.zoom='1');await page.keyboard.press('Tab');
  assert.equal(await page.locator('#pix-code').evaluate(e=>e===document.activeElement),true);
  await page.keyboard.press('Tab');assert.equal(await page.locator('#btn-copy-pix').evaluate(e=>e===document.activeElement),true);
  console.log('PASS QR/code equality; 4 widths x 2 CSS zoom levels; keyboard order. No payment or external requests.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
