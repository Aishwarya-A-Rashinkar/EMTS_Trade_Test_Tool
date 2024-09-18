sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller,JSONModel) {
    "use strict";
 
    return Controller.extend("zcomemtstradetesttool.controller.View1", {
        onInit: function () {
            this.byId("inp_cdxId").setValue(crypto.randomUUID());
        },
        onSubmit: function () {
            var transactionID = this.getView().byId('inp_transactionId').getValue();
            var bol = this.getView().byId('inp_bol').getValue();
            var date = this.getView().byId('inp_date').getValue();
            var CDXId = this.getView().byId('inp_cdxId').getValue();
            var PTDNumber = this.getView().byId('inp_ptdNumber').getValue();
            var invoiceNumber = this.getView().byId('inp_invoiceNumber').getValue();
            var transactionTypeCode = this.getView().byId('inp_transactionTypeCode').getSelectedKey();
            var transactionStatusCode = this.getView().byId('inp_transactionStatusCode').getSelectedKey();
            var dCode = this.getView().byId('inp_dCode').getSelectedKey();
            var fuelVolume = this.getView().byId('inp_FuelVolume').getValue();
            var OTCQuantity = this.getView().byId('inp_otcQuantity').getValue();
            var tradingPartner = this.getView().byId('inp_tradingPartner').getValue();
            var QAP = this.getView().byId('inp_qap').getSelectedKey();
 
            var oFormData = {
                TransactionIdentifier: transactionID,
                BillOfLading: bol,
                TransferDate: date,
                CDXTransactionIdentifier: CDXId,
                PTDNumber: PTDNumber,
                Invoice: invoiceNumber,
                TransactionTypeCode: transactionTypeCode,
                TransactionStatusCode: transactionStatusCode,
                FuelCode: dCode,
                BatchVolume: fuelVolume,
                RINQuantity: OTCQuantity,
                TransactionPartnerOrganizationIdentifier: tradingPartner,
                QAPServiceType: QAP
            };
 
            var sUrl = "https://chsincdev.it-cpi019-rt.cfapps.us10-002.hana.ondemand.com/http/sendEMTSTrades";  
 
            $.ajax({
                url: sUrl,
                method: "POST",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(oFormData),
                beforeSend: function(xhr) {
                    // var encodedCredentials = btoa(sUsername + ":" + sPassword);
                    xhr.setRequestHeader("Authorization", `Basic c2ItZjhiZGE3ZWUtOTM2NC00MTZmLWJhYTktMGI2MWFmMzFiYzc3IWI3Mjc0fGl0LXJ0LWNoc2luY2RldiFiNTYxODY6ZGQ4NmQ5OTUtNmU1ZS00NzU2LWJhMTctMDMwM2Y5MzVmYWVkJHhpZURLVjdTZlI1S1hTN1FwX3ZBRE5yNUdtRmpmT1Nmd195R0xZQUthUzg9`);
                },
                success: function(data) {
                    debugger
                    console.log("Success:", data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    debugger
                    console.error("Error:", textStatus, errorThrown);
                }
            });
 
        }
    });
});