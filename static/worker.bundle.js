!function(t){function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}var e={};n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=0)}([function(t,n,e){"use strict";function r(t,n){var e=new FileReader;e.onload=function(){n(new Uint8Array(e.result))},e.readAsArrayBuffer(t)}Object.defineProperty(n,"__esModule",{value:!0});var i=e(1),o=(e.n(i),e(2)),a=new o.a;onmessage=function(t){var n=t.data,e=Date.now();"split file"===n.kind&&r(n.file,function(t){var r=a.split(t,n.fileName);console.log("cost "+(Date.now()-e)/1e3+" s");var i={kind:"split file result",blocks:r};postMessage(i,void 0)})}},function(t,n){},function(t,n,e){"use strict";var r=e(3),i=function(){function t(){this.textEncoder=new TextEncoder,this.textDecoder=new TextDecoder}return t.prototype.decodeBlock=function(t){var n=new r.a(t.buffer,t.byteOffset),e=n.getUint32(),i=n.getUint32();return{totalBytesCount:e,fileName:this.decode(n.getBinary(i)),totalBlockCount:n.getUint32(),currentBlockIndex:n.getUint32(),binary:n.getBinary()}},t.prototype.split=function(t,n,e){void 0===e&&(e=1e4);var i=[];if(0===t.length)return i;for(var o=Math.floor((t.length-1)/e)+1,a=r.b.fromUint32(o),u=r.b.fromUint32(t.length),f=this.encode(n),s=r.b.fromUint32(f.length),d=0;d<o;d++){var c=t.subarray(d*e,d*e+e),h=r.b.fromUint32(d),l=new Uint8Array(u.length+s.length+f.length+a.length+h.length+c.length);new r.b(l).setBinary(u,s,f,a,h,c),i.push(l)}return i},t.prototype.encode=function(t){return this.textEncoder.encode(t)},t.prototype.decode=function(t){return this.textDecoder.decode(t)},t}();n.a=i},function(t,n,e){"use strict";e.d(n,"a",function(){return r}),e.d(n,"b",function(){return i});var r=function(){function t(t,n){void 0===n&&(n=0),this.arrayBuffer=t,this.index=n,this.dataView=new DataView(t)}return t.prototype.getInt8=function(){var t=this.dataView.getInt8(this.index);return this.index+=1,t},t.prototype.getUint8=function(){var t=this.dataView.getUint8(this.index);return this.index+=1,t},t.prototype.getInt16=function(t){void 0===t&&(t=!0);var n=this.dataView.getInt16(this.index,t);return this.index+=2,n},t.prototype.getUint16=function(t){void 0===t&&(t=!0);var n=this.dataView.getUint16(this.index,t);return this.index+=2,n},t.prototype.getInt32=function(t){void 0===t&&(t=!0);var n=this.dataView.getInt32(this.index,t);return this.index+=4,n},t.prototype.getUint32=function(t){void 0===t&&(t=!0);var n=this.dataView.getUint32(this.index,t);return this.index+=4,n},t.prototype.getFloat32=function(t){void 0===t&&(t=!0);var n=this.dataView.getFloat32(this.index,t);return this.index+=4,n},t.prototype.getFloat64=function(t){void 0===t&&(t=!0);var n=this.dataView.getFloat64(this.index,t);return this.index+=8,n},t.prototype.getString=function(t){var n=this.getBinary(t),e=[].slice.call(n);return String.fromCharCode.apply(String,e)},t.prototype.getBinary=function(t){if(void 0===t){var n=new Uint8Array(this.arrayBuffer,this.index);return this.index=this.arrayBuffer.byteLength,n}var n=new Uint8Array(this.arrayBuffer,this.index,t);return this.index+=t,n},t}(),i=function(){function t(t){this.uint8Array=t,this.index=0}return t.fromInt8=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return new Uint8Array(new Int8Array(t).buffer)},t.fromInt16=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return new Uint8Array(new Int16Array(t).buffer)},t.fromUint16=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return new Uint8Array(new Uint16Array(t).buffer)},t.fromInt32=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return new Uint8Array(new Int32Array(t).buffer)},t.fromUint32=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return new Uint8Array(new Uint32Array(t).buffer)},t.fromFloat32=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return new Uint8Array(new Float32Array(t).buffer)},t.fromFloat64=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return new Uint8Array(new Float64Array(t).buffer)},t.prototype.setString=function(t){for(var n=new Uint8Array(t.length),e=0;e<t.length;e++)n[e]=t.charCodeAt(e);this.uint8Array.set(n,this.index),this.index+=n.length},t.prototype.setBinary=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];for(var e=0,r=t;e<r.length;e++){var i=r[e];this.uint8Array.set(i,this.index),this.index+=i.length}},t}()}]);