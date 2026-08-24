import type { Effect } from '../types';
import * as R from './reveal';
import * as T from './text';
import * as P from './photo';
import * as G from './gallery';
import * as S from './scroll';
import * as TR from './transition';
import * as F from './festive';
import * as I from './interactive';
import * as B from './background';
import * as PR from './premium';
import * as M from './micro';
import * as MU from './music';
import * as MD from './modern';

const COUNT_CONTROLS = [
  { key: 'count', label: 'Density', min: 0.3, max: 2, step: 0.1, default: 1 },
];
const INTENSITY_CONTROLS = [
  { key: 'intensity', label: 'Intensity', min: 0.3, max: 2, step: 0.1, default: 1 },
];
export const EFFECTS: Effect[] = [
  // ============ REVEAL (15) ============
  e('tap-reveal', 'Tap To Reveal', 'reveal', 'An interactive tap unveils the invitation.', ['interactive', 'tap', 'opening'], ['basic', 'standard', 'premium'], 2, 'Easy', 'Opening screen', R.TapReveal),
  e('curtain-reveal', 'Curtain Reveal', 'reveal', 'Two maroon curtains part to reveal content.', ['curtain', 'opening', 'stage'], ['standard', 'premium'], 2.2, 'Easy', 'Opening screen', R.CurtainReveal),
  e('diya-light-reveal', 'Diya Light Reveal', 'reveal', 'A diya lights up and reveals through warm golden glow.', ['diya', 'glow', 'warm'], ['standard', 'premium'], 2.6, 'Medium', 'Opening screen', R.DiyaLightReveal, false, INTENSITY_CONTROLS),
  e('golden-glow-reveal', 'Golden Glow Reveal', 'reveal', 'A golden glow blooms behind blurred text that sharpens.', ['gold', 'glow', 'blur'], ['standard', 'premium'], 2, 'Easy', 'Opening screen', R.GoldenGlowReveal),
  e('circle-expansion', 'Circle Expansion', 'reveal', 'A circle expands outward and fades to reveal.', ['circle', 'expand', 'mask'], ['basic', 'standard'], 1.8, 'Easy', 'Opening screen', R.CircleExpansion),
  e('radial-reveal', 'Radial Reveal', 'reveal', 'A dark mask shrinks radially to uncover the invitation.', ['radial', 'mask', 'clip'], ['standard', 'premium'], 2, 'Easy', 'Opening screen', R.RadialReveal),
  e('split-door-reveal', 'Split Door Reveal', 'reveal', 'Two wooden panels swing open like doors.', ['door', '3d', 'split'], ['premium'], 2.2, 'Medium', 'Opening screen', R.SplitDoorReveal),
  e('book-opening', 'Book Opening', 'reveal', 'A book cover opens in 3D to reveal the invitation.', ['book', '3d', 'flip'], ['premium'], 2.4, 'Medium', 'Opening screen', R.BookOpening),
  e('envelope-opening', 'Envelope Opening', 'reveal', 'An invitation envelope opens and the card slides up.', ['envelope', 'card', 'mail'], ['standard', 'premium'], 2.2, 'Medium', 'Opening screen', R.EnvelopeOpening),
  e('temple-door-reveal', 'Temple Door Opening', 'reveal', 'Ornate temple doors slide apart with golden frames.', ['temple', 'door', 'gold'], ['premium'], 2.6, 'Medium', 'Opening screen', R.TempleDoorReveal),
  e('rangoli-draw-reveal', 'Rangoli Draw Reveal', 'reveal', 'A rangoli draws itself then reveals the invitation.', ['rangoli', 'draw', 'pattern'], ['premium'], 2.8, 'Advanced', 'Opening screen', R.RangoliDrawReveal),
  e('blur-to-sharp-reveal', 'Blur To Sharp', 'reveal', 'Content blurs into sharp focus.', ['blur', 'focus'], ['basic', 'standard'], 1.8, 'Easy', 'Opening screen', R.BlurToSharp),
  e('black-to-invite', 'Black Screen To Invitation', 'reveal', 'A black screen fades away to the invitation.', ['fade', 'black', 'simple'], ['basic'], 2, 'Easy', 'Opening screen', R.BlackToInvite),
  e('particle-reveal', 'Particle Reveal', 'reveal', 'Particles burst outward to reveal the invitation.', ['particle', 'burst'], ['standard', 'premium'], 2.4, 'Medium', 'Opening screen', R.ParticleReveal),
  e('ganpati-reveal', 'Ganpati Reveal', 'reveal', 'A divine glow reveals Ganpati with falling gold particles.', ['ganpati', 'divine', 'gold'], ['premium'], 2.6, 'Medium', 'Opening screen', R.GanpatiReveal, true),

  // ============ TEXT (15) ============
  e('text-fade-in', 'Fade In', 'text', 'Text fades in smoothly.', ['fade', 'simple'], ['basic', 'standard', 'premium'], 1.5, 'Easy', 'Any text', T.TextFadeIn),
  e('text-fade-up', 'Fade Up', 'text', 'Text fades in while rising.', ['fade', 'up'], ['basic', 'standard', 'premium'], 1.5, 'Easy', 'Headings', T.TextFadeUp),
  e('text-fade-down', 'Fade Down', 'text', 'Text fades in while descending.', ['fade', 'down'], ['basic', 'standard', 'premium'], 1.5, 'Easy', 'Subheadings', T.TextFadeDown),
  e('text-slide-left', 'Slide From Left', 'text', 'Text slides in from the left.', ['slide', 'left'], ['basic', 'standard'], 1.4, 'Easy', 'Names', T.TextSlideLeft),
  e('text-slide-right', 'Slide From Right', 'text', 'Text slides in from the right.', ['slide', 'right'], ['basic', 'standard'], 1.4, 'Easy', 'Names', T.TextSlideRight),
  e('text-letter', 'Letter By Letter', 'text', 'Each letter appears one by one.', ['letter', 'typewriter'], ['standard', 'premium'], 2, 'Easy', 'Headlines', T.TextLetterByLetter),
  e('text-word', 'Word By Word', 'text', 'Each word appears in sequence.', ['word', 'sequence'], ['standard', 'premium'], 1.8, 'Easy', 'Headlines', T.TextWordByWord),
  e('text-typewriter', 'Typewriter', 'text', 'Classic typewriter effect with caret.', ['typewriter', 'retro'], ['standard', 'premium'], 2.2, 'Easy', 'Quotes', T.TextTypewriter),
  e('text-blur-sharp', 'Blur To Sharp Text', 'text', 'Blurry text sharpens into focus.', ['blur', 'focus'], ['standard', 'premium'], 1.8, 'Easy', 'Headings', T.TextBlurToSharp),
  e('text-scale-in', 'Scale In', 'text', 'Text scales up from small to full size.', ['scale', 'grow'], ['basic', 'standard'], 1.4, 'Easy', 'Event names', T.TextScaleIn),
  e('text-split', 'Split Text Reveal', 'text', 'Text splits into halves that slide together.', ['split', 'reveal'], ['premium'], 1.8, 'Medium', 'Hero text', T.TextSplitReveal),
  e('text-char-wave', 'Character Wave', 'text', 'Characters wave up and down in a loop.', ['wave', 'loop', 'playful'], ['standard', 'premium'], 2.4, 'Medium', 'Decorative', T.TextCharWave),
  e('text-golden-shimmer', 'Golden Shimmer', 'text', 'Gold shimmer sweeps across the text.', ['gold', 'shimmer', 'shine'], ['premium'], 2, 'Easy', 'Names', T.TextGoldenShimmer),
  e('text-glow', 'Text Glow', 'text', 'Text pulses with a soft golden glow.', ['glow', 'pulse', 'gold'], ['standard', 'premium'], 2.5, 'Easy', 'Headlines', T.TextGlow),
  e('text-handwritten', 'Handwritten Reveal', 'text', 'Text appears as if hand-written with a pen.', ['handwritten', 'draw', 'stroke'], ['premium'], 2.2, 'Medium', 'Personal notes', T.TextHandwrittenReveal),

  // ============ PHOTO (15) ============
  e('photo-polaroid', 'Polaroid Reveal', 'photo', 'A polaroid photo drops in with a caption.', ['polaroid', 'card', 'drop'], ['standard', 'premium'], 1.8, 'Easy', 'Family photos', P.PhotoPolaroid),
  e('photo-fade', 'Photo Fade', 'photo', 'Photo fades in smoothly.', ['fade', 'simple'], ['basic', 'standard'], 1.6, 'Easy', 'Any photo', P.PhotoFade),
  e('photo-zoom', 'Photo Zoom', 'photo', 'Photo zooms from large to normal.', ['zoom', 'ken'], ['basic', 'standard'], 2, 'Easy', 'Hero photos', P.PhotoZoom),
  e('photo-slide', 'Photo Slide', 'photo', 'Photo slides in from the side.', ['slide'], ['basic', 'standard'], 1.6, 'Easy', 'Gallery items', P.PhotoSlide),
  e('photo-parallax', 'Photo Parallax', 'photo', 'Photo moves at a different speed than caption.', ['parallax', 'depth'], ['standard', 'premium'], 2.4, 'Medium', 'Section photos', P.PhotoParallax),
  e('photo-ken-burns', 'Photo Ken Burns', 'photo', 'Slow cinematic zoom and pan across the photo.', ['ken', 'cinematic', 'pan'], ['standard', 'premium'], 6, 'Medium', 'Hero photos', P.PhotoKenBurns),
  e('photo-3d-tilt', '3D Tilt', 'photo', 'Photo tilts in 3D space on loop.', ['3d', 'tilt', 'rotate'], ['premium'], 4, 'Medium', 'Feature photos', P.Photo3DTilt),
  e('photo-flip', 'Photo Flip', 'photo', 'Photo flips to reveal text on the back.', ['flip', '3d', 'reveal'], ['premium'], 2, 'Medium', 'Photo cards', P.PhotoFlip),
  e('photo-circular', 'Circular Reveal', 'photo', 'Photo reveals through an expanding circle.', ['circle', 'mask'], ['standard', 'premium'], 1.8, 'Easy', 'Profile photos', P.PhotoCircularReveal),
  e('photo-mask', 'Mask Reveal', 'photo', 'A mask slides away to reveal the photo.', ['mask', 'wipe'], ['standard', 'premium'], 1.8, 'Easy', 'Any photo', P.PhotoMaskReveal),
  e('photo-film-strip', 'Film Strip', 'photo', 'Photos scroll by like a film strip.', ['film', 'strip', 'scroll'], ['premium'], 5, 'Medium', 'Photo sets', P.PhotoFilmStrip),
  e('photo-floating', 'Floating Photos', 'photo', 'Multiple photos float gently in space.', ['float', 'multiple'], ['premium'], 4, 'Medium', 'Decorative', P.PhotoFloating),
  e('photo-stacked', 'Stacked Photos', 'photo', 'Photos stack and fan out one by one.', ['stack', 'fan'], ['premium'], 2.4, 'Medium', 'Gallery intro', P.PhotoStacked),
  e('photo-cinematic', 'Cinematic Photo Reveal', 'photo', 'Cinematic bars open to reveal a caption.', ['cinematic', 'bars'], ['premium'], 2.6, 'Medium', 'Hero photos', P.PhotoCinematic, true),
  e('photo-lightbox', 'Photo Lightbox', 'photo', 'Photo enlarges with a glowing lightbox effect.', ['lightbox', 'zoom', 'glow'], ['standard', 'premium'], 1.6, 'Easy', 'Gallery zoom', P.PhotoLightbox),

  // ============ GALLERY (10) ============
  e('gallery-masonry', 'Masonry Gallery', 'gallery', 'Pinterest-style masonry layout.', ['masonry', 'grid'], ['standard', 'premium'], 3, 'Easy', 'Photo walls', G.GalleryMasonry),
  e('gallery-horizontal', 'Horizontal Gallery', 'gallery', 'Scrollable horizontal photo strip.', ['horizontal', 'scroll'], ['basic', 'standard'], 3, 'Easy', 'Photo sets', G.GalleryHorizontal),
  e('gallery-infinite', 'Infinite Carousel', 'gallery', 'Looping carousel with arrows.', ['carousel', 'loop'], ['standard', 'premium'], 3, 'Easy', 'Photo carousel', G.GalleryInfinite),
  e('gallery-3d-carousel', '3D Carousel', 'gallery', 'Photos arranged on a 3D rotating carousel.', ['3d', 'carousel'], ['premium'], 3, 'Medium', 'Feature gallery', G.Gallery3DCarousel, true),
  e('gallery-coverflow', 'Coverflow', 'gallery', 'Apple-style coverflow with depth.', ['coverflow', '3d'], ['premium'], 3, 'Medium', 'Photo browser', G.GalleryCoverflow, true),
  e('gallery-polaroid-stack', 'Polaroid Stack', 'gallery', 'Polaroids stack and flip through.', ['polaroid', 'stack'], ['standard', 'premium'], 3, 'Easy', 'Memory stack', G.GalleryPolaroidStack),
  e('gallery-film-reel', 'Film Reel', 'gallery', 'Photos scroll inside a film reel.', ['film', 'reel'], ['premium'], 4, 'Medium', 'Cinematic gallery', G.GalleryFilmReel, true),
  e('gallery-timeline', 'Memory Timeline', 'gallery', 'Photos on a vertical timeline.', ['timeline', 'vertical'], ['standard', 'premium'], 3, 'Medium', 'Story gallery', G.GalleryTimeline),
  e('gallery-fullscreen', 'Fullscreen Gallery', 'gallery', 'Grid with fullscreen lightbox.', ['fullscreen', 'lightbox'], ['standard', 'premium'], 3, 'Medium', 'Photo viewer', G.GalleryFullscreen),
  e('gallery-story', 'Story Gallery', 'gallery', 'Instagram-style auto-advancing stories.', ['story', 'auto'], ['premium'], 5, 'Medium', 'Story mode', G.GalleryStory, true),

  // ============ SCROLL (15) ============
  e('scroll-fade', 'Fade On Scroll', 'scroll', 'Content fades in as it enters view.', ['fade', 'scroll'], ['basic', 'standard'], 2, 'Easy', 'Sections', S.ScrollFadeCard),
  e('scroll-slide-up', 'Slide Up On Scroll', 'scroll', 'Content slides up into view.', ['slide', 'up'], ['basic', 'standard'], 2, 'Easy', 'Sections', S.ScrollSlideUpCard),
  e('scroll-slide-left', 'Slide From Left On Scroll', 'scroll', 'Content enters from the left.', ['slide', 'left'], ['standard'], 2, 'Easy', 'Alternating', S.ScrollSlideLeftCard),
  e('scroll-slide-right', 'Slide From Right On Scroll', 'scroll', 'Content enters from the right.', ['slide', 'right'], ['standard'], 2, 'Easy', 'Alternating', S.ScrollSlideRightCard),
  e('scroll-scale', 'Scale On Scroll', 'scroll', 'Content scales up as it scrolls in.', ['scale'], ['standard', 'premium'], 2, 'Easy', 'Highlights', S.ScrollScaleCard),
  e('scroll-blur', 'Blur To Sharp On Scroll', 'scroll', 'Content sharpens as it scrolls in.', ['blur', 'focus'], ['premium'], 2, 'Medium', 'Highlights', S.ScrollBlurCard),
  e('scroll-parallax-img', 'Parallax Image', 'scroll', 'Image moves slower than scroll for depth.', ['parallax', 'depth'], ['standard', 'premium'], 3, 'Medium', 'Hero images', S.ScrollParallaxCard),
  e('scroll-parallax-bg', 'Parallax Background', 'scroll', 'Background layers move at different speeds.', ['parallax', 'background'], ['premium'], 3, 'Medium', 'Sections', S.ScrollParallaxBgCard, true),
  e('scroll-sticky', 'Sticky Story', 'scroll', 'Content sticks and scales as you scroll past.', ['sticky', 'pin'], ['premium'], 3, 'Advanced', 'Story sections', S.ScrollStickyCard, true),
  e('scroll-horizontal', 'Horizontal Scroll', 'scroll', 'Vertical scroll drives horizontal movement.', ['horizontal'], ['premium'], 3, 'Advanced', 'Galleries', S.ScrollHorizontalCard, true),
  e('scroll-img-zoom', 'Image Zoom On Scroll', 'scroll', 'Image zooms as you scroll through.', ['zoom', 'image'], ['standard', 'premium'], 2, 'Medium', 'Hero photos', S.ScrollImageZoomCard),
  e('scroll-text-reveal', 'Text Reveal On Scroll', 'scroll', 'Text appears letter by letter on scroll.', ['text', 'reveal'], ['premium'], 2, 'Medium', 'Headlines', S.ScrollTextRevealCard),
  e('scroll-timeline', 'Timeline Reveal', 'scroll', 'A timeline draws itself as you scroll.', ['timeline', 'draw'], ['premium'], 3, 'Medium', 'Event flow', S.ScrollTimelineCard, true),
  e('scroll-color', 'Section Color Transition', 'scroll', 'Section background color shifts on scroll.', ['color', 'background'], ['premium'], 2, 'Medium', 'Mood shifts', S.ScrollColorCard),
  e('scroll-progress', 'Scroll Progress Indicator', 'scroll', 'A progress bar tracks scroll position.', ['progress', 'bar'], ['basic', 'standard'], 2, 'Easy', 'Long invitations', S.ScrollProgressCard),

  // ============ TRANSITION (12) ============
  e('trans-fade', 'Fade Transition', 'transition', 'Simple cross-fade between screens.', ['fade', 'cross'], ['basic', 'standard'], 1.6, 'Easy', 'Screen changes', TR.TransFade),
  e('trans-slide', 'Slide Transition', 'transition', 'New screen slides in horizontally.', ['slide'], ['basic', 'standard'], 1.6, 'Easy', 'Screen changes', TR.TransSlide),
  e('trans-curtain', 'Curtain Transition', 'transition', 'Curtains close and open to new screen.', ['curtain', 'stage'], ['standard', 'premium'], 2, 'Easy', 'Chapter breaks', TR.TransCurtain),
  e('trans-circle', 'Circle Transition', 'transition', 'A circle wipes between screens.', ['circle', 'wipe'], ['standard', 'premium'], 1.8, 'Medium', 'Screen changes', TR.TransCircle),
  e('trans-diagonal', 'Diagonal Transition', 'transition', 'A diagonal wipe reveals the new screen.', ['diagonal', 'wipe'], ['standard'], 1.6, 'Easy', 'Screen changes', TR.TransDiagonal),
  e('trans-blur', 'Blur Transition', 'transition', 'Screen blurs out and new one sharpens in.', ['blur'], ['standard', 'premium'], 1.6, 'Easy', 'Screen changes', TR.TransBlur),
  e('trans-zoom', 'Zoom Transition', 'transition', 'Screen zooms into the next.', ['zoom'], ['standard', 'premium'], 1.6, 'Easy', 'Focus shifts', TR.TransZoom),
  e('trans-flip', 'Flip Transition', 'transition', 'Screen flips in 3D to the next.', ['flip', '3d'], ['premium'], 1.8, 'Medium', 'Screen changes', TR.TransFlip, true),
  e('trans-split', 'Split Screen', 'transition', 'Screen splits open to reveal the next.', ['split', 'wipe'], ['premium'], 1.8, 'Medium', 'Dramatic cuts', TR.TransSplitScreen, true),
  e('trans-gold-curtain', 'Golden Curtain', 'transition', 'Luxurious golden curtains sweep across.', ['gold', 'curtain', 'luxury'], ['premium'], 2.2, 'Medium', 'Premium cuts', TR.TransGoldenCurtain, true),
  e('trans-rangoli', 'Rangoli Transition', 'transition', 'A rangoli spins and wipes to the next screen.', ['rangoli', 'spin'], ['premium'], 2, 'Medium', 'Festive cuts', TR.TransRangoli, true),
  e('trans-particle', 'Particle Transition', 'transition', 'Particles burst to transition between screens.', ['particle', 'burst'], ['premium'], 2, 'Medium', 'Cinematic cuts', TR.TransParticle, true),

  // ============ FESTIVE (15) ============
  e('festive-marigold', 'Falling Marigold Petals', 'festive', 'Marigold petals drift down continuously.', ['marigold', 'petals', 'fall'], ['standard', 'premium'], 5, 'Easy', 'Backgrounds', F.FestiveMarigoldPetals, false, COUNT_CONTROLS),
  e('festive-floating-diyas', 'Floating Diyas', 'festive', 'Diyas float gently with a warm glow.', ['diya', 'float'], ['standard', 'premium'], 5, 'Easy', 'Backgrounds', F.FestiveFloatingDiyas),
  e('festive-diya-glow', 'Diya Glow', 'festive', 'A single diya pulses with warm light.', ['diya', 'glow', 'pulse'], ['standard', 'premium'], 2.5, 'Easy', 'Accents', F.FestiveDiyaGlow),
  e('festive-golden-particles', 'Golden Particles', 'festive', 'Floating golden particles rise upward.', ['gold', 'particles'], ['standard', 'premium'], 5, 'Easy', 'Backgrounds', F.FestiveGoldenParticles, false, COUNT_CONTROLS),
  e('festive-rangoli-draw', 'Rangoli Drawing', 'festive', 'An animated rangoli draws and rotates.', ['rangoli', 'draw', 'rotate'], ['premium'], 5, 'Advanced', 'Decorative', F.FestiveRangoliDraw, true),
  e('festive-flower-shower', 'Flower Shower', 'festive', 'Colorful flowers shower from above.', ['flower', 'shower'], ['standard', 'premium'], 4, 'Easy', 'Celebration', F.FestiveFlowerShower),
  e('festive-sparkle-trail', 'Sparkle Trail', 'festive', 'A trail of sparkles waves across.', ['sparkle', 'trail'], ['premium'], 2, 'Medium', 'Accents', F.FestiveSparkleTrail),
  e('festive-firefly', 'Firefly Particles', 'festive', 'Fireflies blink and drift in the dark.', ['firefly', 'glow'], ['premium'], 4, 'Medium', 'Night scenes', F.FestiveFirefly, true),
  e('festive-leaves', 'Floating Leaves', 'festive', 'Green leaves float gently.', ['leaves', 'nature'], ['standard'], 4, 'Easy', 'Backgrounds', F.FestiveFloatingLeaves),
  e('festive-golden-dust', 'Golden Dust', 'festive', 'Fine golden dust drifts upward.', ['dust', 'gold'], ['standard', 'premium'], 4, 'Easy', 'Backgrounds', F.FestiveGoldenDust),
  e('festive-confetti', 'Celebration Confetti', 'festive', 'Burst of confetti for celebration moments.', ['confetti', 'celebration'], ['standard', 'premium'], 3, 'Easy', 'Endings', F.FestiveConfetti),
  e('festive-bell-ripple', 'Temple Bell Ripple', 'festive', 'Ripples emanate like a ringing temple bell.', ['bell', 'ripple', 'sound'], ['premium'], 2, 'Medium', 'Accents', F.FestiveBellRipple, true),
  e('festive-light-rays', 'Festive Light Rays', 'festive', 'Rotating light rays from a central point.', ['light', 'rays', 'rotate'], ['premium'], 6, 'Medium', 'Backgrounds', F.FestiveLightRays, true),
  e('festive-glow-border', 'Glowing Border', 'festive', 'A decorative border pulses with golden glow.', ['border', 'glow', 'gold'], ['standard', 'premium'], 3, 'Easy', 'Frames', F.FestiveGlowBorder),
  e('festive-divine-aura', 'Divine Aura', 'festive', 'A divine aura glows behind content.', ['aura', 'divine', 'glow'], ['premium'], 3, 'Medium', 'Spiritual', F.FestiveDivineAura, true),

  // ============ INTERACTIVE (15) ============
  e('int-tap-reveal', 'Tap To Reveal', 'interactive', 'Tap to unveil hidden content.', ['tap', 'reveal'], ['basic', 'standard', 'premium'], 2, 'Easy', 'Opening', I.IntTapReveal),
  e('int-hold-reveal', 'Hold To Reveal', 'interactive', 'Press and hold to gradually reveal.', ['hold', 'press'], ['premium'], 1.5, 'Medium', 'Opening', I.IntHoldReveal, true),
  e('int-swipe-open', 'Swipe To Open', 'interactive', 'Swipe to slide open the invitation.', ['swipe', 'touch'], ['standard', 'premium'], 2, 'Medium', 'Opening', I.IntSwipeOpen),
  e('int-drag-reveal', 'Drag To Reveal', 'interactive', 'Drag a panel away to reveal content.', ['drag', 'touch'], ['premium'], 2, 'Medium', 'Opening', I.IntDragReveal, true),
  e('int-magnetic', 'Magnetic Button', 'interactive', 'Button is attracted to the cursor.', ['magnetic', 'cursor'], ['premium'], 2, 'Medium', 'CTA buttons', I.IntMagnetic, true),
  e('int-ripple', 'Button Ripple', 'interactive', 'Ripple emanates from click point.', ['ripple', 'click'], ['standard', 'premium'], 1, 'Easy', 'Buttons', I.IntRipple),
  e('int-button-glow', 'Button Glow', 'interactive', 'Button pulses with a golden glow.', ['glow', 'pulse', 'button'], ['standard', 'premium'], 2, 'Easy', 'CTA buttons', I.IntButtonGlow),
  e('int-hover-tilt', 'Hover Tilt', 'interactive', 'Image tilts in 3D following the cursor.', ['hover', 'tilt', '3d'], ['premium'], 2, 'Medium', 'Photos', I.IntHoverTilt, true),
  e('int-3d-card', '3D Card Tilt', 'interactive', 'Card tilts in 3D following the cursor.', ['3d', 'card', 'tilt'], ['premium'], 2, 'Medium', 'Cards', I.Int3DCard, true),
  e('int-cursor-glow', 'Interactive Cursor Glow', 'interactive', 'A glow follows the cursor across the area.', ['cursor', 'glow'], ['standard', 'premium'], 3, 'Easy', 'Backgrounds', I.IntCursorGlow),
  e('int-cursor-trail', 'Cursor Particle Trail', 'interactive', 'Particles trail behind the cursor.', ['cursor', 'particle', 'trail'], ['premium'], 2, 'Medium', 'Backgrounds', I.IntCursorTrail, true),
  e('int-touch-ripple', 'Touch Ripple', 'interactive', 'Ripples appear wherever you tap.', ['touch', 'ripple', 'mobile'], ['standard', 'premium'], 2, 'Easy', 'Backgrounds', I.IntTouchRipple),
  e('int-image-tilt', 'Image Tilt', 'interactive', 'Tap to spin the image 360.', ['image', 'spin', 'tap'], ['standard', 'premium'], 1, 'Easy', 'Photos', I.IntImageTilt),
  e('int-diya', 'Interactive Diya', 'interactive', 'Tap to light or extinguish a diya.', ['diya', 'tap', 'light'], ['standard', 'premium'], 2, 'Easy', 'Accents', I.IntDiya),
  e('int-tap-confetti', 'Tap Confetti', 'interactive', 'Tap anywhere for a confetti burst.', ['confetti', 'tap', 'burst'], ['standard', 'premium'], 2, 'Easy', 'Celebration', I.IntTapConfetti),

  // ============ BACKGROUND (12) ============
  e('bg-gradient', 'Animated Gradient', 'background', 'Smoothly shifting gradient background.', ['gradient', 'shift'], ['basic', 'standard'], 8, 'Easy', 'Any screen', B.BgAnimatedGradient),
  e('bg-golden-particles', 'Golden Particle Background', 'background', 'Continuous golden particles.', ['gold', 'particles'], ['standard', 'premium'], 6, 'Easy', 'Any screen', B.BgGoldenParticles, false, COUNT_CONTROLS),
  e('bg-petals', 'Floating Petals Background', 'background', 'Petals fall across the background.', ['petals', 'fall'], ['standard', 'premium'], 6, 'Easy', 'Festive screens', B.BgFloatingPetals),
  e('bg-stars', 'Star Field', 'background', 'Twinkling stars on a dark field.', ['stars', 'twinkle'], ['standard', 'premium'], 4, 'Easy', 'Night scenes', B.BgStarField),
  e('bg-soft-glow', 'Soft Glow', 'background', 'A soft glow drifts across the background.', ['glow', 'soft'], ['basic', 'standard'], 4, 'Easy', 'Calm screens', B.BgSoftGlow),
  e('bg-light-rays', 'Moving Light Rays', 'background', 'Light rays sway gently across.', ['light', 'rays'], ['premium'], 5, 'Medium', 'Divine screens', B.BgLightRays, true),
  e('bg-grain', 'Grain Texture', 'background', 'Subtle film grain texture.', ['grain', 'texture'], ['basic'], 2, 'Easy', 'Cinematic', B.BgGrain),
  e('bg-rangoli', 'Animated Rangoli', 'background', 'A faint rotating rangoli pattern.', ['rangoli', 'rotate'], ['premium'], 10, 'Medium', 'Festive screens', B.BgRangoli, true),
  e('bg-aurora', 'Aurora Glow', 'background', 'Aurora-like glowing waves.', ['aurora', 'glow'], ['premium'], 6, 'Medium', 'Dreamy screens', B.BgAurora, true),
  e('bg-bokeh', 'Bokeh Particles', 'background', 'Soft blurred bokeh circles.', ['bokeh', 'blur'], ['premium'], 6, 'Easy', 'Dreamy screens', B.BgBokeh, true),
  e('bg-diyas', 'Floating Diyas Background', 'background', 'Diyas float in the background.', ['diya', 'float'], ['standard', 'premium'], 5, 'Easy', 'Festive screens', B.BgFloatingDiyas),
  e('bg-parallax', 'Slow Parallax Background', 'background', 'Background layers drift slowly.', ['parallax', 'slow'], ['premium'], 8, 'Medium', 'Any screen', B.BgParallax, true),

  // ============ PREMIUM (15) ============
  e('prem-cinematic-ganpati', 'Cinematic Ganpati Reveal', 'premium', 'A cinematic multi-layer Ganpati reveal.', ['cinematic', 'ganpati', 'multi-layer'], ['premium'], 3.2, 'Advanced', 'Opening', PR.PremCinematicGanpati, true),
  e('prem-golden-sweep', 'Golden Light Sweep', 'premium', 'A golden light sweeps across the screen.', ['gold', 'sweep', 'light'], ['premium'], 3, 'Medium', 'Reveals', PR.PremGoldenSweep, true),
  e('prem-3d-opening', '3D Invitation Opening', 'premium', 'A 3D card opens in space.', ['3d', 'card', 'open'], ['premium'], 3, 'Advanced', 'Opening', PR.Prem3DOpening, true),
  e('prem-depth-zoom', 'Depth Zoom', 'premium', 'Layers zoom through each other in depth.', ['depth', 'zoom', 'layers'], ['premium'], 2.6, 'Advanced', 'Reveals', PR.PremDepthZoom, true),
  e('prem-cinematic-blur', 'Cinematic Blur', 'premium', 'A cinematic blur-to-sharp with image.', ['cinematic', 'blur', 'image'], ['premium'], 2.4, 'Medium', 'Reveals', PR.PremCinematicBlur, true),
  e('prem-particle-logo', 'Particle Logo Reveal', 'premium', 'Particles converge to form text.', ['particle', 'logo', 'converge'], ['premium'], 2.6, 'Advanced', 'Brand reveal', PR.PremParticleLogo, true),
  e('prem-luxury-shimmer', 'Luxury Gold Shimmer', 'premium', 'Luxurious gold shimmer with tracking.', ['gold', 'luxury', 'shimmer'], ['premium'], 2.2, 'Medium', 'Names', PR.PremLuxuryShimmer, true),
  e('prem-multi-parallax', 'Multi-Layer Parallax', 'premium', 'Multiple layers parallax at different depths.', ['parallax', 'layers', 'depth'], ['premium'], 3, 'Advanced', 'Hero sections', PR.PremMultiLayer, true),
  e('prem-camera-zoom', 'Camera Zoom', 'premium', 'A camera focus ring zooms into the photo.', ['camera', 'zoom', 'focus'], ['premium'], 2.4, 'Medium', 'Photo reveals', PR.PremCameraZoom, true),
  e('prem-3d-card-rot', '3D Card Rotation', 'premium', 'A premium card rotates in 3D continuously.', ['3d', 'card', 'rotate'], ['premium'], 5, 'Medium', 'Invitation card', PR.Prem3DCard, true),
  e('prem-photo-story', 'Cinematic Photo Story', 'premium', 'A cinematic sequence of photos with captions.', ['cinematic', 'story', 'sequence'], ['premium'], 6, 'Advanced', 'Story sections', PR.PremPhotoStory, true),
  e('prem-divine-light', 'Divine Light Explosion', 'premium', 'Rays of divine light burst outward.', ['divine', 'light', 'rays'], ['premium'], 2.8, 'Advanced', 'Spiritual reveals', PR.PremDivineLight, true),
  e('prem-temple-cinematic', 'Temple Door Cinematic Reveal', 'premium', 'Cinematic temple doors open to reveal Ganpati.', ['temple', 'cinematic', 'door'], ['premium'], 3, 'Advanced', 'Opening', PR.PremTempleCinematic, true),
  e('prem-curtain', 'Premium Curtain Opening', 'premium', 'Luxurious golden curtains open with sparkle.', ['curtain', 'gold', 'luxury'], ['premium'], 2.8, 'Medium', 'Opening', PR.PremCurtain, true),
  e('prem-celebration', 'Fullscreen Celebration Reveal', 'premium', 'A full-screen celebration with confetti and text.', ['celebration', 'confetti', 'fullscreen'], ['premium'], 3.4, 'Advanced', 'Ending', PR.PremFullscreenCelebration, true),

  // ============ MICRO (15) ============
  e('micro-button-hover', 'Button Hover', 'micro', 'Button grows and shifts color on hover.', ['hover', 'button'], ['basic', 'standard'], 1, 'Easy', 'Buttons', M.MicroButtonHover),
  e('micro-button-press', 'Button Press', 'micro', 'Button squishes on press.', ['press', 'button'], ['basic', 'standard'], 1, 'Easy', 'Buttons', M.MicroButtonPress),
  e('micro-icon-bounce', 'Icon Bounce', 'micro', 'Icon bounces on tap.', ['icon', 'bounce'], ['standard'], 1, 'Easy', 'Icons', M.MicroIconBounce),
  e('micro-icon-rotate', 'Icon Rotate', 'micro', 'Icon rotates on tap.', ['icon', 'rotate'], ['standard'], 1, 'Easy', 'Icons', M.MicroIconRotate),
  e('micro-heart-beat', 'Heart Beat', 'micro', 'A heart beats in a lifelike rhythm.', ['heart', 'beat'], ['standard', 'premium'], 1.2, 'Easy', 'Likes', M.MicroHeartBeat),
  e('micro-share-ripple', 'Share Button Ripple', 'micro', 'Share button sends a ripple outward.', ['share', 'ripple'], ['standard'], 1, 'Easy', 'Share', M.MicroShareRipple),
  e('micro-copy-success', 'Copy Success', 'micro', 'Copy button confirms with a checkmark.', ['copy', 'success'], ['standard'], 1.5, 'Easy', 'Copy link', M.MicroCopySuccess),
  e('micro-rsvp', 'RSVP Success', 'micro', 'RSVP button confirms attendance.', ['rsvp', 'success'], ['standard', 'premium'], 1, 'Easy', 'RSVP', M.MicroRSVPSuccess),
  e('micro-form-success', 'Form Success', 'micro', 'Form submission shows a success overlay.', ['form', 'success'], ['standard'], 2, 'Easy', 'Forms', M.MicroFormSuccess),
  e('micro-spinner', 'Loading Spinner', 'micro', 'A golden loading spinner.', ['loading', 'spinner'], ['basic', 'standard'], 1, 'Easy', 'Loading', M.MicroSpinner),
  e('micro-checkmark', 'Checkmark Morph', 'micro', 'A checkmark draws itself on success.', ['checkmark', 'draw', 'success'], ['premium'], 1.5, 'Medium', 'Confirmation', M.MicroCheckmark, true),
  e('micro-heart-burst', 'Heart Burst', 'micro', 'Hearts burst outward on tap.', ['heart', 'burst', 'like'], ['premium'], 1, 'Medium', 'Likes', M.MicroHeartBurst, true),
  e('micro-notification', 'Notification Slide', 'micro', 'A notification slides in from the top.', ['notification', 'slide'], ['standard'], 2, 'Easy', 'Alerts', M.MicroNotification),
  e('micro-tooltip', 'Tooltip Reveal', 'micro', 'A tooltip appears on hover.', ['tooltip', 'hover'], ['basic', 'standard'], 1, 'Easy', 'Hints', M.MicroTooltip),
  e('micro-menu', 'Menu Animation', 'micro', 'Hamburger menu morphs into an X.', ['menu', 'hamburger', 'morph'], ['standard'], 1, 'Easy', 'Navigation', M.MicroMenu),

  // ============ MUSIC (8) ============
  e('music-play', 'Music Play Button', 'music', 'A play/pause toggle for background music.', ['play', 'pause', 'toggle'], ['standard', 'premium'], 2, 'Easy', 'Music control', MU.MusicPlayBtn),
  e('music-pause', 'Music Pause', 'music', 'A dedicated pause control.', ['pause', 'music'], ['standard', 'premium'], 1, 'Easy', 'Music control', MU.MusicPause),
  e('music-audio-bars', 'Animated Audio Bars', 'music', 'Equalizer-style animated audio bars.', ['audio', 'bars', 'equalizer'], ['standard', 'premium'], 2, 'Easy', 'Now playing', MU.MusicAudioBars),
  e('music-disc', 'Music Disc Rotation', 'music', 'A vinyl disc spins while music plays.', ['disc', 'vinyl', 'spin'], ['premium'], 3, 'Medium', 'Now playing', MU.MusicDisc, true),
  e('music-wave', 'Sound Wave', 'music', 'An animated sound waveform.', ['wave', 'sound', 'audio'], ['premium'], 2, 'Medium', 'Now playing', MU.MusicSoundWave, true),
  e('music-notes', 'Floating Music Notes', 'music', 'Music notes float upward.', ['notes', 'float', 'music'], ['standard', 'premium'], 3, 'Easy', 'Decorative', MU.MusicNotes),
  e('music-glow', 'Music Button Glow', 'music', 'Music button pulses with glow.', ['glow', 'music', 'button'], ['standard', 'premium'], 2, 'Easy', 'Music control', MU.MusicGlow),
  e('music-after-reveal', 'Audio Start After Reveal', 'music', 'Music begins only after the reveal completes.', ['audio', 'reveal', 'delay'], ['premium'], 3, 'Medium', 'Opening', MU.MusicAfterReveal, true),

  // ============ MODERN (30) ============
  e('mod-glass-reveal', 'Glassmorphism Reveal', 'modern', 'Frosted glass card materializes with blurred backdrop.', ['glass', 'blur', 'frost', 'glassmorphism'], ['standard', 'premium'], 2.4, 'Medium', 'Opening screen', MD.ModGlassReveal),
  e('mod-gradient-mesh', 'Gradient Mesh Reveal', 'modern', 'Conic gradient mesh swirls and reveals text.', ['gradient', 'mesh', 'conic', 'colorful'], ['standard', 'premium'], 3, 'Medium', 'Opening screen', MD.ModGradientMesh),
  e('mod-liquid-blob', 'Liquid Blob Reveal', 'modern', 'A morphing liquid blob reveals text inside.', ['liquid', 'blob', 'morph', 'organic'], ['premium'], 2.6, 'Advanced', 'Opening screen', MD.ModLiquidBlob, true),
  e('mod-neon-glow', 'Neon Glow Reveal', 'modern', 'Neon text pulses with electric glow on dark.', ['neon', 'glow', 'electric', 'dark'], ['standard', 'premium'], 2, 'Easy', 'Night events', MD.ModNeonGlow),
  e('mod-holographic', 'Holographic Card', 'modern', 'Holographic card tilts with rainbow shimmer.', ['holographic', 'rainbow', '3d', 'tilt'], ['premium'], 5, 'Medium', 'Invitation card', MD.ModHolographic, true),
  e('mod-bento-grid', 'Bento Grid Reveal', 'modern', 'Apple-style bento grid tiles pop in sequentially.', ['bento', 'grid', 'tiles', 'apple'], ['standard', 'premium'], 2.4, 'Medium', 'Info sections', MD.ModBentoGrid),
  e('mod-spotlight-sweep', 'Spotlight Sweep', 'modern', 'A spotlight sweeps across revealing content.', ['spotlight', 'sweep', 'light', 'cinematic'], ['standard', 'premium'], 3, 'Easy', 'Hero sections', MD.ModSpotlightSweep),
  e('mod-parallax-cards', 'Parallax Depth Cards', 'modern', 'Cards float at different depths with parallax.', ['parallax', 'depth', 'cards', '3d'], ['premium'], 4, 'Medium', 'Feature cards', MD.ModParallaxCards, true),
  e('mod-gradient-text', 'Animated Gradient Text', 'modern', 'Text with animated flowing gradient fill.', ['gradient', 'text', 'animated', 'colorful'], ['standard', 'premium'], 2, 'Easy', 'Headlines', MD.ModGradientText),
  e('mod-paper-tear', 'Paper Tear Reveal', 'modern', 'Paper tears apart to reveal the invitation.', ['paper', 'tear', 'rip', 'organic'], ['premium'], 2.2, 'Medium', 'Opening screen', MD.ModPaperTear, true),
  e('mod-glitch', 'Glitch Reveal', 'modern', 'Digital glitch effect with RGB split.', ['glitch', 'rgb', 'digital', 'retro'], ['premium'], 2, 'Medium', 'Tech events', MD.ModGlitch, true),
  e('mod-kinetic-type', 'Kinetic Typography', 'modern', 'Words bounce and rotate in kinetic motion.', ['kinetic', 'typography', 'bounce', 'motion'], ['standard', 'premium'], 3, 'Easy', 'Headlines', MD.ModKineticType),
  e('mod-scroll-snap-story', 'Scroll Snap Story', 'modern', 'Auto-advancing story with progress bars.', ['story', 'snap', 'auto', 'progress'], ['premium'], 6, 'Medium', 'Story sections', MD.ModScrollSnapStory, true),
  e('mod-inverse-mask', 'Inverse Mask Reveal', 'modern', 'Dark mask shrinks to reveal photo beneath.', ['mask', 'inverse', 'circle', 'photo'], ['standard', 'premium'], 2, 'Medium', 'Photo reveals', MD.ModInverseMask),
  e('mod-tilt-shift', 'Tilt-Shift Focus', 'modern', 'Photo blurs to sharp focus with saturation boost.', ['tilt-shift', 'blur', 'focus', 'photo'], ['premium'], 2.4, 'Medium', 'Hero photos', MD.ModTiltShift, true),
  e('mod-duotone', 'Duotone Reveal', 'modern', 'Stylized duotone photo with gradient overlay.', ['duotone', 'color', 'photo', 'stylized'], ['premium'], 2, 'Medium', 'Photo sections', MD.ModDuotone, true),
  e('mod-chromatic', 'Chromatic Aberration', 'modern', 'RGB channel split with pulsing aberration.', ['chromatic', 'rgb', 'aberration', 'glitch'], ['premium'], 2, 'Medium', 'Tech events', MD.ModChromatic, true),
  e('mod-counter', 'Scroll-Driven Counter', 'modern', 'Numbers count up to the event year.', ['counter', 'numbers', 'count', 'data'], ['standard', 'premium'], 2.5, 'Easy', 'Date reveal', MD.ModCounterReveal),
  e('mod-marquee', 'Marquee Scroll Text', 'modern', 'Infinite scrolling marquee text banner.', ['marquee', 'scroll', 'infinite', 'banner'], ['basic', 'standard'], 8, 'Easy', 'Decorative', MD.ModMarquee),
  e('mod-aperture', 'Aperture Reveal', 'modern', 'Camera aperture blades open to reveal content.', ['aperture', 'camera', 'blades', 'mechanical'], ['premium'], 2.2, 'Advanced', 'Photo reveals', MD.ModAperture, true),
  e('mod-shimmer-card', 'Shimmer Card', 'modern', 'Card with sweeping shimmer highlight.', ['shimmer', 'card', 'sweep', 'shine'], ['standard', 'premium'], 3, 'Easy', 'Cards', MD.ModShimmerCard),
  e('mod-pixel-dissolve', 'Pixel Dissolve', 'modern', 'Pixels dissolve in with colorful mosaic pattern.', ['pixel', 'dissolve', 'mosaic', 'retro'], ['premium'], 2.6, 'Advanced', 'Opening screen', MD.ModPixelDissolve, true),
  e('mod-wave-reveal', 'Wave Reveal', 'modern', 'Animated wave fills upward to reveal text.', ['wave', 'liquid', 'fill', 'animated'], ['standard', 'premium'], 2.4, 'Medium', 'Opening screen', MD.ModWaveReveal),
  e('mod-card-stack-3d', '3D Card Stack', 'modern', 'Cards cycle through a 3D stack with depth.', ['3d', 'stack', 'cards', 'cycle'], ['premium'], 5, 'Advanced', 'Invitation card', MD.ModCardStack3D, true),
  e('mod-scan-line', 'Scan Line Reveal', 'modern', 'Sci-fi scan line sweeps and sharpens text.', ['scan', 'line', 'sci-fi', 'sharp'], ['premium'], 2.2, 'Medium', 'Tech events', MD.ModScanLine, true),
  e('mod-flip-card', 'Flip Card Reveal', 'modern', 'Card flips to reveal invitation details.', ['flip', 'card', '3d', 'reveal'], ['standard', 'premium'], 2.4, 'Medium', 'Invitation card', MD.ModFlipCard),
  e('mod-aurora-curtain', 'Aurora Curtain', 'modern', 'Aurora-like colored blobs drift and reveal.', ['aurora', 'blob', 'color', 'dreamy'], ['premium'], 3, 'Medium', 'Opening screen', MD.ModAuroraCurtain, true),
  e('mod-torn-paper', 'Torn Paper Strips', 'modern', 'Colored paper strips tear across to reveal.', ['paper', 'torn', 'strips', 'colorful'], ['standard', 'premium'], 2, 'Medium', 'Opening screen', MD.ModTornPaper),
  e('mod-floating-stack', 'Floating Action Stack', 'modern', 'FAB expands into a stack of action buttons.', ['fab', 'floating', 'stack', 'action'], ['standard', 'premium'], 4, 'Medium', 'Navigation', MD.ModFloatingStack),
  e('mod-grain-glow', 'Grain + Glow Reveal', 'modern', 'Film grain texture with soft glow reveal.', ['grain', 'glow', 'texture', 'cinematic'], ['standard', 'premium'], 2.4, 'Medium', 'Opening screen', MD.ModGrainGlow),
];

function e(
  id: string,
  name: string,
  category: Effect['category'],
  description: string,
  tags: string[],
  pkg: Effect['package'],
  duration: number,
  difficulty: Effect['difficulty'],
  recommendedFor: string,
  preview: Effect['preview'],
  premium?: boolean,
  controls?: Effect['controls'],
): Effect {
  return { id, name, category, description, tags, package: pkg, duration, difficulty, recommendedFor, preview, premium, controls };
}

export const EFFECT_MAP: Record<string, Effect> = Object.fromEntries(EFFECTS.map((x) => [x.id, x]));

export function effectsByCategory(cat: string): Effect[] {
  return EFFECTS.filter((x) => x.category === cat);
}

export function categoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const eff of EFFECTS) counts[eff.category] = (counts[eff.category] || 0) + 1;
  return counts;
}
