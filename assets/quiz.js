/* ============================================================
   测验组件  quiz.js
   用法：<div class="quiz" data-q="问题文本">
          <ul class="options">
            <li data-correct="true">正确答案</li>
            <li>错误选项</li>
            ...
          </ul>
          <div class="explain">解析（点击后显示）</div>
          <div class="feedback"></div>
        </div>
   规则：点选一次后锁定；正确→绿、显示解析；错误→红、提示再试。
   注意：正确项只在选中后高亮，避免格式泄露答案。
   ============================================================ */

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".quiz").forEach(function (quiz) {
      var options = quiz.querySelectorAll(".options li");
      var explain = quiz.querySelector(".explain");
      var feedback = quiz.querySelector(".feedback");
      var solved = false;

      // 渲染题目：把 data-q 文本作为 <p class="q"> 插入到 quiz 顶部
      var qText = quiz.getAttribute("data-q");
      if (qText && !quiz.querySelector(".q")) {
        var p = document.createElement("p");
        p.className = "q";
        p.textContent = qText;
        quiz.insertBefore(p, quiz.firstChild);
      }

      // 把正确答案选项打乱顺序（如果它们还带着 data-correct 属性）
      // —— 默认不打乱；需要随机时给 .quiz 加 data-shuffle 属性
      if (quiz.hasAttribute("data-shuffle")) {
        var container = quiz.querySelector(".options");
        var items = Array.prototype.slice.call(container.children);
        for (var i = items.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          container.appendChild(items[j]);
        }
      }

      options.forEach(function (opt) {
        opt.addEventListener("click", function () {
          if (solved) return;
          var correct = opt.getAttribute("data-correct") === "true";

          if (correct) {
            solved = true;
            opt.classList.add("correct");
            options.forEach(function (o) { o.style.pointerEvents = "none"; });
            if (explain) explain.classList.add("show");
            if (feedback) {
              feedback.textContent = "✓ 正确";
              feedback.className = "feedback right";
            }
          } else {
            opt.classList.add("wrong");
            if (feedback) {
              feedback.textContent = "✗ 不对，再想想";
              feedback.className = "feedback wrong";
            }
            setTimeout(function () { opt.classList.remove("wrong"); }, 900);
          }
        });
      });
    });
  });
})();
