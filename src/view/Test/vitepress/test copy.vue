<template>
	<div class="md-view" :style="cssVars">
		<!--目录站位div-->
		<div class="aside-zanwei"></div>
		<!--目录-->
		<div class="zai-aside">
			<div class="content">
				<!--竖线-->
				<div class="outline-marker" :style="{top:outlineMarkerTop + 'px'}"></div>
				<div class="outline-title" role="heading" aria-level="2" data-v-1588c7a1="">本页目录</div>
				<!--目录ul-->
				<nav>
					<ul>
						<li
								v-for="(item,index) in asides"
								:key="item.top"
								:style="{paddingLeft: item.type > 1 ? 1 * 15 + 'px' : '0' }"
						>
							<a
									class="outline-link"
									:class="active === index ? 'active' : ''"
									@click="outlineClick(item,index,$event)"
							> {{ item.txt }} </a>
						</li>
					</ul>
				</nav>
			</div>
		</div>

		<div data-v-63eb1f25="" class="docs-content">
			<div data-v-63eb1f25="" class="docs-view markdown-body"><h1 data-v-63eb1f25=""> 使用
				<code data-v-63eb1f25="">vite</code> 解析 <code data-v-63eb1f25="">md</code> 文件转为 <code data-v-63eb1f25="">vue</code>
				组件 </h1>
				<h2 data-v-63eb1f25=""> 插件（可直接使用） </h2>
				<div data-v-63eb1f25="" class="zai-code">
					<button data-v-63eb1f25="" class="zai-but-copy" style="background-image: var(--vp-icon-copy);"></button>
					<span class="lang" data-v-63eb1f25="">js</span>
					<div data-v-63eb1f25=""><pre
							class="shiki shiki-themes one-dark-pro one-dark-pro"
							style="background-color:#282c34;--shiki-dark-bg:#282c34;color:#abb2bf;--shiki-dark:#abb2bf;"
							tabindex="0"
							data-v-63eb1f25=""
					><code class="language-js" data-v-63eb1f25=""><span
							class="line"
							data-v-63eb1f25=""
					><span
							style="color:#E06C75;--shiki-dark:#E06C75;"
							data-v-63eb1f25=""
					>unplugin</span><span
							style="color:#56B6C2;--shiki-dark:#56B6C2;"
							data-v-63eb1f25=""
					>-</span><span
							style="color:#E06C75;--shiki-dark:#E06C75;"
							data-v-63eb1f25=""
					>vue</span><span
							style="color:#56B6C2;--shiki-dark:#56B6C2;"
							data-v-63eb1f25=""
					>-</span><span style="color:#E06C75;--shiki-dark:#E06C75;" data-v-63eb1f25="">markdown</span></span>
<span class="line" data-v-63eb1f25=""><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">@</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>shikijs</span><span
		style="color:#56B6C2;--shiki-dark:#56B6C2;"
		data-v-63eb1f25=""
>/</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>markdown</span><span
		style="color:#56B6C2;--shiki-dark:#56B6C2;"
		data-v-63eb1f25=""
>-</span><span style="color:#E06C75;--shiki-dark:#E06C75;" data-v-63eb1f25="">it</span></span>
<span class="line" data-v-63eb1f25=""></span></code></pre>
					</div>
				</div>
				<div data-v-63eb1f25="" class="zai-code">
					<button data-v-63eb1f25="" class="zai-but-copy" style="background-image: var(--vp-icon-copy);"></button>
					<span class="lang" data-v-63eb1f25="">vue</span>
					<div data-v-63eb1f25=""><pre
							class="shiki shiki-themes one-dark-pro one-dark-pro"
							style="background-color:#282c34;--shiki-dark-bg:#282c34;color:#abb2bf;--shiki-dark:#abb2bf;"
							tabindex="0"
							data-v-63eb1f25=""
					><code class="language-vue" data-v-63eb1f25=""><span
							class="line"
							data-v-63eb1f25=""
					><span
							style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
							data-v-63eb1f25=""
					>&lt;</span><span
							style="color:#E06C75;--shiki-dark:#E06C75;"
							data-v-63eb1f25=""
					>template</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">&gt;</span></span>
<span class="line" data-v-63eb1f25=""><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">  &lt;</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-space</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">&gt;</span></span>
<span class="line" data-v-63eb1f25=""><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>      &lt;</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-button</span><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>&gt;Default&lt;/</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-button</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">&gt;</span></span>
<span class="line" data-v-63eb1f25=""><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>      &lt;</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-button</span><span
		style="color:#D19A66;--shiki-dark:#D19A66;"
		data-v-63eb1f25=""
> type</span><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>=</span><span
		style="color:#98C379;--shiki-dark:#98C379;"
		data-v-63eb1f25=""
