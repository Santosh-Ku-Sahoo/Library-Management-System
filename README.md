# library management system

    This is a library management API backend for the management of books.

# Routes and the endpoints

## /users
GET : Get all  the list of users in the system 
POST : Create a new user in the system

## /users/{id}
GET : Get user by their ID
PUT : Update user by their ID
DELETE : Delete user by their ID (check if the user has any issued  books) && (is there any fine to be paid)

## /users/subscription-details/{id}
GET : Get a user subscription details by their ID
    >> Date of subscription
    >> Date of expiry
    >> Fine to be paid

# /books
GET : Get all the list of books in the system
POST : Create a new book in the system

## /books/{id}
GET : Get book by their ID
PUT : Update book by their ID
DELETE : Delete book by their ID (check if the book is issued)

## /books/issued 
GET : Get all the list of issued books in the system
POST : Create a new issued book in the system

## /books/issued/withFine
GET : Get issued book with fine


### Subscription Types
    >> Basic (3 months)
    >> Standard (6 months)
    >> Premium (12 months)

> > If a user missed the renewal date, then user should be collected with $100
> > If a user misses his subscription,the user is expected to pay $100
> > If a user misses both renewal & subscription, then the collected amount should be $200

## Commands:
    >> npm init
    >> npm i express
    >> npm i nodemon --save-dev //-> It saves nodemon as a tool used only for local code development, whereas npm i nodemon saves it as a core requirement needed for the final live application to run
        >>Why You Should Use --save-dev
        >>Smaller production size: Production servers can skip downloading it by running npm install --production, saving time, bandwidth, and storage.
        >>Security & stability: You do not want a live web utility watching file modifications or consuming extra container memory on a cloud production server.
        >>Industry standard: Web deployment tools (like PM2) handle server crashes on live environments, making nodemon useless there

for restoration of node module files use >> : npm i/npm install