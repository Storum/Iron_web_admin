/*
 * File: app/view/ClientPanel.js
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

Ext.define('Iron.view.ClientPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.clientpanel',

    requires: [
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.picker.Date'
    ],

    config: {
        itemId: 'clientPanel',
        layout: 'vbox',
        items: [
            {
                xtype: 'list',
                flex: 1,
                disabled: false,
                docked: 'left',
                height: 648,
                itemId: 'client_list',
                maxHeight: '',
                width: 329,
                itemTpl: [
                    '<div class="user"> {name}<br>{surname}<br> </div>'
                ],
                store: 'client_store',
                striped: true,
                variableHeights: true
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                height: 41,
                itemId: 'user_toolbar',
                items: [
                    {
                        xtype: 'button',
                        flex: 1,
                        disabled: true,
                        docked: 'right',
                        itemId: 'client_save_button',
                        width: 133,
                        iconCls: 'bookmarks',
                        text: 'Сохранить'
                    },
                    {
                        xtype: 'button',
                        flex: 1,
                        disabled: true,
                        docked: 'left',
                        itemId: 'clientmenu_button',
                        ui: 'decline-round',
                        width: 101,
                        iconCls: 'more',
                        text: 'Меню'
                    },
                    {
                        xtype: 'button',
                        centered: false,
                        disabled: true,
                        hidden: true,
                        itemId: 'select_client_button',
                        ui: 'confirm',
                        text: 'Выбрать'
                    },
                    {
                        xtype: 'button',
                        hidden: true,
                        itemId: 'cancel_button',
                        ui: 'confirm',
                        text: 'Отмена'
                    }
                ]
            },
            {
                xtype: 'container',
                flex: 1,
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        items: [
                            {
                                xtype: 'container',
                                docked: 'top',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'button',
                                        docked: 'right',
                                        itemId: 'add_client_button',
                                        ui: 'confirm',
                                        width: 125,
                                        iconCls: 'add',
                                        text: 'Добавить'
                                    },
                                    {
                                        xtype: 'button',
                                        disabled: true,
                                        docked: 'right',
                                        itemId: 'delete_client_button',
                                        ui: 'decline',
                                        width: 125,
                                        iconCls: 'delete',
                                        text: 'Удалить'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        docked: 'top',
                        itemId: 'client_data_fieldset',
                        title: 'Данные',
                        items: [
                            {
                                xtype: 'textfield',
                                target: 'edit_client',
                                itemId: 'client_name_textfield',
                                clearIcon: false,
                                label: 'Имя',
                                name: 'name'
                            },
                            {
                                xtype: 'textfield',
                                target: 'edit_client',
                                itemId: 'client_patronymic_textfield',
                                clearIcon: false,
                                label: 'Отчество',
                                name: 'patronymic'
                            },
                            {
                                xtype: 'textfield',
                                target: 'edit_client',
                                itemId: 'client_surname_textfield',
                                clearIcon: false,
                                label: 'Фамилия',
                                name: 'surname'
                            },
                            {
                                xtype: 'selectfield',
                                target: 'edit_client',
                                itemId: 'client_gender_field',
                                label: 'Пол',
                                name: 'id_gender',
                                autoSelect: false,
                                displayField: 'name',
                                store: 'gender_store',
                                valueField: 'id_gender'
                            },
                            {
                                xtype: 'textfield',
                                target: 'edit_client',
                                id: 'birthday_textfield_',
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
                                xtype: 'datepickerfield',
                                target: 'edit_client',
                                disabled: true,
                                itemId: 'client_date_create_textfield',
                                label: 'Дата создания',
                                placeHolder: 'mm/dd/yyyy'
                            },
                            {
                                xtype: 'textfield',
                                target: 'edit_client',
                                height: 116,
                                itemId: 'client_comment_textfield',
                                label: 'Комментарии',
                                name: 'comment'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});