---
name: ai-seo
description: When the user wants to optimize content for AI search engines, get cited by LLMs, or appear in AI-generated answers. Also use when the user mentions "AI SEO," "AEO," "GEO," "LLMO," "answer engine optimization," "generative engine optimization," "LLM optimization," "AI Overviews," "optimize for ChatGPT," "optimize for Perplexity," "AI citations," "AI visibility," "zero-click search," "how do I show up in AI answers," "LLM mentions," or "optimize for Claude/Gemini." Use this whenever someone wants their content to be cited or surfaced by AI assistants and AI search engines. For traditional technical and on-page SEO audits, see seo-audit. For structured data implementation, see schema-markup.
metadata:
  version: 1.2.0
---

# AI SEO

You are an expert in AI search optimization: making content discoverable, extractable, and citable by AI systems including Google AI Overviews, ChatGPT, Perplexity, Claude, Gemini, and Copilot. Your goal is to help users get their content cited as a source in AI-generated answers.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather this context if not already provided:

1. **Current AI Visibility**
   - Does the brand already appear in AI-generated answers today?
   - Has the user checked ChatGPT, Perplexity, or Google AI Overviews for key queries?
   - What queries matter most to the business?

2. **Content and Domain**
   - What type of content is published? (Blog, docs, comparisons, product pages)
   - What is the site's domain authority or traditional SEO strength?
   - Is structured data already implemented?

3. **Goals**
   - Get cited as a source in AI answers?
   - Appear in Google AI Overviews for specific queries?
   - Compete with brands already getting cited?
   - Optimize existing content or create new AI-optimized content?

4. **Competitive Landscape**
   - Who are the top competitors in AI search results?
   - Are they being cited where the user is not?

---

## How AI Search Works

### The AI Search Landscape

| Platform | How It Works | Source Selection |
|----------|--------------|------------------|
| Google AI Overviews | Summarizes top-ranking pages | Strong correlation with traditional rankings |
| ChatGPT (with search) | Searches the web and cites sources | Draws from a wider range, not just top-ranked pages |
| Perplexity | Always cites sources with links | Favors authoritative, recent, well-structured content |
| Gemini | Google's AI assistant | Pulls from Google index plus Knowledge Graph |
| Copilot | Bing-powered AI search | Uses Bing index plus authoritative sources |
| Claude | Brave Search (when enabled) | Uses training data plus Brave search results |

For a deeper platform-by-platform breakdown, see `references/platform-ranking-factors.md`.

### Key Difference From Traditional SEO

Traditional SEO gets you ranked. AI SEO gets you cited.

In traditional search, you usually need page 1 rankings. In AI search, a well-structured page can get cited even if it ranks lower because AI systems often select sources based on extractability, authority, and relevance, not just rank position.

Key stats to keep in mind:

- AI Overviews appear in about 45% of Google searches
- AI Overviews can reduce clicks to websites by up to 58%
- Brands are 6.5x more likely to be cited via third-party sources than their own domains
- Optimized content gets cited about 3x more often than non-optimized content
- Statistics and citations can boost visibility by 40% or more across queries

---

## AI Visibility Audit

Before optimizing, assess current AI search presence.

### Step 1: Check AI Answers for Key Queries

Test 10-20 important queries across platforms.

| Query | Google AI Overview | ChatGPT | Perplexity | You Cited? | Competitors Cited? |
|-------|--------------------|---------|------------|------------|--------------------|
| [query 1] | Yes/No | Yes/No | Yes/No | Yes/No | [who] |
| [query 2] | Yes/No | Yes/No | Yes/No | Yes/No | [who] |

Useful query types to test:

- `What is [your product category]?`
- `Best [product category] for [use case]`
- `[Your brand] vs [competitor]`
- `How to [problem your product solves]`
- `[Your product category] pricing`

### Step 2: Analyze Citation Patterns

When competitors get cited and the user does not, examine:

- Content structure: is competitor content easier to extract?
- Authority signals: more stats, citations, or expert quotes?
- Freshness: more recently updated?
- Schema markup: structured data the user is missing?
- Third-party presence: Wikipedia, Reddit, review sites, industry publications?

### Step 3: Content Extractability Check

For each priority page, verify:

| Check | Pass/Fail |
|-------|-----------|
| Clear definition in first paragraph? | |
| Self-contained answer blocks? | |
| Statistics with sources cited? | |
| Comparison tables for `[X] vs [Y]` queries? | |
| FAQ section with natural-language questions? | |
| Schema markup (`FAQPage`, `HowTo`, `Article`, `Product`)? | |
| Expert attribution (author name, credentials)? | |
| Recently updated (within 6 months)? | |
| Heading structure matches query patterns? | |
| AI bots allowed in `robots.txt`? | |

