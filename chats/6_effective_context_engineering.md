
https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

https://genk.vn/khong-co-tai-lieu-8-trang-nay-chatgpt-va-cac-mo-hinh-ai-hien-dai-se-khong-ton-tai-20251020113145691.chn

https://www.pcmag.com/news/claude-code-creator-we-didnt-mean-to-build-it-but-its-changed-everything

https://blog.bytebytego.com/p/what-actually-happens-when-you-press

https://blog.bytebytego.com/p/the-memory-problem-why-llms-sometimes

https://github.com/anthropics/claude-agent-sdk-demos/blob/main/hello-world/hello-world.ts

```
Despite their speed and ability to manage larger and larger volumes of data, we’ve observed that LLMs, like humans, lose focus or experience confusion at a certain point.
```

```
Context, therefore, must be treated as a finite resource with diminishing marginal returns. Like humans, who have limited working memory capacity, LLMs have an “attention budget” that they draw on when parsing large volumes of context.
```

## The art
```
Given that LLMs are constrained by a finite attention budget, good context engineering means finding the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome. Implementing this practice is much easier said than done, but in the following section, we outline what this guiding principle means in practice across the different components of context.
```
