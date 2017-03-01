/*
 * File: app/controller/user_menu_controller.js
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

Ext.define('Iron.controller.user_menu_controller', {
    extend: 'Ext.app.Controller',

    config: {
        views: [
            'UserMenu'
        ],

        refs: {
            userMenu: {
                selector: 'panel#userMenu',
                xtype: 'Ext.Panel'
            }
        },

        control: {
            "panel#userMenu button": {
                tap: 'show_user_panel'
            }
        }
    },

    show_user_panel: function(button, e, eOpts) {
        // TODO ебаные селекторы!!!!


        navView = button.getInitialConfig().navView;
        navViewItemId = button.getInitialConfig().navViewItemId;


        user_panel = Ext.create ('widget.' + navView);
        Ext.Viewport.add (user_panel);
        user_panel.show ();
    }

});