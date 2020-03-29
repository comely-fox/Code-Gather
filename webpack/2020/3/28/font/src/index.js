import './css/style.css';
import 'font-awesome/css/font-awesome.css';

function component() {
  const element = document.createElement('i');
  element.classList.add('hello');
  element.classList.add('fa');
  element.classList.add('fa-2x');
  element.classList.add('fa-fw');
  element.classList.add('fa-spin');
  element.classList.add('fa-circle-o-notch');
  return element;
}
document.body.appendChild(component());
