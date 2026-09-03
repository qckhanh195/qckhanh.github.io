import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BlurText from '../../components/BlurText';
import GhostFibers from '../../components/GhostFibers';
import Lanyard from '../../components/Lanyard/Lanyard';

import frontImg from '../../../assets/images/my-front.jpg';
import backImg from '../../../assets/images/my-back.jpg';
import bandImg from '../../../assets/images/my-band.png';

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
        {/* Left Side: Lanyard */}
        <div className="coming-soon-left">
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            frontImage={frontImg}
            backImage={backImg}
            lanyardImage={bandImg}
            lanyardWidth={1}
          />
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
