#!/bin/bash
# Generates all 20 blog cover images via Kie.ai API.
# Requires: KIE_API_KEY set in /Rah/.env and `pip install requests` done.
# Usage: bash scripts/generate_all_blog_images.sh
# Images save to: public/blogs/<slug>.jpg

SCRIPTS_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPTS_DIR")"
PROMPTS_DIR="$ROOT_DIR/prompts/blogs"
OUTPUT_DIR="$ROOT_DIR/public/blogs"

declare -A SLUG_MAP
SLUG_MAP["001-the-right-way-to-start-a-business"]="the-right-way-to-start-a-business"
SLUG_MAP["002-why-websites-fail"]="why-websites-fail"
SLUG_MAP["003-local-seo-is-not-optional"]="local-seo-is-not-optional"
SLUG_MAP["004-what-drives-business-growth-online"]="what-drives-business-growth-online"
SLUG_MAP["005-website-design-cost-scottsdale"]="how-much-does-website-design-cost-scottsdale"
SLUG_MAP["006-rank-google-maps-phoenix"]="how-to-rank-on-google-maps-phoenix"
SLUG_MAP["007-best-seo-strategies-arizona"]="best-seo-strategies-small-business-arizona"
SLUG_MAP["008-google-business-profile-not-ranking"]="why-google-business-profile-not-ranking"
SLUG_MAP["009-website-vs-landing-page"]="website-vs-landing-page-lead-generation"
SLUG_MAP["010-get-more-reviews-arizona"]="how-to-get-more-reviews-for-your-business"
SLUG_MAP["011-what-is-local-seo"]="what-is-local-seo-and-why-it-matters"
SLUG_MAP["012-build-business-credit-arizona"]="how-to-build-business-credit-from-scratch"
SLUG_MAP["013-digital-marketing-contractors-arizona"]="digital-marketing-for-contractors-arizona"
SLUG_MAP["014-choose-website-design-company-scottsdale"]="how-to-choose-website-design-company-scottsdale"
SLUG_MAP["015-seo-cost-small-business-scottsdale"]="how-much-does-seo-cost-small-business-scottsdale"
SLUG_MAP["016-website-design-vs-seo-scottsdale"]="website-design-vs-seo-scottsdale-businesses"
SLUG_MAP["017-why-phoenix-businesses-struggle-to-rank"]="why-phoenix-businesses-struggle-to-rank-on-google"
SLUG_MAP["018-improve-google-business-profile-scottsdale"]="how-to-improve-google-business-profile-scottsdale"
SLUG_MAP["019-best-website-features-local-service-businesses"]="best-website-features-local-service-businesses-arizona"
SLUG_MAP["020-how-long-does-seo-take-scottsdale"]="how-long-does-seo-take-scottsdale-business"

mkdir -p "$OUTPUT_DIR"

SUCCESS=0
FAIL=0

for PROMPT_KEY in "${!SLUG_MAP[@]}"; do
  PROMPT_FILE="$PROMPTS_DIR/${PROMPT_KEY}.json"
  OUTPUT_SLUG="${SLUG_MAP[$PROMPT_KEY]}"
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
