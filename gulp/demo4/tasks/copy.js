import { src, dest } from 'gulp'
import args from './args'

const copysrc = args.copy.src()
const output = args.output
export const copy = () => {
  return src(copysrc).pipe(dest(output))
}
