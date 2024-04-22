
# JET Coding Assignment

This is a coding assignment for JET Software Engineering Early Career Program.


## The Problem

Using the API provided you will need to send a postcode to return a set of data,
need to filter this data to focus just on the restaurant data which consists of :
- Name
- Cuisines
- Rating - as a number
- Address

## Demo
https://github.com/Lunafreya2/assessment/assets/73529539/7ba96c05-7518-468a-a9b3-46230a74d221

## Tech Stack

- **Client:** Next.js
- **Server:** Next.js API Routes
- **Testing:** Jest
- **Styling:** Tailwind CSS
- **Deployment:** Vercel


## Live Application

The application is deployed on [Vercel](https://assessment-dusky-two.vercel.app/).

## Run Locally

Clone the project

```
  git clone https://github.com/Lunafreya2/assessment
  
```

Go to the project directory

```
  cd assessment
```

Install dependencies

```
  npm install
```

Start the server

```
  npm run dev
```

Start the tests

```
  npm run test
```

The application will start on [localhost:3000](http://localhost:3000)





## Assumptions

- I assumed that "limit your shown data to the first 10 restaurants returned" implied pagination. In other words, to show only ten restaurants on one page.
## Improvements

- UI/UX improvements such as skeleton loading.
- Sorting/Filtering
- More Unit tests to check interface, and to mock the server.

## API Reference

#### Get all restaurants from postcode

```http
    GET /search/${Postcode}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Postcode`      | `string` | The postcode of the restaurants to fetch |


