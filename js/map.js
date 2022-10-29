ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map('map', {
    center: [55.811041, 37.023505],
    zoom: 9,
    controls: [],
  });

  // Создание менеджера объектов.
  var objectManager = new ymaps.ObjectManager({
    // Чтобы метки начали кластеризоваться, выставляем опцию.
    clusterize: true,
    // ObjectManager принимает те же опции, что и кластеризатор.
    gridSize: 64,
    // Макет метки кластера pieChart.
    clusterIconLayout: 'default#pieChart',
  });

  const controlMapItem = document.querySelectorAll('.control-map__item');

  const groupArr = [
    'Школа',
    'Детский сад',
    'Больница',
    'Кафе и рестораны',
    'Торговый центр',
    'Фитнес',
  ];

  function filterGroup() {
    objectManager.setFilter(
      `properties.clusterCaption == "${groupArr[0]}" || properties.clusterCaption == "${groupArr[1]}" || properties.clusterCaption == "${groupArr[2]}" || properties.clusterCaption == "${groupArr[3]}" || properties.clusterCaption == "${groupArr[4]}" || properties.clusterCaption == "${groupArr[5]}"`
    );
  }
  controlMapItem.forEach((item, i) => {
    item.addEventListener('click', () => {
      if (!item.classList.contains('active')) {
        item.classList.add('active');
        item.querySelector('.control-map__content').classList.add('show');

        if (i === 0) groupArr[0] = 'Школа';
        if (i === 1) groupArr[1] = 'Детский сад';
        if (i === 2) groupArr[2] = 'Больница';
        if (i === 3) groupArr[3] = 'Кафе и рестораны';
        if (i === 4) groupArr[4] = 'Торговый центр';
        if (i === 5) groupArr[5] = 'Фитнес';

        filterGroup();
      } else {
        item.classList.remove('active');
        item.querySelector('.control-map__content').classList.remove('show');

        if (i === 0) groupArr[0] = '';
        if (i === 1) groupArr[1] = '';
        if (i === 2) groupArr[2] = '';
        if (i === 3) groupArr[3] = '';
        if (i === 4) groupArr[4] = '';
        if (i === 5) groupArr[5] = '';

        filterGroup();
      }
    });
  });

  fetch('js/data.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      objectManager.add(data);
    });

  // Отобразим объекты на карте.
  myMap.geoObjects.add(objectManager);
}
