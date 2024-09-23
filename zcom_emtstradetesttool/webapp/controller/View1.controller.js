sap.ui.define([
    "sap/ui/core/mvc/Controller",
    // "sap/ui/model/json/JSONModel",
    // "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/ui/core/Fragment",
    "sap/m/StandardListItem"

], function (Controller, Filter, FilterOperator, Sorter, Fragment) {
    "use strict";

    return Controller.extend("zcomemtstradetesttool.controller.View1", {
        onInit: function () {
            this.byId("inp_cdxId").setValue(crypto.randomUUID());
            this.setTransactionId();
            // this.setTradingPartner();
            this.onTransactionStatusChange();
        },

        setTransactionId: function () {
            let oModel = this.getOwnerComponent().getModel();

            // Sort by 'extTransactionNumber' in descending order
            const oSorter = new sap.ui.model.Sorter("extTransactionNumber", true);

            // Load data from the OData service
            oModel.read("/RegulationComplianceTransaction", {
                urlParameters: {
                    "$top": 1,
                },
                sorters: [oSorter],
                success: function (oData) {
                    // Handle the successful response here
                    console.log("Data loaded successfully:", oData);
                    // For example, you could update your view model here
                    this.byId("inp_transactionId").setValue(oData.results[0].extTransactionNumber + 1);
                }.bind(this),
                error: function (oError) {
                    // Handle any errors
                    console.error("Error while fetching data:", oError);
                }
            });

        },

        // setTradingPartner: function () {        
        //     let oModel = this.getOwnerComponent().getModel();

        //     // Load data from the OData service
        //     oModel.read("/MaintainBusinessPartnerEPAIDMapping", {
        //         success: function (oData) {
        //             // Handle the successful response here
        //             console.log("Data loaded successfully:", oData);
        //             this.byId("inp_tradingPartner").setValue(oData.results[0].epaId);

        //         }.bind(this),
        //         error: function (oError) {
        //             // Handle any errors
        //             console.error("Error while fetching data:", oError);
        //         }
        //     });    
        // },

        onTransactionStatusChange: function (oEvent) {
            // Get the ComboBox control
            let oComboBox = this.byId("inp_transactionStatusCode");

            // Get the selected key from the ComboBox
            let selectedKey = oComboBox.getSelectedKey();

            // Check if the selected key is "07" (Completed)
            if (selectedKey === "07") {
                // Call the function to set the Matched Transaction Identifier
                this.setMatchedTransactionIdentifier();
            } else {
                // Optionally handle cases when it's not "07"
                console.log("Transaction Status is not Completed (07)");
            }
        },

        // setMatchedTransactionIdentifier: function () {        
        //     let oModel = this.getOwnerComponent().getModel();

        //     // Sort by 'extTransactionNumber' in descending order
        //     const oFilter = new sap.ui.model.Filter("processingStatus eq '07' and emtsTransmissionStatus eq '02'");
        //     // const oFilter = new sap.ui.model.Filter("processingStatus".EQ,"RINQUANTITY");
        //     // Load data from the OData service
        //     oModel.read("/RegulationComplianceTransaction", {

        //         Filter: [oFilter],
        //         success: function (oData) {
        //             // Handle the successful response here
        //             console.log("Data loaded successfully:", oData);

        //         }.bind(this),
        //         error: function (oError) {
        //             // Handle any errors
        //             console.error("Error while fetching data:", oError);

        //         }
        //     });   
        // },

        matchedValueHelp: function () {
            const oView = this.getView();
            if (oView) {
                if (!this._oMatchDialog) {
                    this._oMatchDialog = Fragment.load({
                        id: oView?.getId(),
                        name: "zcomemtstradetesttool.view.fragment.Matched",
                        controller: this,
                    }).then((oDialog) => {
                        oView?.addDependent(oDialog);
                        this._oTableSelectDialogMatchedTransactionIdentifier =
                            oDialog;
                        return oDialog;
                    });
                }
                this._oMatchDialog.then((oDialog) => {
                    (oDialog).open();
                    if (this._oTableSelectDialogMatchedTransactionIdentifier) {
                        const oBinding = this._oTableSelectDialogMatchedTransactionIdentifier?.getBinding(
                            "items"
                        );
                        if (oBinding) {
                            oBinding.filter([
                                new Filter("processingStatus", FilterOperator.EQ, '06'),
                                new Filter("emtsTransmissionStatus", FilterOperator.EQ, '01'),
                            ], "Application");
                        }
                    }
                });
            }
        },

        partnerValueHelp: function () {
            const oView = this.getView();
            if (oView) {
                if (!this._oPartnerDialog) {
                    this._oPartnerDialog = Fragment.load({
                        id: oView?.getId(),
                        name: "zcomemtstradetesttool.view.fragment.Partner",
                        controller: this,
                    }).then((oDialog) => {
                        oView?.addDependent(oDialog);
                        this._oTableSelectDialogTargetPartner =
                            oDialog;
                        return oDialog;
                    });
                }
                this._oPartnerDialog.then((oDialog) => {
                    (oDialog).open();
                    if (this._oTableSelectDialogTargetPartner) {
                        const oBinding = this._oTableSelectDialogTargetPartner?.getBinding(
                            "items"
                        );
                        if (oBinding) {
                            oBinding.filter([
                                // new Filter("processingStatus", FilterOperator.EQ, '07'),
                            ], "Application");
                        }
                    }
                });
            }
        },



        onSelectMatched: function(oEvent) {
          this.byId("inp_matchedTransactionIdentifier").setValue(oEvent.getParameter("selectedItem").getBindingContext().getObject().extTransactionNumber);
        },

        searchMatched(oEvent) {
                const sValue = oEvent.getParameter("value"),
                  oBinding = oEvent.getSource()?.getBinding("items"),
                  aFilters = [];
                if (sValue) {
                  let aAllFilters = [
                    new Filter("extTransactionNumber", FilterOperator.Contains, sValue),
                    new Filter("subObjectScenario", FilterOperator.Contains, sValue),
                  ];
                //   if(!isNaN(parseInt(sValue))){
                //     aAllFilters.push(new Filter("objectId", FilterOperator.EQ, parseInt(sValue)));
                //   }
                  aFilters.push(
                    new Filter({
                      filters: aAllFilters,
                      and: false,
                    })
                  );
                }
                if (oBinding) {
                  oBinding?.filter(aFilters);
                }
        },

        onSelectPartner: function(oEvent) {
            this.byId("inp_tradingPartner").setValue(oEvent.getParameter("selectedItem").getBindingContext().getObject().epaId);
          },
  
          searchPartner(oEvent) {
                  const sValue = oEvent.getParameter("value"),
                    oBinding = oEvent.getSource()?.getBinding("items"),
                    aFilters = [];
                  if (sValue) {
                    let aAllFilters = [
                      new Filter("epaId", FilterOperator.Contains, sValue),
                      
                    ];
                  //   if(!isNaN(parseInt(sValue))){
                  //     aAllFilters.push(new Filter("objectId", FilterOperator.EQ, parseInt(sValue)));
                  //   }
                    aFilters.push(
                      new Filter({
                        filters: aAllFilters,
                        and: false,
                      })
                    );
                  }
                  if (oBinding) {
                    oBinding?.filter(aFilters);
                  }
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
            var MatchedTransactionIdentifier = this.getView().byId('inp_matchedTransactionIdentifier').getValue();

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
                QAPServiceType: QAP,
                MatchedTransactionIdentifier:MatchedTransactionIdentifier
            };

            console.log(oFormData);
            var sUrl = "https://chsincdev.it-cpi019-rt.cfapps.us10-002.hana.ondemand.com/http/sendEMTSTrades";

            $.ajax({
                url: sUrl,
                method: "POST",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(oFormData),
                beforeSend: function (xhr) {
                    // var encodedCredentials = btoa(sUsername + ":" + sPassword);
                    xhr.setRequestHeader("Authorization", `Basic c2ItZjhiZGE3ZWUtOTM2NC00MTZmLWJhYTktMGI2MWFmMzFiYzc3IWI3Mjc0fGl0LXJ0LWNoc2luY2RldiFiNTYxODY6ZGQ4NmQ5OTUtNmU1ZS00NzU2LWJhMTctMDMwM2Y5MzVmYWVkJHhpZURLVjdTZlI1S1hTN1FwX3ZBRE5yNUdtRmpmT1Nmd195R0xZQUthUzg9`);
                },
                success: function (data) {
                    debugger
                    console.log("Success:", data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    debugger
                    console.error("Error:", textStatus, errorThrown);
                }
            });

        }
    });
});