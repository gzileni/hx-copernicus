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

```bash
curl --location --request POST 'https://apiwharp.hextra.dev/assets' \
--header 'Content-Type: application/json' \
--data-raw '{
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
}'
```

- Filter by Coordinate

```bash
curl --location --request POST 'https://apiwharp.hextra.dev/assets/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "coordinates": [
        7.265396118164062,
        45.687715074360916
    ]
}'
```

- Filter by BBOX:

```bash
curl --location --request POST 'https://apiwharp.hextra.dev/assets' \
--header 'Content-Type: application/json' \
--data-raw '{
    "bbox": [
        7.265396118164062,
        45.687715074360916,
        7.414398193359375,
        45.697715074360916
    ]
}'
```

