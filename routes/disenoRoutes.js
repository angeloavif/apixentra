const express = require('express');
const disenoServices = require('./../services/disenoServices');
const {validaKey} = require('./../middleware/authHandler');
const router = express.Router();
const service = new disenoServices();


router.get('/configuraciones',validaKey, (req,res)=>{

    service.get_configuraciones()
    .then(configuraciones => {

      var conf = {
        name:'API ECOMMERCE',
        global:{
          links:["links_atencion_cliente","links_buscar_por_areas","links_destacados","links_acerca_de","links_contactos","links_nav_principal","links_redes_sociales"],
          dateOfDelivery:{daysMax:5,daysMin:3},
          businessModel:{
               "model": "b2b",
               "showPrices": true,
               "IVA": 0.16,
               "IVAProducts": true
          },
        },
        layout:{
          header:{
               "background" : "#303641",
               "boxShadow" : "0 1px 2px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.12)",
               "avancedStyle" : null,
               "type" : "header-d",
               "iconsColor" : "rgb(123, 123, 123)",
               "logo" : "https://xentra.s3.amazonaws.com/xentra_demo/default/b_demo_logo_bg.png",
               "mobileLogo" : "https://xentra.s3.amazonaws.com/xentra_demo/default/b_demo_logo_bg.png"
          }
       },
       components:{
               menu: {
                       'btnBackground': '',
                       'btnIconColor': '',
                       'btnIcon': 'falfa-bars',
                       'btnTextColor': '',
                       'btnText': '',
                       'btnAvancedStyle': null,
                       'contBackground': '',
                       'contAvancedStyle': '',
                       'categoryNameColor': '',
                       'categoryNameAvancedStyle': 'border-bottom:1px solid #e0e0e0, border-right:1px solid #e0e0e0,',
                       'contSubcategoryBackground': '',
                       'contSubcategoryAvancedStyle': '',
                       'contSubcategoryTitleColor': '',
                       'contSubcategoryTitleBackground': '',
                       'contSubcategoryTitleAvancedStyle': '',
                       'subcategorysNameColor': '',
                       'subcategoryslinksColor': ''
               },
               storeInfo: {
                       'link_list' : true,
                       'btnBackground' : '',
                       'btnIconColor' : '',
                       'btnIcon' : 'fal fa-info-circle',
                       'btnTextColor' : '',
                       'btnText' : '',
                       'btnTextAvancedStyle' : '',
                       'btnAvancedStyle' : null,
                       'globalLinks' : true,
                       'linkKey' : 'links_acerca_de',
                       'linkUrl' : '',
                       'sessionStatus' : false,
                       'contBackground' : '',
                       'contAvancedStyle' : 'box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22),',
                       'showTitle' : true,
                       'titleColor' : '',
                       'titleBackground' : '',
                       'titleAvancedStyle' : '',
                       'showTitleBorder' : true,
                       'titleBorderBackground' : '',
                       'titleBorderWidth' : '',
                       'titleBorderHeight' : '',
                       'titleBorderPositionBottom' : '',
                       'titleBorderPositionLeft' : '',
                       'titleBorderAvancedStyle' : '',
                       'linksColor' : '',
                       'linksBorderBottom' : 'solid 1px rgba(255, 255, 255, 0.7)'
               },
               session:{
                       'btnBackground' : '',
                       'btnIconColor' : '',
                       'btnIcon' : 'fal fa-user',
                       'btnTextColor' : '',
                       'btnText' : '',
                       'btnTextAvancedStyle' : '',
                       'btnAvancedStyle' : null,
                       'contBackground' : '',
                       'contAvancedStyle' : 'box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22),',
                       'showTitle' : true,
                       'titleText' : 'Iniciar sesión',
                       'titleColor' : '',
                       'titleBackground' : '',
                       'titleAvancedStyle' : '',
                       'showTitleBorder' : true,
                       'titleBorderBackground' : '',
                       'titleBorderWidth' : '',
                       'titleBorderHeight' : '',
                       'titleBorderPositionBottom' : '',
                       'titleBorderPositionLeft' : '',
                       'titleBorderAvancedStyle' : '',
                       'globalLinks' : true,
                       'linkKey' : 'links_acerca_de'
               },
               banner:{
                        'wheelControl' : false,
                        'autoPlay' : true,
                        'playSpeed' : 4000,
                        'infiniteScroll' : true,
                        'mouseDrag' : false,
                        'transition' : 1000
               }
       },
       pages:{
               home:{
                       background:'',
                       padding: '',
                       avancedStyle: '',
                       components:[
                               {
                                       "key" : 'cat_mas_vendido',
                                       "component" : 'bannerListProducts-d',
                                       "limit" : 6,
                                       "ws" : 'getProductsCategories.php',
                                       "setting":{
                                               'background':"#f5f5f5",
                                               'showTitle':true,
                                               'titleColor':'',
                                               'titleBackground':'',
                                               'titleAvancedStyle':'',
                                               'showDescription':true,
                                               'descriptionColor':'',
                                               'descriptionBackground':'',
                                               'descriptionAvancedStyle':'',
                                               'avancedStyleCss':'',
                                               'bannerSetting':{
                                                       'infiniteScroll': true,
                                                       'centerMode': true,
                                                       'autoPlay': true,
                                                       'playSpeed': 3500,
                                                       'itemsToShow': 5.5

                                               }
                                       }
                               },
                               {
                                       "key" : 'cat_mas_vendido',
                                       "component" : 'bannerListProducts-d',
                                       "limit" : 6,
                                       "ws" : 'getProductsCategories.php',
                                       "setting":{
                                               'background':"",
                                               'showTitle':true,
                                               'titleColor':'red',
                                               'titleBackground':'',
                                               'titleAvancedStyle':'',
                                               'showDescription':true,
                                               'descriptionColor':'',
                                               'descriptionBackground':'',
                                               'descriptionAvancedStyle':'',
                                               'avancedStyleCss':''
                                       }
                               },
                               {
                                       "key" : 'cat_mas_vendido',
                                       "component" : 'bannerListProducts-c',
                                       "limit" : 6,
                                       "ws" : 'getProductsCategories.php',
                                       "setting":{
                                               'background':"#f5f5f5",
                                               'showTitle':true,
                                               'titleColor':'blue',
                                               'titleBackground':'',
                                               'titleAvancedStyle':'',
                                               'showDescription':true,
                                               'descriptionColor':'',
                                               'descriptionBackground':'',
                                               'descriptionAvancedStyle':'',
                                               'avancedStyleCss':''
                                       }
                               },
                               {
                                       "key" : 'cat_mas_vendido',
                                       "component" : 'bannerListProducts-c',
                                       "limit" : 6,
                                       "ws" : 'getProductsCategories.php',
                                       "setting":{
                                               'background':"",
                                               'showTitle':true,
                                               'titleColor':'blue',
                                               'titleBackground':'',
                                               'titleAvancedStyle':'',
                                               'showDescription':true,
                                               'descriptionColor':'',
                                               'descriptionBackground':'',
                                               'descriptionAvancedStyle':'',
                                               'avancedStyleCss':''
                                       }
                               },
                               {
                                       "key" : 'cat_mas_vendido',
                                       "component" : 'bannerListProducts-d',
                                       "limit" : 6,
                                       "ws" : 'getProductsCategories.php',
                                       "setting":{
                                               'background':"#f5f5f5",
                                               'showTitle':true,
                                               'titleColor':'',
                                               'titleBackground':'',
                                               'titleAvancedStyle':'',
                                               'showDescription':true,
                                               'descriptionColor':'',
                                               'descriptionBackground':'',
                                               'descriptionAvancedStyle':'',
                                               'avancedStyleCss':''
                                       }
                               },
                       ]
                    }
              }
       } ;
      res.json({
        "status":true,
        "message":"",
        "statusCode":res.statusCode,
        "data":conf
      });
    })
    .catch(err => {
        return res.status(500).json({
        "status":false,
        "message":err,
        "statusCode":res.statusCode,
        "data":null
        });
    });

});




module.exports = router;
