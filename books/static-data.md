# 1. Pendahuluan

Di sini diasumsikan kita menggunakan virtual host dengan document root berada di folder `/var/www/project/public` dan diakses melalui `http://public`.

Untuk membuat virtual host, buat file konfigurasinya.

```
$ sudo nano /etc/apache2/sites-available/project.conf
```

Berikut adalah isi file virtual host yang sering digunakan penulis.

```
<VirtualHost *:80>
	ServerName project

	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/project/public

    <Directory />
        Options FollowSymLinks
        AllowOverride All
    </Directory>
    
    <Directory /var/www/project/public/>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Order allow,deny
        allow from all
    </Directory>

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Selanjutnya buat sebuah folder sebagai document rootnya.

```
$ mkdir -p /var/www/project/public
```

Lalu aktifkan virtual host dan reload Apache.

```
$ sudo a2ensite project.conf
$ sudo service apache2 reload
```

## 1.1. Instalasi

Kita awali dengan menginstal Node.js, ini diperlukan untuk menginstal bower. Di mana bower nantinya dipakai untuk menginstal Angular dan dependency yang diperlukan.

```
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

Ini adalah cara menginstal Node.js dengan package manager di Debian. Untuk sistem operasi lain silahkan merujuk situs [Node.js][1].

Selanjutnya, kita instal bower secara global.

```
$ sudo npm install -g bower
```

Sekarang kita sudah siap untuk memasang Angular menggunakan bower.

Buat file konfigurasi bower `.bowerrc`.

```
$ cd /var/www/project/public
$ nano .bowerrc
```

Isi file tersebut adalah.

```
{
    "directory": "libs"
}
```

Di sini kita memberi tahu bower untuk tidak mendownload komponen ke folder defaultnya di `bower_components/` melainkan di folder `libs/`.

Selanjutnya, masih di folder `public/`, kita buat file `bower.json` dengan isi sebagai berikut.

```
{
    "name": "project",
    "version": "0.1",
    "main": "index.html",
    "ignore": [
        "**/.*",
        "libs"
    ],
    "dependencies": {
        "angular": "latest",
        "angular-bootstrap": "latest",
        "bootstrap": "latest"
    }
}
```

Saat menggunakan Angular sebaiknya kita tidak lagi menggunakan jQuery karena Angular sudah mengandung jQuery Lite. Sehingga jika kita ingin menggunakan CSS Framework Bootstrap, maka kita gunakan [UI Bootstrap][2].

Selanjutnya, jalankan perintah `bower install`.

```
$ cd /var/www/project/public
$ bower install
```

## 1.2. Struktur Project

Berikut adalah struktur project yang akan dibuat.

```
/var/www/project/public/
  |
  +-- libs/
  |
  +-- scripts/
  |     |
  |     +-- controllers/
  |     |
  |     +-- services/
  |
  +-- views/
  |
  +-- resources/
```

Untuk membuat struktur folder di atas, buka terminal dan jalankan perintah berikut.

```
$ cd /var/www/project/public
$ mkdir -p ./{scripts/{controllers,services},views,resources}
```

# 2. Mengakses Static Data

Kita tidak akan membuat aplikasi "Hello World" melainkan langsung membuat aplikasi untuk membaca data JSON dan menampilkannya.

Sebelumnya, buka file `bower.json` dan tambahkan Angular Resource sebagai dependencynya.

```
    "dependencies": {
        "angular": "latest",
        "angular-bootstrap": "latest",
        "angular-resource": "latest"
        "bootstrap": "latest"
    }
```

Angular Resource nantinya akan digunakan untuk mengakses file JSON.

Berikut adalah file yang akan kita buat.

1. **`scripts/app.js`** yang berfungsi sebagai starting point. Semua application module didefinisikan di sini.

2. **`scripts/controllers/OrangController.js`** sebagai controller utama.

3. **`scripts/services/OrangFactory.js`** yang secara awam bisa diasosiasikan dengan model pada MVC.

4. **`resources/orang.json`** sebagai sumber datanya.

5. **`index.html`** sebagai view.

## 2.1. Controller, Service, Data dan Views

Untuk memudahkan, setiap module akan dibuat dalam file terpisah. Itulah mengapa sebelumnya kita membuat folder `scripts/controllers/`, `scripts/services/` dll.

Setiap module akan memiliki pola seperti berikut.

```
(function() {

    'use strict';

    angular
        .module('mainModule', [dependencies])
        .controller('SomeController', SomeController);

    function SomeController() {}

})();
```

Menggunakan pola di atas, kita mulai dengan file `scripts/app.js`.

```
(function() {
    
    'use strict';

    angular
        .module('myApp', [
            'ngResource',
            'ui.bootstrap'
        ]);

})();
```