>"tertiary"</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">&gt; Tertiary&lt;/</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-button</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">&gt;</span></span>
<span class="line" data-v-63eb1f25=""><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>      &lt;</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-button</span><span
		style="color:#D19A66;--shiki-dark:#D19A66;"
		data-v-63eb1f25=""
> type</span><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>=</span><span
		style="color:#98C379;--shiki-dark:#98C379;"
		data-v-63eb1f25=""
>"primary"</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">&gt; Primary&lt;/</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-button</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">&gt;</span></span>
<span class="line" data-v-63eb1f25=""><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>      &lt;</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-button</span><span
		style="color:#D19A66;--shiki-dark:#D19A66;"
		data-v-63eb1f25=""
> type</span><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>=</span><span
		style="color:#98C379;--shiki-dark:#98C379;"
		data-v-63eb1f25=""
>"info"</span><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>&gt; Info&lt;/</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-button</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">&gt;</span></span>
<span class="line" data-v-63eb1f25=""><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>      &lt;</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-button</span><span
		style="color:#D19A66;--shiki-dark:#D19A66;"
		data-v-63eb1f25=""
> type</span><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>=</span><span
		style="color:#98C379;--shiki-dark:#98C379;"
		data-v-63eb1f25=""
>"success"</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">&gt; Success&lt;/</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-button</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">&gt;</span></span>
<span class="line" data-v-63eb1f25=""><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>      &lt;</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-button</span><span
		style="color:#D19A66;--shiki-dark:#D19A66;"
		data-v-63eb1f25=""
> type</span><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>=</span><span
		style="color:#98C379;--shiki-dark:#98C379;"
		data-v-63eb1f25=""
>"warning"</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">&gt; Warning&lt;/</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-button</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">&gt;</span></span>
<span class="line" data-v-63eb1f25=""><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>      &lt;</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-button</span><span
		style="color:#D19A66;--shiki-dark:#D19A66;"
		data-v-63eb1f25=""
> type</span><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>=</span><span
		style="color:#98C379;--shiki-dark:#98C379;"
		data-v-63eb1f25=""
>"error"</span><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>&gt; Error&lt;/</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-button</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">&gt;</span></span>
<span class="line" data-v-63eb1f25=""><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>  &lt;/</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>n-space</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">&gt;</span></span>
<span class="line" data-v-63eb1f25=""><span
		style="color:#ABB2BF;--shiki-dark:#ABB2BF;"
		data-v-63eb1f25=""
>&lt;/</span><span
		style="color:#E06C75;--shiki-dark:#E06C75;"
		data-v-63eb1f25=""
>template</span><span style="color:#ABB2BF;--shiki-dark:#ABB2BF;" data-v-63eb1f25="">&gt;</span></span>
<span class="line" data-v-63eb1f25=""></span></code></pre>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store'
import { useThemeVars } from 'naive-ui'

const outlineMarkerTop = ref(0)
const active = ref(0)
const asides = ref([])
let parentScroll: null | HTMLHtmlElement = null
const outlineClick = (item, index, e) => {
	e.preventDefault()
	if (parentScroll) {
		parentScroll.scrollTo({ top: item.top })
	}
	active.value = index
	outlineMarkerTop.value = e.target.offsetTop + 5
}

function getScrollableParent(element) {
	let parent = element.parentNode;
	while (parent != null && parent !== document.body && parent !== document.documentElement) {
		// 检查元素是否可垂直滚动
		if (parent.scrollHeight > parent.clientHeight || // 自然高度大于客户区高度
			(parent.style.overflowY === 'scroll' || parent.style.overflowY === 'auto')) {
			return parent; // 如果可以，则返回该元素
		}
		parent = parent.parentNode;
	}
	// 若没有找到可以滚动的父元素，则返回null
	return null;
}

onMounted(() => {
	parentScroll = getScrollableParent(document.querySelector('.md-view'))
	const hels = ['h1', 'h2', 'h3', 'h4', 'h5']
	const docs = document.querySelectorAll('.docs-view')
	for (const docEl of docs) {
		for (const docElElement of docEl.children) {
			if (hels.includes(docElElement.localName)) {
				asides.value.push({
					txt: docElElement.innerText,
					top: docElElement.offsetTop,
					type: Number(docElElement.localName.slice(1))
				})
			}
		}
	}
	nextTick(() => {
		console.log(asides.value)
		const outlineLink = document.querySelector('.outline-link')
		outlineMarkerTop.value = outlineLink.offsetTop + 4
	})

})

const common = useCommonStore()
const naiveVars = useThemeVars()
const cssVars = computed(() => {
	let vars = {
		'--vp-code-block-bg-light': '#161618',
		'--vp-c-divider': '#5c5c5d',
		'--zai-success': naiveVars.value.successColor,
		'--vp-c-asides-divider': '#e2e2e3'
	}
	if (common.inverted) {
		vars['--vp-code-block-bg-light'] = '#1e1e20'
		// vars['--vp-c-divider'] = 'rgba(82, 82, 89, .32)'
		vars['--vp-c-divider'] = '#5c5c5d'
		vars['--zai-success'] = naiveVars.value.successColor
		vars['--vp-c-asides-divider'] = '#2e2e32'
	}
	return vars
})

