import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const title    = searchParams.get('title')    ?? 'RAH Operations';
  const category = searchParams.get('category') ?? '';
  const imageUrl = searchParams.get('imageUrl') ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: 1024,
          height: 1024,
          position: 'relative',
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {/* Background photo */}
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt=""
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        {/* Dark lower-third panel — bottom 28% */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '28%',
            backgroundColor: 'rgba(10,10,10,0.88)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Crimson accent line */}
          <div
            style={{
              width: '100%',
              height: 4,
              backgroundColor: '#8B1E1E',
              flexShrink: 0,
            }}
          />

          {/* Text content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              flex: 1,
              padding: '0 40px 36px 40px',
              gap: 10,
            }}
          >
            {/* Headline */}
            <div
              style={{
                color: '#FFFFFF',
                fontSize: 46,
                fontWeight: 700,
                lineHeight: 1.25,
              }}
            >
              {title}
            </div>

            {/* Category + RAH. row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  color: '#8B1E1E',
                  fontSize: 20,
                  fontWeight: 400,
                  letterSpacing: 3,
                }}
              >
                {category.toUpperCase()}
              </div>
              <div
                style={{
                  color: '#C8B99A',
                  fontSize: 28,
                  fontWeight: 700,
                }}
              >
                RAH.
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1024, height: 1024 },
  );
}
