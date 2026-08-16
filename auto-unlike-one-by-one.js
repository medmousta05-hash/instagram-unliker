/**
 * ==================================================================
 *  Instagram — Auto Unlike (بوست بوست) — نسخة فيها تشخيص
 * ==================================================================
 *  فين تخدم: صفحة "Your Activity > Interactions > Likes"
 *
 *  شنو تبدل من القبل:
 *   - كيقلب على العناصر بجوج طرق (روابط <a>، أو صور/فيديوهات
 *     لقيتهم فوقهم عنصر قابل للضغط) — باش يخدم حتى إلا
 *     الگريد ماشي مبني بروابط حقيقية
 *   - كيتحقق شحال البوست حل بصح قبل ما يقلب على زر Unlike
 *   - كيطبع فـ console شنو لقا بالضبط، باش نقدر نصاوب
 *     السيليكتور إلا بقا ماخدامش
 *
 *  للتوقف: window.__stopAutoUnlike = true
 * ==================================================================
 */
(async function autoUnlikeOneByOne() {
  window.__stopAutoUnlike = false;

  const DELAY = { afterOpen: 1500, afterUnlike: 800, afterClose: 1200, scroll: 1200 };
  const MAX_ITEMS = 2000;
  const MAX_CONSECUTIVE_FAILS = 3;

  const wait = (ms) => new Promise((r) => setTimeout(r, ms + Math.random() * 300));

  function findByAria(label) {
    return document.querySelector(`[aria-label="${label}"]`);
  }

  function getClickable(el) {
    return el.closest('a, button, div[role="button"], span[role="button"]') || el;
  }

  function getGridItems() {
    // محاولة 1: روابط حقيقية للبوستات
    let items = Array.from(document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]')).filter(
      (el) => !el.dataset.igDone
    );
    if (items.length > 0) return items;

    // محاولة 2: صور/فيديوهات، ناخدو العنصر القابل للضغط اللي فوقهم
    const scope =
      document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
    const media = Array.from(scope.querySelectorAll('img, video'));
    const seen = new Set();
    const found = [];
    media.forEach((m) => {
      const clickable = m.closest('a, div[role="button"], button, span[role="button"]');
      if (clickable && !seen.has(clickable) && !clickable.dataset.igDone) {
        seen.add(clickable);
        found.push(clickable);
      }
    });
    return found;
  }

  let count = 0;
  let consecutiveFails = 0;

  while (count < MAX_ITEMS) {
    if (window.__stopAutoUnlike) {
      console.log('⏹ توقفتي يدويا.');
      break;
    }

    let items = getGridItems();
    if (items.length === 0) {
      window.scrollTo(0, document.body.scrollHeight);
      await wait(DELAY.scroll);
      items = getGridItems();
    }

    if (items.length === 0) {
      console.log('🎉 ماكاينش بوستات باقيين (ولا مالقيتش حتى عنصر قابل للضغط). خلصات.');
      break;
    }

    const target = items[0];
    target.dataset.igDone = '1';
    console.log(`🔍 target: <${target.tagName}> ${target.href || '(بلا href)'}`);

    const urlBefore = location.href;
    target.click();
    await wait(DELAY.afterOpen);

    const opened = !!(findByAria('Unlike') || findByAria('Like') || location.href !== urlBefore);

    if (!opened) {
      consecutiveFails++;
      console.log(
        `❌ الكليك ماخدمش، البوست ماحلش. outerHTML: ${target.outerHTML.slice(0, 200)}`
      );
      if (consecutiveFails >= MAX_CONSECUTIVE_FAILS) {
        console.log('🛑 توقفت من بعد 3 محاولات فاشلة على التوالي. حتاج تعديل يدوي.');
        break;
      }
      continue;
    }
    consecutiveFails = 0;

    const unlikeEl = findByAria('Unlike');
    if (unlikeEl) {
      getClickable(unlikeEl).click();
      await wait(DELAY.afterUnlike);
      count++;
      console.log(`✅ [${count}] تحيدات اللايك`);
    } else {
      console.log('⚠️ حل البوست، ولكن ماكاينش زر Unlike (يمكن ديجا ماشي معجب بيه).');
    }

    const closeEl = findByAria('Close');
    if (closeEl) {
      getClickable(closeEl).click();
    } else if (location.href !== urlBefore) {
      history.back();
    }
    await wait(DELAY.afterClose);
  }

  console.log(`🏁 خلص. مجموع اللايكات اللي تحيدو: ${count}`);
})();
      
