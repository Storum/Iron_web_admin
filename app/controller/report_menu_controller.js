/*
 * File: app/controller/report_menu_controller.js
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

Ext.define('Iron.controller.report_menu_controller', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            userReportMenu: 'panel#reportsMenuPanel',
            done_repor_tbtn: 'panel#reportsMenuPanel button[itemId=done_report_btn]'
        },

        control: {
            "done_repor_tbtn": {
                tap: 'done_report_tap'
            }
        }
    },

    done_report_tap: function(button, e, eOpts) {


        DoneReportPanel = Ext.create('widget.doneorderreport');
        Ext.Viewport.add(DoneReportPanel);
        DoneReportPanel.setModal(true);
        DoneReportPanel.setCentered(true);
        DoneReportPanel.show();

        this.getUserReportMenu().destroy();
    }

});