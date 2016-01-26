
var offers = [], offersValidationResults = [], testedOffers = [];
var isPortalUsage = typeof offerSearch !== 'undefined' && typeof offerSearch.campaignkey !== 'undefined';
var contextKey = isPortalUsage ? offerSearch.campaignkey : 'fOD1kkTgfja4';
var service = getUrlParam('service');
var testOfferKey = getHashOfferKey();
var contextLocationId = '1';

if (typeof testOffers !== 'undefined' && typeof testOffers[service] !== 'undefined') {
    offers = testOffers[service];
} else {
	if (testOfferKey) {
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
if (!isPortalUsage && $('#progressBar').length > 0 && typeof ProgressBar === 'function') {
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

var fgParams = {
    contextKey: contextKey,
    ssl: getSSL()
};
if (isPortalUsage) {
    fgParams.env = setPortalEnvironment();
}
var FG = fg(fgParams);

var totalCounter = 0;
var errorCounter = 0;

if (window.location.search.length > 1 && !isPortalUsage) {
    $('#hint').show();
}

$.each(offers,function(i,offer){
    var offerKey = offer.offerKey;
    if ($.inArray(offerKey,testedOffers) === -1) {
        testedOffers.push(offerKey);
        totalCounter = testedOffers.length;
        $('#counter .total span').html(totalCounter);
        testOffer(offer);
    }
});

$(window).on('hashchange',function(){
    var offerKey = getHashOfferKey();
    if (offerKey && $.inArray(offerKey,testedOffers) === -1) {
        testedOffers.push(offerKey);
        totalCounter = testedOffers.length;
        $('#counter .total span').html(totalCounter);
        testOffer({offerKey:offerKey});
    }
});

function getSSL(){
    return window.location.protocol === 'http:' ? 'http' : 'https';
}

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
                if (!isPortalUsage) {
                    OV.track('info','Can not get offerKey ' + offerKey + ' from API, use bookedOfferKey ' + bookedOfferKey + '.');
                    getBookingVersion({
                        bookedOfferKey: bookedOfferKey,
                        OV: OV
                    });
                }
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
    var prefix = '#offerbookingdetails/';
    var hash = window.location.hash.match(new RegExp(prefix + '(.)+')), output = false;
    if (hash && hash[0]) {
        var offerKey = hash[0].replace(prefix,'');
        if (offerKey !== '') {
            output = offerKey;
        }
    }
    return output;
}

function setPortalEnvironment(){
    var hostEnv = window.location.hostname.replace('.fairgarage.de','');
    var output = 'api';
    if (hostEnv.indexOf('qa') >= 0) {
        output = 'api-qa';
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
                var userSearchKey = data.userSearchConfigKey;
                getUserSearch({
                    OV: OV,
                    userSearchKey: userSearchKey,
                    locationId: locationId
                });
            },
            error: function(){
                if (!isPortalUsage) {
                    OV.track('info','Can not get offerSearchKey ' + offerSearchKey + ' from API, use bookedOfferKey ' + bookedOfferKey + '.');
                    getBookingVersion({
                        bookedOfferKey: bookedOfferKey,
                        OV: OV
                    });
                }
            }
        }
    });
}

function getUserSearch(obj){
    var OV = obj.OV;
    var userSearchKey = obj.userSearchKey;
    var locationId = obj.locationId;
    FG.getUserSearch({
        userSearchKey: userSearchKey,
        ajax: {
            success: function(data){
                var constructionTime = FG.timestampToDate(data.selectedVehicle.constructionTime.timestamp);
                var vehicleTypeId = data.selectedVehicle.vehicleType.id;
                var selectedServiceList = data.selectedServiceList;
                var selectedVehicle = data.selectedVehicle;
                var serviceIds = [];

                $.each(data.selectedServiceList,function(){
                    var serviceId = this.service.id;
                    serviceIds.push(serviceId);
                    OV.addService(serviceId);
                });
                if (serviceIds.length === 0) {
                    OV.track('error','No service found for user search key ' + userSearchKey);
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
                OV.track('error','User search key ' + userSearchKey + 'not found.');
                validationComplete(OV);
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
                var locationId = data.bookedOfferDetail.locationId;
                var serviceIds = [];
                var selectedServiceList = data.bookedOfferSearch.selectedServiceList;
                var selectedVehicle = data.bookedOfferSearch.selectedVehicle;
                var constructionTime = FG.timestampToDate(data.bookedOfferSearch.selectedVehicle.constructionTime.timestamp);
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
    if (OV.externalIdHasNull === true && typeof OV.messages.error !== 'undefined' && OV.messages.error.length > 0 && !isPortalUsage) {
        checkServiceForVehicle(obj);
    } else {
        validationComplete(OV);
    }
}

function writeMessages(OV){
    OV.log();
    var infoText = [];
    if (typeof OV.messages.info !== 'undefined') {
        infoText.push('<b>INFO:</b><br>' + OV.messages.info.join('<br>').replace(/\n/,'<br>'));
    }
    if (typeof OV.messages.success !== 'undefined') {
        infoText.push('<b>SUCCESS:</b><br>' + OV.messages.success.join('<br>').replace(/\n/,'<br>'));
    }
    if (typeof OV.messages.error !== 'undefined' && OV.messages.error.length > 0) {
        infoText.push('<b>ERROR:</b><br>' + OV.messages.error.join('<br>').replace(/\n/,'<br>'));
        $('#counter .error span').html(++errorCounter);
        if (isPortalUsage) {
            FG.track({
                trackingData: {
                    section: 'OfferInvalid',
                    type: contextLocationId + '-' + contextKey,
                    value1: OV.offerKey
                },
                ajax: {
                    error: function(){}
                }
            });
        }
    } else {
        $('#counter .success span').html(totalCounter - errorCounter);
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
    var userSearch = {
        selectedServiceList: selectedServiceList,
        selectedVehicle: selectedVehicle
    };
    var locationId = obj.locationId;
    var offerSearch = {};

    if (typeof obj.region !== 'undefined') {
        offerSearch.region = obj.region;
    }
    FG.createUserSearch({
        userSearch: userSearch,
        ajax: {
            success: function(data){
                var userSearchKey = data.userSearchConfigKey;

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
                            OV.track('error','Recreate offer search failed for:\n{offerSearchKey: ' + offerSearchKey + ',\n' + (typeof offerSearch.region !== 'undefined' ? ',\nregion:\n' + JSON.stringify(offerSearch.region,null,4) : '') + ',\nlocationId: ' + locationId + '}');
                            validationComplete(OV);
                        }
                    }
                });
            },
            error: function(){
                OV.track('error','Recreate user search failed for:\n{selectedServiceList:\n' + JSON.stringify(selectedServiceList,null,4) + ',\nselectedVehicle:\n' + JSON.stringify(selectedVehicle,null,4));
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
