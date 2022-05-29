/**
 * 
 * @param {*} filter 
 * @returns 
 */
const sql_by_geojson = (filter) => {
    return `SELECT ST_AsText(ST_GeomFromGeoJSON('${JSON.stringify(filter)}')) As wkt`;
}

/**
 * calculate area by geojson
 * @param {*} filter 
 * @returns 
 */
const area_by_geojson = (filter) => {
    return `SELECT ST_AREA(ST_GeomFromGeoJSON('${JSON.stringify(filter)}')) As area`;
}

/**
 * 
 * @param {*} geometries 
 * @returns 
 */
const sql_by_difference = (geometries) => {

    const g = geometries.join(',')

    const sql = `SELECT ST_AsText(
    ST_SymDifference(${g}));`;

    return sql
}

/**
 * 
 * @param {*} asset 
 * @param {*} srid 
 * @param {*} geometry 
 * @returns 
 */
const sql_assets_difference_area = (asset, srid, geometry) => {

    let sql = `SELECT DISTINCT ST_AREA(
               ST_Difference(
                      ST_TRANSFORM(ST_GeomFromText(
                '${geometry}',${srid}),${srid}),
                ST_TRANSFORM(geom, ${srid}))) 
                FROM gis_data.${asset.key}` 

    return sql;
}

/**
 * 
 * @param {*} asset 
 * @param {*} srid 
 * @param {*} geometry 
 * @returns 
 */
const sql_assets = (asset, srid, geometry) => {

    let sql = `SELECT * FROM gis_data.${asset.key} WHERE ST_Intersects(
                      ST_TRANSFORM(ST_GeomFromText(
                '${geometry}',${srid}),${srid}),
                ST_TRANSFORM(geom, ${srid}))` 
    
    return get_sql_by_geojson(sql);
}

/**
 * 
 * @param {*} client 
 * @param {*} geojson 
 * @returns 
 */
const geometry_from_json = async (client, filter) => {

    return new Promise((resolve, reject) => {
        let sql = `SELECT ST_AsText(ST_GeomFromGeoJSON('${JSON.stringify(filter)}')) As wkt`;
        client.query(sql, function onResult (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows);
            }
        })
    })
}

const get_sql_by_geojson = (sql) => {

    let s = `SELECT json_build_object(
            'type', 'FeatureCollection',
            'features', json_agg(ST_AsGeoJSON(t.*)::json)
            )
            FROM ( ${sql}) as t(geom);`
    return s;
} 

/**
 * 
 * @param {*} client 
 * @param {*} sql 
 * @returns 
 */
const geojson_from_sql = async (client, sql) => {

    return new Promise((resolve, reject) => {
        let s = get_sql_by_geojson(sql);

        client.query(s, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows[0]["jsonb_build_object"]);
            }
        });

    });

}

module.exports = {
    geometry_from_json,
    geojson_from_sql,
    get_sql_by_geojson,
    sql_by_geojson,
    area_by_geojson,
    sql_by_difference,
    sql_assets,
    sql_assets_difference_area
}