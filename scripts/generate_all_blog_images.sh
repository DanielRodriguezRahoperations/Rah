#!/bin/bash
# Generates all 20 blog cover images via Kie.ai API.
# Usage: bash scripts/generate_all_blog_images.sh

SCRIPTS_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPTS_DIR")"
PROMPTS_DIR="$ROOT_DIR/prompts/blogs"
OUTPUT_DIR="$ROOT_DIR/public/blogs"

mkdir -p "$OUTPUT_DIR"

# Format: "prompt-filename-without-extension|output-slug"
PAIRS=(
  "001-the-right-way-to-start-a-business|the-right-way-to-start-a-business"
  "002-why-websites-fail|why-websites-fail"
  "003-local-seo-is-not-optional|local-seo-is-not-optional"
  "004-what-drives-business-growth-online|what-drives-business-growth-online"
  "005-website-design-cost-scottsdale|how-much-does-website-design-cost-scottsdale"
  "006-rank-google-maps-phoenix|how-to-rank-on-google-maps-phoenix"
  "007-best-seo-strategies-arizona|best-seo-strategies-small-business-arizona"
  "008-google-business-profile-not-ranking|why-google-business-profile-not-ranking"
  "009-website-vs-landing-page|website-vs-landing-page-lead-generation"
  "010-get-more-reviews-arizona|how-to-get-more-reviews-for-your-business"
  "011-what-is-local-seo|what-is-local-seo-and-why-it-matters"
  "012-build-business-credit-arizona|how-to-build-business-credit-from-scratch"
  "013-digital-marketing-contractors-arizona|digital-marketing-for-contractors-arizona"
  "014-choose-website-design-company-scottsdale|how-to-choose-website-design-company-scottsdale"
  "015-seo-cost-small-business-scottsdale|how-much-does-seo-cost-small-business-scottsdale"
  "016-website-design-vs-seo-scottsdale|website-design-vs-seo-scottsdale-businesses"
  "017-why-phoenix-businesses-struggle-to-rank|why-phoenix-businesses-struggle-to-rank-on-google"
  "018-improve-google-business-profile-scottsdale|how-to-improve-google-business-profile-scottsdale"
  "019-best-website-features-local-service-businesses|best-website-features-local-service-businesses-arizona"
  "020-how-long-does-seo-take-scottsdale|how-long-does-seo-take-scottsdale-business"
)

SUCCESS=0
FAIL=0

for PAIR in "${PAIRS[@]}"; do
  PROMPT_KEY="${PAIR%%|*}"
  OUTPUT_SLUG="${PAIR##*|}"

  PROMPT_FILE="$PROMPTS_DIR/${PROMPT_KEY}.json"
  OUTPUT_FILE="$OUTPUT_DIR/${OUTPUT_SLUG}.jpg"

  if [ -f "$OUTPUT_FILE" ]; then
    echo "SKIP: $OUTPUT_SLUG.jpg already exists"
    continue
  fi

  if [ ! -f "$PROMPT_FILE" ]; then
    echo "MISSING PROMPT: $PROMPT_FILE"
    continue
  fi

  echo ""
  echo "Generating: $OUTPUT_SLUG"
  python3 "$SCRIPTS_DIR/generate_kie.py" "$PROMPT_FILE" "$OUTPUT_FILE" "16:9"

  if [ $? -eq 0 ]; then
    echo "OK: $OUTPUT_SLUG.jpg"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "FAILED: $OUTPUT_SLUG"
    FAIL=$((FAIL + 1))
  fi
done

echo ""
echo "Done — $SUCCESS generated, $FAIL failed."
