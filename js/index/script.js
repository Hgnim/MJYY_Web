document.addEventListener('DOMContentLoaded', function () {
document.getElementById('navbarCollapse').addEventListener('click', function(event) {
    var ncsb=document.getElementById('navbarCollapse_showButton');
    if(ncsb.ariaExpanded=="true"){
    ncsb.dispatchEvent(new MouseEvent('click', {
        'bubbles': true,    // 是否冒泡
        'cancelable': true  // 是否可以取消
      }));
    }
});
});