function copyStr(value: string): void {
	if (!value) return
	const execCommand = (): void => {
		const el = document.createElement('input')
		el.value = value
		document.body.appendChild(el)
		if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
			el.setSelectionRange(0, value.length)
			el.focus()
		} else {
			el.select()
		}
		if (document.execCommand('copy')) {
			console.log('复制成功')
		} else {
			console.log('复制失败')
		}
		el.blur()
		el.remove()
	}

	if (navigator.clipboard) {
		navigator.clipboard.writeText(value).then(
			function () {
				console.log('复制成功')
			},
			function () {
				execCommand()
			}
		)
	} else {
		execCommand()
	}
}

const codyMeg = ref('var(--vp-icon-copy)')
let timeout
const butCody = e => {
	// 获取父节点
	const parent = e.target.parentNode
	console.log('啊实打实刚看到', parent)
	copyStr(parent.querySelector('pre code').innerText)
	codyMeg.value = `var(--vp-icon-copied)`
	timeout && clearTimeout(timeout)
	timeout = setTimeout(() => {
		codyMeg.value = `var(--vp-icon-copy)`
	}, 2000)
}
</script>
<style lang="scss" scoped>

ol, ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6, li, p {
  overflow-wrap: break-word;
}

.md-view {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.docs-content {
  order: 1;
  margin: 0;
  width: 100%;
  border: 1px solid var(--vp-c-asides-divider);
  margin: 10px;
  padding: 20px 10px 10px 10px;
  border-radius: 7px;
}

.docs-view {
  //width: calc(100vw - 40px);
  padding: 0 10px;
  //font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace;
  //font-size: 14px;

  .zai-code {
    // width: calc(100% - 20px);
    position: relative;
    // padding: 0 10px;

    &:hover .zai-but-copy {
      opacity: 1;
    }

    &:hover .lang {
      opacity: 0;
    }

    --vp-icon-copy: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2'/%3E%3C/svg%3E");
    --vp-icon-copied: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4'/%3E%3C/svg%3E");
    --vp-c-text-dark-3: rgba(235, 235, 245, 0.38);
  }

  .zai-but-copy {
    direction: ltr;
    position: absolute;
    top: 10px;
    right: 12px;
    z-index: 3;
    border: 1px solid;
    border-color: transparent;
    border-radius: 4px;
    width: 40px;
    height: 40px;
    background-color: var(--vp-code-block-bg-light);
    opacity: 0;
    cursor: pointer;
    background-position: 50%;
    background-size: 20px;
    background-repeat: no-repeat;
    transition: border-color 0.25s, background-color 0.25s, opacity 0.25s;

    &:hover {
      border-color: var(--vp-c-divider);
      background-color: var(--vp-code-block-bg-light);
    }
  }

  .zai-code pre {
    padding: 20px 24px;
    border-radius: 8px;
  }

  .lang {
    position: absolute;
    top: 8px;
    right: 24px;
    z-index: 2;
    font-size: 12px;
    font-weight: 500;
    color: var(--vp-c-text-dark-3);
    transition: color 0.4s, opacity 0.4s;
  }
}

.aside-zanwei {
  width: 100%;
  max-width: 256px;
  order: 2;
  flex-grow: 1;
}

.zai-aside {
  --vp-c-indigo-1: #3451b2;
  --vp-c-brand-1: var(--vp-c-indigo-1);
  position: fixed;
  left: calc(100vw - 256px);
  max-width: 256px;
  width: calc(100% - 83%);
  z-index: 1;
  height: 100vh;
  overflow-y: scroll;
  scrollbar-width: none;


  .content {
    position: relative;
    border-left: 1px solid var(--vp-c-asides-divider);
    padding-left: 16px;
    font-size: 13px;
    font-weight: 500;
    height: calc(100% - 4px);
    padding-top: 4px;
  }

  .outline-marker {
    position: absolute;
    top: 32px;
    left: -1px;
    z-index: 0;
    opacity: 1;
    width: 2px;
    border-radius: 2px;
    height: 18px;
    background-color: var(--zai-success);
    transition: top .25s cubic-bezier(0, 1, .5, 1), background-color .5s, opacity .25s;
  }

  .outline-title {
    letter-spacing: .4px;
    line-height: 28px;
    font-size: 13px;
    font-weight: 600;
  }

  .outline-link {
    display: inline-block;
    line-height: 28px;
    color: var(--n-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color .5s;
    font-weight: 400;
    cursor: pointer;
    overflow-wrap: break-word;

    &:hover {
      color: var(--zai-success);
    }
  }

  .outline-link.active {
    color: var(--zai-success);
  }
}
</style>
