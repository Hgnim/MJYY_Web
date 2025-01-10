function showToast(addClass, message, duration = 3000,parentId=null) {
  function getCurrentTime_ddHHmmssSSS() {
    const now = new Date();
    const dd = now.getDate().toString().padStart(2, "0");
    const HH = now.getHours().toString().padStart(2, "0");
    const mm = now.getMinutes().toString().padStart(2, "0");
    const ss = now.getSeconds().toString().padStart(2, "0");
    const SSS = now.getMilliseconds().toString().padStart(3, "0");
    return `${dd}${HH}${mm}${ss}${SSS}`;
  }
  const onlyId = `toast-${getCurrentTime_ddHHmmssSSS()}`;
  const toast = document.createElement('div');
  toast.id = onlyId;
  toast.className = `toast ${addClass}`;
  {
    const toastContent = document.createElement('div');
    toastContent.className = "toast-content";
    toast.appendChild(toastContent);
  }
  toast.querySelector('.toast-content').textContent = message; // 设置内容
  if (parentId == null)
    document.body.appendChild(toast);
  else
    document.getElementById(parentId).appendChild(toast);
    // 设置定时器，在指定时间后移除吐司框
    setTimeout(function() {
      document.getElementById(onlyId).remove();
    }, duration);
  }