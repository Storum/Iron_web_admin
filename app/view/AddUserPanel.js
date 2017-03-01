/*
 * File: app/view/AddUserPanel.js
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

Ext.define('Iron.view.AddUserPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.adduserpanel',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.Img',
        'Ext.Button',
        'Ext.Toolbar'
    ],

    config: {
        centered: true,
        itemId: 'addUserPanel',
        showAnimation: 'pop',
        width: 531,
        hideOnMaskTap: false,
        modal: true,
        items: [
            {
                xtype: 'fieldset',
                itemId: 'user_data_fieldset',
                title: 'Данные',
                items: [
                    {
                        xtype: 'textfield',
                        target: 'add_user',
                        itemId: 'user_nick_textfield',
                        clearIcon: false,
                        label: 'Ник',
                        name: 'nick'
                    },
                    {
                        xtype: 'textfield',
                        target: 'add_user',
                        itemId: 'user_pass_textfield',
                        clearIcon: false,
                        label: 'Пароль',
                        name: 'password'
                    },
                    {
                        xtype: 'textfield',
                        target: 'add_user',
                        itemId: 'user_name_textfield',
                        clearIcon: false,
                        label: 'Имя',
                        name: 'name'
                    },
                    {
                        xtype: 'textfield',
                        target: 'add_user',
                        itemId: 'user_patronymic_textfield',
                        clearIcon: false,
                        label: 'Отчество',
                        name: 'patronymic'
                    },
                    {
                        xtype: 'textfield',
                        target: 'add_user',
                        itemId: 'user_surname_textfield',
                        clearIcon: false,
                        label: 'Фамилия',
                        name: 'surname'
                    },
                    {
                        xtype: 'textfield',
                        target: 'add_user',
                        height: 116,
                        itemId: 'user_comment_textfield',
                        clearIcon: false,
                        label: 'Комментарии',
                        name: 'comment'
                    },
                    {
                        xtype: 'container',
                        itemId: 'image_container',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'image',
                                target: 'add_user',
                                height: 128,
                                itemId: 'user_image',
                                width: 128,
                                src: 'Default_user_icon.png'
                            },
                            {
                                xtype: 'button',
                                target: 'add_user',
                                itemId: 'load_user_image',
                                width: 172,
                                text: 'Загрузить фото'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                itemId: 'add_user_bottom_roolbar',
                items: [
                    {
                        xtype: 'button',
                        disabled: true,
                        docked: 'right',
                        itemId: 'add_btn',
                        text: 'Добавить'
                    },
                    {
                        xtype: 'button',
                        docked: 'right',
                        itemId: 'cancel_btn',
                        text: 'Отмена'
                    }
                ]
            }
        ]
    }

});