/*
 * File: app/view/AddClientPanel.js
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

Ext.define('Iron.view.AddClientPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.addclientpanel',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Select',
        'Ext.Toolbar',
        'Ext.Button'
    ],

    config: {
        centered: true,
        height: 573,
        itemId: 'addClientPanel',
        showAnimation: 'pop',
        width: 543,
        hideOnMaskTap: false,
        layout: 'vbox',
        modal: true,
        items: [
            {
                xtype: 'fieldset',
                flex: 0,
                itemId: 'client_data_fieldset1',
                title: 'Данные',
                items: [
                    {
                        xtype: 'textfield',
                        target: 'add_client',
                        itemId: 'client_name_textfield',
                        clearIcon: false,
                        inputCls: 'mandatory-textfield',
                        label: 'Имя',
                        name: 'name'
                    },
                    {
                        xtype: 'textfield',
                        target: 'add_client',
                        itemId: 'client_patronymic_textfield',
                        clearIcon: false,
                        inputCls: 'mandatory-textfield',
                        label: 'Отчество',
                        name: 'patronymic'
                    },
                    {
                        xtype: 'textfield',
                        target: 'add_client',
                        itemId: 'client_surname_textfield',
                        clearIcon: false,
                        inputCls: 'mandatory-textfield',
                        label: 'Фамилия',
                        name: 'surname'
                    },
                    {
                        xtype: 'selectfield',
                        target: 'add_client',
                        itemId: 'client_gender_field',
                        inputCls: 'mandatory-selectfield',
                        label: 'Пол',
                        name: 'id_gender',
                        autoSelect: false,
                        displayField: 'name',
                        store: 'gender_store',
                        valueField: 'id_gender'
                    },
                    {
                        xtype: 'textfield',
                        target: 'add_client',
                        itemId: 'client_phone_textfield',
                        clearIcon: false,
                        inputCls: 'mandatory-textfield',
                        label: 'Телефон',
                        name: 'phone'
                    },
                    {
                        xtype: 'textfield',
                        target: 'add_client',
                        height: 70,
                        itemId: 'client_address_textfield',
                        clearIcon: false,
                        label: 'Адрес',
                        name: 'address'
                    },
                    {
                        xtype: 'textfield',
                        target: 'add_client',
                        id: 'birthday_textfield',
                        component: {
                            xtype: 'input',
                            type: 'date',
                            fastFocus: true
                        },
                        clearIcon: false,
                        label: 'Дата рождения',
                        name: 'birthday'
                    },
                    {
                        xtype: 'textfield',
                        target: 'add_client',
                        height: 94,
                        itemId: 'client_comment_textfield',
                        label: 'Комментарии',
                        name: 'comment'
                    },
                    {
                        xtype: 'toolbar',
                        docked: 'bottom',
                        itemId: 'add_client_bottom_roolbar',
                        items: [
                            {
                                xtype: 'container',
                                docked: 'right',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'button',
                                        disabled: true,
                                        docked: 'left',
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
                ]
            }
        ]
    }

});