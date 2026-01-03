---
title: "Complete Markdown Guide"
description: "A comprehensive guide to Markdown syntax with examples of all supported features."
date: "2025-01-03"
language: "en"
---

# Complete Markdown Guide

This guide demonstrates all the Markdown features supported in this blog.

## Headings

You can create headings using the `#` symbol:

# Heading 1
## Heading 2
### Heading 3
#### Heading 4

## Text Formatting

**Bold text** using `**bold**`

*Italic text* using `*italic*`

***Bold and italic*** using `***bold and italic***`

~~Strikethrough~~ using `~~strikethrough~~` (requires GFM)

## Links and Images

[Link to Google](https://google.com)

![Placeholder Image](https://via.placeholder.com/600x300)

## Code

Inline code: `const hello = "world"`

Code block with syntax highlighting:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};

console.log(user);
```

```python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
```

## Lists

### Unordered List

- First item
- Second item
  - Nested item 1
  - Nested item 2
- Third item

### Ordered List

1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

### Task List (GFM)

- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

## Blockquotes

> This is a blockquote.
> It can span multiple lines.
>
> > You can also nest blockquotes.

## Horizontal Rule

Use three dashes for a horizontal line:

---

## Tables (GFM)

| Feature | Support | Notes |
|---------|---------|-------|
| Headers | ✅ | H1-H6 |
| Code | ✅ | Syntax highlighting |
| Lists | ✅ | Ordered & unordered |
| Tables | ✅ | GitHub Flavored Markdown |

## HTML

You can also use HTML in Markdown:

<div style="padding: 1rem; background: #f0f0f0; border-radius: 0.5rem;">
  This is HTML content inside Markdown!
</div>

## Conclusion

This blog supports all major Markdown features, making it perfect for writing technical content!
