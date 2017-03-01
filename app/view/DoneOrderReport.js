/*
 * File: app/view/DoneOrderReport.js
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

Ext.define('Iron.view.DoneOrderReport', {
    extend: 'Ext.Panel',
    alias: 'widget.doneorderreport',

    requires: [
        'Ext.dataview.List',
        'Ext.XTemplate',
        'Ext.Toolbar',
        'Ext.Button'
    ],

    config: {
        centered: true,
        height: 616,
        itemId: 'doneOrderReport',
        width: 587,
        layout: 'vbox',
        items: [
            {
                xtype: 'list',
                docked: 'left',
                itemId: 'order_list',
                width: 575,
                mode: 'MULTI',
                itemTpl: [
                    '',
                    '<div><font size="2"> Заказ <b>№{id_order} </b>  от: <b>{date_create}</b> <br> Готово с: <b>{done_date}</b> <br> Последний прозвон: <b>{last_phone_date}</b> <br> <b>{surname}  {name}  {patronymic}<br> телефон: {phone}</b><font></div>'
                ],
                store: 'order_for_phone',
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        title: 'Готовые заказы',
                        items: [
                            {
                                xtype: 'button',
                                disabled: true,
                                itemId: 'mark_as_phoned_btn',
                                text: 'Отметить'
                            }
                        ]
                    },
                    {
                        xtype: 'toolbar',
                        docked: 'bottom',
                        items: [
                            {
                                xtype: 'container',
                                docked: 'right',
                                width: 100,
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'button',
                                        itemId: 'ok_btn',
                                        text: 'OK'
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