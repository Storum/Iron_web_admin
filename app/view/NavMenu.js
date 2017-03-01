/*
 * File: app/view/NavMenu.js
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

Ext.define('Iron.view.NavMenu', {
    extend: 'Ext.Panel',
    alias: 'widget.navmenu',

    requires: [
        'Ext.Button'
    ],

    config: {
        centered: true,
        hidden: true,
        itemId: 'navMenu',
        padding: 10,
        hideOnMaskTap: true,
        modal: true,
        items: [
            {
                xtype: 'button',
                navView: 'homepanel',
                navViewItemId: 'homePanel',
                disabled: true,
                margin: 15,
                iconCls: 'home',
                text: 'Главная'
            },
            {
                xtype: 'button',
                navView: 'clientpanel',
                navViewItemId: 'clientPanel',
                margin: 15,
                iconCls: 'compose',
                text: 'Клиенты'
            },
            {
                xtype: 'button',
                navView: 'orderpanel',
                navViewItemId: 'orderPanel',
                margin: 15,
                iconCls: 'info',
                text: 'Заказы'
            },
            {
                xtype: 'button',
                navView: 'reportsmenupanel',
                margin: 15,
                iconCls: 'info',
                text: 'Отчеты'
            },
            {
                xtype: 'button',
                navView: 'userpanel',
                navViewItemId: 'userPanel',
                margin: 15,
                iconCls: 'compose',
                text: 'Пользователи'
            },
            {
                xtype: 'button',
                navView: 'catalogmenu',
                navViewItemId: 'catalogMenu',
                margin: 15,
                iconCls: 'info',
                text: 'Справочники'
            }
        ]
    }

});