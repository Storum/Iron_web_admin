/*
 * File: app/view/AddOrderPanel.js
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

Ext.define('Iron.view.AddOrderPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.addorderpanel',

    requires: [
        'Ext.Toolbar',
        'Ext.Label',
        'Ext.form.FieldSet',
        'Ext.Button',
        'Ext.field.Number',
        'Ext.field.Select',
        'Ext.field.Checkbox',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        centered: true,
        height: 648,
        itemId: 'addOrderPanel',
        width: 1130,
        modal: true,
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                html: '',
                items: [
                    {
                        xtype: 'label',
                        html: 'Заказов у клиента:',
                        itemId: 'id_tip'
                    }
                ]
            },
            {
                xtype: 'container',
                height: 553,
                layout: 'hbox',
                items: [
                    {
                        xtype: 'fieldset',
                        flex: 1,
                        height: 576,
                        itemId: 'order_info',
                        width: 545,
                        title: 'Информация о заказе',
                        items: [
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        target: 'add_order',
                                        flex: 35,
                                        disabled: true,
                                        itemId: 'id_client_field',
                                        width: 504,
                                        clearIcon: false,
                                        label: 'Клиент'
                                    },
                                    {
                                        xtype: 'button',
                                        flex: 1,
                                        itemId: 'id_select_client_btn',
                                        text: '...'
                                    }
                                ]
                            },
                            {
                                xtype: 'numberfield',
                                target: 'add_order',
                                itemId: 'id_ticket_number_field',
                                clearIcon: false,
                                label: '№ квитанции:'
                            },
                            {
                                xtype: 'numberfield',
                                target: 'add_order',
                                itemId: 'id_container_count_field',
                                clearIcon: false,
                                label: 'Кол. контейнеров:'
                            },
                            {
                                xtype: 'numberfield',
                                target: 'add_order',
                                disabled: true,
                                itemId: 'id_weight_field',
                                clearIcon: false,
                                label: 'Вес текстиль:'
                            },
                            {
                                xtype: 'numberfield',
                                target: 'add_order',
                                disabled: true,
                                itemId: 'id_weight_dress_field',
                                clearIcon: false,
                                label: 'Вес одежда:'
                            },
                            {
                                xtype: 'selectfield',
                                target: 'add_order',
                                disabled: false,
                                itemId: 'id_action_order',
                                label: 'Акция на заказ:',
                                autoSelect: false,
                                displayField: 'action_name',
                                store: 'order_actions_store',
                                valueField: 'id_action'
                            },
                            {
                                xtype: 'checkboxfield',
                                target: 'add_order',
                                itemId: 'id_white_field',
                                label: 'Белый:'
                            },
                            {
                                xtype: 'textfield',
                                target: 'add_order',
                                height: 83,
                                itemId: 'id_comment_field',
                                clearIcon: false,
                                label: 'Комментарии:'
                            },
                            {
                                xtype: 'toolbar',
                                docked: 'bottom',
                                items: [
                                    {
                                        xtype: 'button',
                                        itemId: 'id_cancle',
                                        text: ' Отмена'
                                    },
                                    {
                                        xtype: 'button',
                                        disabled: true,
                                        itemId: 'id_create_order',
                                        text: 'Сформировать'
                                    },
                                    {
                                        xtype: 'button',
                                        docked: 'right',
                                        itemId: 'id_order_menu',
                                        text: 'Меню'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        flex: 1,
                        height: 590,
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'label',
                                centered: false,
                                docked: 'top',
                                height: 29,
                                html: 'Состав заказа'
                            },
                            {
                                xtype: 'list',
                                centered: false,
                                docked: 'top',
                                height: 559,
                                itemId: 'order_detail_list',
                                width: 550,
                                itemTpl: [
                                    '<div class="order_detail"> <font size="2"> {wear_name} </font> </div>'
                                ],
                                store: 'order_detail_store',
                                items: [
                                    {
                                        xtype: 'toolbar',
                                        docked: 'bottom',
                                        height: 43,
                                        items: [
                                            {
                                                xtype: 'container',
                                                docked: 'right',
                                                width: 200,
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        flex: 1,
                                                        disabled: true,
                                                        itemId: 'id_delete_dress',
                                                        text: 'Удалить'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        flex: 1,
                                                        disabled: true,
                                                        itemId: 'id_add_dress',
                                                        text: 'Добавить'
                                                    }
                                                ]
                                            }
                                        ]
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