/*
 * File: app/controller/done_order_report_controller.js
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

Ext.define('Iron.controller.done_order_report_controller', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            doneOrderReport: 'panel#doneOrderReport',
            mark_as_phoned_btn: 'panel#doneOrderReport button[itemId=mark_as_phoned_btn]',
            order_list: 'panel#doneOrderReport list[itemId=order_list]',
            ok_btn: 'panel#doneOrderReport button[itemId=ok_btn]'
        },

        control: {
            "panel#doneOrderReport": {
                show: 'Panel_show'
            },
            "ok_btn": {
                tap: 'ok_tap'
            },
            "order_list": {
                selectionchange: 'order_SelectionChange'
            },
            "mark_as_phoned_btn": {
                tap: 'mark_tap'
            }
        }
    },

    Panel_show: function(component, eOpts) {
        this.update_order_list();
    },

    ok_tap: function(button, e, eOpts) {
        this.getDoneOrderReport().destroy();
    },

    order_SelectionChange: function(selectable, records, eOpts) {
        this.check_selection();
    },

    mark_tap: function(button, e, eOpts) {
        var selection = this.getOrder_list().getSelection();

        this.count = selection.length;


        for (var i = 0; i < this.count; i++)
        {
            var id_order = selection[i].get('id_order');
            this.update_status (id_order);
        }



        //console.log(selection);
    },

    update_order_list: function() {
        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name: 'get_order_for_phone_list',
                    format: 'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_order_store (result.order_for_phone_list);
                }
            });
    },

    update_order_store: function(data) {
        var order_list = this.getOrder_list();
        var order_store = order_list.getStore();


        order_store.setData(data);
    },

    check_selection: function() {
        var selection = this.getOrder_list().getSelection();

        if (selection.length > 0)
            this.getMark_as_phoned_btn().setDisabled(false);
        else
            this.getMark_as_phoned_btn().setDisabled(true);
    },

    update_status: function(id_order) {
        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name: 'update_order_status_as_phoned',
                    id_order:		id_order,
                    format: 'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.count -= 1;

                    if (t.count === 0)
                    {
                        Ext.Msg.alert('Iron', result.text);
                        t.getDoneOrderReport().destroy();
                    }


                }
            });
    }

});