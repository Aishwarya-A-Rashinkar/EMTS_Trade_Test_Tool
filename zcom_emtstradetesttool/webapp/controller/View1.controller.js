sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller,JSONModel) {
    "use strict";

    return Controller.extend("zcomemtstradetesttool.controller.View1", {
        onInit: function () {
            var sUUID = this._generateUUID();
            this.byId("inp_cdxId").setValue(sUUID);
        },
        _generateUUID: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        onSubmit: function () {
            var transactionID = this.getView().byId('inp_transactionId').getValue();
            var bol = this.getView().byId('inp_bol').getValue();
            var date = this.getView().byId('inp_date').getValue();
            var CDXId = this.getView().byId('inp_cdxId').getValue();
            var PTDNumber = this.getView().byId('inp_ptdNumber').getValue();
            var invoiceNumber = this.getView().byId('inp_invoiceNumber').getValue();
            var transactionTypeCode = this.getView().byId('inp_transactionTypeCode').getValue();
            var transactionStatusCode = this.getView().byId('inp_transactionStatusCode').getValue();
            var dCode = this.getView().byId('inp_dCode').getValue();
            var fuelVolume = this.getView().byId('inp_FuelVolume').getValue();
            var OTCQuantity = this.getView().byId('inp_otcQuantity').getValue();
            var tradingPartner = this.getView().byId('inp_tradingPartner').getValue();
            var QAP = this.getView().byId('inp_qap').getValue();

            var oFormData = {
                transactionID: transactionID,
                bol: bol,
                date: date,
                CDXId: CDXId,
                PTDNumber: PTDNumber,
                invoiceNumber: invoiceNumber,
                transactionTypeCode: transactionTypeCode,
                transactionStatusCode: transactionStatusCode,
                dCode: dCode,
                fuelVolume: fuelVolume,
                OTCQuantity: OTCQuantity,
                tradingPartner: tradingPartner,
                QAP: QAP
            };

            var oFormModel = new JSONModel(oFormData);
            this.getView().setModel(oFormModel, "formData");

            console.log(oFormModel);
            console.log(oFormData);

        }
    });
});
