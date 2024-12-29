// 行内标签列表
const inlineTags = {
  abbr: true,
  b: true,
  big: true,
  code: true,
  del: true,
  em: true,
  i: true,
  ins: true,
  label: true,
  q: true,
  small: true,
  span: true,
  strong: true,
  sub: true,
  sup: true,
}


export const handler = {
  isInline(tagName, style) {
    return inlineTags[tagName] || (style || '').includes('display:inline')
  },
}
