// Ongoing collaborations live in their own section rather than in the event
// timeline: the timeline records one-off events, while an initiative keeps
// producing results. New results/papers go into `updates` as they appear.
const hydroTuringHref = "https://flood-lab.github.io/HydroTuring/";

export const eventsContent = {
  en: {
    lead: {
      eyebrow: "Events / Community",
      title: "Where to meet us",
      text:
        "HydroAgent-Lab shares its work through conferences, workshops, informal meetups, and open community initiatives. This page records the initiatives we take part in, where we have presented, and where you can meet us next.",
      facts: [
        { label: "Latest", value: "HydroTuring conservation benchmark" },
        { label: "Format", value: "Open initiatives, talks, and meetups" },
        { label: "Reach", value: "Europe, China, and the United States" }
      ]
    },
    collabSection: {
      eyebrow: "Collaborations",
      title: "Collaborative research projects",
      items: [
        {
          title: "HydroTuring — A Conservation Benchmark for AI Hydrological Models",
          meta:
            "Since September 2026 · In collaboration with Prof. Zhi Li, University of Colorado Boulder",
          paragraphs: [
            "Deep learning models can now predict streamflow more accurately than calibrated conceptual models. Accuracy alone, however, does not tell us whether their predictions respect the conservation of mass, energy, and momentum. HydroTuring, led by Prof. Zhi Li, is developing a standardized benchmark to answer precisely that question.",
            "Any model can participate—including deep learning, machine learning, process-based, and hybrid models—regardless of the programming language in which it is written. A Docker container and a lightweight adapter are all that is required.",
            "Models run in sealed containers on test cases generated on the fly from random seeds and never stored, preventing them from memorizing the answers. Each test returns a pass-or-fail result together with an explanation of any failure.",
            "HydroAgent-Lab is collaborating on the benchmark and contributing new tests. If you work on snow, groundwater, evapotranspiration, soil moisture, or channel routing, we invite you to contribute a physics-based test that hydrological models should pass."
          ],
          statusLabel: "Status —",
          status:
            "Version 0.1.0 includes seven mass-conservation tests. Tests for energy conservation, momentum conservation, extrapolation, and real-world data are currently in development.",
          asks: ["Write a probe", "Propose a model", "Join the paper"],
          logo: {
            src: "/assets/events/hydroturing-logo.png",
            alt: "HydroTuring Initiative logo"
          },
          links: [{ label: "HydroTuring", href: hydroTuringHref }],
          updates: []
        }
      ]
    },
    items: [
      {
        title: "EGU General Assembly 2026 · Vienna",
        meta: "Session HS3.5 · Oral · Tue 5 May, 11:00–11:10 CEST · Room C",
        text:
          "Baoying Shan presented “Is it ready to apply Large Language Models to frontline hydro practice?” on behalf of HydroAgent-Lab. The talk described a human-in-the-loop approach to applying large language models in flood forecasting, rather than a chatbot. Several members (Qingyi, Shunan, Tiantian, xiaohuan) were on site too.",
        photo: "Photos: talk / poster / team",
        photos: [{ src: "/assets/EGU26/EGU26_people.jpg", alt: "HydroAgent-Lab team at EGU26" }],
        links: [
          { label: "Presentation deck", href: "/assets/EGU26/EGU26_pre_v1.pdf" },
          { label: "EGU abstract", href: "https://meetingorganizer.copernicus.org/EGU26/EGU26-16720.html" }
        ]
      },
      {
        title: "AI Builders Meetup · Huilongguan, Beijing",
        meta: "16 May 2026 · Community meetup",
        text:
          "Siqian Qiu joined the OpenClaw community for an in-person exchange on agentic AI in water. The discussion covered how HydroAgent handles never-before-seen extreme floods, why it should provide a usable risk floor instead of promising a perfect peak, how forecasters' experience can be captured and reused, and why first-hand operational data matters for domain AI.",
        photo: "AI Builders Meetup photo",
        photos: [{ src: "/assets/events/qiusiqian_huilongguan_1.jpg", alt: "AI Builders Meetup in Huilongguan, Beijing" }],
        links: []
      },
      {
        title: "Tsinghua University · Beijing",
        meta: "21 May 2026 · Guest session",
        text:
          "Prof. Xudong Zhou (founder of the Hydro90 community, which several HydroAgent-Lab members come from) presented Hydro90 at Tsinghua University and used HydroAgent as a case study, introducing the human-in-the-loop approach to students and young builders.",
        photo: "Tsinghua University guest session photo",
        photos: [{ src: "/assets/events/zhouxudong_2026.png", alt: "Xudong Zhou guest session at Tsinghua University" }],
        links: []
      }
    ]
  },
  zh: {
    lead: {
      eyebrow: "活动与社区",
      title: "线下交流",
      text:
        "HydroAgent-Lab 会通过学术会议、研讨会、非正式交流和开放社区倡议分享工作。这里记录我们参与的倡议、去过哪里，以及接下来你能在哪儿找到我们。",
      facts: [
        { label: "最新", value: "HydroTuring 守恒基准" },
        { label: "形式", value: "开放倡议、报告与社区交流" },
        { label: "范围", value: "欧洲、中国与美国" }
      ]
    },
    collabSection: {
      eyebrow: "合作",
      title: "合作研究项目",
      items: [
        {
          title: "水文图灵 HydroTuring —— 面向 AI 水文模型的守恒基准",
          meta: "2026 年 9 月起 · 与科罗拉多大学博尔德分校 李直（Zhi Li）教授团队合作",
          paragraphs: [
            "深度学习模型预测河川径流的精度，已经超过了率定后的概念性水文模型。但精度本身并不回答另一个问题：这些预测是否满足水量、能量和动量守恒。水文图灵由科罗拉多大学博尔德分校的李直教授主持，正在建立一套标准化的评价基准，专门回答这个问题。",
            "任何模型都可以参与，包括深度学习、机器学习、物理过程和混合模型，也不限编程语言，一个 Docker 容器加一个轻量适配器（adapter）就够了。",
            "模型在封闭容器里运行，测试用例由随机种子现场生成、从不存储，模型无法背题；每道题给出通过或失败的结果，并说明失败原因。",
            "HydroAgent-Lab 是这项基准的合作方之一，正在贡献新的测试。如果你研究降雪、地下水、蒸散发、土壤水分或河道路由，欢迎贡献一道水文模型应当通过的物理考题。"
          ],
          statusLabel: "进展 ——",
          status:
            "v0.1.0 已包含 7 个质量守恒测试；能量守恒、动量守恒、外推和真实数据测试正在开发中。",
          // 号召语保留英文原文：这是倡议方自己的说法，译过来反而不好对上。
          asks: ["Write a probe", "Propose a model", "Join the paper"],
          logo: {
            src: "/assets/events/hydroturing-logo.png",
            alt: "水文图灵倡议 HydroTuring Initiative 标识"
          },
          links: [{ label: "访问 HydroTuring", href: hydroTuringHref }],
          updates: []
        }
      ]
    },
    items: [
      {
        title: "EGU 全球大会 2026 · 维也纳",
        meta: "HS3.5 分会 · 口头报告 · 5 月 5 日（周二）11:00–11:10 CEST · C 厅",
        text:
          "单宝英代表 HydroAgent-Lab 作了题为《大语言模型，准备好走进一线水文实践了吗？》的报告，强调这是一种人始终在环路里的大模型应用方式，而不是一个聊天机器人。庆一、顺安、甜甜等几位成员也在现场。",
        photo: "现场照片：报告 / 海报 / 团队",
        photos: [{ src: "/assets/EGU26/EGU26_people.jpg", alt: "HydroAgent-Lab 团队在 EGU26 现场" }],
        links: [
          { label: "演示文件", href: "/assets/EGU26/EGU26_pre_v1.pdf" },
          { label: "阅读摘要", href: "https://meetingorganizer.copernicus.org/EGU26/EGU26-16720.html" }
        ]
      },
      {
        title: "AI Builders 线下交流 · 北京回龙观",
        meta: "2026 年 5 月 16 日 · 社区交流",
        text:
          "裘思谦和 OpenClaw 社区的朋友们做了一次面对面交流，讨论了 HydroAgent 如何应对历史从未出现过的极端洪水（重点不在“精准命中洪峰”，而在给出一个业务可用的风险下限）、预报员的经验如何被沉淀和复用，以及一手业务数据为什么对垂直领域的 AI 很重要。",
        photo: "AI Builders 线下交流现场照片",
        photos: [{ src: "/assets/events/qiusiqian_huilongguan_1.jpg", alt: "北京回龙观 AI Builders 线下交流现场" }],
        links: []
      },
      {
        title: "清华大学 · 北京",
        meta: "2026 年 5 月 21 日 · 嘉宾分享",
        text:
          "周旭东老师是 Hydro90 社区的创办人，HydroAgent-Lab 也有多位成员来自 Hydro90。他在清华大学介绍 Hydro90 时，把 HydroAgent 作为社区合作案例分享给在场的同学和年轻开发者。",
        photo: "清华大学嘉宾分享现场照片",
        photos: [{ src: "/assets/events/zhouxudong_2026.png", alt: "周旭东老师在清华大学作嘉宾分享" }],
        links: []
      }
    ]
  }
};
