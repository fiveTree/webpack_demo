import './style/common.css'

import Layer from './components/layer/layer.js'



const App = function (){
    let dom = document.getElementById('app');
    let layer = new Layer();
    dom.innerHTML = layer.tpl({
        name:'王森林',
        arr: ['王','森林','wang ']
    })
}
new App()