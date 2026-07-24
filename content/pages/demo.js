// Demo page content — interactive replays of real HydroAgent working sessions.
// Every assistant message below is curated from an actual session recorded in
// the HydroAgent WebUI (users/session/*.json). No content is fabricated.
//
// Assistant messages are arrays of typed blocks rendered by demo-chat.js:
//   { t: "p",      text }                 paragraph, supports **bold** / `code`
//   { t: "h",      text }                 sub-heading
//   { t: "list",   items: [text] }        bullet list
//   { t: "check",  items: [text] }        checklist
//   { t: "table",  head: [], rows: [[]] } data table
//   { t: "result", title, items: [{ label, value }] }  highlight card

export const demoContent = {
  en: {
    lead: {
      eyebrow: "Product Experience",
      title: "Watch HydroAgent think, step by step",
      text:
        "Interactive replays of real HydroAgent working sessions: scheme preparation, situation assessment, parameter scheme selection, rolling forecast and warning bulletin on a real basin. Every reply below is drawn from recorded sessions and real run artifacts.",
      facts: [
        { label: "Format", value: "Session replay" },
        { label: "Scenarios", value: "4 storylines" },
        { label: "Test basin", value: "South Yamhill River, OR" }
      ]
    },
    chat: {
      replayBadge: "Replayed from real HydroAgent sessions & artifacts — not live inference",
      emptyHint:
        "Press Send below to play the first message of this recorded session.",
      scenarioLabel: "Pick a storyline",
      moreLabel: "More to explore",
      moreTagline: "More for you to explore",
      inputHint: "Next message",
      send: "Send",
      streaming: "HydroAgent is responding…",
      skip: "Skip animation",
      replay: "Replay this storyline",
      endNote: "End of this replay.",
      ctaText: "Want a live session with HydroAgent on your own basin?",
      ctaButton: "Request pilot access",
      ctaPath: "/contact",
      scenarios: [
        {
          id: "meet",
          label: "Meet HydroAgent",
          tagline: "Who is the agent, and what does it know?",
          turns: [
            {
              user: "hi, introduce yourself a little bit",
              assistant: [
                {
                  t: "p",
                  text:
                    "Hello! I'm **HydroAgent**, your professional AI assistant for water-resource work — starting with **intelligent flood forecasting**. I support professionals across the entire flood-forecasting workflow."
                },
                { t: "h", text: "Offline phase (pre-flood season)" },
                {
                  t: "list",
                  items: [
                    "**Scheme preparation** — collect basin data, calibrate model parameters on historical floods, compile forecasting schemes, and evaluate their accuracy."
                  ]
                },
                { t: "h", text: "Online phase (operational forecasting)" },
                {
                  t: "list",
                  items: [
                    "**Step 1 · Situation assessment** — analyse weather, hydrological conditions and basin characteristics, retrieve similar historical cases, and give an initial probabilistic judgement on peak flow and flood volume.",
                    "**Step 2 · Parameter scheme selection** — use the judgement as a guide to select and refine the parameter scheme, generating a forecasted hydrograph.",
                    "**Step 3 · Rolling forecast** — as new observations arrive, roll the forecast forward, compare it against observations, and keep it updated.",
                    "**Step 4 · Warning output** — assess the forecast against warning thresholds and generate reports with actionable recommendations."
                  ]
                },
                {
                  t: "p",
                  text:
                    "My core principles: **understand first, then act**, pause for confirmation on key decisions, keep every process **transparent and traceable** — and above all, **report results honestly**, even when forecasts don't meet targets."
                }
              ]
            },
            {
              user: "Which basins do you have ready-to-use forecasting schemes for?",
              assistant: [
                {
                  t: "p",
                  text:
                    "According to the current system records, the following basin has a completed forecasting scheme (Step 0):"
                },
                { t: "h", text: "South Yamhill River at McMinnville, OR" },
                {
                  t: "table",
                  head: ["Attribute", "Detail"],
                  rows: [
                    ["Basin ID", "14194150"],
                    ["Location", "McMinnville, Oregon, USA"],
                    ["Drainage area", "1,357.95 km²"],
                    ["Scheme status", "✅ Step 0 complete"],
                    ["Accuracy rating", "KGE-based composite evaluation"]
                  ]
                },
                {
                  t: "list",
                  items: [
                    "**Geography** — south fork of the Yamhill River, west side of the Willamette Valley.",
                    "**Climate** — Pacific maritime: wet winters, dry summers; floods concentrate in autumn and winter.",
                    "**Completed work** — data collection, event-based parameter calibration, scheme compilation, accuracy rating."
                  ]
                },
                {
                  t: "p",
                  text:
                    "From here you can inspect the scheme details, run an operational forecast (Step 1–4), or prepare a new scheme for another basin. Try the **Forecast walkthrough** storyline above to see a full forecast on this basin."
                }
              ]
            }
          ]
        },
        {
          id: "step0",
          label: "Scheme preparation",
          tagline: "Step 0 · Offline calibration and accuracy rating, before the flood season",
          turns: [
            {
              user:
                "I need a flood-forecasting scheme for basin 14194150. Event classes: Type_I peak ≥ 490, Type_II 350–490, Type_III 260–350, Type_IV 205–260, Type_V 175–205 m³/s. Read the basin info from the registry, calibrate parameters per class with the XAJ model, 10 iterations, and produce the accuracy report.",
              assistant: [
                {
                  t: "p",
                  text:
                    "I've read the basin registry. Here is the scheme configuration for your confirmation:"
                },
                {
                  t: "table",
                  head: ["Item", "Value"],
                  rows: [
                    ["Basin", "14194150 · South Yamhill River at McMinnville OR"],
                    ["Area", "1,357.95 km²"],
                    ["Calibration period", "1995-01-01 ~ 2019-12-31"],
                    ["Event detection", "peakbase (min peak 175 m³/s)"],
                    ["Model", "Xinanjiang (XAJ)"],
                    ["Optimizer", "DDS × 10 iterations"],
                    ["Warm-up", "240 h (10 days)"],
                    ["Strategy", "independent calibration per flood class"]
                  ]
                },
                {
                  t: "p",
                  text:
                    "**Important note**: 10 iterations is typical for a quick test. For an operational scheme I recommend 1,000+ iterations for stable parameters. ⏸️ **Please confirm this configuration, or tell me what to change.**"
                }
              ]
            },
            {
              user: "Confirmed.",
              assistant: [
                {
                  t: "p",
                  text:
                    "⏳ Got it — calibrating parameters for each of the five flood classes now. This sweeps every historical event from 1995–2019 and optimises class by class, so **calibration takes a little while**. Hang tight…"
                },
                {
                  t: "p",
                  text:
                    "✅ **Scheme preparation complete.** From the 1995–2019 record, **113 flood events** were identified and classified into your five classes. Parameters were calibrated independently per class."
                },
                { t: "h", text: "KGE accuracy rating per class" },
                {
                  t: "table",
                  head: ["Class", "Events", "Peak range (m³/s)", "KGE", "Pass (≥0.70)"],
                  rows: [
                    ["Type_I", "14", "≥490", "0.7965", "✅"],
                    ["Type_II", "23", "350–490", "0.4983", "❌"],
                    ["Type_III", "22", "260–350", "0.6285", "❌"],
                    ["Type_IV", "26", "205–260", "0.7621", "✅"],
                    ["Type_V", "28", "175–205", "0.7961", "✅"]
                  ]
                },
                {
                  t: "result",
                  title: "Overall scheme rating",
                  items: [
                    { label: "Mean KGE", value: "0.6963" },
                    { label: "Classes passing", value: "3 / 5" },
                    { label: "Rating", value: "Acceptable" }
                  ]
                },
                { t: "h", text: "Output files (relative paths)" },
                {
                  t: "list",
                  items: [
                    "`outputs/14194150/step0/scheme.json` — calibrated parameters & scheme config",
                    "`outputs/14194150/step0/report.md` — accuracy-rating report",
                    "`outputs/14194150/step0/events_list.csv` — the 113 detected events & classes"
                  ]
                },
                { t: "h", text: "Expert review notes" },
                {
                  t: "list",
                  items: [
                    "**Strengths** — large floods (Type_I) and small floods (Type_IV/V) all exceed KGE 0.75; event detection is complete and classification reasonable.",
                    "**Weaknesses reported honestly** — Type_II (0.4983) and Type_III (0.6285) are below standard; the mean KGE of 0.6963 falls just short of the 0.70 \"good\" bar.",
                    "**Recommendation** — raise iterations to 1,000+ for the operational scheme and revisit the calibration strategy for the middle classes."
                  ]
                },
                {
                  t: "p",
                  text:
                    "The test scheme is archived and usable for reference forecasts. For an operational scheme, I recommend re-calibrating with more iterations as noted above."
                }
              ]
            },
            {
              user: "Raise the iterations to 2,000 and re-calibrate the parameters.",
              assistant: [
                {
                  t: "p",
                  text:
                    "✅ **Re-calibration complete.** All 113 events were re-calibrated with DDS × 2,000 iterations (objective: KGE). Here is the before/after comparison:"
                },
                { t: "h", text: "Test scheme (10 iter) vs. operational scheme (2,000 iter)" },
                {
                  t: "table",
                  head: ["Class", "Events", "KGE @10", "KGE @2,000", "Pass (≥0.70)"],
                  rows: [
                    ["Type_I", "14", "0.7965", "0.8641", "✅"],
                    ["Type_II", "23", "0.4983", "0.9420", "✅"],
                    ["Type_III", "22", "0.6285", "0.9240", "✅"],
                    ["Type_IV", "26", "0.7621", "0.8963", "✅"],
                    ["Type_V", "28", "0.7961", "0.8260", "✅"]
                  ]
                },
                {
                  t: "result",
                  title: "Re-calibration outcome",
                  items: [
                    { label: "Mean KGE", value: "0.6963 → 0.8905" },
                    { label: "Classes passing", value: "3/5 → 5/5" },
                    { label: "Overall NSE", value: "0.7811" },
                    { label: "Run ID", value: "step0_14194150_20260320T124231" }
                  ]
                },
                {
                  t: "p",
                  text:
                    "The two weakest classes improved the most — Type_II (0.4983 → 0.9420) and Type_III (0.6285 → 0.9240) — confirming that the earlier shortfall came from the iteration budget, not the model. The scheme is archived as the operational scheme behind Step 1–4 — try the **Forecast walkthrough** storyline to see it in action."
                }
              ]
            }
          ]
        },
        {
          id: "forecast",
          label: "Forecast walkthrough",
          tagline: "Step 1 judgement → Step 2 scheme selection → Step 3 rolling forecast → Step 4 bulletin",
          turns: [
            {
              user:
                "South Yamhill River basin (14194150), event evt_20221229T130000. The weather service forecasts a long winter frontal rainfall: ~13 days, ~146 rainy hours, areal rainfall ~176 mm, mean intensity 1.2 mm/h; max 24-hour rainfall ~69 mm. Antecedent: ~25 mm in the past week, medium soil moisture, current flow only ~27 m³/s. How big a flood could this produce? What range for peak and volume?",
              assistant: [
                {
                  t: "p",
                  text:
                    "I've retrieved the most similar historical cases for this scenario. Here is the situation-assessment report."
                },
                { t: "h", text: "Scenario summary" },
                {
                  t: "list",
                  items: [
                    "**Basin** — South Yamhill River at McMinnville OR (14194150)",
                    "**Rainfall** — 176 mm / 146 h (mean 1.2 mm/h), max-24h 69 mm, max-120h 132 mm",
                    "**Antecedent** — API-7d = 25 mm, medium soil moisture, initial flow 27 m³/s",
                    "**Weather type** — winter frontal rainfall, late December (wet-season peak)"
                  ]
                },
                { t: "h", text: "Top-5 similar historical cases" },
                {
                  t: "table",
                  head: ["Case", "Score", "Rain (mm)", "max24h", "API-7d", "Peak (m³/s)", "Volume (10⁸ m³)", "Month"],
                  rows: [
                    ["case_201412_type_ii", "11.6", "183.7", "93.4", "25.1", "444.6", "1.95", "Dec"],
                    ["case_201204_type_ii", "11.5", "170.4", "64.2", "39.4", "472.9", "2.18", "Apr"],
                    ["case_201502_type_ii", "10.7", "168.6", "65.3", "27.6", "392.9", "2.11", "Feb"],
                    ["case_200601_type_i", "10.6", "178.2", "70.8", "85.4", "591.8", "2.31", "Jan"],
                    ["case_201112_type_iii", "10.5", "177.6", "65.6", "12.1", "297.3", "1.39", "Dec"]
                  ]
                },
                { t: "h", text: "Key physical reasoning" },
                {
                  t: "list",
                  items: [
                    "**Initial flow (rule R2)** — 27 m³/s is lower than the closest case (51.9 m³/s): larger soil buffer, lower runoff efficiency, so shift the estimate downward.",
                    "**Rainfall intensity (rule R3)** — max-24h 69 mm sits in the standard moderate-peak band (50–80 mm): expect a fairly standard, not sharp, peak shape.",
                    "**Seasonality (rule R8b)** — a late-December event can produce 2–3× the peak of an April event with identical rainfall and API: runoff efficiency is at its wet-season maximum.",
                    "**Runoff-coefficient check** — total rainfall volume 2.39×10⁸ m³; with R ≈ 0.45–0.55 the volume bounds are physically consistent (R = 0.46–0.59, within [0.05, 1.1])."
                  ]
                },
                {
                  t: "result",
                  title: "Situation judgement",
                  items: [
                    { label: "Peak-flow interval", value: "[280, 380] m³/s" },
                    { label: "Volume interval", value: "[1.1, 1.4] ×10⁸ m³" },
                    { label: "Flood type", value: "Type II" },
                    { label: "Risk direction", value: "Likely underestimated" },
                    { label: "Confidence", value: "Medium" }
                  ]
                },
                {
                  t: "p",
                  text:
                    "⏸️ **Waiting for expert review** — please confirm whether this judgement is reasonable, or tell me which assumptions to adjust."
                }
              ]
            },
            {
              user: "Confirmed. Proceed to Step 2: parameter scheme selection.",
              assistant: [
                {
                  t: "p",
                  text:
                    "✅ **Parameter scheme selection complete.** The scheme was selected and refined against the Step 1 target intervals."
                },
                {
                  t: "table",
                  head: ["Metric", "Initial run", "After tuning", "Step 1 target", "Status"],
                  rows: [
                    ["Peak flow", "368.4 m³/s", "350.6 m³/s", "[280, 380] m³/s", "✅ In range"],
                    ["Volume", "1.967×10⁸ m³", "1.958×10⁸ m³", "[1.1, 1.4]×10⁸ m³", "❌ Above range"],
                    ["Peak time", "—", "2022-12-29 09:00", "—", "—"]
                  ]
                },
                { t: "h", text: "Honest error analysis" },
                {
                  t: "list",
                  items: [
                    "**Volume exceeds the target interval** by ~0.56×10⁸ m³ (≈40%). Possible causes: rainfall spatio-temporal distribution, underestimated antecedent moisture, or a strong runoff response to long-duration rainfall.",
                    "**Post-event verification** — observed peak was 455.2 m³/s (simulation −23.0%) and observed volume 2.221×10⁸ m³ (−11.8%): the Step 1 volume interval was in fact conservative.",
                    "**Runoff coefficient** — 0.82, on the high side but plausible for late-December wet season."
                  ]
                },
                {
                  t: "img",
                  src: "/assets/demo/step2_hydrograph.png",
                  alt: "Step 2 forecasted hydrograph vs observed flow",
                  caption:
                    "Step 2 output hydrograph — real artifact of this session (tuned vs. initial vs. observed)"
                },
                {
                  t: "p",
                  text:
                    "**Status: partial success.** Peak flow reached the target interval; volume needs attention. Recommendation: proceed to **Step 3 rolling forecast** and watch the volume trend as real-time observations arrive. Artifacts generated under `outputs/14194150/forecast/`: `forecast.json`, `hydrograph.png`, `report.md`. Shall we continue?"
                }
              ]
            },
            {
              user: "Continue to Step 3 rolling forecast, 1 second per simulated hour.",
              assistant: [
                { t: "p", text: "✅ **Step 3 rolling playback monitor started.**" },
                {
                  t: "list",
                  items: [
                    "**Basin** — South Yamhill River (14194150), event evt_20221229T130000",
                    "**Issue time** — 2022-12-29 13:00, advancing 1 simulated hour per second",
                    "**Baseline** — the Step 2 fine-tuned scheme",
                    "**Session** — `pb_14194150_6fa574fe`"
                  ]
                },
                { t: "h", text: "What the playback monitor shows" },
                {
                  t: "list",
                  items: [
                    "Live hydrograph: forecast updated as time advances",
                    "Observed vs. forecast comparison with error statistics",
                    "Each hourly tick re-initialises model states from the newest observations and re-runs the XAJ model"
                  ]
                },
                {
                  t: "img",
                  src: "/assets/demo/step3_rolling_forecast.png",
                  alt: "Step 3 rolling forecast monitor with warning thresholds",
                  caption:
                    "Rolling forecast monitor — real artifact of this session (forecast vs. observed, warning thresholds)"
                },
                {
                  t: "p",
                  text:
                    "You can `pause`, `resume`, `stop`, or change the playback speed at any time. This is the core of Step 3: rolling the forecast forward as \"new\" observations stream in — exactly how a forecaster works a live event."
                }
              ]
            },
            {
              user:
                "Enter Step 4: publish the official flood bulletin. Reviewing engineer: B. Shan.",
              assistant: [
                {
                  t: "p",
                  text:
                    "✅ **Step 4 warning assessment complete.** The latest successful Step 3 run was assessed against the basin's official warning thresholds."
                },
                { t: "h", text: "Warning threshold assessment" },
                {
                  t: "table",
                  head: ["Level", "Threshold (m³/s)", "Forecast peak 350.6 m³/s", "Triggered"],
                  rows: [
                    ["🔴 Red", "1069.8", "below", "—"],
                    ["🟠 Orange", "910.8", "below", "—"],
                    ["🟡 Yellow", "787.9", "below", "—"],
                    ["🔵 Blue", "659.8", "below", "—"]
                  ]
                },
                {
                  t: "result",
                  title: "Official bulletin",
                  items: [
                    { label: "Warning level", value: "None (below Blue)" },
                    { label: "Forecast peak", value: "350.6 m³/s" },
                    { label: "Peak time", value: "2022-12-29 09:00" },
                    { label: "Flood type", value: "Type II" },
                    { label: "Deliverables", value: "outputs/14194150/bulletin/ → release.json · bulletin.md" }
                  ]
                },
                {
                  t: "p",
                  text:
                    "The bulletin carries the verification note: \"Simulated forecast provided by HydroAgent, verified by engineer B. Shan.\" Even with no warning triggered, the Step 2 analysis flagged the volume as likely underestimated — the bulletin therefore recommends continued monitoring while the rolling forecast keeps running. **The final word always belongs to the human forecaster.**"
                }
              ]
            }
          ]
        },
        {
          id: "nightshift",
          label: "Night-shift companion",
          tagline: "The human-centred side of the agent",
          turns: [
            {
              user: "I'm a forecaster on the night shift, and I'm exhausted…",
              assistant: [
                {
                  t: "p",
                  text:
                    "That's rough — night-shift forecasting is draining. Before you push through, here's a 5-minute survival routine:"
                },
                {
                  t: "list",
                  items: [
                    "**Drink some warm water**",
                    "**Stand up and move for one minute** — stop staring at the screen",
                    "**Look into the distance for 20 seconds** to rest your eyes",
                    "**Write down the 3 most critical things for the next hour**, so fatigue doesn't make you miss one",
                    "A low-sugar coffee or tea if available — don't overdo it"
                  ]
                },
                {
                  t: "p",
                  text:
                    "If you'd like, I can switch into **duty mode** with you: review the current weather and water situation, run a Step 1 assessment, draft a short duty log, or build a night-shift checklist. Just say the word."
                }
              ]
            },
            {
              user: "Build me a night-shift checklist.",
              assistant: [
                {
                  t: "p",
                  text:
                    "Here is a **forecaster's night-shift anti-omission checklist** (flood-duty condensed version) — designed to be walked through item by item:"
                },
                { t: "h", text: "1 · Overview scan" },
                {
                  t: "check",
                  items: [
                    "Latest observed rainfall updated; next 1–6 h and 6–24 h forecasts reviewed",
                    "Heavy-rain area overlaps which basins / sub-basins?",
                    "Key stations current; any gaps, spikes or anomalies?",
                    "Initial flow Q0 confirmed; reservoir & gate operations known",
                    "Antecedent rainfall & soil moisture judged (dry / medium / wet / saturated)"
                  ]
                },
                { t: "h", text: "2 · Forecast operations" },
                {
                  t: "check",
                  items: [
                    "Step 1: event magnitude, duration and max-interval intensity explicit; similar historical cases retrieved; prior peak/volume judgement formed",
                    "Step 2: correct scheme & basin; initial states match reality; only small, justified parameter adjustments; output hydrograph physically sound",
                    "Step 3: newest observations ingested; last cycle's error explained; peak timing / magnitude / volume bias corrected and documented"
                  ]
                },
                { t: "h", text: "3 · Warning & handover" },
                {
                  t: "check",
                  items: [
                    "Warning thresholds checked; upgrade / downgrade needed?",
                    "Conclusion states peak, peak time, volume, magnitude — with uncertainty",
                    "One-sentence summary of rain / water / works status for the next shift",
                    "Open questions to verify are listed for handover"
                  ]
                },
                {
                  t: "p",
                  text:
                    "Hang in there — and if you want, give me the current rainfall numbers and I'll run the Step 1 assessment with you right now."
                }
              ]
            }
          ]
        }
      ]
    }
  },
  zh: {
    lead: {
      eyebrow: "产品体验",
      title: "看 HydroAgent 如何一步步思考",
      text:
        "以下是 HydroAgent 真实工作会话的交互式回放：方案制作、情景研判、参数方案选择、滚动预报、预警公报，全部发生在真实流域上。每一条回复都取材自实际记录的会话与真实运行产物。",
      facts: [
        { label: "形式", value: "会话回放" },
        { label: "场景", value: "4 条故事线" },
        { label: "测试流域", value: "South Yamhill River, OR" }
      ]
    },
    chat: {
      replayBadge: "回放自 HydroAgent 真实会话与运行产物 · 非实时推理",
      emptyHint: "点击下方“发送”，播放这段真实会话的第一条消息。",
      scenarioLabel: "选择一条故事线",
      moreLabel: "更多场景",
      moreTagline: "更多功能等你探索",
      inputHint: "下一条消息",
      send: "发送",
      streaming: "HydroAgent 正在回复…",
      skip: "跳过动画",
      replay: "重新播放",
      endNote: "本段回放结束。",
      ctaText: "想在你自己的流域上真实体验 HydroAgent？",
      ctaButton: "申请试点体验",
      ctaPath: "/contact",
      scenarios: [
        {
          id: "meet",
          label: "认识 HydroAgent",
          tagline: "它是谁，知道些什么？",
          turns: [
            {
              user: "你好，简单介绍一下你自己",
              assistant: [
                {
                  t: "p",
                  text:
                    "你好！我是 **HydroAgent**，面向水利业务的专业 AI 助手，**首先从智能洪水预报做起**，为水利专业人员提供覆盖洪水预报全流程的支持。"
                },
                { t: "h", text: "离线阶段（汛前）" },
                {
                  t: "list",
                  items: [
                    "**方案制作** —— 收集流域资料，基于历史场次洪水率定模型参数，编制预报方案并评定精度等级。"
                  ]
                },
                { t: "h", text: "在线阶段（作业预报）" },
                {
                  t: "list",
                  items: [
                    "**Step 1 · 情景研判** —— 分析天气、水情与流域特征，检索相似历史案例，对洪峰和洪量给出初步的概率性判断。",
                    "**Step 2 · 参数方案选择** —— 以研判结论为约束选择并微调参数方案，生成预报过程线。",
                    "**Step 3 · 滚动预报** —— 新观测数据到来后，滚动向前预报，对比实测并持续更新结果。",
                    "**Step 4 · 预警输出** —— 对照预警阈值评估预报结果，确定预警等级并生成含行动建议的报告。"
                  ]
                },
                {
                  t: "p",
                  text:
                    "我的核心原则：**先理解、再行动**；关键决策暂停确认；全过程**透明可追溯**；最重要的是**诚实汇报结果**——即使预报没有达标，如实暴露问题也比虚报成功更有价值。"
                }
              ]
            },
            {
              user: "介绍下你已经准备好制作预报方案的典型流域",
              assistant: [
                {
                  t: "p",
                  text: "根据当前系统记录，以下流域已完成方案制作（Step 0）："
                },
                { t: "h", text: "South Yamhill River at McMinnville, OR" },
                {
                  t: "table",
                  head: ["属性", "详情"],
                  rows: [
                    ["流域编号", "14194150"],
                    ["位置", "美国俄勒冈州麦克明维尔市"],
                    ["流域面积", "1,357.95 km²"],
                    ["方案状态", "✅ Step 0 已完成"],
                    ["精度评定", "KGE 综合评估"]
                  ]
                },
                {
                  t: "list",
                  items: [
                    "**地理位置** —— Yamhill River 南支流，位于威拉米特河谷（Willamette Valley）西侧。",
                    "**气候特征** —— 典型太平洋海洋性气候：冬季多雨、夏季干燥，洪水多发于秋冬季节。",
                    "**已完成工作** —— 流域数据收集、按场次洪水率定参数、预报方案编制、精度等级评定。"
                  ]
                },
                {
                  t: "p",
                  text:
                    "接下来你可以查看方案详情、在该流域开展 Step 1～4 作业预报，或为其他流域新建方案。点上方 **预报实战** 故事线，看一场完整的洪水预报。"
                }
              ]
            }
          ]
        },
        {
          id: "step0",
          label: "方案制作",
          tagline: "Step 0 · 汛前离线率定与精度评定",
          turns: [
            {
              user:
                "我需要为 14194150 流域制作一个洪水预报方案。事件分类阈值：Type_I: peak ≥ 490，Type_II: 350–490，Type_III: 260–350，Type_IV: 205–260，Type_V: 175–205 m³/s。流域基础信息请直接从后台 basin registry 读取，按以上 5 类洪水分别完成参数率定，生成预报方案，并输出精度评定报告。使用新安江模型（XAJ），迭代次数为 10 次。",
              assistant: [
                {
                  t: "p",
                  text: "已从 basin registry 读取流域信息，生成方案配置如下，请确认："
                },
                {
                  t: "table",
                  head: ["项目", "值"],
                  rows: [
                    ["流域", "14194150 · South Yamhill River at McMinnville OR"],
                    ["面积", "1,357.95 km²"],
                    ["率定时间范围", "1995-01-01 ~ 2019-12-31"],
                    ["事件识别", "peakbase（最小峰值 175 m³/s）"],
                    ["模型", "新安江模型（XAJ）"],
                    ["优化算法", "DDS × 10 次迭代"],
                    ["预热时长", "240h（10 天）"],
                    ["分类策略", "每类洪水独立率定"]
                  ]
                },
                {
                  t: "p",
                  text:
                    "**重要说明**：10 次迭代通常用于快速测试。对于正式方案，建议使用 1,000 次或更多迭代以获得更稳定的参数。⏸️ **请确认以上配置，或告知需要修改的部分。**"
                }
              ]
            },
            {
              user: "确认",
              assistant: [
                {
                  t: "p",
                  text:
                    "⏳ 好的，开始按 5 类洪水分别率定参数 —— 需要遍历 1995–2019 年的全部历史事件并逐类优化，**参数率定会花费一些时间**，请稍候…"
                },
                {
                  t: "p",
                  text:
                    "✅ **方案制作完成。** 从 1995–2019 年数据中共识别出 **113 场洪水事件**，按 5 类规则分类，并为每类独立率定了新安江模型参数。"
                },
                { t: "h", text: "各等级 KGE 精度评定" },
                {
                  t: "table",
                  head: ["等级", "事件数", "峰值范围 (m³/s)", "KGE", "达标 (≥0.70)"],
                  rows: [
                    ["Type_I", "14", "≥490", "0.7965", "✅"],
                    ["Type_II", "23", "350–490", "0.4983", "❌"],
                    ["Type_III", "22", "260–350", "0.6285", "❌"],
                    ["Type_IV", "26", "205–260", "0.7621", "✅"],
                    ["Type_V", "28", "175–205", "0.7961", "✅"]
                  ]
                },
                {
                  t: "result",
                  title: "方案总体评定",
                  items: [
                    { label: "平均 KGE", value: "0.6963" },
                    { label: "达标等级数", value: "3 / 5" },
                    { label: "评定结果", value: "合格" }
                  ]
                },
                { t: "h", text: "产出文档（相对路径）" },
                {
                  t: "list",
                  items: [
                    "`outputs/14194150/step0/scheme.json` —— 率定参数与方案配置",
                    "`outputs/14194150/step0/report.md` —— 精度评定报告",
                    "`outputs/14194150/step0/events_list.csv` —— 113 场事件清单与分类"
                  ]
                },
                { t: "h", text: "专家审阅意见" },
                {
                  t: "list",
                  items: [
                    "**优点** —— 大洪水（Type_I）与中小洪水（Type_IV/V）KGE 均超过 0.75，事件识别完整、分类合理。",
                    "**如实呈报的不足** —— Type_II（0.4983）与 Type_III（0.6285）未达标；平均 KGE 0.6963 接近但未达 0.70 的“良好”标准。",
                    "**建议** —— 正式方案将迭代次数提高至 1,000 次以上，并针对中间等级调整率定策略。"
                  ]
                },
                {
                  t: "p",
                  text:
                    "测试方案已归档，可用于测试与参考性预报。如需正式方案，建议按上述意见提高迭代次数重新率定。"
                }
              ]
            },
            {
              user: "将迭代次数提高到 2000 次，重新率定参数。",
              assistant: [
                {
                  t: "p",
                  text:
                    "✅ **重新率定完成。** 已用 DDS × 2,000 次迭代（目标函数 KGE）对全部 113 场事件重新率定，前后对比如下："
                },
                { t: "h", text: "测试方案（10 次）vs 正式方案（2,000 次）" },
                {
                  t: "table",
                  head: ["等级", "事件数", "KGE @10次", "KGE @2000次", "达标 (≥0.70)"],
                  rows: [
                    ["Type_I", "14", "0.7965", "0.8641", "✅"],
                    ["Type_II", "23", "0.4983", "0.9420", "✅"],
                    ["Type_III", "22", "0.6285", "0.9240", "✅"],
                    ["Type_IV", "26", "0.7621", "0.8963", "✅"],
                    ["Type_V", "28", "0.7961", "0.8260", "✅"]
                  ]
                },
                {
                  t: "result",
                  title: "重新率定结果",
                  items: [
                    { label: "平均 KGE", value: "0.6963 → 0.8905" },
                    { label: "达标等级数", value: "3/5 → 5/5" },
                    { label: "整体 NSE", value: "0.7811" },
                    { label: "运行 ID", value: "step0_14194150_20260320T124231" }
                  ]
                },
                {
                  t: "p",
                  text:
                    "此前最薄弱的两个等级提升最大 —— Type_II（0.4983 → 0.9420）、Type_III（0.6285 → 0.9240），验证了“测试方案不足源于迭代预算而非模型本身”的判断。该方案已归档为支撑 Step 1–4 的正式方案 —— 点上方 **预报实战** 故事线，看它如何投入实战。"
                }
              ]
            }
          ]
        },
        {
          id: "forecast",
          label: "预报实战",
          tagline: "Step 1 研判 → Step 2 方案选择 → Step 3 滚动预报 → Step 4 公报",
          turns: [
            {
              user:
                "South Yamhill River 流域（14194150），事件 evt_20221229T130000，气象台发来冬季锋面降雨预报：过程约 13 天，实际有雨约 146 小时，预报面雨量约 176mm，平均雨强 1.2mm/h，最大连续 24 小时雨量约 69mm。前期一周约 25mm 降雨，土壤湿度中等，当前河道流量仅约 27 m³/s。请研判这场降雨可能造成多大的洪水？洪峰和洪量大概在什么范围？",
              assistant: [
                {
                  t: "p",
                  text: "已完成相似历史案例检索，以下是本场景的情景研判分析报告。"
                },
                { t: "h", text: "情景摘要" },
                {
                  t: "list",
                  items: [
                    "**流域** —— South Yamhill River at McMinnville OR (14194150)",
                    "**降雨** —— 176mm / 146h（平均雨强 1.2mm/h），max24h 69mm，max120h 132mm",
                    "**前期条件** —— API-7d = 25mm，土壤湿度中等，初始流量 27 m³/s",
                    "**天气类型** —— 冬季锋面降雨，12 月底（雨季高峰期）"
                  ]
                },
                { t: "h", text: "Top-5 相似历史案例" },
                {
                  t: "table",
                  head: ["案例", "相似度", "降雨(mm)", "max24h", "API-7d", "洪峰(m³/s)", "洪量(亿m³)", "月份"],
                  rows: [
                    ["case_201412_type_ii", "11.6", "183.7", "93.4", "25.1", "444.6", "1.95", "12月"],
                    ["case_201204_type_ii", "11.5", "170.4", "64.2", "39.4", "472.9", "2.18", "4月"],
                    ["case_201502_type_ii", "10.7", "168.6", "65.3", "27.6", "392.9", "2.11", "2月"],
                    ["case_200601_type_i", "10.6", "178.2", "70.8", "85.4", "591.8", "2.31", "1月"],
                    ["case_201112_type_iii", "10.5", "177.6", "65.6", "12.1", "297.3", "1.39", "12月"]
                  ]
                },
                { t: "h", text: "关键物理推理" },
                {
                  t: "list",
                  items: [
                    "**初始流量（规则 R2）** —— 当前 27 m³/s 低于最相似案例的 51.9 m³/s：土壤缓冲容量更大、产流效率更低，研判应适当下调。",
                    "**降雨强度（规则 R3）** —— max24h = 69mm 落在标准中等峰区间（50–80mm）：洪峰形态较为标准，不会特别尖锐。",
                    "**季节性（规则 R8b）** —— 相同降雨量与 API 组合下，12 月事件的洪峰可达 4 月事件的 2–3 倍：雨季高峰期产流效率最高。",
                    "**径流系数校验** —— 总降雨体积 2.39 亿m³，按 R ≈ 0.45–0.55 反推洪量物理自洽（R = 0.46–0.59，在 [0.05, 1.1] 红线内）。"
                  ]
                },
                {
                  t: "result",
                  title: "情景研判结论",
                  items: [
                    { label: "洪峰区间", value: "[280, 380] m³/s" },
                    { label: "洪量区间", value: "[1.1, 1.4] 亿m³" },
                    { label: "洪水类型", value: "Type II" },
                    { label: "风险方向", value: "偏大" },
                    { label: "置信度", value: "中" }
                  ]
                },
                {
                  t: "p",
                  text:
                    "⏸️ **等待专家审核** —— 请确认以上研判结果是否合理，或指出需要调整的假设。"
                }
              ]
            },
            {
              user: "确认，进入 Step 2：参数方案选择",
              assistant: [
                {
                  t: "p",
                  text: "✅ **参数方案选择完成！** 已基于 Step 1 研判的目标区间完成方案选择与微调。"
                },
                {
                  t: "table",
                  head: ["指标", "初始模拟", "调参后", "Step 1 目标区间", "是否达标"],
                  rows: [
                    ["洪峰流量", "368.4 m³/s", "350.6 m³/s", "[280, 380] m³/s", "✅ 达标"],
                    ["洪量", "1.967 亿m³", "1.958 亿m³", "[1.1, 1.4] 亿m³", "❌ 超标"],
                    ["峰现时间", "—", "2022-12-29 09:00", "—", "—"]
                  ]
                },
                { t: "h", text: "诚实的误差分析" },
                {
                  t: "list",
                  items: [
                    "**洪量超出目标区间**约 0.56 亿m³（约 40%）。可能原因：降雨时空分布差异、前期土壤湿度被低估、模型对长历时降雨响应偏强。",
                    "**事后验证** —— 实测洪峰 455.2 m³/s（模拟偏低 23.0%），实测洪量 2.221 亿m³（偏低 11.8%）：说明 Step 1 的洪量区间实际上偏保守。",
                    "**径流系数** —— 0.82，偏高，但 12 月底雨季背景下尚属合理。"
                  ]
                },
                {
                  t: "img",
                  src: "/assets/demo/step2_hydrograph.png",
                  alt: "Step 2 预报过程线与实测对比",
                  caption: "Step 2 输出过程线 —— 本次会话真实产物（调参后 / 初始 / 实测对比）"
                },
                {
                  t: "p",
                  text:
                    "**执行状态：部分成功。** 洪峰已调入目标区间，洪量需要重点关注。建议进入 **Step 3 滚动预报**，随实时观测到来持续跟踪洪量演变。已生成产物（`outputs/14194150/forecast/`）：`forecast.json`、`hydrograph.png`、`report.md`。是否继续？"
                }
              ]
            },
            {
              user: "继续进入 Step 3 滚动预报，1 秒对应 1 小时。",
              assistant: [
                { t: "p", text: "✅ **Step 3 滚动回放监视器已成功启动！**" },
                {
                  t: "list",
                  items: [
                    "**流域** —— South Yamhill River (14194150)，事件 evt_20221229T130000",
                    "**起报时间** —— 2022-12-29 13:00，每 1 秒推进 1 小时模拟时间",
                    "**基线方案** —— Step 2 调参后的预报方案",
                    "**会话 ID** —— `pb_14194150_6fa574fe`"
                  ]
                },
                { t: "h", text: "回放监视器展示内容" },
                {
                  t: "list",
                  items: [
                    "实时洪水过程线：随时间推进持续更新预报",
                    "观测与预报对比，以及预报误差统计",
                    "每个整点 tick 用最新观测更新初始状态、重跑 XAJ 模型、生成新预报"
                  ]
                },
                {
                  t: "img",
                  src: "/assets/demo/step3_rolling_forecast.png",
                  alt: "Step 3 滚动预报监视器（含预警阈值线）",
                  caption: "滚动预报监视器 —— 本次会话真实产物（预报 / 观测对比，蓝黄橙红预警阈值线）"
                },
                {
                  t: "p",
                  text:
                    "回放过程中可以随时 `暂停回放`、`继续回放`、`停止回放` 或调整速度。这就是 Step 3 的核心：随着“新观测”的到来滚动向前预报、持续更新结果——与预报员盯一场真实洪水的工作方式完全一致。"
                }
              ]
            },
            {
              user: "进入 Step 4：发布正式洪水公报，核验工程师：王工。",
              assistant: [
                {
                  t: "p",
                  text:
                    "✅ **Step 4 预警研判完成。** 已将最近一次成功的 Step 3 滚动预报结果，对照该流域的正式预警阈值完成评估。"
                },
                { t: "h", text: "预警阈值对照" },
                {
                  t: "table",
                  head: ["等级", "阈值 (m³/s)", "预报洪峰 350.6 m³/s", "是否触发"],
                  rows: [
                    ["🔴 红色", "1069.8", "低于阈值", "—"],
                    ["🟠 橙色", "910.8", "低于阈值", "—"],
                    ["🟡 黄色", "787.9", "低于阈值", "—"],
                    ["🔵 蓝色", "659.8", "低于阈值", "—"]
                  ]
                },
                {
                  t: "result",
                  title: "正式公报",
                  items: [
                    { label: "预警等级", value: "无（未达蓝色）" },
                    { label: "预报洪峰", value: "350.6 m³/s" },
                    { label: "峰现时间", value: "2022-12-29 09:00" },
                    { label: "洪水类型", value: "Type II" },
                    { label: "交付物", value: "outputs/14194150/bulletin/ → release.json · bulletin.md" }
                  ]
                },
                {
                  t: "p",
                  text:
                    "公报附核验声明：“模拟预报结果由 HydroAgent 提供，由王工核验。” 虽未触发预警，但 Step 2 分析提示洪量可能被低估，公报因此建议在滚动预报持续运行期间保持关注。**最终决定权始终在预报员手中。**"
                }
              ]
            }
          ]
        },
        {
          id: "nightshift",
          label: "值夜班的搭档",
          tagline: "Human-centered 的另一面",
          turns: [
            {
              user: "我是一个预报员，正在熬夜值班，好累呀",
              assistant: [
                {
                  t: "p",
                  text:
                    "辛苦了，夜班预报最磨人。你这会儿先别硬扛，给你一个值班版“保命 5 分钟”："
                },
                {
                  t: "list",
                  items: [
                    "**先喝两口温水**",
                    "**站起来活动 1 分钟**，别一直盯屏幕",
                    "**看远处 20 秒**，缓解眼睛疲劳",
                    "**把接下来 1 小时最关键的 3 件事写下来**，避免累的时候漏项",
                    "条件允许的话来点低糖咖啡或茶，别猛灌太多"
                  ]
                },
                {
                  t: "p",
                  text:
                    "如果你愿意，我可以直接陪你进入**值班模式**：陪你梳理当前天气水情、帮你做 Step 1 情景研判、整理一份简短值班记录，或者列一个夜班防漏检查清单。你只要回我一句就行。"
                }
              ]
            },
            {
              user: "列一个夜班防漏检查清单",
              assistant: [
                {
                  t: "p",
                  text:
                    "好，给你一份**预报员夜班防漏检查清单**（洪水预报值班简版），可以直接照着逐项过："
                },
                { t: "h", text: "一 · 总览扫描" },
                {
                  t: "check",
                  items: [
                    "最新实况降雨已更新；未来 1–6 小时、6–24 小时预报已查看",
                    "强降雨落区与哪些流域 / 子流域重叠？",
                    "关键站点数据最新；有无缺测、跳点、异常突变？",
                    "起报流量 Q0 已确认；水库闸坝调度信息已掌握",
                    "前期累计雨量与土壤湿度已判断（干 / 中 / 湿 / 饱和）"
                  ]
                },
                { t: "h", text: "二 · 预报作业" },
                {
                  t: "check",
                  items: [
                    "Step 1：降雨量级、历时、最大时段强度明确；相似案例已检索；洪峰洪量先验判断已形成",
                    "Step 2：方案与流域正确；初始状态与实况一致；参数只做小幅、有依据的调整；过程线物理合理",
                    "Step 3：最新雨水情已纳入；上一轮误差原因已分析；峰现时间与量级偏差已修正并记录依据"
                  ]
                },
                { t: "h", text: "三 · 预警与交接" },
                {
                  t: "check",
                  items: [
                    "预警阈值已核对；是否需要升级或降级？",
                    "结论写清洪峰、峰现时间、洪量、量级，并说明不确定性",
                    "给下一班一句话概括当前雨情、水情、工情",
                    "待核实的问题已列入交接清单"
                  ]
                },
                {
                  t: "p",
                  text:
                    "撑住。如果你手边有这场雨的数据，把面雨量和前期条件发我，我现在就陪你把 Step 1 研判做了。"
                }
              ]
            }
          ]
        }
      ]
    }
  }
};
