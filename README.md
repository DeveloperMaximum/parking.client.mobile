## Мобильный клиент для проекта "Геолокация"
Приложение для поиска данных автомобиля на парковке по QR коду.
Проект для сборки мобильного приложения "Геолокации". Используются:
-   Cordova
-   ReactJS
-   Reco (React + Cordova)

#### Установите Cordova CLI и Reco CLI
```cli
sudo npm install -g cordova
sudo npm install -g react.cordova
```
После введения этих команд, на компьютер будут установлены `cordova` и `react.cordova` (reco).
#### Инициализируйте проект
```cli
npm initialize
```
Reco ожидает увидеть проекты react и cordova. Самый простой способ инициализировать проект заключается в этой команде. 
Будут инициализированы вышеупомянутые папки и в cordova будет добавлена платформа browser.
#### Before
В `package.json` присутствует скрипт `before`, необходимый для компиляции скриптов с учетом интеграции проекта в бекенд Битрикса. На данный момент от него зависит запуск загрузочного экрана.
Для каждой отдельной платформы должен быть свой `before`


#### Связанные репозитории
https://github.com/DeveloperMaximum/parking.template (Дизайн)
<br />
https://github.com/orchoban/react.cordova (Reco)
<br />
https://github.com/chrvadala/react-svg-pan-zoom (Работа с SVG)
<br />
https://github.com/nufaylr/react-svg-pan-zoom-loader (Работа с динамическим SVG)
