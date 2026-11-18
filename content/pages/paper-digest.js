// Paper Digest (zh: 水利大模型文献日报; en: HydroAgent Paper Digest) — new papers on LLMs in hydrology and water resources, found
// and summarized daily by the HydroAgent collector, listed on the page and
// emailed to subscribers through Brevo. The papers come from papers.json at
// build time (lib/load-paper-digest.js); everything below is page copy.
// `{count}`, `{n}` and `{date}` are filled in by the components.

// Brevo hosted-form endpoints, one per digest language (Brevo → Marketing →
// Forms → Share, the form link = its `action`). Public by design: they only
// accept a sign-up and send the double opt-in email. zh → Brevo list #3
// (水利大模型文献日报), confirmation template #5; en → list #4 (HydroAgent
// Paper Digest), template #6. An empty value makes the form say
// subscriptions open soon.
export const paperDigestEndpoints = {
  zh: "https://6727a847.sibforms.com/serve/MUIFAJUe0iNgGSBV84IAdcAD_TlMjmSn1k0y4TGvx6Il9YECjzk8GQ88MhCMK6Kt8XLhQ_vTqthA6FSqIJCfRdJ6vIeGjzxgHUmPFcFLawFJKu6BvnDKr2v1DgCo8Jn5A9W57m7OneQsPQdnakEO1mQ-cQJPjGrYTeGREEahSHcj2DaC8raQcdBYxEMKm0ELBH8nOMl5bucM5Wiw-Q==",
  en: "https://6727a847.sibforms.com/serve/MUIFAGW_a8y7khVuB3Aryz5QoKItcLnqB2fy8wGzgpwG6SCAMXo8rc39_ozR_q-dfFKG5PlSAUtwYp47cCDvRr02TzOxRBftSRgtUVk4v2opfztfMv0tsEQNSByuB84YmVXrmC7Pi0-1wwtURmcP4rJbirKwYsLRgRoaL4QPH8GdeY842GcvwfdIca05p1fp5TLjV60bAmAUvYnl5A=="
};

