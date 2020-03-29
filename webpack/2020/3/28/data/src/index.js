import './style.css';
import data from './data.xml';
function component() {
  const element = document.createElement('i');
  element.classList.add('hello');
  element.innerHTML = 'Hello webapck';

  console.log(data);
  return element;
}
document.body.appendChild(component());
