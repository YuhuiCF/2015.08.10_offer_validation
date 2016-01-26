
(function(){
var offers = [], offersValidationResults = [], testedOffers = [], contextKey = 'fOD1kkTgfja4';
var service = getUrlParam('service');
var testOfferKey = getHashOfferKey();

if (typeof testOffers !== 'undefined' && typeof testOffers[service] !== 'undefined') {
    offers = testOffers[service];
} else {
	if (testOfferKey !== '') {
		offers = [
			{
				offerKey: testOfferKey
			}
		];
	}
}

var PB;
var progressBarName = {
    offerAjaxComplete: 'offerAjaxComplete',
    validation: 'validation'
};
if ($('#progressBar').length > 0 && typeof ProgressBar === 'function') {
    var hooks = {};
    //hooks['progressBar:complete:' + progressBarName.validation] = function(){
    hooks['progressBar:complete'] = function(){
        $('#counter .total span').html(offers.length);
        $('#counter .success span').html(offers.length - errorCounter);
    };
    PB = new ProgressBar({
        model: '#progressBar',
        hooks: hooks
    });

    PB.reset()
        .createNewProgress({
            name: progressBarName.offerAjaxComplete,
            incrementLinearly: true,
            maxScore: offers.length
        })
        .createNewProgress({
            name: progressBarName.validation,
            incrementLinearly: true,
            maxScore: offers.length
        });
}

var FG = fg({
    contextKey: contextKey
});

var errorCounter = 0;

$.each(offers,function(){
    testOffer(this);
});

$(window).on('hashchange',function(){
    var prefix = '#offerbookingdetails/';
    //var hash = window.location.hash.match(/#offerbookingdetails\/(.)+/);
    var hash = window.location.hash.match(new RegExp(prefix + '(.)+'));
    if (hash && hash[0]) {
        var offerKey = hash[0].replace(prefix,'');
        if ($.inArray(offerKey,testedOffers) === -1) {
            testOffer({offerKey:offerKey});
        }
    }
});

function testOffer(offer){
    var offerKey = offer.offerKey;
    var bookedOfferKey = offer.bookedOfferKey;
    var OV = new offerValidation(offerValidationRules);

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
                OV.track('info','Can not get offerKey ' + offerKey + ' from API, use bookedOfferKey ' + bookedOfferKey + '.');
                getBookingVersion({
                    bookedOfferKey: bookedOfferKey,
                    OV: OV
                });
            },
            complete: function(){
                incrementPB(progressBarName.offerAjaxComplete);
            }
        }
    });
}

function getUrlParam(name){
    name = name.replace(/[\[]/,'\\\[').replace(/[\]]/,'\\\]');

    var regexS = '[\\?&]' + name + '=([^&#]*)';
    var regex = new RegExp( regexS );
    var results = regex.exec(window.location.href);

    if (results === null) {
        return '';
    } else {
        return results[1];
    }
}

function getHashOfferKey(){
    var hash = window.location.hash.match(/#offerbookingdetails\/(.)+/), output = '';
    if (hash && hash[0]) {
        var offerKey = hash[0].replace('#offerbookingdetails/','');
        if (offerKey !== '') {
            output = offerKey;
        }
    }
    return output;
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
                OV.track('info','Can not get offerSearchKey ' + offerSearchKey + ' from API, use bookedOfferKey ' + bookedOfferKey + '.');
                getBookingVersion({
                    bookedOfferKey: bookedOfferKey,
                    OV: OV
                });
            }
        }
    });
}

