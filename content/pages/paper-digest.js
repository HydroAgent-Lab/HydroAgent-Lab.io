// Paper Digest — daily email digest of new AI / large-model papers, extracted
// and summarized by AI. The page is a placeholder for the sign-up only: the
// subscription backend is deployed separately (see `sendSubscription` in
// components/subscribe-form.js). Facts below state only what the service does;
// add schedule, sources or sample issues once the team provides them.
export const paperDigestContent = {
  en: {
    lead: {
      eyebrow: "Paper Digest",
      title: "The latest papers on AI and large language models, summarized in your inbox every day.",
      text:
        "Paper Digest collects newly published papers on AI and large language models, uses AI to extract and summarize their key points, and emails the digest to subscribers every day. Enter your email address to subscribe.",
      facts: [
        { label: "Coverage", value: "New AI and LLM papers" },
        { label: "Summaries", value: "Extracted by AI" },
        { label: "Delivery", value: "Daily, by email" }
      ]
    },
    form: {
      label: "Email address",
      placeholder: "name@example.com",
      submit: "Subscribe",
      submitting: "Subscribing…",
      note: "We use your email address only to send Paper Digest.",
      invalid: "Please enter a valid email address.",
      soon: "Subscriptions open soon. Thank you for your interest.",
      done: "Thank you. You are now subscribed to Paper Digest.",
      error: "Something went wrong. Please try again later."
    }
  },
  zh: {
    lead: {
      eyebrow: "Paper Digest",
      title: "最新 AI 大模型论文，每天送到你的邮箱。",
      text:
        "Paper Digest 每天抓取最新发布的 AI 大模型论文，由 AI 自动提取要点、生成摘要，再通过邮件推送给订阅者。填写邮箱即可订阅。",
      facts: [
        { label: "内容", value: "最新 AI 大模型论文" },
        { label: "处理", value: "AI 提取与总结" },
        { label: "推送", value: "每日邮件" }
      ]
    },
    form: {
      label: "邮箱地址",
      placeholder: "name@example.com",
      submit: "订阅",
      submitting: "提交中…",
      note: "我们只会用这个邮箱发送 Paper Digest。",
      invalid: "请输入有效的邮箱地址。",
      soon: "订阅功能即将开放，感谢关注。",
      done: "订阅成功，感谢关注 Paper Digest。",
      error: "提交失败，请稍后再试。"
    }
  }
};
