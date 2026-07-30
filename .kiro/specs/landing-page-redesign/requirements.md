# Requirements Document

## Introduction

Complete redesign of the Loaniyo fintech platform landing page. The current page at `src/app/page.tsx` is a basic DeFi wallet-connect interface. The redesign transforms it into a premium, marketing-focused landing page inspired by Stripe, Mercury, Ramp, and Linear — showcasing Loaniyo's digital lending services to individuals and businesses. The page must be built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion, delivering a polished experience with smooth animations, responsive layouts, and accessibility compliance.

## Glossary

- **Landing_Page**: The public-facing marketing page at the root route (`/`) of the Loaniyo web application
- **Navigation_Bar**: The sticky top-level navigation component with logo, links, and action buttons
- **Hero_Section**: The primary above-the-fold section with headline, CTAs, and animated mockup
- **Trusted_By_Section**: The social proof marquee section displaying partner/client logos
- **Statistics_Section**: The section displaying key platform metrics with animated counters
- **Features_Grid**: The section displaying platform capabilities in a card-based grid layout
- **Loan_Calculator**: The interactive section where users can estimate loan repayments
- **How_It_Works_Section**: The timeline section explaining the loan application process
- **Dashboard_Showcase**: The section displaying a preview of the platform dashboard interface
- **Mobile_App_Showcase**: The section showcasing mobile app screens with animated phone mockup
- **Security_Section**: The section highlighting security features and compliance certifications
- **Testimonials_Section**: The section displaying user reviews in a carousel format
- **FAQ_Section**: The accordion-based section answering common user questions
- **CTA_Section**: The call-to-action banner encouraging user sign-up
- **Footer**: The bottom navigation section with links, newsletter signup, and legal information
- **Framer_Motion**: The React animation library used for entrance animations, hover effects, and scroll-triggered transitions
- **Glassmorphism**: A design style using translucent backgrounds with backdrop blur to create a frosted-glass effect
- **Dark_Mode**: The alternate color scheme using dark backgrounds for reduced eye strain
- **Light_Mode**: The default color scheme using white/light backgrounds
- **Viewport**: The visible area of the web page within the browser window
- **Scroll_Reveal**: An animation pattern where elements animate into view as the user scrolls down the page
- **Space_Grotesk**: The sans-serif typeface used for headings throughout the Landing_Page
- **Inter**: The sans-serif typeface used for body text throughout the Landing_Page

## Requirements

### Requirement 1: Navigation Bar

**User Story:** As a visitor, I want a persistent navigation bar so that I can quickly access any section of the page or sign in to the platform.

#### Acceptance Criteria

1. THE Navigation_Bar SHALL display the Loaniyo logo, navigation links (Home, Features, How It Works, Security, Pricing, FAQ, Contact), a Sign In link, and a Get Started button
2. WHEN the user scrolls past the Hero_Section, THE Navigation_Bar SHALL remain fixed to the top of the Viewport with a semi-transparent background (opacity between 0.7 and 0.9) and a backdrop blur of at least 8px
3. WHEN a navigation link is clicked, THE Landing_Page SHALL smooth-scroll to the corresponding section within 300ms to 800ms
4. WHEN the Viewport width is below 768px, THE Navigation_Bar SHALL collapse navigation links into a hamburger menu icon
5. WHEN the hamburger menu icon is activated, THE Navigation_Bar SHALL display a full-screen overlay menu with all navigation links and a visible close button
6. WHEN the overlay menu close button is activated or a navigation link within the overlay is clicked, THE Navigation_Bar SHALL dismiss the overlay menu
7. THE Navigation_Bar SHALL be accessible via keyboard navigation with focus indicators that have a minimum contrast ratio of 3:1 against adjacent colors on all interactive elements

### Requirement 2: Hero Section

