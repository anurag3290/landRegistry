Meteor.methods({
	getRegisrtyData : function(postalCode, offset, limit){
		console.log('offset',offset)
		console.log('limit',limit)
		var fut = new Future();
		if(postalCode){
			var url = 'http://landregistry.data.gov.uk/app/hpi/qonsole/query'
			var formData ={
				url : '/landregistry/query',
				q : 'prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> prefix owl: <http://www.w3.org/2002/07/owl#> prefix xsd: <http://www.w3.org/2001/XMLSchema#> prefix sr: <http://data.ordnancesurvey.co.uk/ontology/spatialrelations/> prefix lrhpi: <http://landregistry.data.gov.uk/def/hpi/> prefix lrppi: <http://landregistry.data.gov.uk/def/ppi/> prefix skos: <http://www.w3.org/2004/02/skos/core#> prefix lrcommon: <http://landregistry.data.gov.uk/def/common/>  SELECT ?paon ?saon ?street ?town ?county ?postcode ?amount ?date ?category WHERE {   VALUES ?postcode {"'+postalCode+'"^^xsd:string}    ?addr lrcommon:postcode ?postcode.    ?transx lrppi:propertyAddress ?addr ;           lrppi:pricePaid ?amount ;           lrppi:transactionDate ?date ;           lrppi:transactionCategory/skos:prefLabel ?category.    OPTIONAL {?addr lrcommon:county ?county}   OPTIONAL {?addr lrcommon:paon ?paon}   OPTIONAL {?addr lrcommon:saon ?saon}   OPTIONAL {?addr lrcommon:street ?street}   OPTIONAL {?addr lrcommon:town ?town} } ORDER BY ?amount OFFSET '+offset+' LIMIT '+limit,
				output : 'json'
			}
			Meteor.http.post(url,{data: formData}, function (error, res) {	    	
				if(error) {
					console.log(error)
					fut['return']({'error': error});
				}
				else{
					console.log('*************')
					var data = JSON.parse(res.content)
					console.log(data.result)
					fut['return']({'success': data.result});

				}
			})
		}
		return fut.wait();
	}
})