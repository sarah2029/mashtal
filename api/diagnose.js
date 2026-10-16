// تشخيص مشكلة في نبتة من صورة + وصف المستخدم، وخطة إنعاش.
import { guard, readImage, claude, parseJSON, fail, RULES } from './_lib.js';

export const config = { maxDuration: 60 };

const SHAPE = `{"is_plant":true,"plant_name_ar":"","scientific":"","status":"healthy|mild|moderate|severe","diagnosis":"اسم المشكلة باختصار","cause":"السبب الأرجح بجملة واحدة","confidence":0-100,"symptoms":["علامة ظاهرة في الصورة"],"check":"كيف يتأكد المستخدم من التشخيص بنفسه","steps":[{"title":"3-5 كلمات","detail":"جملة واحدة"}],"prevention":["كيف لا تتكرر، حد أقصى 3"],"recovery":"فرصة التعافي وكم تأخذ تقريباً","alternative":"خطة بديلة إن كانت الحالة متقدمة (مثلاً التكاثر بالعُقل)، أو فارغ"}`;

export default async function handler(req, res) {
  if (!guard(req, res)) return;
  try {
    const img = readImage(req.body);
    if (!img) return res.status(400).json({ error: 'image_rejected' });
    if (img.tooLarge) return res.status(413).json({ error: 'too_large' });
    const note = typeof req.body.note === 'string' ? req.body.note.trim().slice(0, 600) : '';

    const text = await claude({
      system: RULES,
      maxTokens: 1500,
      messages: [{ role: 'user', content: [
        { type: 'image', source: { type: 'base64', media_type: img.mediaType, data: img.data } },
        { type: 'text', text: `المهمة: الصورة لنبتة يشتكي صاحبها من مشكلة فيها.${note ? ` قال المستخدم: «${note}»` : ''}
تعرّف على النبتة، وشخّص المشكلة الأرجح من العلامات الظاهرة فعلاً في الصورة (ومن كلام المستخدم)، ثم اكتب خطة إنعاش عملية مرتبة بحد أقصى 5 خطوات.
فرّق بين الأسباب المتشابهة (سقي زائد أم عطش، آفة أم فطر أم حرق شمس) واذكر كيف يتأكد المستخدم بنفسه.
إذا بدت النبتة سليمة فاجعل status=healthy. إذا لم تكن في الصورة نبتة فاجعل is_plant=false.
أجب بكائن JSON واحد فقط بهذا الشكل:
${SHAPE}` },
      ] }],
    });
    res.status(200).json(parseJSON(text));
  } catch (e) { fail(res, e); }
}
