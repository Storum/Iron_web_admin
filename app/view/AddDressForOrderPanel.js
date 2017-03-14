/*
 * File: app/view/AddDressForOrderPanel.js
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

Ext.define('Iron.view.AddDressForOrderPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.adddressfororderpanel',

    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.FieldSet',
        'Ext.field.Select',
        'Ext.field.Number',
        'Ext.field.Checkbox'
    ],

    config: {
        centered: true,
        height: 558,
        itemId: 'addDressForOrderPanel',
        width: 632,
        modal: true,
        items: [
            {
                xtype: 'toolbar',
                docked: 'bottom',
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
                                itemId: 'ok_btn',
                                text: 'OK'
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                itemId: 'cancle_btn',
                                text: 'Отмена'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                centered: false,
                modal: false,
                title: 'Информация о вещи',
                items: [
                    {
                        xtype: 'selectfield',
                        itemId: 'item_type_group_fld',
                        label: 'Вид вещи:',
                        autoSelect: false,
                        displayField: 'name',
                        store: 'item_type_groups_store',
                        valueField: 'id_item_type_group'
                    },
                    {
                        xtype: 'selectfield',
                        centered: false,
                        disabled: true,
                        itemId: 'item_type_fld',
                        label: 'Наименование:',
                        labelWrap: true,
                        autoCapitalize: false,
                        readOnly: false,
                        autoSelect: false,
                        displayField: 'name',
                        store: 'item_type_store',
                        valueField: 'id_item_type'
                    },
                    {
                        xtype: 'selectfield',
                        disabled: true,
                        itemId: 'price_fld',
                        label: 'Прайс:',
                        autoSelect: false,
                        displayField: 'price_type_name',
                        store: 'select_price_store',
                        valueField: 'id_price'
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'count_fld',
                        clearIcon: false,
                        label: ' Количество шт.:',
                        value: 1
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'color_fld',
                        label: 'Цвет:',
                        autoSelect: false,
                        displayField: 'name',
                        store: 'color_store',
                        valueField: 'id_color'
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'gender_fld',
                        label: 'Пол:',
                        autoSelect: false,
                        displayField: 'name',
                        store: 'gender_store',
                        valueField: 'id_gender'
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'wear_fld',
                        clearIcon: false,
                        label: 'Износ:',
                        value: 60
                    },
                    {
                        xtype: 'checkboxfield',
                        itemId: 'is_lable_fld',
                        label: 'Бирка:',
                        checked: true
                    },
                    {
                        xtype: 'textfield',
                        height: 94,
                        itemId: 'comment_fld',
                        clearIcon: false,
                        label: 'Комментарий:'
                    }
                ]
            }
        ]
    }

});