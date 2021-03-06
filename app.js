/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

// @require @packageOverrides
Ext.Loader.setConfig({

});


Ext.application({
    models: [
        'user_model',
        'address_model',
        'address_type_model',
        'phone_model',
        'client_model',
        'gender_model',
        'item_type_groups_model',
        'item_type_model',
        'color_model',
        'select_price_model',
        'order_detail_model',
        'order_actions_model',
        'order_status_model',
        'order_model',
        'order_for_phone',
        'executor_model',
        'order_by_status_model',
        'item_type_full_model',
        'client_filter_model'
    ],
    stores: [
        'user_store',
        'address_store',
        'address_type_store',
        'phone_store',
        'client_store',
        'gender_store',
        'item_type_groups_store',
        'item_type_store',
        'color_store',
        'select_price_store',
        'order_detail_store',
        'order_actions_store',
        'order_status_store',
        'order_store',
        'order_for_phone',
        'executor_store',
        'order_by_status_store',
        'item_type_full_store',
        'item_type_full_tree_store',
        'client_filter_store'
    ],
    views: [
        'MainView',
        'HomePanel',
        'AboutPanel',
        'ContactPanel',
        'NavMenu',
        'UserPanel',
        'AddAddressPanel',
        'PhonePanel',
        'AddPhonePanel',
        'ClientPanel',
        'ClientMenu',
        'AddClientPanel',
        'OrderPanel',
        'AddOrderPanel',
        'AddDressForOrderPanel',
        'DoneOrderReport',
        'ReportsMenuPanel',
        'SearchOrderMenu',
        'OrderTaskPanel',
        'CatalogMenu',
        'EditItemTypeGroupsPanel',
        'ItemTypesPanel',
        'EditItemTypesPanel'
    ],
    controllers: [
        'Navigation',
        'user_panel_controller',
        'add_user_panel_controller',
        'user_menu_controller',
        'address_panel_controller',
        'add_address_controller',
        'phone_panel_controller',
        'add_phone_controller',
        'client_panel_controller',
        'client_menu_controller',
        'add_client_controller',
        'order_panel_controller',
        'add_order_panel_controller',
        'order_menu_controller',
        'add_dress_for_order_controller',
        'done_order_report_controller',
        'report_menu_controller',
        'client_panel_ext_controller',
        'search_order_menu_controller',
        'order_task_controller',
        'catalog_menu_controller',
        'edit_item_type_groups_panel_controller',
        'item_types_panel_controller',
        'edit_item_types_panel_controller'
    ],
    name: 'Iron',

    launch: function() {
        Date.prototype.toLocaleFormat2 = function(format) {


                //    this.setTime (((this.getTime()/1000.0) - (this.getTimezoneOffset()*60)) * 1000);



                    var f = {y : this.getYear() + 1900,m : this.getMonth() + 1,d : this.getDate(),H : this.getHours(),M : this.getMinutes(),S : this.getSeconds()};
                    for(var k in f)
                        format = format.replace('%' + k, f[k] < 10 ? "0" + f[k] : f[k]);
                    return format;
                };



        if (Ext.browser.is.WebKit) {

                Ext.override(Ext.util.SizeMonitor, {
                    constructor: function (config) {
                        var namespace = Ext.util.sizemonitor;
                        return new namespace.Scroll(config);
                    }
                });

                Ext.override(Ext.util.PaintMonitor, {
                    constructor: function (config) {
                        return new Ext.util.paintmonitor.CssAnimation(config);
                    }
                });
         }



        Ext.create('Iron.view.MainView', {fullscreen: true});
    }

});
