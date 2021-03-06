/*
 * File: app/controller/edit_item_types_panel_controller.js
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

Ext.define('Iron.controller.edit_item_types_panel_controller', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            editItemTypesPanel: 'panel#editItemTypesPanel',
            ok_btn: 'panel#editItemTypesPanel button[itemId=ok_btn]',
            cancle_btn: 'panel#editItemTypesPanel button[itemId=cancle_btn]',
            name_fld: 'panel#editItemTypesPanel textfield[itemId=name_fld]',
            peace_only_fld: 'panel#editItemTypesPanel checkboxfield[itemId=peace_only_fld]',
            hanger_fld: 'panel#editItemTypesPanel checkboxfield[itemId=hanger_fld]',
            total_time_in_second_fld: 'panel#editItemTypesPanel textfield[itemId=total_time_in_second_fld]',
            group_fld: 'panel#editItemTypesPanel selectfield[itemId=group_fld]',
            cur_price_fld: 'panel#editItemTypesPanel textfield[itemId=cur_price_fld]',
            cur_action_price_fld: 'panel#editItemTypesPanel textfield[itemId=cur_action_price_fld]',
            comment_fld: 'panel#editItemTypesPanel textfield[itemId=comment_fld]'
        },

        control: {
            "editItemTypesPanel": {
                show: 'onPanelShow'
            },
            "cancle_btn": {
                tap: 'cancle_tap'
            }
        }
    },

    onPanelShow: function(component, eOpts) {
        this.update_item_type_groups_list();
    },

    cancle_tap: function(button, e, eOpts) {
        this.getEditItemTypesPanel().destroy();
    },

    update_item_type_groups_list: function() {
        var t = this;

        Ext.data.JsonP.request(
            {
                url: GlobalVars.url_setting + 'php/base_functional.php',
                params:
                {
                    function_name: 'get_item_type_groups',
                    format: 'json'
                },
                callbackKey: 'callback',
                async: false,
                success: function (result)
                {
                    t.update_item_type_groups_store (result.item_type_groups_list);
                }
            });
    },

    update_item_type_groups_store: function(data) {
        var groups_store = this.getGroup_fld().getStore();

        groups_store.data.clear();
        groups_store.setData(data);


        this.init_data ();
    },

    init_data: function() {

        var edit_item_types_panel = this.getEditItemTypesPanel();

        if (edit_item_types_panel.target == 'edit')
        {
            var item_type = this.getApplication().getController(edit_item_types_panel.source).get_selected_item();

            console.log(item_type);

            var name = this.getName_fld();
            var comment = this.getComment_fld();
            var peace_only = this.getPeace_only_fld();
            var hanger = this.getHanger_fld();
            var total_time_in_second = this.getTotal_time_in_second_fld();
            var group = this.getGroup_fld();
            var cur_price = this.getCur_price_fld();
            var cur_action_price = this.getCur_action_price_fld();


            name.setValue(item_type.get('name'));
            comment.setValue(item_type.get('comment'));

            if (item_type.get('is_only_piece') == 1)
                peace_only.setChecked(true);

            if (item_type.get('hanger') == 1)
                hanger.setChecked(true);


            total_time_in_second.setValue(item_type.get('total_time_in_second'));

            group.setValue(item_type.get('id_item_type_group'));


            cur_price.setValue(item_type.get('cur_price'));
            cur_action_price.setValue(item_type.get('cur_action_price'));



            //total_time_in_second.setValue(item_type.get('total_time_in_second'));
        }
    }

});