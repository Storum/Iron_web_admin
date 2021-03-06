/*
 * File: app/controller/phone_panel_controller.js
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

Ext.define('Iron.controller.phone_panel_controller', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            phone_panel: 'panel#phonePanel',
            phonelist: 'panel#phonePanel list[itemId=id_phone_list]',
            add_btn: 'panel#phonePanel button[itemId=id_add_btn]',
            delete_btn: 'panel#phonePanel button[itemId=id_delete_btn]',
            save_btn: 'panel#phonePanel button[itemId=id_save_btn]',
            ok_btn: 'panel#phonePanel button[itemId=id_ok_btn]',
            phone_field: 'panel#phonePanel textfield[itemId=id_phone_field]',
            primary_phone_checkbox: 'panel#phonePanel checkboxfield[itemId=id_primary_phone_checkbox]',
            phone_comment_field: 'panel#phonePanel textfield[itemId=id_phone_comment_field]'
        },

        control: {
            "phone_panel": {
                show: 'onPhonePanelShow'
            },
            "textfield[target='edit_phone']": {
                keyup: 'phone_data_chenged'
            },
            "add_btn": {
                tap: 'add_btn_tap'
            },
            "delete_btn": {
                tap: 'delete_btn_tap'
            },
            "save_btn": {
                tap: 'save_btn_tap'
            },
            "ok_btn": {
                tap: 'ok_btn_tap'
            },
            "phonelist": {
                selectionchange: 'onListSelectionChange'
            },
            "primary_phone_checkbox": {
                change: 'is_primary_change'
            }
        }
    },

    onPhonePanelShow: function(component, eOpts) {
        this.owner_type = 'client';
        this.phone_list_owner_id = this.getApplication().getController('user_panel_controller').get_current_user_id();


        if (this.phone_list_owner_id)
            this.owner_type = 'user';
        else
            this.phone_list_owner_id = this.getApplication().getController('client_panel_controller').get_current_client_id();


        this.update_phone_list();
    },

    phone_data_chenged: function(textfield, e, eOpts) {
        this.check_all_fields();
    },

    add_btn_tap: function(button, e, eOpts) {


        addPhonePanel = Ext.create('widget.addphonepanel');
        Ext.Viewport.add(addPhonePanel);
        addPhonePanel.show();

    },

    delete_btn_tap: function(button, e, eOpts) {
        var phone_list = this.getPhonelist();
        var id_phone_set = parseInt(phone_list.getSelection()[0].get('id_phone_set'), 0);

        this.delete_phone (id_phone_set);
    },

    save_btn_tap: function(button, e, eOpts) {
        var phone = this.getPhone_field ().getValue();
        var is_primary = this.getPrimary_phone_checkbox ().getChecked();
        var phone_comment = this.getPhone_comment_field().getValue();


        var phone_list = this.getPhonelist();
        var id_phone_set = phone_list.getSelection()[0].get('id_phone_set');


        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name	: 'update_phone',
                    id_phone_set	: id_phone_set,
                    owner_type		: t.owner_type,
                    phone			: phone,
                    is_primary		: is_primary,
                    comment			: phone_comment,
                    format			: 'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_phone_list ();
                    t.change_save_btn_status(true);
                }
            });

    },

    ok_btn_tap: function(button, e, eOpts) {
        var phone_panel = this.getPhone_panel();
        phone_panel.destroy();


    },

    onListSelectionChange: function(selectable, records, eOpts) {

        var phone = this.getPhone_field ();
        var is_primary = this.getPrimary_phone_checkbox ();
        var phone_comment = this.getPhone_comment_field ();


        phone.setValue (records[0].get('phone'));

        phone_comment.setValue (records[0].get('comment'));

        if (records[0].get('is_primary'))
            is_primary.check ();
        else
            is_primary.uncheck ();


        this.change_delete_btn_disable (false);
    },

    is_primary_change: function(checkboxfield, newValue, oldValue, eOpts) {
        this.check_all_fields();
    },

    update_phone_list: function() {
        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name	: 'get_phone_list',
                    id_owner		: t.phone_list_owner_id,
                    owner_type		: t.owner_type,
                    format: 'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_phone_store (result.phone_list);
                }
            });
    },

    update_phone_store: function(data) {
        var phone_list = this.getPhonelist();
        var phone_store = phone_list.getStore();


        phone_store.data.clear();
        phone_store.setData(data);

    },

    change_delete_btn_disable: function(newValue) {
        var delete_btn = this.getDelete_btn();
        delete_btn.setDisabled (newValue);
    },

    check_all_fields: function() {
        var phone_list = this.getPhonelist();

        if (phone_list.getSelection().length !== 0)
        {
            var phone = this.getPhone_field ();
            var is_primary = this.getPrimary_phone_checkbox ();
            var phone_comment = this.getPhone_comment_field();


            if (phone_list.getSelection()[0].get(phone.getName()) !== phone.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }

            if (phone_list.getSelection()[0].get(is_primary.getName()) !== is_primary.getChecked())
            {
                this.change_save_btn_status (false);
                return;
            }

            if (phone_list.getSelection()[0].get(phone_comment.getName()) !== phone_comment.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }

            this.change_save_btn_status (true);
        }

    },

    change_save_btn_status: function(newValue) {
        var save_btn = this.getSave_btn();
        save_btn.setDisabled (newValue);
    },

    delete_phone: function(id_phone_set) {

        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name	: 'delete_phone',
                    id_phone_set	: id_phone_set,
                    owner_type		: t.owner_type,
                    format: 'json'
                },
                callbackKey: 'callback',
                scope: this,
                success: function (result)
                {
                    Ext.Msg.alert('Iron', result.text);

                    if (result.result == 'ok')
                        t.update_phone_list ();

                }
            });



    },

    get_phone_list_owner_id: function() {
        return this.phone_list_owner_id;
    },

    get_phone_list_owner_type: function() {
        return this.owner_type;
    }

});