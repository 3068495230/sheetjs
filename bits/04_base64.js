var Base64 = function() {
  var map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  return {
    encode: function(input) {
      var o = "";
      var c1 = 0, c2 = 0, c3 = 0, e1 = 0, e2 = 0, e3 = 0, e4 = 0;
      for (var i = 0; i < input.length; ) {
        c1 = input.charCodeAt(i++);
        e1 = c1 >> 2;
        c2 = input.charCodeAt(i++);
        e2 = (c1 & 3) << 4 | c2 >> 4;
        c3 = input.charCodeAt(i++);
        e3 = (c2 & 15) << 2 | c3 >> 6;
        e4 = c3 & 63;
        if (isNaN(c2)) {
          e3 = e4 = 64;
        } else if (isNaN(c3)) {
          e4 = 64;
        }
        o += map.charAt(e1) + map.charAt(e2) + map.charAt(e3) + map.charAt(e4);
      }
      return o;
    },
    decode: function(input) {
      var o = "";
      var c1 = 0, c2 = 0, c3 = 0, e1 = 0, e2 = 0, e3 = 0, e4 = 0;
      input = input.replace(/[^\w\+\/\=]/g, "");
      for (var i = 0; i < input.length; ) {
        e1 = map.indexOf(input.charAt(i++));
        e2 = map.indexOf(input.charAt(i++));
        c1 = e1 << 2 | e2 >> 4;
        o += String.fromCharCode(c1);
        e3 = map.indexOf(input.charAt(i++));
        c2 = (e2 & 15) << 4 | e3 >> 2;
        if (e3 !== 64) {
          o += String.fromCharCode(c2);
        }
        e4 = map.indexOf(input.charAt(i++));
        c3 = (e3 & 3) << 6 | e4;
        if (e4 !== 64) {
          o += String.fromCharCode(c3);
        }
      }
      return o;
    }
  };
}();
