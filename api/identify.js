// التعرّف على نبتة: Pl@ntNet يقترح الأنواع، ثم Gemini يتحقق منها بالصورة ويكتب دليل العناية.
import { guard, readImage, plantnet, ai, parseJSON, fail, RULES } from './_lib.js';
import { arabicName, arabicFamily } from './_names.js';

export const config = { maxDuration: 60 };

const SHAPE = `{"is_plant":true,"confidence":0-100,"name_ar":"","other_names":"","scientific":"","family":"","origin":"","summary":"جملة واحدة قصيرة","difficulty":"سهلة جداً|سهلة|متوسطة|صعبة","light":"","water":"","water_interval_days":عدد تقريبي للأيام بين السقيات في ظروف البيت,"temperature":"","humidity":"","soil":"","fertilizer":"","propagation":"","toxicity":{"level":"none|mild|toxic","text":"للإنسان والقطط والكلاب"},"health_note":"ملاحظة إن ظهرت على النبتة في الصورة علامة مشكلة، وإلا فارغ","tips":["نصيحة عملية قصيرة","حد أقصى 3 نصائح"],"note":"إن كان التعرّف غير مؤكد: ما الذي يؤكده (مثلاً صورة للزهرة أو الساق)، وإلا فارغ"}`;

export default async function handler(req, res) {
  if (!guard(req, res)) return;
  try {
    const img = readImage(req.body);
    if (!img) return res.status(400).json({ error: 'image_rejected' });
    if (img.tooLarge) return res.status(413).json({ error: 'too_large' });

    const cands = await plantnet(img);
    let hint = '';
    if (cands && cands.length) {
      hint = `\n\nنتائج نظام التعرّف العلمي Pl@ntNet لهذه الصورة (النسبة = درجة التطابق):\n` +
        cands.map((c, i) => `${i + 1}) ${c.scientific} — عائلة ${c.family}${c.common ? ' — ' + c.common : ''} — ${c.score}٪`).join('\n') +
        `\nقارنها بما تراه في الصورة: اعتمد المرشح الأول إذا كان متوافقاً، أو مرشحاً آخر إن كان أنسب. لا تختر نوعاً من خارج القائمة إلا إذا كنت متأكداً جداً أنها كلها خطأ، وفي هذه الحالة خفّض confidence.`;
    } else if (cands && !cands.length) {
      hint = `\n\nملاحظة: نظام Pl@ntNet لم يتعرّف على نبتة في هذه الصورة. كن حذراً جداً، وإن لم تكن نبتة واضحة فاجعل is_plant=false.`;
    }

    const task = `المهمة: الصورة صوّرها مستخدم لنبتة يريد التعرف عليها. تعرّف على النبتة بدقة واكتب دليل العناية بها.
إذا لم تكن في الصورة نبتة واضحة فاجعل is_plant=false واترك باقي الحقول فارغة، واكتب في note ماذا يصوّر.${hint}
أجب بكائن JSON واحد فقط بهذا الشكل بالضبط:
${SHAPE}`;
    let text;
    try {
      text = await ai({ system: RULES, turns: [{ role: 'user', content: task }], image: img, json: true });
    } catch (e) {
      // إذا انتهى الحد المجاني لـ Gemini ونجح Pl@ntNet: نرجع اسم النبتة على الأقل، والواجهة تكمل من الموسوعة
      if (cands && cands.length) {
        const c = cands[0];
        return res.status(200).json({ is_plant: true, limited: true, confidence: c.score, scientific: c.scientific,
          family: arabicFamily(c.family), other_names: '', name_ar: arabicName(c.scientific),
          summary: 'تعرّفنا على النبتة، لكن دليل العناية المفصّل مشغول الآن. حاول بعد دقيقة.', source: 'plantnet' });
      }
      throw e;
    }
    const data = parseJSON(text);
    data.source = cands && cands.length ? 'plantnet+gemini' : 'gemini';
    res.status(200).json(data);
  } catch (e) { fail(res, e); }
}
