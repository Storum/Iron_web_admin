/*
 * File: app/controller/address_panel_controller.js
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

Ext.define('Iron.controller.address_panel_controller', {
    extend: 'Ext.app.Controller',

    config: {
        views: [
            'AddressPanel'
        ],

        refs: {
            ok_btn: {
                selector: 'panel#addressPanel button[itemId=id_ok_addr_btn]',
                xtype: 'Ext.Button'
            },
            save_btn: {
                selector: 'panel#addressPanel button[itemId=save_address_btn]',
                xtype: 'Ext.Button'
            },
            address_panel: {
                selector: 'panel#addressPanel',
                xtype: 'addresspanel'
            },
            addresslist: 'panel#addressPanel list[itemId=address_list]',
            address_type_select: {
                selector: 'panel#addressPanel selectfield[itemId=address_type_select]',
                xtype: 'Ext.field.Select'
            },
            address_name_fld: {
                selector: 'panel#addressPanel  textfield[itemId=address_name_textfield]',
                xtype: 'Ext.field.Text'
            },
            comment_fld: {
                selector: 'panel#addressPanel  textfield[itemId=comment_textfield]',
                xtype: 'Ext.field.Text'
            },
            delete_address_btn: 'panel#addressPanel button[itemId=delete_address_btn]',
            add_address_btn: 'panel#addressPanel  button[itemId=add_address_btn]'
        },

        control: {
            "ok_btn": {
                tap: 'ok_btn_tap'
            },
            "address_panel": {
                show: 'onAddressPanelShow'
            },
            "addresslist": {
                selectionchange: 'address_item_tap'
            },
            "textfield[target='edit_address']": {
                keyup: 'address_data_changed'
            },
            "address_type_select": {
                change: 'addr_type_change'
            },
            "add_address_btn": {
                tap: 'add_btn_tap'
            },
            "delete_address_btn": {
                tap: 'delete_btn_tap'
            },
            "save_btn": {
                tap: 'save_btn_tap'
            }
        }
    },

    ok_btn_tap: function(button, e, eOpts) {
        var address_panel = this.getAddress_panel();
        address_panel.destroy();


    },

    onAddressPanelShow: function(component, eOpts) {
        this.owner_type = 'client';
        this.address_list_owner_id = this.getApplication().getController('user_panel_controller').get_current_user_id();


        if (this.address_list_owner_id)
            this.owner_type = 'user';
        else
            this.address_list_owner_id = this.getApplication().getController('client_panel_controller').get_current_client_id();



        this.update_address_list ();
        this.update_address_type_list();
    },

    address_item_tap: function(selectable, records, eOpts) {
        var address_type = this.getAddress_type_select ();
        var address_name = this.getAddress_name_fld ();
        var comment = this.getComment_fld ();


        address_name.setValue (records[0].get('name'));
        comment.setValue (records[0].get('comment'));
        address_type.setValue (records[0].get('add_type_name'));

        this.change_delete_btn_disable (false);
    },

    address_data_changed: function(textfield, e, eOpts) {
        this.check_all_fields();
    },

    addr_type_change: function(selectfield, newValue, oldValue, eOpts) {
        this.check_all_fields();
    },

    add_btn_tap: function(button, e, eOpts) {

        addAddressPanel = Ext.create('widget.addaddresspanel');
        Ext.Viewport.add(addAddressPanel);
        addAddressPanel.show();

    },

    delete_btn_tap: function(button, e, eOpts) {
        var address_list = this.getAddresslist();
        var id_address_set = parseInt(address_list.getSelection()[0].get('id_address_set'), 0);

        this.delete_address (id_address_set);
    },

    save_btn_tap: function(button, e, eOpts) {
        var address_type = this.getAddress_type_select ().getValue();
        var address_name = this.getAddress_name_fld ().getValue();
        var comment = this.getComment_fld ().getValue();


        var address_list = this.getAddresslist();
        var id_address_set = address_list.getSelection ()[0].get('id_address_set');


        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name		: 'update_address',
                    owner_type			: t.owner_type,
                    id_address_set		: id_address_set,
                    id_address_type		: address_type,
                    name				: address_name,
                    comment				: comment,
                    format				: 'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_address_list ();
                    t.change_save_btn_status(true);
                }
            });

    },

    update_address_list: function() {
        var t = this;



        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name	: 'get_address_list',
                    id_owner		: t.address_list_owner_id,
                    owner_type		: t.owner_type,
                    format: 'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {

                    t.update_address_store (result.address_list);
                }
            });
    },

    update_address_store: function(data) {
        var address_list = this.getAddresslist();
        var address_store = address_list.getStore();


        address_store.data.clear();
        address_store.setData(data);

    },

    update_address_type_list: function() {

        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name	: 'get_address_type_list',
                    format: 'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_address_type_store (result.address_type_list);
                }
            });
    },

    update_address_type_store: function(data) {
        var address_type_select = this.getAddress_type_select();
        var address_type_store = address_type_select.getStore();


        address_type_store.data.clear();
        address_type_store.setData(data);

    },

    change_save_btn_status: function(newValue) {
        var addr_save_btn = this.getSave_btn();
        addr_save_btn.setDisabled (newValue);
    },

    change_delete_btn_disable: function(newValue) {
        var addr_delete_btn = this.getDelete_address_btn();
        addr_delete_btn.setDisabled (newValue);
    },

    check_all_fields: function() {
        var address_list = this.getAddresslist();

        if (address_list.getSelection().length !== 0)
        {
            var address_type = this.getAddress_type_select ();
            var address_name = this.getAddress_name_fld ();
            var comment = this.getComment_fld ();

            if (parseInt(address_list.getSelection()[0].get(address_type.getName()), 0) !== address_type.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }

            if (address_list.getSelection()[0].get(address_name.getName()) !== address_name.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }


            if (address_list.getSelection()[0].get(comment.getName()) !== comment.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }

            this.change_save_btn_status (true);
        }

    },

    delete_address: function(id_address_set) {


        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name	: 'delete_address',
                    id_address_set	: id_address_set,
                    owner_type		: t.owner_type,
                    format: 'json'
                },
                callbackKey: 'callback',
                scope: this,
                success: function (result)
                {
                    Ext.Msg.alert('Iron', result.text);

                    if (result.result == 'ok')
                        t.update_address_list ();

                }
            });
    },

    get_address_list_owner_id: function() {
        return this.address_list_owner_id;
    },

    get_address_list_owner_type: function() {
        return this.owner_type;
    }

});