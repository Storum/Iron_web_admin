/*
 * File: app/view/AddPhonePanel.js
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

Ext.define('Iron.view.AddPhonePanel', {
    extend: 'Ext.Panel',
    alias: 'widget.addphonepanel',

    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Checkbox'
    ],

    config: {
        centered: true,
        height: 260,
        itemId: 'addPhonePanel',
        showAnimation: 'pop',
        width: 510,
        modal: true,
        items: [
            {
                xtype: 'toolbar',
                docked: 'bottom',
                itemId: 'add_phone_bottom_toolbar1',
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
            },
            {
                xtype: 'fieldset',
                title: '',
                items: [
                    {
                        xtype: 'textfield',
                        target: 'add_phone',
                        itemId: 'id_phone_field',
                        clearIcon: false,
                        label: 'Телефон:',
                        name: 'phone'
                    },
                    {
                        xtype: 'textfield',
                        target: 'add_phone',
                        itemId: 'id_phone_comment_field',
                        clearIcon: false,
                        label: 'Комментарий:',
                        name: 'comment'
                    },
                    {
                        xtype: 'checkboxfield',
                        target: 'add_phone',
                        itemId: 'id_primary_phone_checkbox',
                        label: 'Основной:',
                        name: 'is_primary',
                        checked: true
                    }
                ]
            }
        ]
    }

});