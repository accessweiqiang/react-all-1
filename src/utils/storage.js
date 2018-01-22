const storage = {
    setItem: function(key, value) {
        if (this.checkH5()) {
            localStorage.setItem(key, value)
        } else {
            this.setCookie(key, value);
        }
        return value;
    },
    getItem: function(key) {
        return this.checkH5() ? localStorage.getItem(key) : this.getCookie(key);
    },
    removeItem:function(key){
    	 return this.checkH5() ? localStorage.removeItem(key) : document.cookie = key+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    },
    checkH5: function() {
        return typeof(Storage)!=="undefined";
    },
    setCookie: function(cname, cvalue) {
        var d = new Date();
        var exhours = 0.5;
        alert()
        d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }
};

export default storage;