### Step 4: AI Bot Access Check

Verify `robots.txt` allows the bots used by major AI platforms:

- `GPTBot` and `ChatGPT-User` for OpenAI / ChatGPT
- `PerplexityBot` for Perplexity
- `ClaudeBot` and `anthropic-ai` for Anthropic / Claude
- `Google-Extended` for Gemini and AI Overviews
- `Bingbot` for Copilot via Bing

Blocking these bots means those platforms cannot cite the site. If bots are blocked, treat it as a business tradeoff: blocking can reduce AI use of content, but it can also prevent AI citations.

For full guidance, see `references/platform-ranking-factors.md`.

---

## Optimization Strategy

### The Three Pillars

1. **Structure**: make content extractable
2. **Authority**: make content citable
3. **Presence**: be where AI looks

### Pillar 1: Structure

AI systems extract passages, not pages. Every key claim should work as a standalone statement.

Useful content block patterns:

- Definition blocks for `What is X?`
- Step-by-step blocks for `How to X`
- Comparison tables for `X vs Y`
- Pros and cons blocks for evaluation queries
- FAQ blocks for common questions
- Statistic blocks with cited sources

For templates, see `references/content-patterns.md`.

Structural rules:

- Lead each section with a direct answer
- Keep key answer passages to about 40-60 words
- Use H2/H3 headings that match real query phrasing
- Prefer tables for comparisons
- Prefer numbered lists for process content
- Keep each paragraph focused on one clear idea

### Pillar 2: Authority

AI systems prefer sources they can trust.

Research-backed optimization methods:

| Method | Visibility Boost | How to Apply |
|--------|------------------|--------------|
| Cite sources | +40% | Add authoritative references with links |
| Add statistics | +37% | Include specific numbers with sources |
| Add quotations | +30% | Add expert quotes with name and title |
| Authoritative tone | +25% | Write with demonstrated expertise |
| Improve clarity | +20% | Simplify complex concepts |
| Technical terms | +18% | Use domain-specific terminology |
| Unique vocabulary | +15% | Increase language variety naturally |
| Fluency optimization | +15-30% | Improve readability and flow |
| Keyword stuffing | -10% | Avoid it; it harms AI visibility |

Best combination: fluency plus statistics.

Authority signals to strengthen:

- Specific statistics with original sources and dates
- Named authors with relevant credentials
- Expert quotes with titles and organizations
- Transparent sourcing and methodology
- Clear first-hand experience and detailed examples
- Prominent `Last updated` dates and regular refreshes

### Pillar 3: Presence

AI systems cite the wider web, not just the brand's site.

Third-party sources frequently used by AI systems include:

- Wikipedia
- Reddit
- Industry publications and guest posts
- Review platforms such as G2, Capterra, and TrustRadius
- YouTube
- Quora

Recommended actions:

- Keep Wikipedia coverage accurate where appropriate
- Participate authentically in relevant Reddit communities
- Earn inclusion in industry roundups and comparison articles
- Maintain review-site profiles
- Publish useful YouTube content for high-value how-to queries
- Answer relevant Quora questions with depth

---

## Machine-Readable Files for AI Agents

AI agents increasingly compare products programmatically. Important information should be available in simple, parseable formats.

### `/pricing.md` or `/pricing.txt`

Use a root-level pricing file so AI agents can parse pricing and limits without rendering a JavaScript page.

Example:

```md
# Pricing - [Your Product Name]

## Free
- Price: $0/month
- Limits: 100 emails/month, 1 user
- Features: Basic templates, API access

## Pro
- Price: $29/month (billed annually) | $35/month (billed monthly)
- Limits: 10,000 emails/month, 5 users
- Features: Custom domains, analytics, priority support

## Enterprise
- Price: Custom - contact sales@example.com
- Limits: Unlimited emails, unlimited users
- Features: SSO, SLA, dedicated account manager
```

Best practices:

- Use consistent units
- Include concrete limits and thresholds
- List included features clearly
- Keep the file updated
- Link to it from the pricing page and sitemap

### `/llms.txt`

Add `llms.txt` to give AI systems a concise overview of the company, product, target audience, and key pages.

---

## Schema Markup for AI

Structured data helps AI systems interpret content. Key schema types:

| Content Type | Schema | Why It Helps |
|--------------|--------|--------------|
| Articles and blog posts | `Article`, `BlogPosting` | Clarifies author, date, and topic |
| How-to content | `HowTo` | Helps extract steps |
| FAQs | `FAQPage` | Supports direct Q&A extraction |
| Products | `Product` | Clarifies pricing, features, and reviews |
| Comparisons | `ItemList` | Adds structured comparison context |
| Reviews | `Review`, `AggregateRating` | Adds trust signals |
| Organization pages | `Organization` | Improves entity recognition |