**User Story:** As a visitor, I want an impactful hero section so that I immediately understand what Loaniyo offers and feel compelled to explore further.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the headline "Loans in Minutes. Not Days." using Space_Grotesk at a minimum font size of 48px on desktop viewports (1024px and above) and a minimum font size of 32px on mobile viewports (below 1024px)
2. THE Hero_Section SHALL display a supporting subheadline of no more than 120 characters that describes Loaniyo's fast loan approval and digital lending value proposition, using a font size of at least 16px
3. THE Hero_Section SHALL display two call-to-action buttons: a primary "Get Started" button that navigates to the wallet connection flow, and a secondary "See How It Works" button that scrolls to the How_It_Works_Section of the Landing_Page
4. THE Hero_Section SHALL display a phone mockup graphic containing visible representations of loan balance, repayment progress, approval status, and notifications
5. WHEN the Hero_Section enters the Viewport, THE Landing_Page SHALL animate the phone mockup and floating cards using Framer_Motion with a fade-up effect (opacity 0 to 1, translateY 20px to 0) over a duration between 400ms and 800ms, with a stagger delay between 100ms and 200ms per element
6. THE Hero_Section SHALL display floating cards with labels including "Approval", "Credit Score", "Payment Reminder", and "Verified Identity" that animate with continuous looping motion not exceeding 10px of vertical displacement and a cycle duration between 2 seconds and 4 seconds
7. THE Hero_Section SHALL display a background gradient using the primary (#2563EB) and secondary (#4F46E5) colors with animated blob shapes that move at a cycle duration of no less than 6 seconds

### Requirement 3: Trusted By Section

**User Story:** As a visitor, I want to see which companies trust Loaniyo so that I gain confidence in the platform's credibility.

#### Acceptance Criteria

1. THE Trusted_By_Section SHALL display a section heading of "Trusted By" or equivalent label and a minimum of 6 company logos rendered in grayscale with a minimum display height of 32px per logo
2. THE Trusted_By_Section SHALL animate logos in a continuous horizontal marquee that scrolls from right to left, completing one full cycle in no more than 30 seconds, and loops seamlessly without visible gaps or jumps between repetitions
3. WHEN the user hovers over the logo strip, THE Trusted_By_Section SHALL pause the marquee animation, and SHALL resume the animation from the paused position when the pointer leaves the logo strip
4. WHILE the user has enabled reduced-motion in operating system settings, THE Trusted_By_Section SHALL display all logos in a static arrangement without marquee animation

### Requirement 4: Statistics Section

**User Story:** As a visitor, I want to see platform performance metrics so that I can evaluate the reliability and scale of Loaniyo.

#### Acceptance Criteria

1. THE Statistics_Section SHALL display the following four metrics, each in its own card: "99.9% Platform Uptime", "5 min Average Application Time", "Bank-grade Security", and "24/7 Availability"
2. WHEN at least 50% of the Statistics_Section enters the viewport, THE Landing_Page SHALL animate the numeric metric values ("99.9" and "5") using a counting-up animation from zero to the target value over a duration of 2 seconds
3. THE Statistics_Section SHALL display non-numeric metrics ("Bank-grade Security" and "24/7 Availability") as static text without a counting animation
4. THE Statistics_Section SHALL trigger the counting animation only once per page load, displaying the final target values for any subsequent scrolls into the viewport
5. WHILE the Statistics_Section has not yet entered the viewport, THE Statistics_Section SHALL display "0" in place of each numeric metric value

### Requirement 5: Features Grid

**User Story:** As a visitor, I want to explore all platform features so that I can determine whether Loaniyo meets my lending needs.

#### Acceptance Criteria

1. THE Features_Grid SHALL display feature cards for: Instant Loan Applications, Track Repayments, Credit History, Secure Authentication, Document Upload, Digital Agreements, Notifications, Payment Reminders, Loan Calculator, and Admin Dashboard
2. Each feature card SHALL display an icon from Lucide Icons, a title (maximum 30 characters), and a descriptive sentence (maximum 80 characters)
3. WHEN a user hovers over a feature card, THE Features_Grid SHALL translate the card upward by 4–8px and apply a box-shadow glow with a spread no greater than 8px and opacity no greater than 0.15, animated over 200–300ms using Framer_Motion
4. WHEN the Features_Grid enters the Viewport, THE Landing_Page SHALL stagger-animate feature cards into view with a delay of 50–100ms between each card and an individual card animation duration of 300–500ms
5. THE Features_Grid SHALL render cards in at least 2 distinct size variants (e.g., standard and featured) such that no more than 4 consecutive cards share the same dimensions
6. THE Features_Grid SHALL reflow cards into a single-column layout on viewports narrower than 640px and display at least 2 columns on viewports 640px or wider

### Requirement 6: Interactive Loan Calculator

**User Story:** As a potential borrower, I want to calculate estimated loan repayments so that I can make an informed decision before applying.

#### Acceptance Criteria

1. THE Loan_Calculator SHALL provide a slider control for loan amount selection with a minimum value of 1,000 and a maximum value of 100,000
2. THE Loan_Calculator SHALL provide controls for selecting interest rate (range: 1% to 30% in 0.5% increments) and loan duration (range: 6 to 60 months in 1-month increments)
3. WHEN any input value changes, THE Loan_Calculator SHALL recalculate and display the monthly payment and total repayment amount within 100ms
4. THE Loan_Calculator SHALL display a chart showing the breakdown of total principal versus total interest for the selected loan configuration
5. WHEN a calculated output value changes, THE Loan_Calculator SHALL animate the numeric transition from the previous value to the new value within 500ms
6. THE Loan_Calculator SHALL be operable via keyboard input for all slider and control elements with visible focus indicators
7. THE Loan_Calculator SHALL display all monetary values with a currency symbol and two decimal places

### Requirement 7: How It Works Section

**User Story:** As a visitor, I want to understand the loan application process so that I know what steps are involved before signing up.

#### Acceptance Criteria

1. THE How_It_Works_Section SHALL display the following steps in sequential order: Create Account, Verify Identity, Apply for Loan, Review, Approval, Receive Funds, and Repay Easily
2. THE How_It_Works_Section SHALL display steps in a vertical timeline layout with animated connectors between each step
3. WHEN the How_It_Works_Section enters the Viewport, THE Landing_Page SHALL sequentially animate each step and its connector into view with a stagger delay of no more than 300ms between consecutive steps
4. THE How_It_Works_Section SHALL display for each step a numbered indicator (1 through 7), a title matching the step name, and a description of no more than 120 characters summarizing that step
5. THE How_It_Works_Section SHALL use an ordered list or equivalent semantic markup so that assistive technologies convey the sequential step order and total step count to users

### Requirement 8: Dashboard Showcase

**User Story:** As a visitor, I want to preview the platform dashboard so that I can visualize what the experience looks like after signing up.

#### Acceptance Criteria

1. THE Dashboard_Showcase SHALL display a preview image or component representing the Loaniyo dashboard interface that spans a minimum of 80% of the content area width on desktop Viewports
2. THE Dashboard_Showcase SHALL include visual representations of Loan Summary, Upcoming Payments, Recent Activity, Notifications, Repayment Progress, and Charts, each displayed as a distinct labeled card element
3. WHEN the Dashboard_Showcase enters the Viewport for the first time, THE Landing_Page SHALL animate the preview with a fade-up and scale effect completing within 600ms using Framer_Motion
4. THE Dashboard_Showcase SHALL use a border-radius of at least 12px on card elements, a box-shadow with no more than 30% opacity, and a card-based layout with visible separation between each dashboard element

### Requirement 9: Mobile App Showcase

**User Story:** As a visitor, I want to see the mobile app experience so that I know Loaniyo is accessible on my phone.

#### Acceptance Criteria

1. THE Mobile_App_Showcase SHALL display an animated phone mockup frame
2. THE Mobile_App_Showcase SHALL cycle through at least 5 app screen representations including Login, Dashboard, Apply, Repayment, and Notifications, advancing automatically every 3 seconds per screen
3. THE Mobile_App_Showcase SHALL display at least 3 floating UI elements around the phone mockup highlighting specific mobile features including biometric login, push notifications, and instant transfers
4. WHEN the Mobile_App_Showcase enters the Viewport, THE Landing_Page SHALL animate the phone mockup and floating elements into view using Framer_Motion

### Requirement 10: Security Section

**User Story:** As a visitor, I want to understand how Loaniyo protects my data and funds so that I feel safe using the platform.

#### Acceptance Criteria

1. THE Security_Section SHALL display the following security measures as individual cards, each containing a Lucide Icons icon, a title, and a descriptive text of 15 to 80 characters: bank-grade encryption, KYC verification, identity protection, secure authentication, fraud detection, data privacy, and regulatory compliance
2. THE Security_Section SHALL display a minimum of 3 security certification badges or trust indicators
3. WHEN a user hovers over a security feature card, THE Security_Section SHALL expand the card to reveal additional descriptive text (between 40 and 200 characters) using a Framer_Motion scale and fade animation
4. IF the user is on a touch device or navigates via keyboard, THEN THE Security_Section SHALL expand the security feature card description on tap or on focus activation
5. THE Security_Section SHALL use a dark background variant to visually differentiate it from surrounding sections

### Requirement 11: Testimonials Section

**User Story:** As a visitor, I want to read reviews from other users so that I can gauge the quality of Loaniyo's service.

#### Acceptance Criteria

1. THE Testimonials_Section SHALL display testimonial cards each containing an avatar, name, occupation, a star rating on a scale of 1 to 5, and review text
2. THE Testimonials_Section SHALL display a minimum of 4 testimonial entries
3. THE Testimonials_Section SHALL implement a carousel with navigation controls (previous/next) and a position indicator showing the current testimonial relative to the total count
4. THE Testimonials_Section SHALL auto-advance the carousel every 5 seconds
5. WHEN a user interacts with carousel navigation controls, THE Testimonials_Section SHALL pause auto-advancement and resume auto-advancement after 10 seconds of inactivity
6. THE Testimonials_Section SHALL loop the carousel continuously, advancing from the last testimonial back to the first

### Requirement 12: FAQ Section

**User Story:** As a visitor, I want answers to common questions so that I can resolve concerns without contacting support.

#### Acceptance Criteria

1. THE FAQ_Section SHALL display questions in an accordion format with expandable/collapsible answers, with all items in the collapsed state on initial page load
2. THE FAQ_Section SHALL include the following questions at minimum: "Who can apply for a loan?", "How long does approval take?", "What documents are required?", "Are there hidden fees?", and "How secure is my data?"
3. WHEN a user activates an accordion item, THE FAQ_Section SHALL expand the answer with a height transition animation completing within 200ms to 300ms
4. WHEN a user activates an already-expanded accordion item, THE FAQ_Section SHALL collapse the answer with a height transition animation completing within 200ms to 300ms
5. THE FAQ_Section SHALL allow only one accordion item to be expanded at a time, automatically collapsing any previously expanded item when a new item is activated
6. THE FAQ_Section SHALL be operable via keyboard, allowing activation of accordion items using Enter and Space keys, and SHALL communicate the expanded or collapsed state of each item to assistive technologies using aria-expanded attributes

### Requirement 13: Call To Action Section

**User Story:** As a visitor who has explored the page, I want a clear final prompt so that I can take the next step toward applying for a loan.

#### Acceptance Criteria

1. THE CTA_Section SHALL display the headline "Ready to access smarter loans?"
2. THE CTA_Section SHALL display a supporting subheadline of no more than 120 characters describing the next step the visitor can take
3. THE CTA_Section SHALL display two buttons: "Apply Now" (primary) and "Contact Sales" (secondary)
4. THE CTA_Section SHALL use a gradient background composed of the primary (#2563EB) and secondary (#4F46E5) colors to differentiate it from adjacent sections
5. WHEN the CTA_Section enters the Viewport for the first time, THE Landing_Page SHALL animate the content with a fade-up effect completing within 600ms

### Requirement 14: Footer

**User Story:** As a visitor, I want a comprehensive footer so that I can find legal information, support links, and ways to stay connected with Loaniyo.

#### Acceptance Criteria

1. THE Footer SHALL display the Loaniyo logo and a company tagline of no more than 120 characters
2. THE Footer SHALL display link groups for Company (About, Blog, Careers), Support (Help Center, Privacy Policy, Terms of Service, Contact), and a minimum of 3 Social Media icons linking to external platform profiles
3. THE Footer SHALL provide a newsletter email subscription input with a submit button that validates the input as a properly formatted email address before submission
4. IF the newsletter email input does not contain a valid email format, THEN THE Footer SHALL display an inline error indication and prevent submission
5. WHEN a valid email address is submitted via the newsletter input, THE Footer SHALL display a visible confirmation message indicating successful subscription
6. THE Footer SHALL display a copyright notice with the current year
7. THE Footer SHALL be accessible via keyboard navigation with visible focus indicators on all interactive elements

### Requirement 15: Responsive Design

**User Story:** As a mobile user, I want the landing page to adapt to my device so that I have an optimal viewing experience regardless of screen size.

#### Acceptance Criteria

1. THE Landing_Page SHALL render on Viewport widths from 320px to 2560px without horizontal overflow, content truncation, or overlapping elements
2. WHEN the Viewport width is below 768px, THE Landing_Page SHALL stack multi-column layouts into single-column layouts
3. WHEN the Viewport width is below 768px, THE Landing_Page SHALL increase touch target sizes to a minimum of 44px by 44px
4. THE Landing_Page SHALL use relative units and fluid typography that scales proportionally with Viewport width, with a minimum body font size of 14px and a maximum body font size of 18px
5. THE Landing_Page SHALL scale all images and media elements to fit within their parent container width without distortion or horizontal overflow

### Requirement 16: Dark and Light Mode

**User Story:** As a user, I want to switch between dark and light themes so that I can use the page comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE Landing_Page SHALL apply the theme in the following priority order: stored user preference first, then operating system preferred color scheme, then Light_Mode as the final fallback
2. THE Landing_Page SHALL provide a toggle control in the Navigation_Bar that switches between Dark_Mode and Light_Mode and visually indicates the currently active theme
3. WHEN the user activates Dark_Mode, THE Landing_Page SHALL switch to a dark background (#0F172A) with light text (#F8FAFC) across all sections and components within 300ms
4. WHEN the user activates Light_Mode, THE Landing_Page SHALL switch to a white background (#FFFFFF) with dark text (#111827) across all sections and components within 300ms
5. WHEN the user toggles the theme, THE Landing_Page SHALL persist the selected preference in local storage so that the preference is retained across browser sessions
6. IF local storage is unavailable, THEN THE Landing_Page SHALL continue functioning in the current theme without persisting the preference
7. THE Landing_Page SHALL apply the resolved theme before rendering page content to prevent a flash of incorrect theme colors on page load

### Requirement 17: Animations and Performance

**User Story:** As a user, I want smooth animations that enhance the experience without degrading page performance.

#### Acceptance Criteria

1. THE Landing_Page SHALL use Framer_Motion for all entrance animations, hover effects, and scroll-triggered transitions with a duration between 200ms and 700ms per animation
2. WHEN an element configured with Scroll_Reveal enters the Viewport by at least 20% of its height, THE Landing_Page SHALL trigger its entrance animation only once per page load
3. WHILE the user has enabled reduced-motion in operating system settings, THE Landing_Page SHALL disable all animations except focus indicators and theme transitions, rendering elements in their final visual state without motion
4. THE Landing_Page SHALL achieve a Lighthouse performance score of 90 or above on mobile devices using Lighthouse default mobile throttling settings (simulated slow 4G, 4x CPU slowdown)
5. THE Landing_Page SHALL lazy-load all images and components located below the initial Viewport that exceed 50KB in bundle size, deferring their network requests until they are within one Viewport height of becoming visible

### Requirement 18: Accessibility

**User Story:** As a user with assistive technology, I want the landing page to be navigable and understandable so that I can access all content and functionality.

#### Acceptance Criteria

1. THE Landing_Page SHALL provide a skip navigation link as the first focusable element that allows keyboard users to bypass the Navigation_Bar and jump directly to the main content area
2. THE Landing_Page SHALL use semantic HTML elements (nav, main, section, article, header, footer) for all major content areas
3. THE Landing_Page SHALL provide descriptive alt text for all informational images, and decorative elements SHALL be marked with aria-hidden="true" or use empty alt attributes
4. THE Landing_Page SHALL maintain a minimum color contrast ratio of 4.5:1 for body text and 3:1 for large text as defined by WCAG 2.1 Level AA
5. THE Landing_Page SHALL be fully navigable using keyboard only in logical DOM order, with a visible focus indicator that has a minimum contrast ratio of 3:1 against adjacent colors on all interactive elements
6. THE Landing_Page SHALL include appropriate ARIA landmarks (banner, navigation, main, contentinfo) and all form inputs SHALL have visible associated labels or aria-label attributes

### Requirement 19: Typography and Visual Identity

**User Story:** As a visitor, I want a cohesive and premium visual experience so that I perceive Loaniyo as a trustworthy, modern financial platform.

#### Acceptance Criteria

1. THE Landing_Page SHALL use Space_Grotesk for all headings (H1 through H6) and Inter for all body text, with a system sans-serif fallback stack displayed if the primary web fonts fail to load
2. THE Landing_Page SHALL use the defined color palette: primary (#2563EB), secondary (#4F46E5), accent (#06B6D4), success (#10B981), warning (#F59E0B), text (#111827), and muted (#6B7280)
3. THE Landing_Page SHALL use spacing values that are multiples of 8px (8px, 16px, 24px, 32px, 48px, 64px) for all margins, padding, and gaps between elements
4. THE Landing_Page SHALL use Lucide Icons for all iconography throughout the page, rendered at a minimum size of 20px by 20px for inline icons and 24px by 24px for standalone icons
5. THE Landing_Page SHALL apply font-weight 600 to all button text, with horizontal padding of 16px to 24px, vertical padding of 8px to 12px, and a border-radius of 8px across all button instances
6. THE Landing_Page SHALL define a heading type scale where H1 is a minimum of 48px, H2 is a minimum of 36px, H3 is a minimum of 24px, and body text is a minimum of 16px on Viewport widths of 768px and above

### Requirement 20: SEO and Metadata

**User Story:** As a marketing stakeholder, I want the landing page to be optimized for search engines so that potential users can discover Loaniyo through organic search.

#### Acceptance Criteria

1. THE Landing_Page SHALL include a page title between 30 and 60 characters that contains the brand name "Loaniyo" and a lending-related keyword, a meta description between 120 and 160 characters summarizing the platform's lending services, and Open Graph tags including og:title, og:description, og:image, og:type, and og:url
2. THE Landing_Page SHALL use a single H1 heading element for the primary page headline
3. THE Landing_Page SHALL use heading elements (H2, H3) in correct hierarchical order without skipping levels
4. THE Landing_Page SHALL include structured data (JSON-LD) with an Organization schema containing name, url, and logo properties, and a FAQPage schema containing one entry for each question displayed in the FAQ_Section
5. THE Landing_Page SHALL include a canonical URL meta tag pointing to the page's primary URL
6. THE Landing_Page SHALL render all metadata and structured data in the initial HTML response without requiring client-side JavaScript execution
