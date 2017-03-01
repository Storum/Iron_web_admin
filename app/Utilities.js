Ext.define('Iron.Utilities', {
    statics: {
        date_to_string: function (Date) {

            var month = Date.getMonth() + 1;
            var month_txt = month;
            
            if (month < 10)
                month_txt = "0" + month;
            
            var day = Date.getDate();
            var day_txt = day;
            
            if (day < 10)
                day_txt = "0" + day;
            
            
            return Date.getFullYear() + "-" + month_txt + "-" + day_txt;
        }
    }
});


