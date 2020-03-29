import _ from 'lodash';
import './style.css';
import url_test from './images/test.jpg?sizes[]=200,sizes[]=300,sizes[]=400'; // 优先级高于webpack中的配置

console.log(url_test);
function component() {
  var element = document.createElement('div');

  // - Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  // + Lodash, 现在由这个脚本导入
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // 将图像添加到我们现有的 div。
  const img = new Image();
  img.src = url_test.placeholder;
  element.append(img);

  return element;
}

document.body.appendChild(component());
