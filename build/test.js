let str = `<template><div class="markdown-body"><pre class="shiki shiki-themes one-dark-pro one-dark-pro" style="background-color:#282c34;--shiki-dark-bg:#282c34;color:#abb2bf;--shiki-dark:#abb2bf" tabindex="0"><code class="language-js" v-pre><span class="line"><span style="color:#C678DD;--shiki-dark:#C678DD">let</span><span style="color:#E06C75;--shiki-dark:#E06C75"> a</span><span style="color:#56B6C2;--shiki-dark:#56B6C2"> =</span><span style="color:#D19A66;--shiki-dark:#D19A66"> 1</span></span>
<span class="line"></span></code></pre>
<h1>啊撒大声地</h1>
</div></template>`

const regex = /<template>([\s\S]*?)<\/template>/

console.log(str.match(regex)[1]);