Tidak ada yang aneh di sini, kita hanya mebuat sebuah module utama bernama `myApp` dengan dependency `ngResource` dan `ui.bootstrap`.

Lanjutkan dengan membuat controller.

Berikut adalah isi file `scripts/controllers/OrangController.js`.

```
(function() {

    
    'use strict';

    angular
        .module('myApp')
        .controller('OrangEntries', OrangEntries);

    function OrangEntries(OrangFactory) {

        var vm = this;
        vm.entries = [];

    }

})();
```

Di sini kita mendefinisikan sebuah controller bernama `OrangEntries`. Dan perhatikan function `OrangEntries()` yang memiliki parameter `OrangFactory`. Ini adalah sebuah function dalam factory yang diinject ke dalam controller.

Di dalam block function `OrangEntries()` kita mendefinisikan sebuah array kosong `vm.entries`. Kita menggunakan *capture variable* `vm` (**View Model**) karena ingin menghindari penggunaan *scope variable*.

Selanjutnya kita buat file factory `scripts/services/OrangFactory.js`.

```
(function() {

    
    'use strict';

    angular
        .module('myApp')
        .factory('OrangFactory', OrangFactory);

    function OrangFactory($resource) {

        // ngResource call to our static data
        var entries = $resource('resources/orang.json');

        return {};

    }

})();
```

Di sinilah kita menggunakan Angular Resource untuk mengakses data.

Bagaimana dengan datanya sendiri? Kita buat sekarang dan simpan sebagai file `resources/orang.json`.

```
[
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "comment": "Orang paling galak di kampung."
    },
    {
        "id": 2,
        "first_name": "Bob",
        "last_name": "Smith",
        "comment": "Orang paling ganteng di kampung."
    },
    {
        "id": 3,
        "first_name": "Jane",
        "last_name": "Roe",
        "comment": "Perempuan paling cantik di kampung."
    }
]
```

Terakhir, kita buat `index.html` sebagai viewnya.

```
<!DOCTYPE html>
<html lang="en" ng-app="myApp">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Angular | Static Data</title>
        <link href="libs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container">
            <!-- Daftar orang goes here -->
        </div>

        <!-- Application Dependencies -->
        <script src="libs/angular/angular.min.js"></script>
        <script src="libs/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
        <script src="libs/angular-resource/angular-resource.min.js"></script>

        <!-- Application Scripts -->
        <script src="scripts/app.js"></script>
        <script src="scripts/controllers/OrangController.js"></script>
        <script src="scripts/services/OrangFactory.js"></script>
    </body>
</html>
```

Perhatikan di opening tag `<html>`, di situ kita menulis atribut `ng-app` dengan value nama main module yang sudah kita buat (`myApp`).

## 2.2 Mengakses dan menampilkan data

Jika kita browse ke `http://public` akan tampil halaman kosong. Karena kita memang belum melakukan *fetching data*.

Buka lagi file factory `scripts/services/OrangFactory.js` dan lakukan beberapa penambahan baris kode.

```
function OrangFactory($resource) {

    // ngResource call to our static data
    var entries = $resource('resources/orang.json');
    
    function getEntries() {

        // $promise.then allows us to intercept the results
        // which we will use later
        return entries.query().$promise.then(function(results) {
            return results;
        }, function(error) { // Check for errors
            console.log(error);
        });

    }

    return { getEntries: getEntries };

}
```

Factory akan mengembalikan data yang didapat ke controller, selanjutnya buka file controller `scripts/controllers/OrangFactory.js` untuk mengambil data dan menyimpannya ke dalam *capture variable*.

```
function OrangEntries(OrangFactory) {

    var vm = this;
    vm.entries = [];

    // Fetches the entries from the static JSON file
    // and puts the results on the vm.entries array
    OrangFactory.getEntries().then(function(results) {
        vm.entries = results;
        console.log(vm.entries);
    }, function(error) { // Check for errors
        console.log(error);
    });

}
```

Sampai di sini, kita sudah bisa melakukan tes dengan browsing ke `http://project.local` dan mengintip *XHR response*.

Untuk menampilkan data yang tersimpan di variabel array, buka `index.html` dan lakukan beberapa penambahan baris.

```
<div class="container">
    <!-- Daftar orang goes here -->
    <ul ng-controller="OrangEntries as vm">
        <li ng-repeat="orang in vm.entries">
            First Name: {{ orang.first_name }}<br>
            Last Name: {{ orang.last_name }}<br>
            Comment: {{ orang.comment }}
        </li>
    </ul>
</div>
```

[1]: https://nodejs.org/en/download/
[2]: https://angular-ui.github.io/bootstrap/