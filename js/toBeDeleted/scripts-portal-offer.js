
(function(){

var offerKeys = [], contextKey = 'fOD1kkTgfja4';
var FG = fg({
    contextKey: contextKey
});

var OV = new offerValidation(offerValidationRules);

$(window).on('hashchange',function(){
    var prefix = '#offerbookingdetails/';
    //var hash = window.location.hash.match(/#offerbookingdetails\/(.)+/);
    var hash = window.location.hash.match(new RegExp(prefix + '(.)+'));
    if (hash && hash[0]) {
        var offerKey = hash[0].replace(prefix,'');
        if ($.inArray(offerKey,offerKeys) === -1) {
            offerKeys.push(offerKey);
            validateOfferKey(offerKey);
        }
    }
});

function validateOfferKey(offerKey){
    FG.getOffer({
        offerKey: offerKey,
        ajax: {
            success: function(data){
                var offerSearchKey = data.offerSearchKey;
                var locationId = data.locationId;
                OV.setOfferPositions(data);

                getOfferSearch({
                    OV: OV,
                    locationId: locationId,
                    bookedOfferKey: bookedOfferKey,
                    offerSearchKey: offerSearchKey
                });
            },
            error: function(){
                OV.track('info','Can not get offerKey ' + offerKey + ' from API.');
            }
        }
    });
}

function getOfferSearch(obj){
    var offerSearchKey = obj.offerSearchKey;
    var bookedOfferKey = obj.bookedOfferKey;
    var OV = obj.OV;
    var locationId = obj.locationId;
    FG.getOfferSearch({
        offerSearchKey: offerSearchKey,
        ajax: {
            success: function(data){
                var serviceIds = [];
                var constructionTime = FG.timestampToDate(data.selectedVehicle.constructionTime.timestamp);
                var vehicleTypeId = data.selectedVehicle.vehicleType.id;
                var selectedServiceList = data.selectedServiceList;
                var selectedVehicle = data.selectedVehicle;
                $.each(data.selectedServiceList,function(){
                    var serviceId = this.service.id;
                    serviceIds.push(serviceId);
                    OV.addService(serviceId);
                });
                if (serviceIds.length === 0) {
                    OV.track('error','No service found for offer search key ' + offerSearchKey);
                    validationComplete(OV);
                } else {
                    OV.validateServices();
                    checkExternalId({
                        OV: OV,
                        constructionTime: constructionTime,
                        locationId: locationId,
                        vehicleTypeId: vehicleTypeId,
                        serviceIds: serviceIds,
                        selectedServiceList: selectedServiceList,
                        selectedVehicle: selectedVehicle
                    });
                }
            },
            error: function(){
                OV.track('info','Can not get offerSearchKey ' + offerSearchKey + ' from API.');
            }
        }
    });
}

function validationComplete(OV){
    writeMessages(OV);
    incrementPB(progressBarName.validation);
    offersValidationResults.push(OV);
}

function checkExternalId(obj){
    var OV = obj.OV;
    // if offer has some invalid external ID and verification has failed
    if (OV.externalIdHasNull === true && typeof OV.messages.error !== 'undefined' && OV.messages.error.length > 0) {
        checkServiceForVehicle(obj);
    } else {
        validationComplete(OV);
    }
}



for (var key in user.getCart().getAllServices()) {
    OV.addService(key.toString());
}
OV.setOfferPositions(data).validateServices().log();

})();
