/*
 * File: app/controller/catalog_menu_controller.js
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

Ext.define('Iron.controller.catalog_menu_controller', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            catalogMenu: 'panel#catalogMenu',
            item_type_groups_btn: 'panel#catalogMenu button[itemId=item_type_groups_btn]',
            item_types_btn: 'panel#catalogMenu button[itemId=item_types_btn]'
        },

        control: {
            "item_type_groups_btn": {
                tap: 'item_type_groups_type_tap'
            },
            "item_types_btn": {
                tap: 'item_types_tap'
            }
        }
    },

    item_type_groups_type_tap: function(button, e, eOpts) {
        var item_type_groups_panel = Ext.create('widget.itemtypegroupspanel');
        Ext.Viewport.add(item_type_groups_panel);
        item_type_groups_panel.show();
    },

    item_types_tap: function(button, e, eOpts) {

        var item_types_panel = Ext.create('widget.itemtypespanel');
        Ext.Viewport.add(item_types_panel);
        item_types_panel.show();
    }

});