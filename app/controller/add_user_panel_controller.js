/*
 * File: app/controller/add_user_panel_controller.js
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

Ext.define('Iron.controller.add_user_panel_controller', {
    extend: 'Ext.app.Controller',

    config: {
        views: [
            'AddUserPanel'
        ],

        refs: {
            addUserPanel: {
                selector: 'panel#addUserPanel',
                xtype: 'adduserpanel'
            },
            cancel_btn: {
                selector: '#addUserPanel #cancel_btn',
                xtype: 'Ext.Button'
            },
            add_btn: {
                selector: '#addUserPanel #add_btn',
                xtype: 'Ext.Button'
            },
            userNickField: {
                selector: '#addUserPanel #user_nick_textfield',
                xtype: 'Ext.field.Text'
            },
            userNameField: {
                selector: '#addUserPanel  #user_name_textfield',
                xtype: 'Ext.field.Text'
            },
            userSurnameField: {
                selector: '#addUserPanel  #user_surname_textfield',
                xtype: 'Ext.field.Text'
            },
            userPatronymicField: {
                selector: '#addUserPanel  #user_patronymic_textfield',
                xtype: 'Ext.field.Text'
            },
            userCommentField: {
                selector: '#addUserPanel #user_comment_textfield',
                xtype: 'Ext.field.Text'
            },
            userPasswordField: {
                selector: '#addUserPanel #user_pass_textfield',
                xtype: 'Ext.field.Text'
            }
        },

        control: {
            "textfield[target='add_user']": {
                keyup: 'user_data_changed'
            },
            "cancel_btn": {
                tap: 'cancel_tap'
            },
            "add_btn": {
                tap: 'add_user_tap'
            },
            "addUserPanel": {
                hide: 'AddUserPanel_destroy'
            }
        }
    },

    user_data_changed: function(textfield, e, eOpts) {
        this.check_all_fields ();
    },

    cancel_tap: function(button, e, eOpts) {
        this.close_add_user_form ();
    },

    add_user_tap: function(button, e, eOpts) {
        var nick = this.getUserNickField().getValue();
        var name = this.getUserNameField().getValue();
        var surname = this.getUserSurnameField().getValue();
        var patronymic = this.getUserPatronymicField().getValue();
        var comment = this.getUserCommentField().getValue();
        var password = this.getUserPasswordField().getValue();

        this.add_user (nick, name, surname, patronymic, comment, password);
    },

    AddUserPanel_destroy: function(component, eOpts) {
        this.getApplication().getController('user_panel_controller').update_user_list();
    },

    check_all_fields: function() {
        var nick = this.getUserNickField().getValue();
        var name = this.getUserNameField().getValue();
        var surname = this.getUserSurnameField().getValue();
        var patronymic = this.getUserPatronymicField().getValue();
        var comment = this.getUserCommentField().getValue();
        var password = this.getUserPasswordField().getValue();




        if (nick.length > 0 && name.length > 0 && surname.length > 0 && patronymic.length > 0 && comment.length > 0 && password.length > 0)
            this.set_buttons_disable (false);
        else
            this.set_buttons_disable (true);

    },

    set_buttons_disable: function(disable) {
        var add_btn = this.getAdd_btn();

        add_btn.setDisabled(disable);
    },

    close_add_user_form: function() {
        var add_user_panel = this.getAddUserPanel();
        add_user_panel.destroy();

        this.getApplication().getController('user_panel_controller').update_user_list();
    },

    add_user: function(nick, name, surname, patronymic, comment, password) {
        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name: 'add_user',
                    nick: nick,
                    name: name,
                    surname: surname,
                    patronymic: patronymic,
                    comment: comment,
                    password: password,
                    format: 'json'
                },
                callbackKey: 'callback',
                scope: this,
                success: function (result)
                {
                    Ext.Msg.alert('Iron', result.text);

                    if (result.result == 'ok')
                        t.close_add_user_form ();

                }
            });



    }

});