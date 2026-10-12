import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "PHurity", location: "Aguascalientes, México" });
  });

  // Intelligent Intimate Health Chatbot endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, userProfile } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "El mensaje es requerido." });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.json({
          reply:
            "Hola, soy PurIA, tu asistente biotecnológica de PHurity en Aguascalientes. Recuerda que el pH vaginal saludable oscila entre 3.8 y 4.5. En este momento el servicio de IA externa está en modo local informativo. Si observas un tono verdoso o azulado (pH > 5.0) en tu tira PHurity o presentas ardor o flujo anormal, te sugerimos consultar con una clínica o ginecóloga en Aguascalientes.",
        });
      }

      const systemInstruction = `Eres 'PurIA', la asistente virtual y educadora biotecnológica de PHurity (empresa innovadora de biotecnología e ingeniería en sistemas con sede en Aguascalientes, México).
PHurity diseña una panty íntima inteligente con indicadores biológicos y colorimétricos no tóxicos ni dañinos que reaccionan al pH vaginal en tiempo real.

Tus conocimientos clave:
1. Escala de pH íntimo de PHurity:
   - pH 3.8 - 4.5 (Amarillo dorado / Ámbar claro): Rango óptimo y saludable. Predominio de lactobacilos (flora de Döderlein).
   - pH 4.6 - 5.0 (Verde lima / Oliva suave): Zona de alerta o transición. Puede deberse a final de menstruación, restos de semen, deshidratación, o inicio de disbiosis.
   - pH 5.0 - 6.0 (Verde azulado / Turquesa): Alcalinidad moderada a alta. Típico en Vaginosis Bacteriana (Gardnerella) o Tricomoniasis.
   - pH > 6.0 (Azul marino / Violeta): Alcalinidad severa o presencia de sangre menstrual (sangre pH ~7.4), infección importante o menopausia (hipoestrogenismo).
   - Nota sobre Candidiasis: El hongo Candida albicans suele prosperar con pH ácido normal (< 4.5), pero con síntomas de grumos blancos y comezón intensa.
2. Ciclo menstrual: Explica las fases (menstrual, folicular, ovulatoria, lútea) y cómo influyen los estrógenos y la progesterona en la secreción y pH.
3. Ubicación y contexto: Estás en Aguascalientes, México. Conoces centros de salud locales como Hospital Hidalgo, Clínica de la Mujer de Aguascalientes, Centros de Salud ISSEA, Hospital de la Mujer, etc.
4. Tono: Cálido, empático, científico, respetuoso, libre de tabúes y profesional.
5. Descargo médico: Aclara con delicadeza que PHurity y PurIA son herramientas de monitoreo preventivo y biotecnología que no sustituyen un diagnóstico clínico profesional. Si hay dolor pélvico agudo, fiebre o sangrado inusual, exhorta a acudir a consulta médica de inmediato.`;

      // Format conversation
      let promptContent = "";
      if (userProfile) {
        promptContent += `[Perfil de la usuaria: Fase del ciclo: ${userProfile.cyclePhase || "No especificada"}, Último pH registrado: ${userProfile.lastPh || "N/A"}, Síntomas recientes: ${userProfile.symptoms?.join(", ") || "Ninguno"}]\n\n`;
      }

      if (Array.isArray(history) && history.length > 0) {
        const recentHistory = history.slice(-6);
        for (const h of recentHistory) {
          promptContent += `${h.sender === "user" ? "Usuaria" : "PurIA"}: ${h.text}\n`;
        }
      }
      promptContent += `Usuaria: ${message}\nPurIA:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: promptContent,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "Disculpa, no pude procesar la consulta en este momento. Por favor, intenta nuevamente.";
      return res.json({ reply });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      return res.status(500).json({
        reply:
          "Tuvimos un breve inconveniente conectando con el motor biotecnológico. Te recomendamos verificar la tira de colores de PHurity en la pestaña principal o consultar nuestra sección de clínicas en Aguascalientes.",
        error: error?.message || "Internal server error",
      });
    }
  });

  // AI Biotech pH Analyzer endpoint
  app.post("/api/analyze-ph", async (req, res) => {
    try {
      const { phValue, colorName, symptoms, cycleDay } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          analysis: `Para un pH de ${phValue} (${colorName || "color seleccionado"}), el monitoreo sugiere mantener observación de síntomas y una adecuada ventilación e higiene con agua tibia.`,
          recommendation: "Monitorea durante las próximas 24 horas y mantén hidratación.",
          urgency: phValue > 5.2 ? "moderada" : "baja",
        });
      }

      const prompt = `Analiza como biotecnóloga ginecológica para la panty inteligente PHurity:
pH detectado: ${phValue}
Color de tira: ${colorName}
Día de ciclo: ${cycleDay || "No especificado"}
Síntomas reportados: ${symptoms?.length ? symptoms.join(", ") : "Ninguno"}

Proporciona en un tono claro, cálido y científico:
1. Significado biológico del pH detectado.
2. Posibles factores (fase del ciclo, microbiota, hábitos, posible disbiosis).
3. Recomendaciones prácticas inmediatas.
4. ¿Cuándo amerita acudir a una clínica en Aguascalientes?
Responde en un párrafo conciso y estructurado (máximo 120 palabras).`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });

      res.json({
        analysis: response.text || "Análisis completado.",
      });
    } catch (err: any) {
      console.error("Error in /api/analyze-ph:", err);
      res.status(500).json({ error: "Error analizando pH con IA" });
    }
  });

  // Vite middleware for development vs static for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PHurity server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
