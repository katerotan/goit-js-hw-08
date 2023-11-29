// Масив об'єктів з картинками
const images = [
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
      description: 'Hokkaido Flower',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Container Haulage Freight',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
      description: 'Flower Blooms',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
      description: 'Alpine Mountains',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
      description: 'Mountain Lake Sailing',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
      description: 'Alpine Spring Meadows',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
      description: 'Nature Landscape',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
      description: 'Lighthouse Coast Sea',
    },
  ];
// 1) Отримуємо посилання на  <ul class="gallery"></ul>
  const galleryContainer = document.querySelector('.gallery');
// 2) Створюємо галерею 
  const createGalleryItem = ({ preview, original, description }) => {
// 3) Створюємо <li> та додаємо клас .gallery-item
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery-item');
 //4)Створюємо <a> та додаємо клас .gallery-link 
    const galleryLink = document.createElement('a');
    galleryLink.classList.add('gallery-link');
// передаємо атрибуту href значення ключа original
    galleryLink.href = original;
// 5) Створюємо <img> та додаємо клас .gallery-image 
    const galleryImage = document.createElement('img');
    galleryImage.classList.add('gallery-image');
//передаємо атрибутам src та alt значення відповідних ключів та ствоюємо додатковий дата атрибут source, якому передаємо значення ключа original
    galleryImage.src = preview;
    galleryImage.dataset.source = original;
    galleryImage.alt = description;
// 6) Розставляємо порядок вкладеності (батьки і діти)
    galleryLink.appendChild(galleryImage);
    galleryItem.appendChild(galleryLink);

// 7) повертає створений елемент галереї (<li>), який був створений у функції createGalleryItem.
// Тобто створення кожного елементу галереї та потім додавати ці елементи до DOM або використовувати їх у подальших операціях
    return galleryItem;
  };
  


// -------------------------------------------------------------------------------
// ---------------------ДОДАЄМО ЗОБРАЖЕННЯ В ГАЛЕРЕЮ------------------------------
// -------------------------------------------------------------------------------



function addGalleryItems (images){
  //створюємо новий масив galleryItems за допомогою методу .map() - кожен об'єкт масиву images заводиться в свою lі  за допомогою createGalleryItem 
  const galleryItems = images.map(createGalleryItem); 
  console.log(galleryItems); // [li.gallery-item, li.gallery-item, li.gallery-item, li.gallery-item, li.gallery-item, li.gallery-item, li.gallery-item, li.gallery-item, li.gallery-item] - заводимо в консоль
  console.log(...galleryItems);


  // const x = [1,2,3,4,5];
  // const magic = x.map(function toTwo(element){ return element*2;});
  // console.log( magic); //[2, 4, 6, 8, 10]
  // console.log( ...magic); // 2 4 6 8 10


  galleryContainer.append(...galleryItems); // заводимо в DOM кожну li як дочірній елемент у вигляді рядка отриманого за допомогою rest
  
}

addGalleryItems(images);


// -------------------------------------------------------------------------------
// ---------------------ДОДАЄМО МОДАЛЬНЕ ВІКНО -"ВІДКРИВАЄТЬСЯ НА КЛІК"-----------
// -------------------------------------------------------------------------------

  
// Додаємо обробник подій для делегування на ul.gallery
galleryContainer.addEventListener('click', handleGalleryClick);

function handleGalleryClick(event) {
  event.preventDefault(); //  щоб очистити від запуску посилання при кліку, яке огортає картинку і просписати власну подію нижче.

  // Перевіряємо, чи клік відбувся по зображенню (імена тегів IMG тут аперкейсом)
  if (event.target.nodeName === 'IMG') {
    const largeImageSource = event.target.dataset.source;
    console.log('Посилання на велике зображення:', largeImageSource);

  // Відкриваємо модальне вікно basicLightbox з великим зображенням і зразу блокуємо закриття вікна - конфігурація Blocked
    const instance = basicLightbox.create(`<img src="${largeImageSource}" />`, {
      closable: false,
    });



  // -------------------------------------------------------------------------------
// ---------------------ДОДАЄМО "ЗАКРИВАЄТЬСЯ НА ESCAPE"----------
// -------------------------------------------------------------------------------
      
    
    const handleEscape = (escape) => {
      if (escape.key === 'Escape') {
        instance.close();
        document.removeEventListener('keydown', handleEscape);
      }
    };

    document.addEventListener('keydown', handleEscape);

    instance.show();
    
  }
};

 