function getBookingVersion(obj){
    var OV = obj.OV;
    var bookedOfferKey = obj.bookedOfferKey;
    FG.getBookingVersion({
        bookedOfferKey: bookedOfferKey,
        ajax: {
            success: function(data){
                var serviceIds = [];
                var selectedServiceList = data.bookedOfferSearch.selectedServiceList;
                var selectedVehicle = data.bookedOfferSearch.selectedVehicle;
                var constructionTime = FG.timestampToDate(data.bookedOfferSearch.selectedVehicle.constructionTime.timestamp);
                var locationId = data.bookedOfferDetail.locationId;
                var vehicleTypeId = data.bookedOfferSearch.selectedVehicle.vehicleType.id;
                $.each(data.bookedOfferSearch.selectedServiceList,function(){
                    var serviceId = this.service.id;
                    serviceIds.push(serviceId);
                    OV.addService(serviceId);
                });
                if (serviceIds.length === 0) {
                    OV.track('error','No service found for booked offer key ' + bookedOfferKey);
                    validationComplete(OV);
                } else {
                    OV.setOfferPositions(data.bookedOfferDetail).validateServices();
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
                OV.track('error','Booked offer key ' + bookedOfferKey + ' not found.');
                validationComplete(OV);
            }
        }
    });
}

function incrementPB(name){
    if (PB) {
        PB.increment(name);
        PB.updateProgressBar();
    }
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

function writeMessages(OV){
    OV.log();
    if (typeof GAtrackLp === 'function') {
        GAtrackLp(offerSearch.GALpCat, 'OfferInvalid', OV.offerKey, offerSearch, true);
    }
    if (typeof OV.messages.error !== 'undefined') {
        $('#counter .error span').html(++errorCounter);
    }
    var infoText = [];
    if (typeof OV.messages.info !== 'undefined') {
        infoText.push('<b>INFO:</b><br>' + OV.messages.info.join('<br>').replace(/\n/,'<br>'));
    }
    if (typeof OV.messages.success !== 'undefined') {
        infoText.push('<b>SUCCESS:</b><br>' + OV.messages.success.join('<br>').replace(/\n/,'<br>'));
    }
    if (typeof OV.messages.error !== 'undefined') {
        infoText.push('<b>ERROR:</b><br>' + OV.messages.error.join('<br>').replace(/\n/,'<br>'));
    }
    $('#messages span').append('<hr>' + infoText.join('<br>'));
}

function validationComplete(OV){
    writeMessages(OV);
    incrementPB(progressBarName.validation);
    offersValidationResults.push(OV);
}

function checkServiceForVehicle(obj){
    var OV = obj.OV;
    var serviceIds = obj.serviceIds;
    var vehicleTypeId = obj.vehicleTypeId;
    var constructionTime = obj.constructionTime;
    var numberOfServices = serviceIds.length;
    var serviceCounter = 0;
    var invalidServices = [];
    $.each(serviceIds,function(){
        var serviceId = this.toString();
        FG.getServiceById({
            serviceId: serviceId,
            criteria: {
                vehicleTypeId: vehicleTypeId,
                constructionTime: constructionTime
            },
            ajax: {
                success: function(data){
                    if (data === null) {
                        invalidServices.push(serviceId);
                    }
                },
                error: function(){
                    OV.track('error','{offerKey: ' + OV.offerKey + '} Check service ' + serviceId + ' failed for vehicle with type ID ' + vehicleTypeId + '.');
                    validationComplete(OV);
                },
                complete: function(jqXHR,textStatus){
                    if (textStatus === 'success' && ++serviceCounter === numberOfServices) {
                        if (invalidServices.length > 0) {
                            OV.track('error','{offerKey: ' + OV.offerKey + '} Service(s) [' + invalidServices + '] is (are) not valid for the vehicle with type ID ' + vehicleTypeId + '.');
                            validationComplete(OV);
                        } else {
                            getLocation(obj);
                        }
                    }
                }
            }
        });
    });
}

function getLocation(obj){
    var locationId = obj.locationId;
    var OV = obj.OV;
    FG.getLocation({
        locationId: locationId,
        ajax: {
            success: function(data){
                var region = data.locationAddress.region;
                obj.region = region;
                regenerateOffer(obj);
            },
            error: function(){
                OV.track('error','{offerKey: ' + OV.offerKey + '} Get location failed for locationId ' + locationId);
                regenerateOffer(obj);
            },
            complete: function(){
            	OV.track('info','{offerKey: ' + OV.offerKey + '} Regenerate offer, due to having externalId null, and validation failure.');
            }
        }
    });
}

function regenerateOffer(obj){
    var OV = obj.OV;
    var selectedServiceList = obj.selectedServiceList;
    var selectedVehicle = obj.selectedVehicle;
    var locationId = obj.locationId;
    var offerSearch = {
        selectedServiceList: selectedServiceList,
        selectedVehicle: selectedVehicle
    };
    if (typeof obj.region !== 'undefined') {
        offerSearch.region = obj.region;
    }
    FG.createOfferSearch({
        offerSearch: offerSearch,
        criteria: {
            generateEmpty: false,
            locationIds: locationId
        },
        ajax: {
            success: function(data){
                getNewOffer({
                    offerSearchKey: data.key,
                    OV: OV,
                    selectedServiceList: selectedServiceList,
                    selectedVehicle: selectedVehicle,
                    region: typeof offerSearch.region === 'undefined' ? null : offerSearch.region,
                    locationId: locationId
                });
            },
            error: function(){
                OV.track('error','Recreate offer search failed for:\n{selectedServiceList:\n' + JSON.stringify(selectedServiceList,null,4) + ',\nselectedVehicle:\n' + JSON.stringify(selectedVehicle,null,4) + (typeof offerSearch.region !== 'undefined' ? ',\nregion:\n' + JSON.stringify(offerSearch.region,null,4) : '') + ',\nlocationId: ' + locationId + '}');
                validationComplete(OV);
            }
        }
    });
}

function getNewOffer(obj){
    var offerSearchKey = obj.offerSearchKey;
    var selectedServiceList = obj.selectedServiceList;
    var selectedVehicle = obj.selectedVehicle;
    var locationId = obj.locationId;
    var region = obj.region;
    var OV = obj.OV;
    FG.getOfferList({
        offerSearchKey: offerSearchKey,
        ajax: {
            success: function(data){
                if (data.length >= 1) {
                    if (data.length > 1) {
                        OV.track('error',data.length + ' offers (not 1) in offerSearchKey ' + offerSearchKey + ' for:\n{selectedServiceList:\n' + JSON.stringify(selectedServiceList,null,4) + ',\nselectedVehicle:\n' + JSON.stringify(selectedVehicle,null,4) + ',\nlocationId: ' + locationId + '}');
                    }
                    var offerKey = data[0].offerKey;
                    FG.getOffer({
                        offerKey: offerKey,
                        ajax: {
                            success: function(data){
                                OV.setOfferPositions(data).validateServices();
                            },
                            error: function(){
                                OV.track('error','getOffer error for offerKey ' + offerKey + '.');
                            },
                            complete: function(){
                                validationComplete(OV);
                            }
                        }
                    });
                } else {
                    OV.track('error','No offer in offerSearchKey ' + offerSearchKey + ' for:\n{selectedServiceList:\n' + JSON.stringify(selectedServiceList,null,4) + ',\nselectedVehicle:\n' + JSON.stringify(selectedVehicle,null,4) + (region !== null ? ',\nregion:\n' + JSON.stringify(region,null,4) : '') + ',\nlocationId: ' + locationId + '}');
                    validationComplete(OV);
                }
            },
            error: function(){
                OV.track('error','getOfferList error for offerSearchKey ' + offerSearchKey + '.');
                validationComplete(OV);
            }
        }
    });
}
})();
