# API Handidonnees


## Getting Started

1. Clone the repo:

```bash

# clone the repo

# move to api folder
cd ./api

```

2. Install the dependencies:

```bash
yarn install
```

3. Set the environment variables:

```bash
cp .env.example .env
```

5. Run the server:

```bash
# Run the server in development
yarn dev
```

6. Run scripts to prefill the database


## Features

-   **Authentication and authorization** for all kind of user (`partner`, `consumer`, `admin`)

## Environment Variables

The environment variables can be found and modified in the `.env.example` file.
Just copy it to `.env` and modify the values.

## API Documentation

`Incoming`

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /v1/auth/register` - register\
`POST /v1/auth/login` - login\
`POST /v1/auth/refresh-tokens` - refresh auth tokens\
`POST /v1/auth/forgot-password` - send reset password email\
`POST /v1/auth/reset-password` - reset password\

> The following concern person authentication

`POST /v1/auth/send-person-otp` - sending otp\
`POST /v1/auth/verify-person-otp` - otp verification\

**User routes**:\
`POST /v1/users` - create a user\
`GET /v1/users` - get all users\
`GET /v1/users/:id` - get user\
`PATCH /v1/users/:id` - update user\
`DELETE /v1/users/:id` - delete user
`GET /v1/users/profile` - get current person information
`PATCH /v1/users/profile` - update current person information

**Region routes**:\
`POST /v1/regions` - create a region\
`GET /v1/regions` - get all regions\
`GET /v1/regions/:id` - get region\
`PATCH /v1/regions/:id` - update region\
`DELETE /v1/regions/:id` - delete region

**Person routes**:\
`POST /v1/persons` - create a person\
`GET /v1/persons` - get all persons\
`GET /v1/persons/:id` - get person\
`PATCH /v1/persons/:id` - update person\
`DELETE /v1/persons/:id` - delete person

**Disability routes**:\
`POST /v1/disailities` - create a disaility\
`GET /v1/disailities` - get all disailities\
`GET /v1/disailities/:id` - get disaility\
`PATCH /v1/disailities/:id` - update disaility\
`DELETE /v1/disailities/:id` - delete disaility

**JobOffer routes**:\
`POST /v1/job-offers` - create a jobOffer\
`GET /v1/job-offers` - get all jobOffers\
`GET /v1/job-offers/:id` - get jobOffer\
`PATCH /v1/job-offers/:id` - update jobOffer\
`DELETE /v1/job-offers/:id` - delete jobOffer

**DisabilityHistory routes**:\
`POST /v1/disaility-histories` - create a disailityHistory\
`GET /v1/disaility-histories` - get all disailityHistories\
`GET /v1/disaility-histories/:id` - get disailityHistory\
`PATCH /v1/disaility-histories/:id` - update disailityHistory\
`DELETE /v1/disaility-histories/:id` - delete disailityHistory

**DArticle routes**:\
`POST /v1/articles` - create a article\
`GET /v1/articles` - get all articles\
`GET /v1/articles/:id` - get article\
`PATCH /v1/articles/:id` - update article\
`DELETE /v1/articles/:id` - delete article

**ArticleCategory routes**:\
`POST /v1/article-categories` - create a articleCategory\
`GET /v1/article-categories` - get all articleCategories\
`GET /v1/article-categories/:id` - get articleCategory\
`PATCH /v1/article-categories/:id` - update articleCategory\
`DELETE /v1/article-categories/:id` - delete articleCategory

**RegistrationRequest routes**:\
`POST /v1/registration-requests` - create a registrationRequest\
`GET /v1/registration-requests` - get all registrationRequests\
`GET /v1/registration-requests/:id` - get registrationRequest\
`PATCH /v1/registration-requests/:id` - update registrationRequest\
`DELETE /v1/registration-requests/:id` - delete registrationRequest