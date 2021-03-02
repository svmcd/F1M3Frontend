var panelSource = [
    'images/1.JPG',
    'images/2.JPG',
    'images/3.JPG',
    'images/4.JPG',
    'images/5.JPG',
    'images/6.JPG',
    'images/7.JPG',
    'images/8.JPG',
    'images/9.JPG',
    'images/10.JPG',
    'images/11.JPG',
    'images/12.JPG',
    'images/13.JPG',
    'images/14.JPG',
    'images/15.JPG',
    'images/16.JPG',
    'images/17.JPG',
    'images/18.JPG',
    'images/19.JPG',
    'images/20.JPG',
    'images/21.JPG',
    'images/22.JPG',
    'images/23.JPG',
    'images/25.JPG',
    'images/26.JPG'
];

var houder = document.getElementById('page');

function postPanel(url){
    let item = document.createElement('div');
    item.className - 'item';
    let panel = document.createElement('img');
    panel.src = url;
    item.append(panel);
    houder.append(item);
    item.classList.add('item')
}

for(let i=panelSource.length; i>0; i-- ) {
    let number = Math.floor(Math.random()*panelSource.length);
    postPanel(panelSource[number] );
    panelSource.splice(number,1);
}