import './videoNotification.css';

const body = document.querySelector('body');

const video2 = document.createElement('div');
video2.classList.add('V2');
body.appendChild(video2);

const h1Video2 = document.createElement('h1');
h1Video2.textContent = 'Видео-2: Notification';
video2.appendChild(h1Video2);

const permissionDiv = document.createElement('div');
permissionDiv.textContent = 'разрешение - ?';
permissionDiv.classList.add('permissionDiv');
video2.appendChild(permissionDiv);

const start = performance.now() + 60000;

function showNotification() {
  const notifyInterval = setInterval(() => {
    const currentTime = performance.now();

    const notification = new Notification('1-й аргумент - это: Текст уведомления, 2-й аргумент - это опции(наиболее часто используемые: )',
      {
        tag: 'lesson',
        body: `${Math.round((start - currentTime) / 1000)} секунд осталось`,
        // body: 'Geolocation, Notification, Media',
        icon: '../src/img/netology.png',
        image: './src/img/netology2.png',
        requireInteraction: true, // чтобы уведомление не скрывалось по истечении времени
      });

    if (currentTime > start) {
      clearInterval(notifyInterval);

      notification.close();
      return;
    }

    console.log(notification);

    notification.addEventListener('click', () => {
      notification.close();
      window.location.href = 'https://netology.ru';
    });

    notification.addEventListener('close', () => {
      console.log('close');
    });
  }, 1000);
}

(async () => {
  // console.log('1');
  if (!window.Notification) {
    // console.log('2');
    return;
  }
  if (Notification.permission === 'granted') { // если разрешение получено
    // TODO: show notification
    permissionDiv.textContent = 'удовлетворено без запроса(granted no query)';
    // console.log('3');
    showNotification(); // запустили функцию для показа уведомления
    return;
  }
  if (Notification.permission === 'default') { // если разрешение ещё небыло запрошено
    // запрашиваем разрешение на уведомление и записывам в переменную permission
    const permission = await Notification.requestPermission(); // console.log(permission);
    // console.log('4');

    if (permission) { // если разрешение получено мы также можем показывать уведомления
      // TODO: show notification      // console.log('5');
      permissionDiv.textContent = 'удовлетворено после запроса(granted after query)';
      showNotification(); // запустили функцию для показа уведомления
    }
  }
})();
