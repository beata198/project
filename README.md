# API - sklep longboardowy
> API zrobione w JS z Node.js i MongoDB

## Spis treści
* [Info](#info)
* [Technologie](#technologie)
* [Instalacja](#instalacja)
* [Baza](#baza)
* [Zabezpieczenia](#zabezpieczenia)
* [Pomocne_strony](#pomocne_strony)
* [Status_projektu](#status_projektu)
* [Inspiracja](#inspiracja)
* [Kontakt](#kontakt)

## Info
Projekt powstał w ramach zajęć na uczelni. 
Jest to API napisane w JS, zawierający bazę danych, routing, zabezpieczenia.


## Technologie

* Mongodb - version 3.6.3
* Node.js - version 14.14.20
* Bcrypt - version 5.0.0
* Body-parser - version 1.19.0
* Express - version 4.17.1
* Jsonwebtoken - version 8.5.1
* Mongoose version 5.11.11
* Nodemon - version 2.06
* Morgan - version 1.10.0
* Multer - version 1.42
* Postman - version 7.36.1

## Instalacja
By uruchomić projekt użyj:

```
 cd sklep
 npm start
```

## Baza
```
-> sklep 
     - products
        name type string
        price type number
        prodImage type file
     - users
        email type string
        password type string
```

**Wyświetlenie zawartości bazy danych** - metoda GET \
`http://localhost:3000/products`

**Logowanie użytkownika** + otrzymanie tokenu (np z użyciem Postman) - metoda POST \
`localhost:3000/users/login` 
```
{
    "email":"admin@admin.pl",
    "password":"admin"
}
```

\
**Rejestracja użytkownika** - metoda POST \
`localhost:3000/users/signup`

```
{
    "email":"...",
    "password":"..."
}
```
\
**Dodawanie produktów do bazy** - metoda POST \
`localhost:3000/products`
```
{
    "name":"...",
    "price":"...",
    "prodImage":"..." /type file
} 
```
\
**Usuwanie produktu po id** - metoda DELETE \
`localhost:3000/products/$id`

\
**Usuwanie użytkownika po id** - metoda DELETE \
`localhost:3000/users/$id`

**Zmiana danych produktu po id** - metoda PATCH \
`localhost:3000/products/$id`

\
**Wyświetlanie szczegółów produktu po id** - metoda GET \
`localhost:3000/products/$id`


## Zabezpieczenia
* JSONWEBTOKEN - autoryzacja
* Bcrypt - zahaszowanie hasła
* Złożoność email'a
```
match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
oraz unique: true
```
* Ustawienie limitu do dodawanych zdjęć do bazy
```
file.mimetype == "image/jpeg" || file.mimetype == "image/png"
limits: { fileSize: 1024 * 1024 * 5 }
```

## Pomocne_strony


* https://jwt.io/
* https://www.npmjs.com/


## Status_projektu
Projekt jest: _inProgress_


## Inspiracja
Ta aplikacja powstała na podstawie zajęć na uczelni \
z dr Dariuszem Kralewskim.

## Kontakt
Beata Lublewska \
:mailbox: b.lublewska@gmail.com
