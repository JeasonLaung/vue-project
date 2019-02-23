//unicode码转utf-8
String.prototype.toUtf8 = function () {
  var str = this.replace(/\\/g, "%");
  str = this.replace(/\\\//g, "%$");
  //转换中文
  str = unescape(str);
  //将其他受影响的转换回原来
  str = str.replace(/%/g, "\\");
  // str = str.replace(/%\$/g, "\\");
  //对网址的链接进行处理
  str = str.replace(/\\/g, "");
  return str;
}
String.prototype.cut = function (len) {
  return this.slice(0,len) + '...';
}
