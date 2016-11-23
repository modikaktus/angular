# 1. Persiapan

Seperti tulisan terdahulu mengenai [**static data**][1], di sini kita menggunakan virtual host dengan document root berada di folder `/var/www/project/public` dan diakses melalui `http://public`.

Saat ini kita tidak membutuhkan Angular Resource karena kita tidak akan mengakses data. Yang kita butuhkan saat ini adalah Angular Route. Untuk itu, buka file `bower.json` dan ubah bagian dependency.

```
"dependencies": {
    "angular": "latest",
    "angular-bootstrap": "latest",
    "angular-route": "latest",
    "bootstrap": "latest"
}
```

Seperti biasa, supaya semua komponen bower didownload di folder `libs`, pastikan file `.bowerrc` berisi kode seperti berikut.

```
{
    "directory": "libs"
}
```

Di terminal, jalankan perintah `bower install`.

## 1.2. Struktur Project

Kali ini kita akan menggunakan struktur folder yang mirip dengan [tulisan sebelumnya][1] tapi dengan menghilangkan folder `resources`. Berikut adalah struktur foldernya.

```
/var/www/project/public/
  |
  +-- libs/
  |
  +-- scripts/
  |     |
  |     +-- controllers/
  |
  +-- views/
```

Untuk membuat struktur di atas, buka terminal dan jalankan perintah berikut.

```
$ cd /var/www/project/public
$ mkdir -p ./{scripts/controllers,views}
```

# 2. Route dan Template

Seperti biasa, kita mulai dengan file `scripts/app.js` untuk mendefinisikan module utama.

```
(function() {

    'use strict';

    angular
        .module('myApp', [
            'ngRoute',
            'ui.bootstrap'
        ]);

})();
```

Dependency untuk aplikasi kita kali ini adalah `ngRoute` dan `ui.bootstrap`.

Lanjutkan dengan controllernya. Kita akan membuat dua buah controller, `HomeController` dan `AboutController`.

Buat file `scripts/controllers/HomeController.js` sebagai berikut.

```
(function() {

    angular
        .module('myApp')
        .controller('HomeController', HomeController);

    function HomeController() {

        var vm = this;
        vm.message = 'This is Home page';

    }

})();
```

Lalu file `scripts/controllers/AboutController.js`.

```
(function() {

    angular
        .module('myApp')
        .controller('AboutController', AboutController);

    function AboutController() {

        var vm = this;
        vm.message = 'This is Aboutpage';

    }

})();
```

Untuk views, kita menggunakan tiga file, yaitu `index.html` yang bisa dikatakan sebagai file layout. Lalu file `views/home.html` dan `views/about.html` sebagai content untuk masing-masing controller.

Untuk file `index.html` ketik kode berikut.

```
<!DOCTYPE html>
<html lang="en" ng-app="myApp">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Angular | Route - Template</title>
        <link href="libs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container">
            <!-- Navigation -->
            <ul class="list-inline">
                <li><a href="/#home">Home</a></li>
                <li><a href="/#about">About</a></li>
            </ul>
            <!-- Content goes here -->
            <div ng-view></div>
        </div>

        <!-- Application Dependencies -->
        <script src="libs/angular/angular.min.js"></script>
        <script src="libs/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
        <script src="libs/angular-resource/angular-resource.min.js"></script>

        <!-- Application Scripts -->
        <script src="scripts/app.js"></script>
        <script src="scripts/controllers/HomeController.js"></script>
        <script src="scripts/controllers/AboutController.js"></script>
    </body>
</html>
```

Lalu untuk file `views/home.html`.

```
<div ng-controller="HomeController as vm">
    {{ vm.message }}
</div>
```

dan view terakhir `views/about.html`.

```
<div ng-controller="AboutController as vm">
    {{ vm.message }}
</div>
```

Perhatikan file `index.html`, di sana kita membuat sebuah layer `<div>` dengan atribut ng-view.

Jika kita jalankan melalui browser, maka akan muncul halaman kosong karena kita memang belum memberitahu controller mana yang akan dijalankan. Untuk itu kita akan melakukan routing. Buka lagi file `app.js` dan tambahkan routing di situ.

```
(function() {

    'use strict';

    angular
        .module('myApp', [
            'ngRoute',
            'ui.bootstrap'
        ])

        // Configure our routes
        .config(function($routeProvider) {

            $routeProvider
                .when('/home', {
                    templateUrl: 'home.html',
                    controller: 'HomeController'
                })
                .when('/about', {
                    templateUrl: 'about.html',
                    controller: 'AboutController'
                })
                .otherwise({
                    redirectTo: '/home'
                });

        });

})();
```

Sekarang, coba test melalui browser. Akses URL `http://project/#home/` dan `http://project/#about/`

Angular akan menambahkan tanda `#` di URL, untuk menghilangkannya buka lagi file `scripts/app.js` dan ubah sedikit sehingga menjadi seperti berikut.

```
        // Configure our routes
        .config(function($routeProvider, $locationProvider) {
        
            $locationProvider.html5(true);

            ...dst
```

Lantas buka lagi file `index.html` dan tambahkan `<base href="/">` di antara tag `<head>` dan `</head>`.

```
    <head>
        <base href="/">
        ...dst
    </head>
```

Tapi saat kita merefresh halaman, muncul 404. Untuk itu, kita buat sebuah file `.htaccess`.

```
$ cd /var/www/project/public
$ nano .htaccess
```

Isi dengan kode berikut.

```
RewriteEngine On
Options FollowSymLinks

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /#/$1 [L]
```

Script yang ada di sini bisa didownload dari [GitHub][2].

[1]: https://github.com/modikaktus/angular/blob/master/books/static-data.md
[2]: https://github.com/modikaktus/angular