export const paperDigestContent = {
  en: {
    meta: {
      // The tab title, and the title a shared link shows (og:title).
      title: "Paper Digest | HydroAgent-Lab",
      shareTitle: "HydroAgent Paper Digest — LLM × Hydrology",
      // One copy of the text: the hero's lede, the page description and the
      // RSS channel description.
      description:
        "New papers on large language models in hydrology and water resources, screened and summarized by AI, with a free daily email digest."
    },
    lead: {
      eyebrow: "HydroAgent Paper Digest",
      // Rendered as before + accent (blue, upright) + after.
      title: { before: "Research intelligence for ", accent: "LLM × Hydrology", after: "" },
      explore: "Explore latest papers",
      subscribe: "Subscribe to Digest",
      edition: "Latest edition",
      // 07:00 is when the email goes out (it arrives 07:00-07:20). The page
      // itself is rebuilt later in the day, so it claims no clock time.
      // \u00A0 is a no-break space: "(Rome time)" never splits across lines.
      facts: [
        { label: "Email digest", value: "Daily at 07:00 (Rome\u00A0time)" },
        { label: "Papers so far", value: "{count}" }
      ]
    },
    form: {
      languageLabel: "Digest language",
      languages: { zh: "中文", en: "English" },
      label: "Email address",
      placeholder: "name@example.com",
      submit: "Subscribe",
      submitting: "Subscribing…",
      note: "One free email a day. Unsubscribe at any time.",
      invalid: "Please enter a valid email address.",
      soon: "Subscriptions open soon. Thank you for your interest.",
      done: "Almost there: check your inbox (and spam folder) for a confirmation email, and click the link in it to start receiving Paper Digest.",
      error: "Something went wrong. Please try again later."
    },
    privacy: {
      summary: "How we use your email address",
      items: [
        "We collect only your email address and the digest language you choose.",
        "We use them only to send Paper Digest.",
        "The list is kept by Brevo, an email service that stores data in the EU.",
        "Every email has an unsubscribe link, so you can leave at any time.",
        "Questions: contact@hydroagentlab.com"
      ]
    },
    subscribeBand: {
      title: "New LLM papers in hydrology and water resources, every day."
    },
    subscribed: "Subscription confirmed. Paper Digest will arrive every day at 07:00 (Rome time).",
    feed: {
      title: "Latest papers",
      intro: "Newest first, grouped by when each paper was added",
      aiNote: "AI summaries are generated from each paper’s title and abstract only.",
      searchLabel: "Search papers",
      searchPlaceholder: "Search papers…",
      // The Time and edition panel. Its button lists every setting in force,
      // joined by " · "; savedOnlyShort is the button's word for Saved only.
      timeLabel: "Time and edition",
      granularityLabel: "Group by",
      granularities: { day: "Daily", week: "Weekly", month: "Monthly" },
      editionLabel: "Edition",
      allEditions: "All editions",
      filterLabel: "Paper type",
      filters: { all: "All", published: "Published", preprint: "Preprint" },
      savedOnly: "Saved only",
      savedOnlyShort: "Saved",
      done: "Done",
      results: { one: "1 paper found", other: "{n} papers found" },
      // A group's size, the panel's count and the latest edition in the hero.
      count: { one: "1 paper", other: "{n} papers" },
      unavailable: "This paper is no longer available in the public digest.",
      empty: "No papers match these filters.",
      emptySaved: "You haven’t saved any papers yet.",
      clearFilters: "Clear all filters",
      more: "Show earlier papers",
      less: "Hide all earlier papers",
      addedOn: "Added {date}",
      savedOn: "Saved {date}",
      // The two icon buttons on each paper. Save keeps its name when pressed
      // (a saved paper's bookmark is aria-pressed); Copy link says "copied"
      // for a moment once the link is on the clipboard.
      save: "Save",
      share: "Copy link",
      copied: "Link copied",
      badges: { published: "Published", preprint: "Preprint" },
      moreAuthors: " et al.",
      details: { summary: "AI summary and evidence limits", details: "Summary", limitations: "Limits of the evidence" },
      noAbstract: "No abstract available; no AI summary was generated.",
      newTab: "(opens in a new tab)",
      footnote: "AI summaries may contain errors, so please check the original papers. Preprints have not been peer-reviewed.",
      rss: "RSS feed",
      // Highlights: the week's AI-selected papers above the list.
      // more / less: the card's button under Why it matters, shown when the
      // text runs past its two lines.
      highlights: { title: "Highlights", note: "AI-selected", why: "Why it matters", view: "View AI summary", more: "Show more", less: "Show less" },
      // Filters: the Domain and Method panel. prefix is read before a paper's
      // topics by screen readers, not shown.
      topics: { label: "Filters", domain: "Domain", method: "Method", allDomains: "All domains", allMethods: "All methods", prefix: "Topics: " },
      // Display names for the collector's Domain and Method IDs
      // (DESIGN_SUMMARY §2.3, in sentence case).
      taxonomy: {
        domains: {
          catchment_hydrology: "Catchment hydrology",
          floods: "Floods",
          water_resources_reservoirs: "Water resources & reservoirs",
          urban_water: "Urban water",
          water_quality_ecology: "Water quality & ecology",
          groundwater: "Groundwater"
        },
        methods: {
          prompting: "Prompting",
          rag_knowledge_graphs: "RAG & knowledge graphs",
          fine_tuning_domain_models: "Fine-tuning & domain models",
          agents_tool_use: "Agents & tool use",
          multi_agent: "Multi-agent",
          multimodal: "Multimodal",
          benchmarks: "Benchmarks"
        }
      }
    },
    // Saved papers: kept in this browser only (localStorage), shown at #saved.
    saved: {
      link: "Saved papers",
      linkCount: "Saved papers ({n})",
      back: "Back to latest papers",
      title: "Saved papers",
      count: { one: "1 saved paper", other: "{n} saved papers" },
      localNote: "Saved in this browser only.",
      howTitle: "How saving works",
      howText:
        "Saved papers stay in this browser on this device. They do not sync to other devices or browsers, and clearing this site’s data deletes them. Export a backup to keep a copy or to move them to another browser.",
      export: "Export backup",
      import: "Import backup",
      // An import's result, joined by " · ". "added" always shows; the other
      // two are left out when they are zero.
      imported: {
        added: { one: "Added 1 paper", other: "Added {n} papers" },
        duplicates: { one: "1 was already saved", other: "{n} were already saved" },
        invalid: { one: "1 invalid entry skipped", other: "{n} invalid entries skipped" }
      },
      importErrors: {
        json: "This file is not valid JSON.",
        schema: "This file is not a Paper Digest backup.",
        version: "This backup uses a format version this page cannot read.",
        size: "This file is larger than 1 MB."
      },
      missing: "No longer in the public digest",
      emptyTitle: "No saved papers yet",
      // {icon}: the bookmark itself, drawn in the sentence.
      emptyText: "Use the bookmark {icon} on any paper to keep it here.",
      emptyAction: "Browse latest papers",
      toast: {
        copyFailed: "Couldn’t copy the link automatically; it is now in the address bar.",
        saveFailed: "Couldn’t save in this browser. Storage may be full or turned off."
      }
    }
  },
  zh: {
    meta: {
      title: "水利大模型文献日报 | HydroAgent-Lab",
      shareTitle: "水利大模型文献日报 — LLM × 水文学",
      description: "水利 × 大模型领域的新文献：每天由 AI 筛选、生成摘要，通过邮件推送给订阅者。"
    },
    lead: {
      eyebrow: "水利大模型文献日报",
      title: { before: "面向 ", accent: "LLM × 水文学", after: " 的研究情报" },
      explore: "浏览最新文献",
      subscribe: "订阅文献日报",
      edition: "最新一期",
      facts: [
        { label: "邮件推送", value: "每天 07:00（意大利时间）" },
        { label: "已收录", value: "{count} 篇" }
      ]
    },
    form: {
      languageLabel: "邮件语言",
      languages: { zh: "中文", en: "English" },
      label: "邮箱地址",
      placeholder: "name@example.com",
      submit: "订阅",
      submitting: "提交中…",
      note: "每日一封免费邮件，随时可退订。",
      invalid: "请输入有效的邮箱地址。",
      soon: "订阅功能即将开放，感谢关注。",
      done: "还差一步：请查收确认邮件（也可能在垃圾邮件里），点击其中的链接即可开始接收文献日报。",
      error: "提交失败，请稍后再试。"
    },
    privacy: {
      summary: "我们如何处理你的邮箱",
      items: [
        "我们只收集你的邮箱地址和你选择的邮件语言。",
        "仅用于发送文献日报。",
        "名单由邮件服务商 Brevo 保存，数据存放在欧盟。",
        "每封邮件底部都有退订链接，随时可以退订。",
        "如有疑问，请联系 contact@hydroagentlab.com"
      ]
    },
    subscribeBand: {
      title: "水利 × 大模型的新文献，每天送到你的邮箱。"
    },
    subscribed: "订阅成功！文献日报将在每天 07:00（意大利时间）送到你的邮箱。",
    feed: {
      title: "最新文献",
      intro: "按收录时间倒序分组排列",
      aiNote: "AI 解读仅依据每篇文献的标题和摘要生成。",
      searchLabel: "搜索文献",
      searchPlaceholder: "搜索文献…",
      timeLabel: "时间与期次",
      granularityLabel: "分组方式",
      granularities: { day: "每日", week: "每周", month: "每月" },
      editionLabel: "期次",
      allEditions: "全部期次",
      filterLabel: "文献类型",
      filters: { all: "全部", published: "已发表", preprint: "预印本" },
      savedOnly: "仅显示收藏",
      savedOnlyShort: "仅收藏",
      done: "完成",
      results: { one: "找到 1 篇", other: "找到 {n} 篇" },
      count: { one: "1 篇", other: "{n} 篇" },
      unavailable: "这篇文献已不在公开文献库中。",
      empty: "没有找到匹配的文献。",
      emptySaved: "你还没有收藏文献。",
      clearFilters: "清除全部筛选",
      more: "显示更早的文献",
      less: "收起全部更早的文献",
      addedOn: "{date}收录",
      savedOn: "{date}收藏",
      save: "收藏",
      share: "复制链接",
      copied: "链接已复制",
      badges: { published: "已发表", preprint: "预印本" },
      moreAuthors: " 等 {n} 人",
      details: { summary: "AI 解读与证据局限", details: "内容摘要", limitations: "证据局限" },
      noAbstract: "暂无摘要，未生成 AI 解读。",
      newTab: "（在新标签页打开）",
      footnote: "AI 解读可能有误，请以原文为准。预印本尚未经过同行评审。",
      rss: "RSS 订阅",
      highlights: { title: "精选文献", note: "AI 精选", why: "推荐理由", view: "查看 AI 解读", more: "展开", less: "收起" },
      topics: { label: "筛选", domain: "研究领域", method: "AI 方法", allDomains: "全部领域", allMethods: "全部方法", prefix: "分类：" },
      taxonomy: {
        domains: {
          catchment_hydrology: "流域水文",
          floods: "洪涝",
          water_resources_reservoirs: "水资源与水库",
          urban_water: "城市水务",
          water_quality_ecology: "水质与水生态",
          groundwater: "地下水"
        },
        methods: {
          prompting: "提示工程",
          rag_knowledge_graphs: "检索增强与知识图谱",
          fine_tuning_domain_models: "微调与领域模型",
          agents_tool_use: "智能体与工具调用",
          multi_agent: "多智能体",
          multimodal: "多模态",
          benchmarks: "评测与基准"
        }
      }
    },
    saved: {
      link: "我的收藏",
      linkCount: "我的收藏（{n}）",
      back: "返回最新文献",
      title: "我的收藏",
      count: { one: "已收藏 1 篇", other: "已收藏 {n} 篇" },
      localNote: "收藏只保存在这个浏览器里。",
      howTitle: "收藏是怎么保存的",
      howText:
        "收藏只存在这台设备的这个浏览器里，不会同步到其他设备或浏览器；清除本网站的数据会把收藏一起删除。导出备份可以留一份副本，也可以把收藏搬到另一个浏览器。",
      export: "导出备份",
      import: "导入备份",
      imported: {
        added: { one: "新增 {n} 篇", other: "新增 {n} 篇" },
        duplicates: { one: "{n} 篇已在收藏中", other: "{n} 篇已在收藏中" },
        invalid: { one: "跳过 {n} 条无效记录", other: "跳过 {n} 条无效记录" }
      },
      importErrors: {
        json: "这个文件不是有效的 JSON。",
        schema: "这个文件不是文献日报的收藏备份。",
        version: "这个备份的格式版本无法识别。",
        size: "文件超过 1 MB。"
      },
      missing: "已不在公开文献库中",
      emptyTitle: "还没有收藏",
      emptyText: "点任意文献上的书签图标{icon}，就能把它收藏到这里。",
      emptyAction: "浏览最新文献",
      toast: {
        copyFailed: "无法自动复制，链接已放在地址栏中。",
        saveFailed: "无法在此浏览器中保存，可能是存储空间已满或已被禁用。"
      }
    }
  }
};
