import del from 'del';

export default function clean() {
  return del(['server/public', 'server/views']);
}
