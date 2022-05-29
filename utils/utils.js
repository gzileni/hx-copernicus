const _ = require("lodash");
const turf = require('@turf/turf')

const _get_point_filter = (filter) => {
    let point;
    const geom = turf.getGeom(filter).type.toUpperCase();
    switch (geom) {
        case 'POLYGON':
        case 'MULTIPOLYGON':  
            point = turf.centroid(filter);  
            break;
        case 'LINE':
        case 'LINESTRING':
            point = turf.center(filter)
            break;
        case 'POINT':
        case 'MULTIPOINT':
            point = filter
            break;
        default:
            point = filter
            break;
    }

    return point;

}

/**
 * 
 * @param {*} filter 
 * @param {*} feature 
 */
const _measurement_geometries = (point, feature, filter) => {
    
    let result = {};

    const ftGeom = turf.getGeom(feature).type.toUpperCase();
    const coords = turf.getGeom(feature).coordinates;
    const geom = turf.getGeom(filter).type.toUpperCase();

    let units = 'kilometers';
    const options = {
        units: units
    };
    
    switch (ftGeom) {
        case 'POINT':
        case 'MULTIPOINT':
            result['distance'] = turf.distance(turf.point(coords), point, options);
            break;
        case 'LINE':
        case 'LINESTRING':
            result['distance'] = turf.pointToLineDistance(point, feature, options);
            break;
        case 'POLYGON':
        case 'MULTIPOLYGON':
            if (geom == 'POLYGON' || geom == 'MULTIPOLYGON') {
                /** calculate area intersection */
                const intersection = turf.intersect(feature, filter);
                const area_filter = turf.area(filter);
                const area_intersection = turf.area(intersection)
                const perc = ((area_intersection / area_filter) * 100);
                result['perc'] = perc;
                result['area'] = area_intersection;
                result['intersection'] = intersection;
                units = 'meters square';
            } else {
                /** get lenght from polygon center */
                center_poly = turf.centroid(feature);
                if (geom == 'LINE' || geom == 'LINESTRING') {
                    result['distance'] = turf.pointToLineDistance(center_poly, filter, options);
                } if (geom == 'POINT' || geom == 'MULTIPOINT') {
                    result['distance'] = turf.distance(center_poly, point, options);
                }
            }
        default:
            break;
    }
    
    result['units'] = units;
    return result;
    
}

/**
 * 
 * @param {*} rows 
 * @returns 
 */
const get_features_collection = (rows, filter) => {

    let fc = {
        type: "FeatureCollection",
        features: []
    };

    _.forEach(rows, row => {
        
        const item = row.rows[0].json_build_object;
        
        if (item != null && item != undefined && 
            item.features != null && item.features != undefined) {
            turf.featureEach(item, (currentFeature, featureIndex) => {
                if (currentFeature != null && currentFeature != undefined) {
                    currentFeature.properties['index'] = featureIndex;
                    const point = _get_point_filter(filter);    
                    currentFeature.properties['result'] = _measurement_geometries(point, currentFeature, filter);
                    fc.features.push(currentFeature);
                }
            });
        }
    });

    return fc
}

const convert_features_collection_polygon = (geojson) => {

    let fc = {
        type: "FeatureCollection",
        features: []
    }

    let points = []
    let lines = []

    if (geojson.features != null && geojson.features != undefined && _.size(geojson.features) > 0) {
        
        turf.featureEach(geojson, (currentFeature, featureIndex) => {
            /** check type geometry */
            const tGeom = turf.getGeom(currentFeature).type.toUpperCase();
            const coords = turf.getGeom(currentFeature).coordinates;
            
            if (tGeom == 'POINT') {
                const p = turf.point(coords);
                points.push(p);
            } else if (tGeom == 'LINESTRING' || tGeom == 'MULTILINESTRING') {
                const l = turf.lineString(coords)
                lines.push(l);
            } else {
                fc.features.push(currentFeature);
            }
        });

        if (_.size(points) > 0) {
            
            _.forEach(points, point => {
                let options = { steps: 64, units: 'kilometers', properties: point.properties };
                let circle = turf.circle(point, 1, options);
                if (circle != null && circle != undefined) {
                    fc.features.push(circle);
                }
            })
        
        }

        if (_.size(lines) > 0) {
            const lp = turf.featureCollection(lines);
            var polygon = turf.polygonize(lp);
            if (polygon != null && polygon != undefined) {
                fc.features.push(polygon);
            }
        };


    }

    return fc
}

module.exports = {
    get_features_collection,
    convert_features_collection_polygon
}