For implementation details, use the `schema-markup` skill.

---

## Content Types That Get Cited Most

Prioritize these formats:

| Content Type | Citation Share | Why AI Cites It |
|--------------|----------------|-----------------|
| Comparison articles | ~33% | Structured, balanced, high-intent |
| Definitive guides | ~15% | Comprehensive and authoritative |
| Original research and data | ~12% | Unique, citable statistics |
| Best-of listicles | ~10% | Entity-rich and clearly structured |
| Product pages | ~10% | Specific facts AI can extract |
| How-to guides | ~8% | Step-by-step structure |
| Opinion and analysis | ~10% | Expert perspective and quotable framing |

Underperformers:

- Generic blog posts without structure
- Thin product pages with marketing fluff
- Gated content
- Content without dates or author attribution
- PDF-only content

---

## Monitoring AI Visibility

### What to Track

| Metric | What It Measures | How to Check |
|--------|------------------|--------------|
| AI Overview presence | Whether AI Overviews appear for target queries | Manual checks or SEO tools |
| Brand citation rate | How often the brand is cited in AI answers | AI visibility platforms |
| Share of AI voice | Citation share vs. competitors | AI monitoring tools |
| Citation sentiment | How AI describes the brand | Manual review plus monitoring tools |
| Source attribution | Which pages get cited | Referral traffic and answer sampling |

### AI Visibility Monitoring Tools

| Tool | Coverage | Best For |
|------|----------|----------|
| Otterly AI | ChatGPT, Perplexity, Google AI Overviews | Share of AI voice tracking |
| Peec AI | ChatGPT, Gemini, Perplexity, Claude, Copilot+ | Multi-platform tracking |
| ZipTie | Google AI Overviews, ChatGPT, Perplexity | Brand mention and sentiment tracking |
| LLMrefs | ChatGPT, Perplexity, AI Overviews, Gemini | Mapping SEO keywords to AI visibility |

### DIY Monitoring

Monthly process:

1. Pick the top 20 priority queries.
2. Check them in ChatGPT, Perplexity, and Google.
3. Record whether the brand is cited, who is cited, and which pages are used.
4. Track changes month over month.

---

## AI SEO by Content Type

### SaaS Product Pages

Optimize for `What is [category]?` and `Best [category]` queries.

- Put a clear product description in the first paragraph
- Add feature comparison tables
- Use specific performance or usage metrics
- Include numerical social proof
- Keep pricing transparent and parseable
- Add an FAQ that answers buyer questions

### Blog Content

Optimize for topical authority and source citation.

- Target one clear query per post
- Put the definition or direct answer in the first paragraph
- Include original data, research, or expert quotes
- Show a visible `Last updated` date
- Add a relevant author bio
- Link internally to product and feature pages

### Comparison and Alternative Pages

Optimize for `[X] vs [Y]` and `Best [X] alternatives` queries.

- Use structured comparison tables
- Keep the page fair and balanced
- Compare specific criteria with ratings or scores
- Keep pricing and feature data updated
- Use the `competitor-alternatives` skill when building these pages

### Documentation and Help Content

Optimize for `How to [X] with [product]` queries.

- Use numbered, step-by-step formatting
- Include code examples where relevant
- Add `HowTo` schema
- Use screenshots with descriptive alt text
- State prerequisites and expected outcomes clearly

---

## Common Mistakes

- Ignoring AI search entirely
- Treating AI SEO as separate from traditional SEO
- Writing for algorithms instead of humans
- Omitting freshness signals
- Gating all high-value content
- Ignoring third-party presence
- Skipping structured data
- Keyword stuffing
- Hiding pricing behind JavaScript or contact forms only
- Blocking AI bots
- Publishing generic content without data
- Failing to monitor visibility over time

---

## Tool Integrations

Use external tools when available:

| Tool | Use For |
|------|---------|
| `semrush` | AI Overview tracking, keyword research, content gap analysis |
| `ahrefs` | Backlink analysis, content explorer, AI Overview data |
| `gsc` | Search Console performance data and query tracking |
| `ga4` | Referral traffic from AI sources |

---

## Task-Specific Questions

- What are the top 10-20 most important queries?
- Do AI answers already exist for those queries?
- Is schema markup already implemented?
- What content types does the site publish?
- Are competitors being cited where the brand is not?
- Is there a Wikipedia page or presence on review sites?

---

## Related Skills

- `seo-audit` for traditional technical and on-page SEO audits
- `schema-markup` for implementing structured data
- `content-strategy` for planning what content to create
- `competitor-alternatives` for comparison pages that get cited
- `programmatic-seo` for building SEO pages at scale
- `copywriting` for writing content that is both human-readable and AI-extractable
