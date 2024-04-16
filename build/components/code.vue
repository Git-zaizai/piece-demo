<template>
  <MdToVueLayout>
    <div class="vp-doc _zh_guide_what-is-vitepress">
      <div class="vp-doc has-sidebar has-aside">
        <h1 id="引入代码块" tabindex="-1">引入代码块 <a class="header-anchor" href="#引入代码块" aria-label="Permalink to &quot;引入代码块&quot;">&ZeroWidthSpace;</a></h1>
<div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="color:#ABB2BF">&#x3C;</span><span style="color:#E06C75">script</span><span style="color:#D19A66"> setup</span><span style="color:#ABB2BF">></span></span>
<span class="line"><span style="color:#C678DD">import</span><span style="color:#E06C75"> content</span><span style="color:#C678DD"> from</span><span style="color:#98C379"> './content.vue'</span></span>
<span class="line"><span style="color:#ABB2BF">&#x3C;/</span><span style="color:#E06C75">script</span><span style="color:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF">&#x3C;</span><span style="color:#E06C75">template</span><span style="color:#ABB2BF">></span></span>
<span class="line"><span style="color:#ABB2BF">    &#x3C;</span><span style="color:#E06C75">MdToVueLayout</span><span style="color:#ABB2BF">></span></span>
<span class="line"><span style="color:#ABB2BF">        &#x3C;</span><span style="color:#E06C75">content</span><span style="color:#ABB2BF"> /></span></span>
<span class="line"><span style="color:#ABB2BF">    &#x3C;/</span><span style="color:#E06C75">MdToVueLayout</span><span style="color:#ABB2BF">></span></span>
<span class="line"><span style="color:#ABB2BF">&#x3C;/</span><span style="color:#E06C75">template</span><span style="color:#ABB2BF">></span></span></code></pre>
</div><details class="details custom-block"><summary>Details</summary>
<p>This is a details block.</p>
</details>
<h2 id="markdown-content" tabindex="-1">Markdown Content <a class="header-anchor" href="#markdown-content" aria-label="Permalink to &quot;Markdown Content&quot;">&ZeroWidthSpace;</a></h2>
<p>The count is: {{ count }}</p>
<p><button @click="count++">Increment</button></p>

      </div>
    </div>
  </MdToVueLayout>
</template>
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>