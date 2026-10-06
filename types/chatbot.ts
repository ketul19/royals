export interface ChatRule {
  /** Lowercase tokens to match against user input (case-insensitive) */
  keywords: string[];
  /** The response string to show when any keyword matches */
  response: string;
}

export interface ChatbotConfig {
  welcomeMessage: string;
  /** Shown when no keyword rule matches — should nudge user toward WhatsApp */
  fallbackResponse: string;
  /** Quick-reply chip buttons shown at the start of the conversation */
  quickReplies: string[];
  rules: ChatRule[];
}

