export function preprocessMarkdown(content: string): string {
  // Replace GFM task list syntax with a marker tiptap-markdown can handle
  // tiptap-markdown understands [x] and [ ] if they're in the right format
  return content
    .replace(/^(\s*)-\s\[x\]\s/gim, "$1- [x] ")
    .replace(/^(\s*)-\s\[\s\]\s/gm, "$1- [ ] ");
}
