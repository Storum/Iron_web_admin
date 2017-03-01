/*
 * File: app/controller/user_panel_controller.js
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

Ext.define('Iron.controller.user_panel_controller', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.data.JsonP',
        'Ext.MessageBox'
    ],

    config: {
        views: [
            'UserPanel'
        ],

        refs: {
            userPanel: {
                selector: '#id_user_panel',
                xtype: 'userpanel'
            },
            userDataFielset: '#user_data_fieldset',
            userMenu: {
                selector: '#userMenu',
                xtype: 'usermenu'
            },
            userList: {
                selector: '#userPanel #user_list',
                xtype: ''
            },
            userNickField: {
                selector: '#userPanel #user_nick_textfield',
                xtype: 'Ext.field.Text'
            },
            userNameField: {
                selector: '#userPanel  #user_name_textfield',
                xtype: 'Ext.field.Text'
            },
            userSurnameField: {
                selector: '#userPanel  #user_surname_textfield',
                xtype: 'Ext.field.Text'
            },
            userPatronymicField: {
                selector: '#userPanel  #user_patronymic_textfield',
                xtype: 'Ext.field.Text'
            },
            userDateCreateField: {
                selector: '#userPanel  #user_date_create_textfield',
                xtype: 'Ext.field.Text'
            },
            userCommentField: {
                selector: '#userPanel #user_comment_textfield',
                xtype: 'Ext.field.Text'
            },
            user_save_button: {
                selector: '#userPanel  #user_save_button',
                xtype: 'Ext.Button'
            },
            user_delete_button: {
                selector: '#userPanel  #delete_user_button',
                xtype: 'Ext.Button'
            },
            user_add_button: {
                selector: '#userPanel  #add_user_button',
                xtype: 'Ext.Button'
            },
            user_menu_button: {
                selector: '#userPanel  #usermenu_button',
                xtype: 'Ext.Button'
            }
        },

        control: {
            "textfield[target='edit_user']": {
                keyup: 'user_data_changed'
            },
            "user_save_button": {
                tap: 'save_tap'
            },
            "userpanel": {
                activate: 'userpanel_Activate'
            },
            "userList": {
                itemtap: 'onUserListSelect'
            },
            "user_menu_button": {
                tap: 'show_UserMenu'
            },
            "user_add_button": {
                tap: 'add_user_tap'
            },
            "user_delete_button": {
                tap: 'delete_user_tap'
            }
        }
    },

    user_data_changed: function(textfield, e, eOpts) {

        this.check_field_change ();
    },

    save_tap: function(button, e, eOpts) {

        var nick = this.getUserNickField().getValue();
        var name = this.getUserNameField().getValue();
        var surname = this.getUserSurnameField().getValue();
        var patronymic = this.getUserPatronymicField().getValue();
        var comment = this.getUserCommentField().getValue();

        var user_list = this.getUserList();
        var selected_id_user = user_list.getSelection ()[0].get('id_user');

        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name: 'update_user_data',
                    id_user: selected_id_user,
                    nick: nick,
                    name: name,
                    surname: surname,
                    patronymic: patronymic,
                    comment: comment,
                    format: 'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_user_list();
                    t.change_save_btn_status(true);

                    t.select_user_in_listview (user_list, selected_id_user);
                }
            });

    },

    userpanel_Activate: function(newActiveItem, container, oldActiveItem, eOpts) {
        this.update_user_list();
    },

    onUserListSelect: function(dataview, index, target, record, e, eOpts) {

        var user_NickField			= this.getUserNickField();
        var user_NameField			= this.getUserNameField();
        var user_SurnameField		= this.getUserSurnameField();
        var user_PatronymicField	= this.getUserPatronymicField();
        var user_DateField			= this.getUserDateCreateField();
        var user_CommentField		= this.getUserCommentField();


        user_NickField.setValue (record.get('nick'));
        user_NameField.setValue (record.get('name'));
        user_SurnameField.setValue (record.get('surname'));
        user_PatronymicField.setValue (record.get('patronymic'));
        user_CommentField.setValue (record.get('comment'));


        this.change_btn_disable (false);
        this.change_save_btn_status (true);
    },

    show_UserMenu: function(target) {


        var menu = this.getUserMenu();
        if (!menu) {
            menu = Ext.create('widget.usermenu');
        }


        // Show menu by menu button
        menu.showBy(target);

    },

    add_user_tap: function(button, e, eOpts) {


        addUserPanel = Ext.create('widget.adduserpanel');
        Ext.Viewport.add(addUserPanel);
        addUserPanel.show();

    },

    delete_user_tap: function(button, e, eOpts) {
        var user_list = this.getUserList();
        var selected_id_user = user_list.getSelection ()[0].get('id_user');

        this.delete_user (selected_id_user, false);
    },

    check_field_change: function() {
        var user_list = this.getUserList();


        if (user_list.getSelection().length !== 0)
        {
            var nick = this.getUserNickField();
            var name = this.getUserNameField();
            var surname = this.getUserSurnameField();
            var patronymic = this.getUserPatronymicField();
            var comment = this.getUserCommentField();

            if (user_list.getSelection()[0].get(nick.getName()) !== nick.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }

            if (user_list.getSelection()[0].get(name.getName()) !== name.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }


            if (user_list.getSelection()[0].get(surname.getName()) !== surname.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }

            if (user_list.getSelection()[0].get(patronymic.getName()) !== patronymic.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }

            if (user_list.getSelection()[0].get(comment.getName()) !== comment.getValue())
            {
                this.change_save_btn_status (false);
                return;
            }

            this.change_save_btn_status (true);

        }
    },

    change_save_btn_status: function(newValue) {
        var usr_save_btn = this.getUser_save_button();
        usr_save_btn.setDisabled (newValue);
    },

    change_btn_disable: function(disabled) {
        var usr_del_btn = this.getUser_delete_button ();
        var usr_menu_btn = this.getUser_menu_button();


        usr_del_btn.setDisabled (disabled);
        usr_menu_btn.setDisabled (disabled);
    },

    update_user_list: function() {
        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name: 'get_user_list',
                    format: 'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_user_store (result.user_list);
                }
            });
    },

    update_user_store: function(data) {

        var user_ListView = this.getUserList();
        var user_store = user_ListView.getStore();

        user_store.data.clear();
        user_store.setData(data);
        //user_ListView.refresh();
    },

    select_user_in_listview: function(listview, id_user) {


        var store = listview.getStore();
        var record_index = store.find ('id_user', id_user);
        listview.select (0, false, true);

        //listview.fireEvent('itemtap', listview, 0, listview.getAt(0), null, null);
    },

    get_current_user_id: function() {
        var user_list = this.getUserList();

        if (user_list)
        {
            var selected_id_user = user_list.getSelection ()[0].get('id_user');
            return selected_id_user;
        }
        else
            return null;

    },

    delete_user: function(id_user, is_silent) {
        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name: 'delete_user',
                    id_user: id_user,
                    format: 'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    var user_list = t.getUserList();

                    t.update_user_list();
                    t.change_save_btn_status(true);

                    t.select_user_in_listview (user_list, id_user);

                    Ext.Msg.alert('Iron', result.text);
                }
            });
    }

});