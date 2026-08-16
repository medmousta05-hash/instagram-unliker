/**
 * ==================================================================
 *  Instagram — Auto Unlike Script (سكريبت باش يمسح اللايكات أوتوماتيك)
 * ==================================================================
 *  فين تخدم: صفحة "Your Activity > Interactions > Likes"
 *  (instagram.com/your_activity/interactions/likes)
 *
 *  كيدير فكل جولة (round):
 *    1) كيضغط على "Select"
 *    2) كيختار حتى 50 عنصر (BATCH_SIZE) من الفيديوهات/الصور الباينة
 *    3) كيضغط على "Unlike (N)"
 *    4) إلا طلعت نافذة تأكيد، كيأكد
 *    5) كيسكرول شوية باش تبان عناصر جداد، وكيعاود الكرة
 *
 *  للتوقف قبل ما يسالي وحدو، كتب هاد السطر فـ console:
 *    window.__stopAutoUnlike = true
 *
 *  ⚠️ Instagram كيبدل بنية الصفحة من وقت لوقت، فالسيليكتورات
 *  (findButton / getLikedItems) يمكن يحتاجو تعديل بسيط.
 * ==================================================================
 */
(async function autoUnlikeAll() {
  window.__stopAutoUnlike = false;

  const DELAY = { perClick: 300, afterSelect: 1000, afterUnlike: 2500, scroll: 1500 };
  const MAX_ROUNDS = 300;
  const BATCH_SIZE = 50; // عدد العناصر اللي كيختارهم السكريبت فكل جولة

  const wait = (ms) => new Promise((r) => setTimeout(r, ms + Math.random() * 300));

  function findButton(matchFn) {
    const all = document.querySelectorAll('button, div[role="button"]');
    for (const el of all) {
      const text = (el.innerText || '').trim();
      if (text && matchFn(text)) return el;
    }
    return null;
  }

  function getLikedItems() {
    const scope =
      document.querySelector('main') ||
      document.querySelector('[role="main"]') ||
      document.body;
    const media = scope.querySelectorAll('img, video');
    const seen = new Set();
    const items = [];
    media.forEach((m) => {
      const clickable = m.closest('div[role="button"]') || m.closest('a');
      if (clickable && !seen.has(clickable)) {
        seen.add(clickable);
        items.push(clickable);
      }
    });
    return items;
  }

  let round = 0;
  let totalUnliked = 0;

  while (round < MAX_ROUNDS) {
    if (window.__stopAutoUnlike) {
      console.log('⏹ توقفتي يدويا.');
      break;
    }
    round++;

    try {
      if (!findButton((t) => t === 'Cancel')) {
        const selectBtn = findButton((t) => t === 'Select');
        if (!selectBtn) {
          console.log('🏁 ماكاينش زر "Select" — إما سالات المهمة، إما تبدلت الصفحة.');
          break;
        }
        selectBtn.click();
        await wait(DELAY.afterSelect);
      }

      const allItems = getLikedItems();
      if (allItems.length === 0) {
        console.log('🎉 ماكاينش فيديوهات/صور باقيين فهاد الصفحة.');
        break;
      }
      const items = allItems.slice(0, BATCH_SIZE);

      for (const item of items) {
        if (window.__stopAutoUnlike) break;
        item.click();
        await wait(DELAY.perClick);
      }

      await wait(500);
      const unlikeBtn = findButton((t) => /^Unlike \(\d+\)$/.test(t));
      if (!unlikeBtn) {
        console.log('❌ مالقيتش زر "Unlike (N)". خاص تعديل السيليكتور.');
        break;
      }
      unlikeBtn.click();
      await wait(DELAY.afterUnlike);

      const confirmBtn = findButton((t) => t === 'Unlike');
      if (confirmBtn) {
        confirmBtn.click();
        await wait(DELAY.afterUnlike);
      }

      totalUnliked += items.length;
      console.log(`✅ Round ${round}: تقريبا ${items.length} unliked (المجموع: ${totalUnliked})`);

      window.scrollTo(0, document.body.scrollHeight);
      await wait(DELAY.scroll);
    } catch (err) {
      console.log('⚠️ وقع خطأ:', err);
      break;
    }
  }

  console.log(`🏁 خلص السكريبت. مجموع تقريبي اللي تمسح: ${totalUnliked}`);
})();
      
