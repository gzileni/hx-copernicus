# HX-WHARP

## Available Scripts

In the project directory, you can run:

```bash
npm run dev
```

To start the app in dev mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

```bash
npm start
```

For production mode

```bash
npm run test
```

Run the test cases.

## Documentation

The [API documentation](https://apiwharp.hextra.dev/documentation) is available or you can download the [PostMan workspace](./postman/WHARP.postman_collection)

## Examples

### Assets

- Filter by GeoJSON:

```javascript
var axios = require('axios');
var data = JSON.stringify({
  "filter": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          7.265396118164062,
          45.687715074360916
        ],
        [
          7.414398193359375,
          45.687715074360916
        ],
        [
          7.414398193359375,
          45.76153533782943
        ],
        [
          7.265396118164062,
          45.76153533782943
        ],
        [
          7.265396118164062,
          45.687715074360916
        ]
      ]
    ]
  }
});

var config = {
  method: 'post',
  url: 'http://localhost:3001/api',
  headers: { 
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  maxRedirects: 0,
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

- Filter by Coordinate

```javascript
var axios = require('axios');
var data = JSON.stringify({
  "coordinates": [
    7.265396118164062,
    45.687715074360916
  ]
});

var config = {
  method: 'post',
  url: 'http://localhost:3001/api',
  headers: { 
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  maxRedirects: 0,
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

- Filter by BBOX:

```javascript
var axios = require('axios');
var data = JSON.stringify({
  "bbox": [
    7.265396118164062,
    45.687715074360916,
    7.414398193359375,
    45.697715074360914
  ]
});

var config = {
  method: 'post',
  url: 'http://localhost:3001/api',
  headers: { 
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  maxRedirects: 0,
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```
