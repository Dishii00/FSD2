import { PLATFORMS } from '../data/platforms';

// Helper regexes
const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const HASHTAG_REGEX = /#[a-zA-Z0-9_]+/g;
const MENTION_REGEX = /@[a-zA-Z0-9_]+/g;

/**
 * Calculates weighted character length according to platform specific rules.
 * E.g., for Twitter, any URL counts as 23 characters regardless of length.
 */
export function calculateWeightedCharCount(text, platformId, isPremium = false) {
  if (!text) return 0;
  
  const platform = PLATFORMS[platformId];
  if (!platform) return text.length;

  // Twitter/X URL weight handling
  if (platformId === 'twitter') {
    const urls = text.match(URL_REGEX) || [];
    let textWithoutUrls = text.replace(URL_REGEX, '');
    const urlCost = urls.length * (platform.urlLengthCost || 23);
    return textWithoutUrls.length + urlCost;
  }

  return text.length;
}

/**
 * Extracts hashtags, URLs, mentions, line breaks and basic metrics
 */
export function extractContentMetrics(text) {
  if (!text) {
    return {
      rawLength: 0,
      wordCount: 0,
      lineBreaks: 0,
      hashtags: [],
      urls: [],
      mentions: [],
    };
  }

  const urls = text.match(URL_REGEX) || [];
  const hashtags = text.match(HASHTAG_REGEX) || [];
  const mentions = text.match(MENTION_REGEX) || [];
  const words = text.trim().split(/\s+/).filter(Boolean);
  const lineBreaks = (text.match(/\n/g) || []).length;

  return {
    rawLength: text.length,
    wordCount: words.length,
    lineBreaks,
    hashtags,
    urls,
    mentions,
  };
}

/**
 * Validates post content and media for a specific platform
 */
