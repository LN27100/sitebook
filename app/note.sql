SELECT 
    product.PRODUCT_ID_ AS 'id', 
    product.product_name AS 'Titre', 
    product.PRODUCT_DES AS 'Description',
    product.PRODUCT_PICTURE AS 'Image', 
    product.PRODUCT_STOCK AS 'Stock', 
    product.PRODUCT_PRICE AS 'Prix', 
    product.PRODUCT_REF AS 'Référence',  
    product.TYPE_ID AS 'Catégorie', 
    product.SPL_ID AS 'Fournisseur', 
    product.¨PRODUCT_AUTOR  AS 'Auteur', 
    AVG(review.REVIEW_NOTE) AS 'Note'
FROM product
LEFT JOIN review ON review.PRODUCT_ID_ = product.PRODUCT_ID_
GROUP BY 
    product.PRODUCT_ID_,
    product.product_name,
    product.PRODUCT_PICTURE,
    product.PRODUCT_STOCK,
    product.PRODUCT_PRICE,
    product.PRODUCT_REF,
    product.TYPE_ID,
    product.SPL_ID,
    product.¨PRODUCT_AUTOR;