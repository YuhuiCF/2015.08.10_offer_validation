
/**
  * @desc offerValidation constructor
  * @param {object} validationRules, rules used for the validation
*/
var offerValidation = function(validationRules){
    var self = this;
    var trackingTypes = {
        info: {
            messagePre: 'INFO'
        },
        error: {
            messagePre: 'ERROR'
        },
        success: {
            messagePre: 'SUCCESS'
        }
    };
    self.services = [];
    self.offerPositions = {};
    self.offerKey = '';
    self.messages = {};
    self.externalIdHasNull = false;
    self.validationRules = validationRules;

    /**
      * @desc reset offer validation object
    */
    self.reset = function(){
        self.services = [];
        self.offerPositions = {};
        self.messages = {};
        self.externalIdHasNull = false;
        self.offerKey = '';
        return self;
    };

    /**
      * @desc add a service to the property services.
      * @param {string, number, or object} service, service could be service ID as string or number, or the FG service object
    */
    self.addService = function(service){
        var serviceId;
        if (typeof service === 'string' || typeof service === 'number') {
            serviceId = service;
        } else {
            serviceId = getServiceId(service);
        }
        if ($.inArray(serviceId,self.services) < 0) {
            self.services.push(serviceId);
        }
        return self;
    };

    /**
      * @desc set offerPositions and offerKey
      * @param {object} offer, the FG offer object
    */
    self.setOfferPositions = function(offer){
        var offerPositions = {};
        var nullPositions = [];
        $.each(offer.sections,function(){
            var typeName = typeIdToTypeName(this.type);
            if (typeName !== '') {
                offerPositions[typeName] = offerPositions[typeName] || {};
                offerPositions[typeName].positions = offerPositions[typeName].positions || [];

                $.each(this.positions,function(){
                    var externalId = this.externalId;
                    if (externalId !== null) {
                        offerPositions[typeName].positions.push(parseInt(externalId));
                    } else {
                        self.externalIdHasNull = true;
                        // push, to check length
                        offerPositions[typeName].positions.push(externalId);
                        nullPositions.push('"' + this.name + '" of type ' + typeName);
                    }
                });
                offerPositions[typeName].number = offerPositions[typeName].positions.length;
            }
        });
        if (self.externalIdHasNull === true) {
            self.track('info','{offerKey: ' + offer.offerKey + '} ExternalId is null in these position(s): ' + nullPositions.join(', '));
        }
        self.offerPositions = offerPositions;
        self.offerKey = offer.offerKey;
        return self;
    };

    /**
      * @desc validate all services in offerPositions
    */
    self.validateServices = function(){
        $.each(self.services,function(){
            var service = this;
            validateSingleService(service.toString());
        });
        return self;
    };

    /**
      * @desc track messages and save them in messages
      * @param {string} trackingType, tracking type, should be a key of the variable trackingTypes
      * @param {string} message, tracking message
    */
    self.track = function(trackingType,message){
        if (typeof trackingTypes[trackingType] !== 'undefined') {
            self.messages[trackingType] = self.messages[trackingType] || [];
            self.messages[trackingType].push(message);
        }
        return self;
    };

    /**
      * @desc console log all strored messages
    */
    self.log = function(){
        return self.logTpyeMessage('info').logTpyeMessage('error').logTpyeMessage('success');
    };

    /**
      * @desc console log all messages of a tracking type
      * @param {string} trackingType, tracking type, should be a key of the variable trackingTypes
    */
    self.logTpyeMessage = function(trackingType){
        if (typeof trackingTypes[trackingType] !== 'undefined' && typeof self.messages[trackingType] !== 'undefined') {
            console.log([trackingTypes[trackingType].messagePre + ':'].concat(self.messages[trackingType]).join('\n'));
        }
        return self;
    };

    /**
      * @desc get service id from a FG service object
      * @param {object} service, FG service object
      * @return {number}, ID of the service
    */
    function getServiceId(service){
        return service.id;
    }

    /**
      * @desc validate offer for one service by the service ID
      * @param {number or string} serviceId, service ID
    */
    function validateSingleService(serviceId){
        if (hasValidationRules(serviceId)) {
            $.each(self.validationRules[serviceId].types,function(){
                var typeName = this.toString();
                validateType(serviceId,typeName,self.validationRules[serviceId][typeName]);
            });
        } else {
            self.track('info','{offerKey: ' + self.offerKey + ', serviceId: ' + serviceId + '} Service has no validation rule defined.');
        }
    }

    /**
      * @desc check whether the service has defined validation rules
      * @param {number or string} serviceId, service ID
      * @return {boolean}
    */
    function hasValidationRules(serviceId){
        return (typeof self.validationRules[serviceId] !== 'undefined');
    }

    /**
      * @desc validate offer type by rule for service ID
      * @param {number or string} serviceId, service ID
      * @param {string} typeName, name of the work type
      * @param {object} typeRules, rules of the work type
    */
    function validateType(serviceId,typeName,typeRules){
        if (typeName !== '') {
            if (typeof self.offerPositions[typeName] === 'undefined') {
                self.track('error','{offerKey: ' + self.offerKey + ', serviceId: ' + serviceId + '} No positions for ' + typeName + ' in the offer.');
            } else {
                // check number of positions, not so important
                if (typeRules.number > self.offerPositions[typeName].number) {
                    self.track('info','{offerKey: ' + self.offerKey + ', serviceId: ' + serviceId + '} Service should (may) require at least ' + typeRules.number + ' ' + typeName + ' position(s), while this offer has ' + self.offerPositions[typeName].number + ' ' + typeName + ' position(s).');
                } else {
                    if (typeRules.number <= self.offerPositions[typeName].number) {
                        self.track('success','{offerKey: ' + self.offerKey + ', serviceId: ' + serviceId + '} Service requires at least ' + typeRules.number + ' ' + typeName + ' position(s), and this offer has ' + self.offerPositions[typeName].number + ' ' + typeName + ' position(s).');
                    } else {// key "number" missing in the rule
                        if (typeof typeRules.number === 'undefined') {
                            self.track('info','{offerKey: ' + self.offerKey + ', serviceId: ' + serviceId + '} self.offerPositions[typeName] for type ' + typeName + ' has no key "number":\n' + JSON.stringify(self.offerPositions[typeName],null,4));
                        }
                    }
                }
                var offerPositions = self.offerPositions[typeName].positions;
                // check required position
                if (typeof typeRules.required !== 'undefined') {
                    $.each(typeRules.required,function(){
                        var requiredPosition = this.toString();
                        if ($.inArray(requiredPosition,offerPositions) < 0) {
                            self.track('error','{offerKey: ' + self.offerKey + ', serviceId: ' + serviceId + '} Required ' + typeName + ' position ' + requiredPosition + ' not found.');
                        } else {
                            self.track('success','{offerKey: ' + self.offerKey + ', serviceId: ' + serviceId + '} Required ' + typeName + ' position ' + requiredPosition + ' found.');
                        }
                    });
                }
                // check any position
                if (typeof typeRules.any !== 'undefined') {
                    $.each(typeRules.any,function(){
                        var set = this;
                        var found = false;
                        var foundPosition = [];
                        $.each(set,function(){
                            var anyPosition = parseInt(this.toString());
                            if ($.inArray(anyPosition,offerPositions) > -1) {
                                found = true;
                                foundPosition.push(anyPosition);
                            }
                        });
                        if (found === false) {
                            self.track('error','{offerKey: ' + self.offerKey + ', serviceId: ' + serviceId + '} The offer should contain a ' + typeName + ' position in [' + set + ']. The ' + typeName + ' position(s) in the offer are (is) [' + offerPositions + '].');
                        } else {
                            self.track('success','{offerKey: ' + self.offerKey + ', serviceId: ' + serviceId + '} The offer is calculated with ' + typeName + ' position(s) [' + foundPosition + '] among [' + set + '].');
                        }
                    });
                }
            }
        } else {
            self.track('info','typeName in validateType should not be "": validateType(' + serviceId + ',' + typeName + ')\n' + JSON.stringify(typeRules,null,4));
        }
    }

    /**
      * @desc get type name from type ID, return empty string if no corresponding type found
      * @param {number} typeId, type ID
      * @return {string}, type name or ''
    */
    function typeIdToTypeName(typeId){
        var type = {
            1: 'work',
            2: 'parts',
            3: 'fluids',
            4: 'fix',
            7: 'lacquer',
        };
        return typeof type[typeId] !== 'undefined' ? type[typeId] : '';
    }
};