export function validatePlatformPost({ text, media = [], platformId, isPremiumTwitter = false }) {
  const platform = PLATFORMS[platformId];
  if (!platform) return null;

  const metrics = extractContentMetrics(text);
  const maxLimit = (platformId === 'twitter' && isPremiumTwitter) 
    ? platform.premiumMaxChars 
    : platform.maxChars;

  const weightedLength = calculateWeightedCharCount(text, platformId, isPremiumTwitter);
  const charsRemaining = maxLimit - weightedLength;
  const charPercentUsed = Math.min(100, Math.round((weightedLength / maxLimit) * 100));

  const issues = [];
  let errorCount = 0;
  let warningCount = 0;

  // 1. Character Limit Validation
  let charValidation = { status: 'pass', message: `${charsRemaining} chars left` };
  if (weightedLength > maxLimit) {
    charValidation = {
      status: 'error',
      message: `Exceeds limit by ${weightedLength - maxLimit} character${weightedLength - maxLimit > 1 ? 's' : ''}`,
    };
    issues.push({
      type: 'error',
      code: 'CHAR_LIMIT_EXCEEDED',
      title: 'Character Limit Exceeded',
      message: `Content is ${weightedLength} chars. ${platform.name} allows up to ${maxLimit.toLocaleString()} characters.`,
    });
    errorCount++;
  } else if (weightedLength >= maxLimit * 0.9) {
    charValidation = {
      status: 'warning',
      message: `Approaching limit (${charsRemaining} chars left)`,
    };
    issues.push({
      type: 'warning',
      code: 'CHAR_LIMIT_NEAR',
      title: 'Near Character Limit',
      message: `You are at ${charPercentUsed}% of ${platform.name}'s character capacity.`,
    });
    warningCount++;
  }

  // 2. Media Constraint Validation
  const imageCount = media.filter(m => m.type === 'image').length;
  const videoCount = media.filter(m => m.type === 'video').length;
  const totalMedia = media.length;

  if (platform.requiresMedia && totalMedia === 0) {
    issues.push({
      type: 'error',
      code: 'MEDIA_REQUIRED',
      title: 'Media Required',
      message: `${platform.name} requires at least 1 image or video to publish.`,
    });
    errorCount++;
  }

  if (totalMedia > 0) {
    if (imageCount > platform.maxImages) {
      issues.push({
        type: 'error',
        code: 'TOO_MANY_IMAGES',
        title: 'Too Many Images',
        message: `Attached ${imageCount} images. ${platform.name} allows max ${platform.maxImages} images.`,
      });
      errorCount++;
    }

    if (videoCount > platform.maxVideos) {
      issues.push({
        type: 'error',
        code: 'TOO_MANY_VIDEOS',
        title: 'Too Many Videos',
        message: `Attached ${videoCount} videos. ${platform.name} allows max ${platform.maxVideos} video.`,
      });
      errorCount++;
    }

    if (platform.mediaRule === 'mix_disallowed' && imageCount > 0 && videoCount > 0) {
      issues.push({
        type: 'error',
        code: 'MIXED_MEDIA_DISALLOWED',
        title: 'Incompatible Media Mix',
        message: `${platform.name} does not support mixing images and videos in a single post.`,
      });
      errorCount++;
    }

    if (platform.mediaRule === 'images_or_video' && imageCount > 0 && videoCount > 0) {
      issues.push({
        type: 'error',
        code: 'MIXED_MEDIA_DISALLOWED',
        title: 'Image/Video Conflict',
        message: `${platform.name} allows photos OR a video, not both simultaneously.`,
      });
      errorCount++;
    }
  }

  // 3. Hashtag Validation
  if (metrics.hashtags.length > platform.maxHashtags) {
    issues.push({
      type: 'error',
      code: 'HASHTAG_LIMIT_EXCEEDED',
      title: 'Too Many Hashtags',
      message: `Used ${metrics.hashtags.length} hashtags. ${platform.name} maximum is ${platform.maxHashtags}.`,
    });
    errorCount++;
  } else if (platform.recommendedHashtags && metrics.hashtags.length === 0 && text.length > 50) {
    issues.push({
      type: 'warning',
      code: 'NO_HASHTAGS',
      title: 'Hashtag Recommendation',
      message: `Adding ${platform.recommendedHashtags} hashtags can boost discoverability on ${platform.name}.`,
    });
    warningCount++;
  }

  // 4. Link & Formatting Warnings
  if (metrics.urls.length > 0 && platform.urlLengthCost === null) {
    issues.push({
      type: 'warning',
      code: 'UNCLICKABLE_LINK',
      title: 'Unclickable Caption Links',
      message: `${platform.name} caption links are non-clickable. Consider adding the link to bio or first comment.`,
    });
    warningCount++;
  }

  // 5. Fold Cutoff Indicator ("See more" fold check)
  const isFolded = platform.foldCutoff && weightedLength > platform.foldCutoff;
  if (isFolded) {
    issues.push({
      type: 'info',
      code: 'FOLD_CUTOFF',
      title: '"...See More" Truncation',
      message: `Post will truncate after ${platform.foldCutoff} characters on feed. Make sure your hook is in the first ${platform.foldCutoff} chars.`,
    });
  }

  // Calculate overall platform status
  let overallStatus = 'valid';
  if (errorCount > 0) overallStatus = 'error';
  else if (warningCount > 0) overallStatus = 'warning';

  return {
    platformId,
    platformName: platform.name,
    overallStatus,
    maxLimit,
    weightedLength,
    charsRemaining,
    charPercentUsed,
    charValidation,
    metrics,
    mediaStats: {
      imageCount,
      videoCount,
      totalMedia,
    },
    issues,
    errorCount,
    warningCount,
    isFolded,
  };
}

/**
 * Validates content against all selected platforms and returns aggregate results
 */
export function validateAllPlatforms({ text, selectedPlatforms, platformOverrides = {}, media = [], isPremiumTwitter = false }) {
  const results = {};
  let globalHasError = false;
  let globalHasWarning = false;
  let totalErrors = 0;
  let totalWarnings = 0;

  selectedPlatforms.forEach((platformId) => {
    const contentToValidate = platformOverrides[platformId] !== undefined 
      ? platformOverrides[platformId] 
      : text;

    const validation = validatePlatformPost({
      text: contentToValidate,
      media,
      platformId,
      isPremiumTwitter,
    });

    if (validation) {
      results[platformId] = validation;
      if (validation.overallStatus === 'error') globalHasError = true;
      if (validation.overallStatus === 'warning') globalHasWarning = true;
      totalErrors += validation.errorCount;
      totalWarnings += validation.warningCount;
    }
  });

  return {
    platformResults: results,
    canPublish: !globalHasError && selectedPlatforms.length > 0,
    hasWarning: globalHasWarning,
    totalErrors,
    totalWarnings,
  };
}
