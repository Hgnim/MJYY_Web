function showToast(id,message, duration = 3000) {
    const toast = document.getElementById(id);
    toast.querySelector('.toast-content').textContent = message; // 设置内容
    toast.classList.remove('hide'); // 移除隐藏类
    toast.classList.add('show'); // 添加显示类
    // 设置定时器自动隐藏吐司框
    setTimeout(function() {
      toast.classList.remove('show');
      toast.classList.add('hide');
    }, duration);
  }