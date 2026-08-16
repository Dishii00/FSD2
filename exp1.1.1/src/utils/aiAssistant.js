/**
 * AI Content Assistant Utilities
 */

// Common hashtag packs per category
const HASHTAG_BANKS = {
  tech: ['#Tech', '#SoftwareEngineering', '#Innovation', '#SaaS', '#Coding', '#AI', '#WebDev', '#ReactJS', '#Frontend'],
  marketing: ['#MarketingStrategy', '#SocialMediaMarketing', '#ContentCreation', '#GrowthHacking', '#Branding', '#DigitalMarketing'],
  business: ['#BusinessGrowth', '#Entrepreneurship', '#Startup', '#Productivity', '#Leadership', '#Success'],
  design: ['#UIUX', '#DesignSystem', '#WebDesign', '#UserExperience', '#GraphicDesign', '#Creative'],
};

/**
 * Calculates Flesch Reading Ease score
 */
export function calculateReadability(text) {
  if (!text || text.trim().length === 0) {
    return { score: 100, label: 'N/A', grade: 'Easy' };
  }

  const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
  const words = text.trim().split(/\s+/).filter(Boolean).length || 1;
  
  // Estimate syllables
  const vowels = text.match(/[aeiouy]{1,2}/gi) || [];
  const syllables = Math.max(words, vowels.length);

  // Flesch formula: 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
  let score = Math.round(206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words));
  score = Math.max(0, Math.min(100, score));

  let label = 'Fairly Easy';
  let grade = 'Standard';
  if (score >= 80) { label = 'Very Easy'; grade = 'Conversational'; }
  else if (score >= 60) { label = 'Easy to Read'; grade = 'Standard'; }
  else if (score >= 40) { label = 'Fairly Difficult'; grade = 'Professional'; }
  else { label = 'Complex'; grade = 'Academic'; }

  return { score, label, grade, words, sentences };
}

/**
 * Truncates text intelligently to a target length without cutting words in half
 */
export function shortenText(text, targetLength = 280) {
  if (!text || text.length <= targetLength) return text;
  
  // Cut at space
  let cut = text.substring(0, targetLength - 4);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > 0) {
    cut = cut.substring(0, lastSpace);
  }
  return cut.trim() + '...';
}

/**
 * Simulates AI Tone adjustment (Professional, Casual, Hype, Concise)
 */
export function rewriteTone(text, tone) {
  if (!text) return '';

  const cleanText = text.trim();

  switch (tone) {
    case 'professional': {
      let result = cleanText
        .replace(/hey guys|yo|sup/gi, 'Greetings network,')
        .replace(/super cool|awesome|insane/gi, 'highly impactful')
        .replace(/check it out/gi, 'Explore the insights below')
        .replace(/🚀|🔥|💯/g, '');
      if (!result.toLowerCase().startsWith('greetings') && !result.toLowerCase().startsWith('i am pleased')) {
        result = `Brief Update: ${result}`;
      }
      return result;
    }
    case 'casual': {
      return `Hey everyone! 👋 ${cleanText.replace(/Brief Update:|Greetings network,/gi, '')} What do you think? Drop your thoughts below! 👇`;
    }
    case 'hype': {
      return `🔥 BIG ANNOUNCEMENT ALERT! 🔥\n\n${cleanText.toUpperCase()}\n\n🚀 Don't miss out on this game-changer! Click the link below! 💯✨`;
    }
    case 'concise': {
      return shortenText(cleanText, 250);
    }
    default:
      return cleanText;
  }
}

/**
 * Auto-suggests hashtags based on content keywords
 */
export function suggestHashtags(text) {
  if (!text) return ['#Tech', '#Innovation', '#Growth'];

  const lower = text.toLowerCase();
  const matched = new Set();

  if (lower.includes('code') || lower.includes('dev') || lower.includes('react') || lower.includes('software') || lower.includes('tech')) {
    HASHTAG_BANKS.tech.forEach(h => matched.add(h));
  }
  if (lower.includes('market') || lower.includes('launch') || lower.includes('brand') || lower.includes('social')) {
    HASHTAG_BANKS.marketing.forEach(h => matched.add(h));
  }
  if (lower.includes('lead') || lower.includes('team') || lower.includes('business') || lower.includes('growth')) {
    HASHTAG_BANKS.business.forEach(h => matched.add(h));
  }
  if (lower.includes('design') || lower.includes('ui') || lower.includes('ux') || lower.includes('visual')) {
    HASHTAG_BANKS.design.forEach(h => matched.add(h));
  }

  if (matched.size === 0) {
    return ['#Trending', '#ContentCreator', '#SocialMedia', '#Innovation', '#Updates'];
  }

  return Array.from(matched).slice(0, 10);
}
