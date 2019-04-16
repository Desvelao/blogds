import markdownIt from 'markdown-it'

export default new markdownIt({
    html: true,
    linkify: true,
    typographer: true
})