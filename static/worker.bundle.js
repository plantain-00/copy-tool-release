!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);function r(t){var e="function"==typeof Symbol&&t[Symbol.iterator],n=0;return e?e.call(t):{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}}}function i(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,i,o=n.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(t){i={error:t}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a}var o=function(){function t(t,e){void 0===e&&(e=0),this.arrayBuffer=t,this.index=e,this.dataView=new DataView(t)}return t.prototype.getInt8=function(){var t=this.dataView.getInt8(this.index);return this.index+=1,t},t.prototype.getUint8=function(){var t=this.dataView.getUint8(this.index);return this.index+=1,t},t.prototype.getInt16=function(t){void 0===t&&(t=!0);var e=this.dataView.getInt16(this.index,t);return this.index+=2,e},t.prototype.getUint16=function(t){void 0===t&&(t=!0);var e=this.dataView.getUint16(this.index,t);return this.index+=2,e},t.prototype.getInt32=function(t){void 0===t&&(t=!0);var e=this.dataView.getInt32(this.index,t);return this.index+=4,e},t.prototype.getUint32=function(t){void 0===t&&(t=!0);var e=this.dataView.getUint32(this.index,t);return this.index+=4,e},t.prototype.getFloat32=function(t){void 0===t&&(t=!0);var e=this.dataView.getFloat32(this.index,t);return this.index+=4,e},t.prototype.getFloat64=function(t){void 0===t&&(t=!0);var e=this.dataView.getFloat64(this.index,t);return this.index+=8,e},t.prototype.getString=function(t){var e=this.getBinary(t),n=[].slice.call(e);return String.fromCharCode.apply(String,function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(i(arguments[e]));return t}(n))},t.prototype.getBinary=function(t){if(void 0===t){var e=new Uint8Array(this.arrayBuffer,this.index);return this.index=this.arrayBuffer.byteLength,e}e=new Uint8Array(this.arrayBuffer,this.index,t);return this.index+=t,e},t}(),a=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];for(var r=4,i=new DataView(new Uint8Array(e.length*r).buffer),o=0;o<e.length;o++)i.setUint32(o*r,e[o],t);return new Uint8Array(i.buffer)},u=function(){for(var t,e,n=[],i=0;i<arguments.length;i++)n[i]=arguments[i];var o=n.reduce((function(t,e){return t+e.length}),0),a=new Uint8Array(o),u=0;try{for(var f=r(n),d=f.next();!d.done;d=f.next()){var l=d.value;a.set(l,u),u+=l.length}}catch(e){t={error:e}}finally{try{d&&!d.done&&(e=f.return)&&e.call(f)}finally{if(t)throw t.error}}return a},f=new(function(){function t(){this.textEncoder=new TextEncoder,this.textDecoder=new TextDecoder}return t.prototype.decodeBlock=function(t){var e=new o(t.buffer,t.byteOffset),n=e.getUint32(),r=e.getUint32();return{totalBytesCount:n,fileName:this.decode(e.getBinary(r)),totalBlockCount:e.getUint32(),currentBlockIndex:e.getUint32(),binary:e.getBinary()}},t.prototype.split=function(t,e,n){void 0===n&&(n=1e4);var r=[];if(0===t.length)return r;for(var i=Math.floor((t.length-1)/n)+1,o=a(!0,i),f=a(!0,t.length),d=this.encode(e),l=a(!0,d.length),c=0;c<i;c++){var s=t.subarray(c*n,c*n+n),h=a(!0,c),y=u(f,l,d,o,h,s);r.push(y)}return r},t.prototype.encode=function(t){return this.textEncoder.encode(t)},t.prototype.decode=function(t){return this.textDecoder.decode(t)},t}());onmessage=function(t){var e,n,r,i=t.data,o=Date.now();"split file"===i.kind&&(e=i.file,n=function(t){var e=f.split(t,i.fileName);console.log("cost "+(Date.now()-o)/1e3+" s"),postMessage({kind:"split file result",blocks:e},void 0)},(r=new FileReader).onload=function(){n(new Uint8Array(r.result))},r.readAsArrayBuffer(e))}}]);