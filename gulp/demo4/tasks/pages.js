import { src, dest } from 'gulp'
import args from './args'

const htmlsrc = args.html.src()
const redress = args.html.redress
const pattern = new RegExp('(' + redress.join('\\x5c|') + '\\x5c)', 'i')
const output = args.output

export const pages = () => {
  return src(htmlsrc).pipe(
    dest(function (file) {
      file.path = file.path.replace(pattern, '')
      return output
    })
  )
}
