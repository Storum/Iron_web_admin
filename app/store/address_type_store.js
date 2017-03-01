/*
 * File: app/store/address_type_store.js
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

Ext.define('Iron.store.address_type_store', {
    extend: 'Ext.data.Store',

    requires: [
        'Iron.model.address_type_model'
    ],

    config: {
        model: 'Iron.model.address_type_model',
        storeId: 'address_type_store'
    }
});