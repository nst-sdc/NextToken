# Design

## Vibe
Clean, modern, and fast to scan. Dark-first, like a developer tool. Content comes first, decoration second.

## Colors
| Role | Hex |
|---|---|
| Background | #0B0D12 |
| Surface (cards) | #141821 |
| Border | #232937 |
| Text primary | #E8EBF2 |
| Text muted | #8A93A6 |
| Accent | #6366F1 |
| Success / rising | #22C55E |
| Danger / falling | #EF4444 |

Light theme: invert surfaces (#FFFFFF bg, #F4F5F9 cards), keep the same accent.

## Typography
- Headings: **Inter**, 600-700
- Body: **Inter**, 400, 16px, line-height 1.6
- Code / tags: **JetBrains Mono**, 13px
- Scale: 12 / 14 / 16 / 20 / 24 / 32 / 48

## Layout
- Max content width: 1100px
- 8px spacing grid
- Cards: 12px radius, 1px border, subtle hover lift
- Mobile first. Single column under 768px.

## Components
- **ArticleCard**: source + time, title, 3 bullets, "Why it matters" callout in accent tint
- **FilterBar**: pill buttons, sticky on scroll
- **TrendRow**: skill name, mentions, arrow with % change (green/red)

## Motion
- 150-200ms ease transitions only. No heavy animations.

## Accessibility
- Contrast ratio 4.5:1 minimum
- Visible focus rings
- Alt text and semantic HTML
