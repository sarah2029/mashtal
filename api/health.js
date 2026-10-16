// فحص سريع للإعدادات: افتحي /api/health في المتصفح. لا يعرض المفاتيح نفسها.
import { ai, lastError, MODELS, attempts } from './_lib.js';

export default async function handler(req, res) {
  const out = {
    gemini_key: !!(process.env.GEMINI_API_KEY || '').trim(),
    plantnet_key: !!(process.env.PLANTNET_API_KEY || '').trim(),
    models_tried: MODELS,
  };
  attempts.length = 0;
  try {
    out.gemini_test = await ai({ system: 'أجب بكلمة واحدة.', turns: [{ role: 'user', content: 'قل: تم' }], maxTokens: 512 });
    out.status = 'ok';
  } catch (e) {
    out.status = e && e.code || 'error';
    out.last_error = { ...lastError };
  }
  out.attempts = [...attempts];
  res.setHeader('cache-control', 'no-store');
  res.status(200).json(out);
}
