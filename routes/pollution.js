'use strict'

const _ = require("lodash");
const assets = require('../config.js')["assets"]
const turf = require('@turf/turf');

module.exports = async (fastify, opts) => {

    const bodySchema = {
        $id: 'wharpSchemaAssets',
        type: 'object',
        title: 'WHARP Schema ASSETS',
        properties: {
            filter: { 
                type: 'object'
            },
            coordinates: {
                type: 'array',
                items: {
                    type: "number"
                },
                minItems: 2,
                uniqueItems: true
            },
            bbox: {
                type: 'array',
                items: {
                    type: "string"
                },
                minItems: 4,
                uniqueItems: true
            },
            srid: {
                type: 'string'  //4326 (DEFAULT)
            },
            range: {
                type: 'array',  // Format YYYY-MM-DD
                items: {
                    type: "string"
                },
                minItems: 2,
                uniqueItems: true
            },
            pollution: {
                type: 'string',
                enum: ['CO', 'NO2', 'SO2', 'CH4', 'HCHO', 'AER']
            }
        },
        oneOf: [
            {
                required: [
                    "filter"
                ]
            },
            {
                required: [
                    "coordinates"
                ]
            },
            {
                required: [
                    "bbox"
                ]
            }
        ],
        allOf: [
            {    
                required: [
                    "range"
                ]
            },
            {    
                required: [
                    "pollution"
                ]
            }
        ]
    }

    let db;
    let filter;
    let result = null;
    
    const responseSchema = {
        response: {
            200: {
                title: "Geo JSON object",
                description: "Schema for a Geo JSON object",
                type: "object",
                required: [ "type" ],
                oneOf: [
                    { "$ref": "#/definitions/geometry" },
                    { "$ref": "#/definitions/geometryCollection" },
                    { "$ref": "#/definitions/feature" },
                    { "$ref": "#/definitions/featureCollection" }
                ],
                definitions: {
                    geometry: {
                        title: "geometry",
                        description: "One geometry as defined by GeoJSON",
                        type: "object",
                        required: [ "type", "coordinates" ],
                        oneOf: [
                            {
                                title: "Point",
                                properties: {
                                    type: { "enum": [ "Point" ] },
                                    coordinates: { "$ref": "#/definitions/position" }
                                }
                            },
                            {
                                title: "MultiPoint",
                                properties: {
                                    type: { "enum": [ "MultiPoint" ] },
                                    coordinates: { "$ref": "#/definitions/positionArray" }
                                }
                            },
                            {
                                title: "LineString",
                                properties: {
                                    type: { "enum": [ "LineString" ] },
                                    coordinates: { "$ref": "#/definitions/lineString" }
                                }
                            },
                            {
                                title: "MultiLineString",
                                properties: {
                                    type: { "enum": [ "MultiLineString" ] },
                                    coordinates: {
                                        type: "array",
                                        items: { "$ref": "#/definitions/lineString" }
                                    }
                                }
                            },
                            {
                                title: "Polygon",
                                properties: {
                                    type: { "enum": [ "Polygon" ] },
                                    coordinates: { "$ref": "#/definitions/polygon" }
                                }
                            },
                            {
                                title: "MultiPolygon",
                                properties: {
                                    type: { "enum": [ "MultiPolygon" ] },
                                    coordinates: {
                                        type: "array",
                                        items: { "$ref": "#/definitions/polygon" }
                                    }
                                }
                            }
                        ],
                        definitions: {
                            position: {
                                description: "A single position",
                                type: "array",
                                minItems: 2,
                                items: [ { "type": "number" }, { "type": "number" } ],
                                additionalItems: false
                            },
                            positionArray: {
                                description: "An array of positions",
                                type: "array",
                                items: { "$ref": "#/definitions/position" }
                            },
                            lineString: {
                                description: "An array of two or more positions",
                                allOf: [
                                    { "$ref": "#/definitions/positionArray" },
                                    { minItems: 2 }
                                ]
                            },
                            linearRing: {
                                description: "An array of four positions where the first equals the last",
                                allOf: [
                                    { "$ref": "#/definitions/positionArray" },
                                    { minItems: 4 }
                                ]
                            },
                            polygon: {
                                description: "An array of linear rings",
                                type: "array",
                                items: { "$ref": "#/definitions/linearRing" }
                            }
                        }
                    },
                    geometryCollection: {
                        title: "GeometryCollection",
                        description: "A collection of geometry objects",
                        required: [ "geometries" ],
                        properties: {
                            type: { "enum": [ "GeometryCollection" ] },
                            geometries: {
                                type: "array",
                                items: { "$ref": "#/definitions/geometry" }
                            }
                        }
                    },
                    feature: {
                        title: "Feature",
                        description: "A Geo JSON feature object",
                        required: [ "geometry", "properties" ],
                        properties: {
                            type: { "enum": [ "Feature" ] },
                            geometry: {
                                oneOf: [
                                    { type: "null" },
                                    { "$ref": "#/definitions/geometry" }
                                ]
                            },
                            properties: { "type": [ "object", "null" ] }
                        }
                    },
                    featureCollection: {
                        title: "FeatureCollection",
                        description: "A Geo JSON feature collection",
                        required: [ "features" ],
                        properties: {
                            type: { enum: [ "FeatureCollection" ] },
                            features: {
                                type: "array",
                                items: { "$ref": "#/definitions/feature" }
                            }
                        }
                    }
                }
            }
        }
    }

    const schema = {
        body: bodySchema,
        response: responseSchema
    }
        
    fastify.setErrorHandler ((error, request, reply) => {
        // Send error response
        console.error('setErrorHandler: ' + JSON.stringify(error));
        reply.status(409).send(error);
    });

    fastify.addHook('onError', async (request, reply, error) => {
        // Useful for custom error logging
        // You should not use this hook to update the error
        console.error('onError: ' + JSON.stringify(error));
        reply.status(409).send(error);
    });

    /**
     * 
     */
    fastify.addHook('onRequest', async (request, reply) => {
        db = await fastify.pg.connect()
    });
    
    /**
     * 
     */
    fastify.addHook('preHandler', async (request, reply) => {

        reply.header("Access-Control-Allow-Origin", "*");
        reply.header("Access-Control-Allow-Methods", "POST");

        if (request.body.filter == null || request.body.filter == undefined || request.body.filter == {}) {
            if (request.body.bbox != null && request.body.bbox != undefined) {
                filter = turf.getGeom(turf.bboxPolygon(request.body.bbox));
            } else if (request.body.coordinates != null && request.body.coordinates != undefined) {
                filter = turf.getGeom(turf.point(request.body.coordinates));
            } else {
                reply.code(400).send('Must have one data filter, coordinates or bbox.');
            }
        } else {
            filter = turf.getGeom(request.body.filter)
        };

        const geom_sql = fastify.sql.sql_by_geojson(filter);
        const { rows } = await db.query(geom_sql);
        const geometry = rows[0].wkt;
        const srid = request.body.srid != null && request.body.srid != undefined ? 
                     request.body.srid : 
                     '4326'
        
        let table = '';
        const schema = 'copernicus';
        switch (request.body.pollution.toUpperCase()) {
            case 'CO':
                table = 'carbonmonoxide'
                break;
            case 'SO2':
                table = 'sulfurdioxide'
                break;
            case 'NO2':
                table = 'nitrogendioxide'
                break;
            case 'HCHO':
                table = 'formaldehyde'
                break;
            case 'CH4':
                table = 'methane'
                break;
            case 'AER':
                table = 'aerosol'
                break;
        }

        let sql = `SELECT * FROM ${schema}.${table}`+
                  ` WHERE ST_Intersects(
                        ST_TRANSFORM(ST_GeomFromText(
                        '${geometry}',${srid}),${srid}),
                        ST_TRANSFORM(geometry, ${srid}))` +
                  ` AND delta_time between '${request.body.range[0]} 00:00:00'::timestamp 
                    AND '${request.body.range[1]} 00:00:00'::timestamp`;
        
        let sql_geojson = `SELECT json_build_object(
            'type', 'FeatureCollection',
            'features', json_agg(ST_AsGeoJSON(t.*)::json)
            )
            FROM ( ${sql}) as t(geometry);`

        result = await db.query(sql_geojson)

    });

    /**
     * 
     */
    fastify.post('/pollution', { schema }, (request, reply) => {
        reply.code(200).send(result.rows[0].json_build_object);
    });
}
