/*
 * File: app/controller/item_types_panel_controller.js
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

Ext.define('Iron.controller.item_types_panel_controller', {
    extend: 'Ext.app.Controller',

    config: {
        stores: [
            'item_type_full_store'
        ],

        refs: {
            itemTypesPanel: {
                selector: 'panel#itemTypesPanel',
                xtype: 'Ext.Panel'
            },
            item_types_list: 'panel#itemTypesPanel nestedlist[itemId=item_types_list]',
            add_btn: 'panel#itemTypesPanel button[itemId=add_btn]',
            delete_item_btn: 'panel#itemTypesPanel button[itemId=delete_item_btn]',
            delete_group_btn: 'panel#itemTypesPanel button[itemId=delete_group_btn]',
            cancle_btn: 'panel#itemTypesPanel button[itemId=cancle_btn]',
            change_group_btn: 'panel#itemTypesPanel button[itemId=change_group_btn]',
            change_item_btn: 'panel#itemTypesPanel button[itemId=change_item_btn]'
        },

        control: {
            "itemTypesPanel": {
                show: 'onPanelShow'
            },
            "cancle_btn": {
                tap: 'cancle_tap'
            },
            "add_btn": {
                tap: 'add_tap'
            },
            "item_types_list": {
                itemtap: 'item_tap',
                back: 'back_tap'
            },
            "change_group_btn": {
                tap: 'change_group_tap'
            },
            "change_item_btn": {
                tap: 'change_item_tap'
            },
            "delete_group_btn": {
                tap: 'delete_group_tap'
            }
        }
    },

    onPanelShow: function(component, eOpts) {
        this.update_item_type_list();
    },

    cancle_tap: function(button, e, eOpts) {
        this.getItemTypesPanel().destroy();
    },

    add_tap: function(button, e, eOpts) {
        var cur_node_name = this.getItem_types_list().getActiveItem().getStore().getNode().get('text');


        if (cur_node_name == 'Root')
        {
            var edit_item_type_groups_panel = Ext.create('widget.edititemtypegropupspanel');
            edit_item_type_groups_panel.source = 'item_types_panel_controller';
            edit_item_type_groups_panel.target = 'add';
            Ext.Viewport.add(edit_item_type_groups_panel);
            edit_item_type_groups_panel.show();
        }
    },

    item_tap: function(nestedlist, list, index, target, record, e, eOpts) {

        if (record.get('leaf'))
        {
            this.update_item_btn_disabled(false);
        }
        else
        {
           this.update_group_btn_disabled (false);
        }
    },

    back_tap: function(nestedlist, node, lastActiveList, detailCardActive, eOpts) {

        if (!node.get('leaf'))
        {
            this.update_group_btn_disabled (true);
            this.update_item_btn_disabled (true);
        }
    },

    change_group_tap: function(button, e, eOpts) {
        //this.getItem_type_list().getSelection()[0].get('id_item_type_group');





        var edit_item_type_groups_panel = Ext.create('widget.edititemtyegrpupspanel');

        edit_item_type_groups_panel.source = 'item_types_panel_controller';
        edit_item_type_groups_panel.target = 'edit';
        Ext.Viewport.add(edit_item_type_groups_panel);
        edit_item_type_groups_panel.show();
    },

    change_item_tap: function(button, e, eOpts) {
        var edit_item_type_panel = Ext.create('widget.edititemtypepanel');

        edit_item_type_panel.source = 'item_types_panel_controller';
        edit_item_type_panel.target = 'edit';
        Ext.Viewport.add(edit_item_type_panel);
        edit_item_type_panel.show();
    },

    delete_group_tap: function(button, e, eOpts) {

        var id_item_type_group = this.getItem_types_list().getActiveItem().getStore().getNode().get('id_item_type_group');


        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name		: 'delete_item_type_group',
                    id_item_type_group	: id_item_type_group,
                    format: 'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {

                    Ext.Msg.alert('Iron', result.text);

                    if (result.result == 'ok')
                        t.update_item_type_list ();
                }
            });
    },

    update_item_type_list: function() {
        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name: 'get_item_types',
                    format: 'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_item_type_store (result.item_types_list);
                }
            });
    },

    update_item_type_store: function(data) {

        var item_types_list = this.getItem_types_list();
        var item_type_store = item_types_list.getStore();

        item_type_store.setData(data);


        this.update_group_btn_disabled (true);

    },

    update_group_btn_disabled: function(disabled) {
        this.getDelete_group_btn().setDisabled (disabled);
        this.getChange_group_btn().setDisabled (disabled);
    },

    update_item_btn_disabled: function(disabled) {
        this.getDelete_item_btn().setDisabled (disabled);
        this.getChange_item_btn().setDisabled (disabled);
    },

    get_selected_node: function() {

        return this.getItem_types_list().getActiveItem().getStore().getNode();
        return this.getItem_types_list().getActiveItem().selected.items[0];//getStore();//.getSelectedRecords(); //.getNode();
    },

    get_selected_item: function() {

        return this.getItem_types_list().getActiveItem().selected.items[0];
    }

});