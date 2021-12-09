var mysql = require('mysql');

class cli_bd {

  constructor(){

    var where_interno = "";
    if (global.PRODUCTOS_STOCK == 'false') {
      where_interno = "AND XNPV_productos_proveedores.`xnprp_existencia` > 0";
    }

    var iva = 1;
    var regla_utilidad = "";
    (global.BM_ivaproducts=='true') ? iva = 1+parseFloat(global.BM_IVA) : iva = 1;

    if (global.tipo_utilidad == "UxV") {

      regla_utilidad = `
            CONCAT(
            '/',
            ECPR_subcategorias.ecsca_url,
            '/',
            ECPR_productos.ecpro_url
            ) AS url,
            (
            CASE
                WHEN (XNPR_productos_listas.xntrl_id = 1) THEN ( (  (XNPV_productos_proveedores.xnprp_costo)*`+iva+`)/(1-(XNPR_productos_listas.xnprl_valor/100)) )
                WHEN (XNPR_productos_listas.xntrl_id = 2) THEN (XNPR_productos_listas.xnprl_valor + XNPV_productos_proveedores.xnprp_costo)*`+iva+`
                ELSE XNPR_productos_listas.xnprl_valor
            END
            ) AS precio_producto_real,
            REPLACE(FORMAT((
                CASE
                    WHEN (XNPR_productos_listas.xntrl_id = 1) THEN ( ( (XNPV_productos_proveedores.xnprp_costo)*`+iva+`)/(1-(XNPR_productos_listas.xnprl_valor/100) ) )
                    WHEN (XNPR_productos_listas.xntrl_id = 2) THEN (XNPR_productos_listas.xnprl_valor + XNPV_productos_proveedores.xnprp_costo)*`+iva+`
                    ELSE XNPR_productos_listas.xnprl_valor
                END),2
            ),',','')
            AS precio_producto,
      `;

    }else{

      regla_utilidad = `
      CONCAT(
          '/',
          ECPR_subcategorias.ecsca_url,
          '/',
          ECPR_productos.ecpro_url
          ) AS url,
          (
          CASE
              WHEN (XNPR_productos_listas.xntrl_id = 1) THEN ( ((XNPR_productos_listas.xnprl_valor * XNPV_productos_proveedores.xnprp_costo)/100)+XNPV_productos_proveedores.xnprp_costo)*`+iva+`
              WHEN (XNPR_productos_listas.xntrl_id = 2) THEN (XNPR_productos_listas.xnprl_valor + XNPV_productos_proveedores.xnprp_costo) * `+iva+`
              ELSE XNPR_productos_listas.xnprl_valor
          END
          ) AS precio_producto_real,

          REPLACE(FORMAT((
              CASE
                  WHEN (XNPR_productos_listas.xntrl_id = 1) THEN(((XNPR_productos_listas.xnprl_valor * XNPV_productos_proveedores.xnprp_costo) / 100) + XNPV_productos_proveedores.xnprp_costo) *`+iva+`
                  WHEN (XNPR_productos_listas.xntrl_id = 2) THEN (XNPR_productos_listas.xnprl_valor + XNPV_productos_proveedores.xnprp_costo) *`+iva+`
                  ELSE XNPR_productos_listas.xnprl_valor
              END),2
           ),',','')
           AS precio_producto,
      `;

    }

    this.QUERY_BASE = `SELECT DISTINCT
    TABLE_TEMP.coin AS coin,
    TABLE_TEMP.calificacion AS calificacion,
    TABLE_TEMP.ecpro_descripcion_html AS ecpro_descripcion_html,
    TABLE_TEMP.ecpro_metadescripcion AS ecpro_metadescripcion,
    TABLE_TEMP.xnpro_id AS xnpro_id,
    TABLE_TEMP.ecpro_id AS ecpro_id,
    TABLE_TEMP.ecpro_nombre AS ecpro_nombre,
    TABLE_TEMP.xnpro_sku AS xnpro_sku,
    TABLE_TEMP.ecmar_id AS ecmar_id,
    TABLE_TEMP.ecmar_jpg_thumbnail AS ecmar_jpg_thumbnail,
    TABLE_TEMP.ecmar_webp_thumbnail AS ecmar_webp_thumbnail,
    TABLE_TEMP.ecmar_jpg_avatar AS ecmar_jpg_avatar,
    TABLE_TEMP.ecmar_webp_avatar AS ecmar_webp_avatar,
    TABLE_TEMP.ecmar_nombre AS ecmar_nombre,
    TABLE_TEMP.xnpri_jpg_avatar AS xnpri_jpg_avatar,
    TABLE_TEMP.xnpri_jpg_grande AS xnpri_jpg_grande,
    TABLE_TEMP.xnpri_jpg_mediana AS xnpri_jpg_mediana,
    TABLE_TEMP.xnpri_jpg_thumbnail AS xnpri_jpg_thumbnail,
    TABLE_TEMP.xnpri_jpg_xgrande AS xnpri_jpg_xgrande,
    TABLE_TEMP.xnpri_webp_avatar AS xnpri_webp_avatar,
    TABLE_TEMP.xnpri_webp_grande AS xnpri_webp_grande,
    TABLE_TEMP.xnpri_webp_mediana AS xnpri_webp_mediana,
    TABLE_TEMP.xnpri_webp_thumbnail AS xnpri_webp_thumbnail,
    TABLE_TEMP.xnpri_webp_xgrande AS xnpri_webp_xgrande,
    TABLE_TEMP.xnprp_existencia AS xnprp_existencia,
    TABLE_TEMP.fecha_creacion_producto AS fecha_creacion_producto,
    TABLE_TEMP.product_url AS product_url,
    TABLE_TEMP.url AS url,
    TABLE_TEMP.ecprs_principal AS categoria_principal,
    TABLE_TEMP.precio_producto_real AS precio_producto_real,
    TABLE_TEMP.precio_producto AS precio_producto,
    TABLE_TEMP.xnlip_clave AS xnlip_clave,
    TABLE_TEMP.xnlip_id AS xnlip_id,
    1 AS eccat_id,
    TABLE_TEMP.ecsca_id AS ecsca_id,
    TABLE_TEMP.ecsca_nombre AS ecsca_nombre,
    TABLE_TEMP.ecsca_descripcion AS ecsca_descripcion,
    TABLE_TEMP.ecsca_clave AS ecsca_clave,
    TABLE_TEMP.xnprv_id AS xnprv_id,
    TABLE_TEMP.xnprv_clave AS xnprv_clave,
    TABLE_TEMP.xnprp_referencia AS referencia,
    TABLE_TEMP.url_scat AS url_scat,
    TABLE_TEMP.ecsca_url AS ecsca_url,
    TABLE_TEMP.ecmar_url AS ecmar_url,
    (CASE WHEN(TABLE_TEMP.xntrl_id_descuentos = 4)
    THEN ((TABLE_TEMP.precio_producto_real * TABLE_TEMP.xnprl_valor_descuentos) / 100)
    WHEN (TABLE_TEMP.xntrl_id_descuentos = 5)
    THEN TABLE_TEMP.xnprl_valor_descuentos
    ELSE 0 END
    ) AS precio_descuento,
    ( CASE WHEN (TABLE_TEMP.xntrl_id_descuentos = 4)
    THEN 'margen'
    WHEN (
    TABLE_TEMP.xntrl_id_descuentos = 5
    )
    THEN 'valor'
    ELSE ''
    END
    ) AS tipo_descuento,
    IF(CURDATE()>=xnprl_fecha_inicio_descuento AND CURDATE()<=xnprl_fecha_fin_descuento,1,0) descuento_valido,
    IF(CURDATE()=xnprl_fecha_fin_descuento,1,0) ultimo_dia_descuento,
    TABLE_TEMP.xnprl_valor_descuentos AS descuento,
    TABLE_TEMP.xnprl_fecha_inicio_descuento AS xnprl_fecha_inicio_descuento,
    TABLE_TEMP.xnprl_fecha_fin_descuento AS xnprl_fecha_fin_descuento,
    TABLE_TEMP.xnlop_envio AS xnlop_envio,
    IF(xnlop_envio=0,1,0) envio_gratis
    FROM
    (SELECT
    'MXN' AS coin,
    '4' AS calificacion,
    SUBSTR(
    ECPR_productos.ecpro_descripcion_html,
    1,
    100
    ) AS ecpro_descripcion_html,
    ECPR_productos.ecpro_metadescripcion AS ecpro_metadescripcion,
    ECPR_productos.xnpro_id AS xnpro_id,
    ECPR_productos.ecpro_id AS ecpro_id,
    ECPR_productos.ecpro_nombre AS ecpro_nombre,
    XNPR_productos.xnpro_sku AS xnpro_sku,
    ECPR_marcas.ecmar_id AS ecmar_id,
    ECPR_marcas.ecmar_jpg_thumbnail AS ecmar_jpg_thumbnail,
    ECPR_marcas.ecmar_webp_thumbnail AS ecmar_webp_thumbnail,
    ECPR_marcas.ecmar_jpg_avatar AS ecmar_jpg_avatar,
    ECPR_marcas.ecmar_webp_avatar AS ecmar_webp_avatar,
    ECPR_marcas.ecmar_nombre AS ecmar_nombre,
    XNPR_imagenes.xnpri_jpg_avatar AS xnpri_jpg_avatar,
    XNPR_imagenes.xnpri_jpg_grande AS xnpri_jpg_grande,
    XNPR_imagenes.xnpri_jpg_mediana AS xnpri_jpg_mediana,
    XNPR_imagenes.xnpri_jpg_thumbnail AS xnpri_jpg_thumbnail,
    XNPR_imagenes.xnpri_jpg_xgrande AS xnpri_jpg_xgrande,
    XNPR_imagenes.xnpri_webp_avatar AS xnpri_webp_avatar,
    XNPR_imagenes.xnpri_webp_grande AS xnpri_webp_grande,
    XNPR_imagenes.xnpri_webp_mediana AS xnpri_webp_mediana,
    XNPR_imagenes.xnpri_webp_thumbnail AS xnpri_webp_thumbnail,
    XNPR_imagenes.xnpri_webp_xgrande AS xnpri_webp_xgrande,
    XNPV_productos_proveedores.xnprp_existencia AS xnprp_existencia,
    XNPV_productos_proveedores.xnprv_id AS xnprv_id,
    XNPV_productos_proveedores.xnprp_referencia AS xnprp_referencia,
    XNPV_proveedores.xnprv_clave,
    ECPR_productos.fecha_creacion AS fecha_creacion_producto,
    ECPR_productos.ecpro_url AS product_url,
    ECPR_productos_subcategorias.ecprs_principal AS ecprs_principal,
    `+regla_utilidad+`
    XNPR_productos_listas.xntrl_id_descuentos AS xntrl_id_descuentos,
    XNPR_productos_listas.xnprl_valor_descuentos AS xnprl_valor_descuentos,
    XNPR_productos_listas.xnprl_fecha_inicio_descuento,
    XNPR_productos_listas.xnprl_fecha_fin_descuento,
    XNPR_logistica_productos.xnlop_envio AS xnlop_envio,
    XNPR_listas_precios.xnlip_clave AS xnlip_clave,
    XNPR_listas_precios.xnlip_id AS xnlip_id,

    ECPR_subcategorias.ecsca_id AS ecsca_id,
    ECPR_subcategorias.ecsca_nombre AS ecsca_nombre,
    ECPR_subcategorias.ecsca_clave AS ecsca_clave,
    ECPR_subcategorias.ecsca_descripcion AS ecsca_descripcion,
    CONCAT(
    ECPR_subcategorias.ecsca_url
    ) AS url_scat,
    ECPR_subcategorias.ecsca_url AS ecsca_url,
    CONCAT(
    ECPR_marcas.ecmar_url,
    '/',
    ECPR_subcategorias.ecsca_url
    ) AS ecmar_url
    FROM
    ECPR_productos
    JOIN ECPR_marcas ON  ECPR_marcas.ecmar_id = ECPR_productos.ecmar_id
    JOIN XNPR_productos ON  XNPR_productos.xnpro_id = ECPR_productos.xnpro_id
    JOIN XNPV_productos_proveedores ON  XNPV_productos_proveedores.xnpro_id = ECPR_productos.xnpro_id AND  XNPV_productos_proveedores.xnppe_id > 3
    JOIN XNPV_proveedores ON XNPV_productos_proveedores.xnprv_id = XNPV_proveedores.xnprv_id
    JOIN XNPR_productos_listas ON  XNPR_productos_listas.xnpro_id = XNPR_productos.xnpro_id
    JOIN XNPR_listas_precios ON  XNPR_listas_precios.xnlip_id = XNPR_productos_listas.xnlip_id
    JOIN ECPR_productos_subcategorias ON ECPR_productos_subcategorias.ecpro_id = ECPR_productos.ecpro_id
    JOIN ECPR_subcategorias ON ECPR_subcategorias.ecsca_id = ECPR_productos_subcategorias.ecsca_id
    JOIN ECPR_subcategorias_grupos ON  ECPR_subcategorias_grupos.ecsca_id = ECPR_subcategorias.ecsca_id
    JOIN XNPR_imagenes ON  XNPR_imagenes.xnpri_id = XNPR_productos.xnpri_id
    JOIN XNPR_logistica_productos ON  XNPR_logistica_productos.xnpro_id = XNPR_productos.xnpro_id
    WHERE 1 AND ECPR_productos.ecpro_estatus = 1  `;


    this.QUERY_WHERE_INTERNO = `) TABLE_TEMP
    LEFT JOIN ECPR_productos_areas_uso ON ECPR_productos_areas_uso.ecpro_id = TABLE_TEMP.ecpro_id
    LEFT JOIN ECPR_productos_valores ON ECPR_productos_valores.ecpro_id = TABLE_TEMP.ecpro_id
    LEFT JOIN ECCL_productos_favoritos ON ECCL_productos_favoritos.ecpro_id = TABLE_TEMP.ecpro_id AND eccli_id = ''
    `;

    this.QUERY_WHERE_EXTERNA = ` WHERE 1 AND precio_producto > 0   `;

    this.QUERY_COMPLETA = this.QUERY_BASE+this.QUERY_WHERE_INTERNO+this.QUERY_WHERE_EXTERNA;
  }


  conectar(DB_HOST="",DB="",USER="",PASS=""){
    if (DB_HOST == "") {
      DB_HOST = global.DB_HOST;
      DB = global.DB;
      USER = global.USER;
      PASS = global.PASS;
    }

    return mysql.createPool({
      host : DB_HOST,
      database : DB,
      user : USER,
      password : PASS
    });
  }

  query(WHERE_1="",WHERE_2=""){


    var query_completa = this.QUERY_BASE+this.QUERY_WHERE_INTERNO+WHERE_1+this.QUERY_WHERE_EXTERNA+WHERE_2;

    return query_completa;
  }
}
module.exports = cli_bd;


