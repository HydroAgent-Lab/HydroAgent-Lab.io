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
      intro: "Newest first, grouped by the week they were added",
      aiNote: "AI summaries are generated from each paper’s title and abstract only.",
      filterLabel: "Paper type",
      filters: { all: "All", published: "Published", preprint: "Preprint" },
      searchLabel: "Search papers",
      searchPlaceholder: "Search papers…",
      results: { one: "1 paper found", other: "{n} papers found" },
      weekCount: { one: "1 paper", other: "{n} papers" },
      unavailable: "This paper is no longer available in the public digest.",
      empty: "No papers match. Try another word or show all types.",
      more: "Show earlier papers",
      addedOn: "Added {date}",
      badges: { published: "Published", preprint: "Preprint" },
      moreAuthors: " et al.",
      details: { summary: "AI summary and evidence limits", details: "Summary", limitations: "Limits of the evidence" },
      noAbstract: "No abstract available; no AI summary was generated.",
      newTab: "(opens in a new tab)",
      footnote: "AI summaries may contain errors, so please check the original papers. Preprints have not been peer-reviewed.",
      rss: "RSS feed"
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
      intro: "按收录时间倒序，按周分组",
      aiNote: "AI 解读仅依据每篇文献的标题和摘要生成。",
      filterLabel: "文献类型",
      filters: { all: "全部", published: "已发表", preprint: "预印本" },
      searchLabel: "搜索文献",
      searchPlaceholder: "搜索文献…",
      results: { one: "找到 1 篇", other: "找到 {n} 篇" },
      weekCount: { one: "1 篇", other: "{n} 篇" },
      unavailable: "这篇文献已不在公开文献库中。",
      empty: "没有找到匹配的文献，换个关键词或查看全部类型试试。",
      more: "显示更早的文献",
      addedOn: "{date}收录",
      badges: { published: "已发表", preprint: "预印本" },
      moreAuthors: " 等 {n} 人",
      details: { summary: "AI 解读与证据局限", details: "内容摘要", limitations: "证据局限" },
      noAbstract: "暂无摘要，未生成 AI 解读。",
      newTab: "（在新标签页打开）",
      footnote: "AI 解读可能有误，请以原文为准。预印本尚未经过同行评审。",
      rss: "RSS 订阅"
    }
  }
};
