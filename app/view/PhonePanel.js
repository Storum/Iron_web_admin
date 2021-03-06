/*
 * File: app/view/PhonePanel.js
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

Ext.define('Iron.view.PhonePanel', {
    extend: 'Ext.Panel',
    alias: 'widget.phonepanel',

    requires: [
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Checkbox'
    ],

    config: {
        centered: true,
        height: 377,
        itemId: 'phonePanel',
        showAnimation: 'pop',
        width: 745,
        layout: 'vbox',
        modal: true,
        items: [
            {
                xtype: 'list',
                docked: 'left',
                itemId: 'id_phone_list',
                width: 276,
                itemTpl: [
                    '<div class="phone"> {phone}<br>{is_primary_text}<br> </div>'
                ],
                store: 'phone_store'
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        docked: 'right',
                        itemId: 'id_ok_btn',
                        width: 100,
                        text: 'OK'
                    },
                    {
                        xtype: 'button',
                        disabled: true,
                        docked: 'right',
                        itemId: 'id_save_btn',
                        width: 133,
                        iconCls: 'bookmarks',
                        text: 'Сохранить'
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'fit',
                items: [
                    {
                        xtype: 'fieldset',
                        docked: 'top',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                target: 'edit_phone',
                                itemId: 'id_phone_field',
                                clearIcon: false,
                                label: 'Телефон:',
                                name: 'phone'
                            },
                            {
                                xtype: 'textfield',
                                target: 'edit_phone',
                                itemId: 'id_phone_comment_field',
                                clearIcon: false,
                                label: 'Комментарий:',
                                name: 'comment'
                            },
                            {
                                xtype: 'checkboxfield',
                                target: 'edit_phone',
                                itemId: 'id_primary_phone_checkbox',
                                label: 'Основной:',
                                name: 'is_primary'
                            },
                            {
                                xtype: 'toolbar',
                                docked: 'top',
                                items: [
                                    {
                                        xtype: 'button',
                                        itemId: 'id_add_btn',
                                        iconCls: 'add',
                                        text: 'Добавить'
                                    },
                                    {
                                        xtype: 'button',
                                        disabled: true,
                                        itemId: 'id_delete_btn',
                                        iconCls: 'delete',
                                        text: 'Удалить'
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