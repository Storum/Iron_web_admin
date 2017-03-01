/*
 * File: app/model/order_for_phone.js
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

Ext.define('Iron.model.order_for_phone', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            {
                name: 'id_order',
                type: 'int'
            },
            {
                name: 'date_create',
                type: 'string'
            },
            {
                name: 'status_name',
                type: 'string'
            },
            {
                name: 'surname',
                type: 'string'
            },
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'patronymic',
                type: 'string'
            },
            {
                name: 'phone',
                type: 'string'
            },
            {
                name: 'done_date',
                type: 'string'
            },
            {
                name: 'last_phone_date',
                type: 'string'
            }
        ]
    }
});