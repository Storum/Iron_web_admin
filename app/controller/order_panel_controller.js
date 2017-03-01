/*
 * File: app/controller/order_panel_controller.js
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

Ext.define('Iron.controller.order_panel_controller', {
    extend: 'Ext.app.Controller',

    config: {
        stores: [
            'user_store',
            'order_status_store',
            'order_actions_store',
            'client_store',
            'order_store'
        ],

        refs: {
            addOrderPanel: 'panel#addOrderPanel',
            orderPanel: 'panel#orderPanel',
            order_action_select: 'panel#orderPanel selectfield[itemId=id_action_order]',
            order_status_select: 'panel#orderPanel selectfield[itemId=id_order_status]',
            order_executor_select: 'panel#orderPanel selectfield[itemId=id_order_executor]',
            order_client_select: 'panel#orderPanel selectfield[itemId=id_order_client]',
            ticket_number: 'panel#orderPanel numberfield[itemId=id_ticket_number_field]',
            container_count: 'panel#orderPanel numberfield[itemId=id_container_count_field]',
            weight: 'panel#orderPanel numberfield[itemId=id_weight_field]',
            weight_dress: 'panel#orderPanel numberfield[itemId=id_weight_dress]',
            white: 'panel#orderPanel checkboxfield[itemId=id_white_field]',
            comment: 'panel#orderPanel textfield[itemId=id_comment_field]',
            addition_info: 'panel#orderPanel textfield[itemId=id_addition_info_field]',
            order_save_button: 'panel#orderPanel  button[itemId=order_save_button]',
            order_list: 'panel#orderPanel list[itemId=id_order_list]',
            order_menu_btn: 'panel#orderPanel button[itemId=order_menu_button]',
            add_order_button: 'panel#orderPanel button[itemId=add_order_button]',
            delete_order_btn: 'panel#orderPanel button[itemId=delete_order_button]',
            search_order: 'panel#orderPanel searchfield[itemId=id_search_order]',
            order_menu_button: 'panel#orderPanel button[itemId=order_menu_button]',
            addOrderMenu: 'panel#orderPanel panel#addorderMenu'
        },

        control: {
            "add_order_button": {
                tap: 'add_order_tap'
            },
            "orderPanel": {
                show: 'onOrderPanelShow'
            },
            "order_list": {
                itemtap: 'order',
                itemdoubletap: 'edit_order_detail'
            },
            "panel#orderPanel selectfield": {
                change: 'onSelectfieldChange'
            },
            "panel#orderPanel numberfield": {
                keyup: 'onNumberfieldKeyup'
            },
            "panel#orderPanel textfield": {
                keyup: 'onTextfieldKeyup'
            },
            "panel#orderPanel checkboxfield": {
                change: 'onCheckboxfieldChange'
            },
            "delete_order_btn": {
                tap: 'delete_tap'
            },
            "order_save_button": {
                tap: 'save_btn'
            },
            "search_order": {
                keyup: 'search',
                clearicontap: 'clear_filter_tap'
            },
            "order_menu_button": {
                tap: 'menu_open'
            }
        }
    },

    add_order_tap: function(button, e, eOpts) {
        var add_order_panel = Ext.create('widget.addorderpanel');
        Ext.Viewport.add(add_order_panel);
        add_order_panel.show();
    },

    onOrderPanelShow: function(component, eOpts) {
        this.update_order_action_list();
        this.update_order_status_list();
        this.update_order_executor_list();
        this.update_order_client_list();
        this.update_order_list();
    },

    order: function(dataview, index, target, record, e, eOpts) {
        var order_action_select = this.getOrder_action_select();
        var order_status_select = this.getOrder_status_select();
        var order_executor_select = this.getOrder_executor_select();
        var order_client_select = this.getOrder_client_select();
        var ticket_number = this.getTicket_number();
        var container_count = this.getContainer_count();
        var weight = this.getWeight();
        var weight_dress = this.getWeight_dress();
        var white = this.getWhite();
        var comment = this.getComment();
        var addition_info = this.getAddition_info();




        order_action_select.setValue (record.get('id_action'));
        order_status_select.setValue (record.get('id_status'));
        order_executor_select.setValue (record.get('id_executor'));
        order_client_select.setValue (record.get('id_client'));
        ticket_number.setValue (record.get('ticket_number'));
        container_count.setValue (record.get('cont_count'));
        weight.setValue (record.get('weight_home'));
        weight_dress.setValue (record.get('weight_dress'));
        weight_dress.setValue (record.get('weight_dress'));
        comment.setValue (record.get('comment'));

        if (record.get('is_white'))
            white.check ();
        else
            white.uncheck ();


        this.change_save_btn_status (true);
        this.change_btn_disable (false);

        //console.log(record);
    },

    edit_order_detail: function(dataview, index, target, record, e, eOpts) {
        var order_client_select = this.getOrder_client_select();


        var addOrderPanel = Ext.create('widget.addorderpanel');
        addOrderPanel.source_controller = 'order_panel_controller';
        addOrderPanel.target = 'edit_order';
        addOrderPanel.record = record;
        addOrderPanel.client_name = order_client_select.getStore().findRecord('id_client', order_client_select.getValue()).get('name');



        Ext.Viewport.add(addOrderPanel);
        addOrderPanel.show();
    },

    onSelectfieldChange: function(selectfield, newValue, oldValue, eOpts) {
        this.check_field_change();
    },

    onNumberfieldKeyup: function(textfield, e, eOpts) {
        this.check_field_change();
    },

    onTextfieldKeyup: function(textfield, e, eOpts) {
        this.check_field_change();
    },

    onCheckboxfieldChange: function(checkboxfield, newValue, oldValue, eOpts) {
        this.check_field_change();
    },

    delete_tap: function(button, e, eOpts) {
        var id_order = this.getOrder_list().getSelection()[0].get('id_order');


        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name		:	'delete_order',
                    id_order			:	id_order,
                    format				:	'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_order_list();
                    t.change_save_btn_status(true);


                    Ext.Msg.alert('Iron', result.text);


                }
            });
    },

    save_btn: function(button, e, eOpts) {
        var id_order = this.getOrder_list().getSelection()[0].get('id_order');

        var id_action = this.getOrder_action_select().getValue();
        var id_status = this.getOrder_status_select().getValue();
        var id_executor = this.getOrder_executor_select().getValue();
        var id_client = this.getOrder_client_select().getValue();
        var ticket_number = this.getTicket_number().getValue();
        var container_count = this.getContainer_count().getValue();
        var weight_home = this.getWeight().getValue();
        var weight_dress = this.getWeight_dress().getValue();

        var is_white_ = this.getWhite().getChecked();
        var is_white = 0;
        if (is_white_)
            is_white = 1;

        var comment = this.getComment().getValue();
        var addition_info = this.getAddition_info().getValue();


        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name		:	'update_order_ext',
                    id_order			:	id_order,
                    id_status			:	id_status,
                    id_client			:	id_client,
                    id_executor			:	id_executor,
                    id_action			:	id_action,
                    container_count		:	container_count,
                    weight_home			:	weight_home,
                    weight_dress		:	weight_dress,
                    ticket_number		:	ticket_number,
                    is_white			:	is_white,
                    comment				:	comment,
                    format				:	'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_order_list();
                    t.change_save_btn_status(true);
                    Ext.Msg.alert('Iron', result.text);
                }
            });

    },

    search: function(textfield, e, eOpts) {
        var value = textfield.getValue(),
        store = this.getOrder_list().getStore();
        store.clearFilter();

        store.filter('id_order', value);
    },

    clear_filter_tap: function(textfield, e, eOpts) {
        store = this.getOrder_list().getStore();
        store.clearFilter();

    },

    menu_open: function(target) {

        var menu = this.getAddOrderMenu();
        if (!menu) {
            menu = Ext.create('widget.addordermenu');
        }


        // Show menu by menu button
        menu.showBy(target);


    },

    check_field_change: function() {
        var order_list = this.getOrder_list();



        if (order_list.getSelection().length !== 0)
        {
            var order_action_select = this.getOrder_action_select();
            var order_status_select = this.getOrder_status_select();
            var order_executor_select = this.getOrder_executor_select();
            var order_client_select = this.getOrder_client_select();
            var ticket_number = this.getTicket_number();
            var container_count = this.getContainer_count();
            var weight = this.getWeight();
            var weight_dress = this.getWeight_dress();
            var white = this.getWhite();
            var comment = this.getComment();


            if (order_list.getSelection()[0].get(order_action_select.getName()) !== order_action_select.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }


            if (order_list.getSelection()[0].get(order_status_select.getName()) !== order_status_select.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }

            if (order_list.getSelection()[0].get(order_executor_select.getName()) !== order_executor_select.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }

            if (order_list.getSelection()[0].get(order_client_select.getName()) !== order_client_select.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }



            if (order_list.getSelection()[0].get(ticket_number.getName()) !== ticket_number.getValue() && ticket_number.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }


            if (order_list.getSelection()[0].get(container_count.getName()) !== container_count.getValue() && container_count.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }


            if (order_list.getSelection()[0].get(weight.getName()) !== weight.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }

            if (order_list.getSelection()[0].get(weight_dress.getName()) !== weight_dress.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }


            if (order_list.getSelection()[0].get(white.getName()) !== white.getChecked())
            {
                this.change_save_btn_status (false);
                return;
            }

            if (order_list.getSelection()[0].get(comment.getName()) !== comment.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }

            this.change_save_btn_status (true);

        }
    },

    change_save_btn_status: function(newValue) {
        var save_btn = this.getOrder_save_button();
        save_btn.setDisabled (newValue);
    },

    change_btn_disable: function(disabled) {
        var del_btn = this.getDelete_order_btn();
        var menu_btn = this.getOrder_menu_btn();



        del_btn.setDisabled (disabled);
        menu_btn.setDisabled (disabled);
    },

    update_order_action_list: function() {
        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name		:	'get_current_order_actions',
                    format				:	'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_order_action_store (result.current_order_action_list);
                }
            });
    },

    update_order_action_store: function(data) {
        var order_action_list = this.getOrder_action_select();
        order_action_list_store = order_action_list.getStore();


        order_action_list_store.data.clear();
        order_action_list_store.setData(data);
    },

    update_order_status_list: function() {
        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name		:	'get_order_status_list',
                    format				:	'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_order_status_store (result.status_list);
                }
            });
    },

    update_order_status_store: function(data) {
        var order_status_list = this.getOrder_status_select();
        var order_status_store = order_status_list.getStore();


        order_status_store.data.clear();
        order_status_store.setData(data);
    },

    update_order_executor_list: function() {
        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name		:	'get_user_list',
                    format				:	'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_order_executor_store (result.user_list);
                }
            });
    },

    update_order_executor_store: function(data) {
        var order_executor_list = this.getOrder_executor_select();
        var order_executor_store = order_executor_list.getStore();


        order_executor_store.data.clear();
        order_executor_store.setData(data);
    },

    update_order_client_list: function() {
        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name		:	'get_client_list',
                    format				:	'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_order_client_store (result.client_list);
                }
            });
    },

    update_order_client_store: function(data) {
        var order_client_list = this.getOrder_client_select();
        var order_client_store = order_client_list.getStore();


        order_client_store.data.clear();
        order_client_store.setData(data);
    },

    update_order_list: function() {
        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name		:	'get_order_list',
                    format				:	'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_order_store (result.order_list);
                }
            });
    },

    update_order_store: function(data) {
        var order_list = this.getOrder_list();
        var order_store = order_list.getStore();


        order_store.data.clear();
        order_store.setData(data);
    },

    get_selected_order: function() {
        return this.getOrder_list().getSelection()[0];
    },

    get_selected_order_client: function() {
        var selected_order = this.getOrder_list().getSelection()[0];
        var client_store = this.getOrder_client_select().getStore();


        return client_store.getAt(client_store.find('id_client', selected_order.get('id_client')));

    },

    get_selected_order_action: function() {
        var selected_order = this.getOrder_list().getSelection()[0];
        var action_store = this.getOrder_action_select().getStore();


        return action_store.getAt(action_store.find('id_action', selected_order.get('id_action')));
    }

});