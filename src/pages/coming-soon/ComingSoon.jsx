import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BlurText from '../../components/BlurText';
import GhostFibers from '../../components/GhostFibers';
import TiltedCard from '../../components/TiltedCard';

import avatarImg from '../../../assets/images/avatar.jpg';

const ComingSoon = () => {
  const containerRef = useRef(null);
  const rightContentRef = useRef(null);
  const repoLinkRef = useRef(null);
  const footerRef = useRef(null);

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(repoLinkRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.7,
        delay: 0.3,
      })
        .from(
          rightContentRef.current,
          {
            x: 40,
            opacity: 0,
            duration: 0.9,
          },
          '-=0.3'
        )
        .from(
          footerRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          '-=0.2'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="coming-soon-container">
      {/* GhostFibers Background */}
      <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
        <GhostFibers
          lineColor="#140E35"
          glowColor="#3437A0"
          speed={0.2}
          scale={2}
          rotation={0}
          rotationSpeed={0.25}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.6}
          brightness={2}
          blueBoost={1.25}
          vignette={0.8}
          grain={0.05}
          dpr={1}
          lightMode={false}
          fps={60}
          paused={false}
        />
      </div>

      {/* Main Split Layout */}
      <div className="coming-soon-layout">
        {/* Left Side: TiltedCard */}
        <div className="coming-soon-left" style={{ flexDirection: 'column', gap: '2rem' }}>
          <TiltedCard
            imageSrc={avatarImg}
            altText="Quoc Khanh Avatar"
            captionText="Quoc Khanh - QIKA"
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={14}
            scaleOnHover={1.1}
            showTooltip={true}
          />

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', zIndex: 10 }}>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#a5b4fc', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#a5b4fc'}>
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
            <a href="https://github.com/qckhanh195" target="_blank" rel="noopener noreferrer" style={{ color: '#a5b4fc', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#a5b4fc'}>
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://discordapp.com/users/qckhanh_195" target="_blank" rel="noopener noreferrer" title="qckhanh_195" style={{ color: '#a5b4fc', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#a5b4fc'}>
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="coming-soon-right">
          {/* GitHub Repo Link */}
          <a
            ref={repoLinkRef}
            href="https://github.com/qckhanh195/qckhanh.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="repo-link"
            id="repo-link"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>qckhanh195/qckhanh.github.io</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
              <path d="M7 17L17 7"></path>
              <path d="M7 7h10v10"></path>
            </svg>
          </a>

          {/* Animated Title */}
          <div ref={rightContentRef} className="right-content-block">
            <BlurText
              text="Trang web đang được phát triển !"
              delay={120}
              animateBy="words"
              direction="top"
              className="coming-soon-title"
            />

            <BlurText
              text="Hãy quay lại sau nhé 👋"
              delay={150}
              animateBy="words"
              direction="top"
              className="coming-soon-subtitle"
            />
          </div>

          {/* Footer */}
          <div ref={footerRef} className="coming-soon-footer">
            <p>© 2024 Quoc Khanh. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
