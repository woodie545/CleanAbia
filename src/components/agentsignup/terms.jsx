import React from 'react'
import { SECTIONS } from './array';
import { useNavigate } from 'react-router';
import { IoIosArrowRoundBack } from 'react-icons/io';

export default function Terms({setPage}) {
  const nav = useNavigate()
  return (
    <div className='pt-10 font-sans bg-[#F3F5EE]'>
      <div className='md:pl-15 px-4 border-b border-gray-300 pb-10 mb-5'>
        <button>
            <button type='button' onClick={() => setPage('agentSignup')} className='flex items-center text-[#123A28] gap-1 font-semibold pb-7 '><IoIosArrowRoundBack className='text-xl'/>Back</button>
        </button>
        <div className=''>
          <h1 className='lg:text-2xl  text-2xl md:text-4xl font-semibold pb-3'>Terms & Conditions</h1>
          <p className='text-lg text-[#123A28]'>These terms govern your use of CleanAbia — please read them before you sign <br/> up as a Reporter or Agent, or use the platform in any way. </p>
        </div>
      </div>
      <div className='md:grid grid-cols-[250px_1fr] md:pl-15 pl-6 pr-6 lg:pr-25 md:pr-10 md:gap-8 lg:gap-10 text-[#123A28]'>
        <div className='md:flex flex-col hidden gap-4 pr-5 sticky top-0 h-screen overflow-y-auto scrollbar-none text-sm'>
          {SECTIONS.map((s) => (
            <nav className=" hover:text-[#51816A] hover:bg-[#E4EEE7] hover:py-1.5 hover:px-2.5 hover:rounded-md">
              <a key={s.id} href={`#${s.id}`}>{s.label}</a>
            </nav>
          ))} 
        </div>

        <div className="">
            <p className="pb-5">Last updated: 6 August 2026 · Version 1.0</p>
            <p style={{ marginBottom: "32px" }}>
              These Terms and Conditions ("Terms") form a binding agreement between you ("User," "you") and CleanAbia
              ("CleanAbia," "we," "us," "our") governing your access to and use of the CleanAbia website and application
              (the "Platform"), including all reporting, recycling, and rewards features offered through it. By creating
              an account, submitting a report, dropping off recyclables, or otherwise using the Platform, you confirm
              that you have read, understood, and agree to be bound by these Terms.
            </p>

            <section id="acceptance" className='pb-10 mb-10 border-b scroll-mt-50  border-gray-300'>
              <h2 className='font-semibold pb-4 text-black'>1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Platform in any capacity — as a Reporter, an Agent, or a visitor browsing
                without an account — you agree to these Terms and to our handling of your information as described in
                Section 12 (Privacy &amp; Data Protection). If you do not agree to these Terms, you must not use the
                Platform.
              </p>
              <p>
                We may offer certain features under additional guidelines or rules, which will be posted in connection
                with those features. Any such additional terms are incorporated into these Terms by reference.
              </p>
            </section>

            <section id="definitions" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>2. Definitions</h2>
              <ul className='pl-3 space-y-2'>
                <li><strong className=' text-black'>"Reporter"</strong> means a User registered to submit reports of dirty or improperly disposed-of waste sites through the Platform.</li>
                <li><strong className=' text-black'>"Agent"</strong> means a User registered to accept and carry out clean-up and recycling-collection jobs dispatched through the Platform.</li>
                <li><strong className=' text-black'>"Report"</strong> means a submission consisting of a photograph, geolocation data, and optional description of a waste site, made by a Reporter.</li>
                <li><strong className=' text-black'>"Job"</strong> means a clean-up or collection task made available to Agents following confirmation of a Report by CleanAbia.</li>
                <li><strong className=' text-black'>"Drop-off"</strong> means the physical delivery of recyclable materials by a User to a designated CleanAbia recycling zone.</li>
                <li><strong className=' text-black'>"Points"</strong> means the non-monetary units awarded to Reporters for confirmed Reports, as described in Section 8.</li>
                <li><strong className=' text-black'>"ABSSIN"</strong> means the Abia State Sanitation Identification Number, a reference identifier collected at registration.</li>
                <li><strong className=' text-black'>"NIN"</strong> means a National Identification Number, collected from Agents for identity purposes as described in Section 6.</li>
              </ul>
            </section>

            <section id="eligibility" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>3. Eligibility</h2>
              <p>
                You must be at least 18 years old, or the age of legal majority in your jurisdiction, to create an
                account on the Platform. By registering, you represent and warrant that you meet this requirement and
                that all information you provide is accurate, current, and complete.
              </p>
              <p>
                CleanAbia reserves the right to refuse registration, suspend, or terminate any account where eligibility
                cannot be confirmed or where information provided is found to be false or misleading.
              </p>
            </section>

            <section id="accounts" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>4. Account Registration &amp; Security</h2>
              <p>
                To use most features of the Platform, you must register for an account as either a Reporter or an
                Agent, providing accurate personal information as prompted during sign-up. You are responsible for
                maintaining the confidentiality of your account password and for all activity that occurs under your
                account.
              </p>
              <p>
                You agree to notify CleanAbia immediately of any unauthorized use of your account. CleanAbia is not
                liable for any loss or damage arising from your failure to safeguard your login credentials.
              </p>
              <p>
                A single User may hold both a Reporter and an Agent account where the Platform supports this, subject
                to each account independently meeting the applicable requirements in Sections 5 and 6.
              </p>
            </section>

            <section id="reporters" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>5. Reporter Terms</h2>
              <p>
                As a Reporter, you may submit Reports of waste sites for review. By submitting a Report, you agree
                that:
              </p>
              <ul>
                <li>The photograph submitted was captured live through the Platform at the time of submission, depicting a real, current site — not an old photograph, a stock image, or an image sourced from elsewhere.</li>
                <li>The location data submitted reflects your genuine, contemporaneous location at the time of capture.</li>
                <li>You will not submit duplicate Reports of the same site, or resubmit a site that has already been confirmed or dispatched, in an attempt to earn additional Points.</li>
                <li>Submission of a Report does not guarantee confirmation, dispatch of an Agent, or the award of Points — all Reports are subject to review at CleanAbia's discretion.</li>
                <li>CleanAbia may reject, and you may not receive Points for, any Report found to be inaccurate, duplicated, fraudulent, or that otherwise violates Section 10 (Prohibited Conduct).</li>
              </ul>
              <p>
                While using the reporting feature, you are responsible for your own safety. Do not enter traffic,
                trespass on private property, or place yourself in danger to capture a Report.
              </p>
            </section>

            <section id="agents" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>6. Agent Terms &amp; Identity Verification</h2>
              <p>
                As an Agent, you may accept Jobs dispatched following the confirmation of a Report. By registering as
                an Agent, you agree that:
              </p>
              <ul>
                <li>You will provide accurate identity information, including your ABSSIN and NIN, at the time of registration.</li>
                <li>
                  Where the Platform's current identity verification process does not include automated confirmation
                  against the National Identity Management Commission's (NIMC) records, CleanAbia reserves the right
                  to independently verify any information you provide, by any lawful means, before or after granting
                  you access to Jobs, and to suspend your account pending such verification.
                </li>
                <li>Jobs are made available on a first-to-accept basis. Once you accept a Job, you are expected to complete it in good faith and within a reasonable time.</li>
                <li>You will not misrepresent the completion status of a Job, submit false completion evidence, or claim payment for work not genuinely performed.</li>
                <li>CleanAbia may decline to dispatch further Jobs to your account, or suspend your account, if your completion rate, conduct, or user rating falls below standards communicated to you.</li>
              </ul>
              <p>
                You acknowledge that Agent status does not constitute employment by CleanAbia. Agents operate as
                independent participants in the Platform, and nothing in these Terms creates an employer-employee,
                partnership, or agency relationship between you and CleanAbia, except where required by applicable law.
              </p>
            </section>

            <section id="recycling" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>7. Recycling Drop-off Terms</h2>
              <p>
                Users may bring recyclable materials to designated CleanAbia drop-off zones during posted hours. By
                making a Drop-off, you agree that:
              </p>
              <ul>
                <li>Materials submitted must genuinely fall within the accepted categories communicated at the zone or on the Platform; mixing in ineligible, contaminated, or hazardous material to inflate weight is prohibited.</li>
                <li>Weight and material-type determinations made by CleanAbia or its recycling-centre partners at the point of Drop-off are final for the purposes of calculating any associated reward.</li>
                <li>Rates for recyclable materials are set by CleanAbia, published on the Platform, and may be revised from time to time without prior notice, provided that revisions do not affect a Drop-off already logged.</li>
              </ul>
            </section>

            <section id="rewards" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>8. Points, Rewards &amp; Payments</h2>
              <p>
                Points and any associated monetary rewards are provided at CleanAbia's discretion as an incentive for
                genuine participation in the Platform, and do not constitute wages, a guaranteed income, or a
                contractual entitlement independent of these Terms.
              </p>
              <ul>
                <li>Points are awarded only for Reports and Drop-offs confirmed as genuine by CleanAbia, and may be adjusted, reversed, or withheld where fraud, duplication, or a violation of these Terms is discovered, including after Points have already been credited.</li>
                <li>Any conversion of Points or Drop-off weight into monetary value, and any process for withdrawing such value, will be governed by the rates, thresholds, and payment methods published on the Platform at the relevant time, which may change from time to time.</li>
                <li>Where a payment or disbursement feature is not yet available on the Platform, any balance displayed to you is informational only and does not represent funds held on your behalf or an obligation to pay until such a feature is live and the payment has actually been processed.</li>
                <li>You are solely responsible for any tax obligations arising from rewards or payments you receive through the Platform.</li>
              </ul>
            </section>

            <section id="permissions" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>9. Location &amp; Camera Permissions</h2>
              <p>
                Core features of the Platform — including submitting a Report — require access to your device's
                camera and location services. By using these features, you consent to CleanAbia collecting your
                device's geolocation data and photographs you capture through the Platform for the purposes described
                in Section 12.
              </p>
              <p>
                You may decline to grant these permissions, but doing so will prevent you from using the features that
                depend on them. You may revoke permissions at any time through your device's settings.
              </p>
            </section>

            <section id="conduct" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>10. Prohibited Conduct</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Submit false, duplicated, staged, or misleading Reports, Job completions, or Drop-offs.</li>
                <li>Use another person's identity, account, ABSSIN, or NIN, or permit another person to use yours.</li>
                <li>Attempt to manipulate, exploit, or reverse-engineer the Points or rewards system.</li>
                <li>Harass, threaten, or endanger any other User, including Reporters and Agents interacting through a Job.</li>
                <li>Use the Platform for any unlawful purpose, or in a manner that violates the rights of any third party.</li>
                <li>Interfere with, disrupt, or attempt to gain unauthorized access to the Platform, its accounts, or its underlying systems.</li>
              </ul>
              <p>
                Violation of this section may result in suspension or termination of your account under Section 17, in
                addition to any other remedy available to CleanAbia under law.
              </p>
            </section>

            <section id="content" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4 text-black'>11. Content You Submit &amp; Intellectual Property</h2>
              <p>
                You retain ownership of the photographs and other content you submit through the Platform ("User
                Content"). By submitting User Content, you grant CleanAbia a worldwide, royalty-free, non-exclusive
                license to use, store, reproduce, and display that content for the purposes of operating, improving,
                and promoting the Platform, including sharing confirmed Reports with Agents and relevant authorities
                for the purpose of dispatching and verifying clean-up work.
              </p>
              <p>
                The Platform itself — including its design, branding, logo, text, and underlying software — is the
                property of CleanAbia or its licensors and is protected by applicable intellectual property laws. You
                may not copy, modify, distribute, or create derivative works from the Platform without prior written
                permission.
              </p>
            </section>

            <section id="privacy" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>12. Privacy &amp; Data Protection</h2>
              <p>
                CleanAbia collects personal information — including your name, contact details, address or location,
                ABSSIN, and, for Agents, NIN — in order to operate the Platform's core features described in these
                Terms. We process this information in accordance with the Nigeria Data Protection Act and its
                implementing regulations.
              </p>
              <ul>
                <li>Identity information such as your NIN is collected for verification purposes and is not displayed publicly to other Users.</li>
                <li>Location data submitted with a Report is used to dispatch Agents and is not published in a way that identifies your personal location history.</li>
                <li>You may request access to, correction of, or deletion of your personal information, subject to CleanAbia's legitimate need to retain records for fraud prevention, dispute resolution, or legal compliance.</li>
              </ul>
              <p>
                Where CleanAbia publishes a separate Privacy Policy, that document governs the specifics of data
                collection and processing and is incorporated into these Terms by reference.
              </p>
            </section>

            <section id="availability" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>13. Service Availability</h2>
              <p>
                CleanAbia does not guarantee that the Platform will be available at all times or free from
                interruption, error, or delay. We may modify, suspend, or discontinue any part of the Platform,
                temporarily or permanently, with or without notice.
              </p>
            </section>

            <section id="disclaimers" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>14. Disclaimers</h2>
              <p>
                The Platform is provided "as is" and "as available," without warranties of any kind, whether express
                or implied, including but not limited to warranties of merchantability, fitness for a particular
                purpose, or non-infringement. CleanAbia does not warrant that Reports will be acted upon within any
                particular timeframe, that a dispatched Agent will complete a Job to any particular standard, or that
                Points will convert to any particular monetary value.
              </p>
            </section>

            <section id="liability" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>15. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, CleanAbia and its officers, employees, and affiliates shall
                not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss
                of profits, data, or goodwill, arising out of or in connection with your use of the Platform, whether
                based on warranty, contract, tort, or any other legal theory, even if CleanAbia has been advised of
                the possibility of such damages.
              </p>
              <p>
                CleanAbia's total liability to you for any claim arising from these Terms or your use of the Platform
                shall not exceed the greater of (a) the total amount of rewards actually paid to you through the
                Platform in the six months preceding the claim, or (b) ₦10,000 (ten thousand Naira).
              </p>
            </section>

            <section id="indemnification" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>16. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless CleanAbia, its officers, employees, and affiliates from any
                claim, demand, loss, or damage, including reasonable legal fees, arising out of your violation of
                these Terms, your User Content, or your use of the Platform.
              </p>
            </section>

            <section id="termination" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>17. Suspension &amp; Termination</h2>
              <p>
                CleanAbia may suspend or terminate your account, with or without notice, if we believe in good faith
                that you have violated these Terms, engaged in fraudulent or harmful conduct, or where required by
                law. You may deactivate your account at any time by contacting us as described in Section 20.
              </p>
              <p>
                Upon termination, your right to use the Platform ceases immediately. Sections of these Terms that by
                their nature should survive termination — including Sections 11, 12, 15, 16, and 18 — will continue
                to apply.
              </p>
            </section>

            <section id="disputes" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>18. Dispute Resolution &amp; Governing Law</h2>
              <p>
                These Terms are governed by the laws of the Federal Republic of Nigeria. Any dispute arising out of or
                relating to these Terms or your use of the Platform shall first be addressed through good-faith
                negotiation between you and CleanAbia. If a dispute cannot be resolved informally within 30 days, it
                shall be subject to the exclusive jurisdiction of the courts sitting in Abia State, Nigeria.
              </p>
            </section>

            <section id="changes" className='pb-10 mb-10 border-b scroll-mt-50 border-gray-300'>
              <h2  className='font-semibold pb-4  text-black'>19. Changes to These Terms</h2>
              <p>
                CleanAbia may revise these Terms from time to time. Where changes are material, we will make
                reasonable efforts to notify Users — such as by posting a notice on the Platform or updating the "Last
                updated" date above. Your continued use of the Platform after any revision takes effect constitutes
                your acceptance of the revised Terms.
              </p>
            </section>

            <section id="contact" className='pb-10 mb-10 scroll-mt-50'>
              <h2  className='font-semibold pb-4  text-black'>20. Contact Us</h2>
              <p>
                If you have questions about these Terms, please contact us at{" "}
                <a href="mailto:hello@cleanabia.ng" style={{ color: "var(--color-forest)", fontWeight: 600 }}>
                  hello@cleanabia.ng
                </a>{" "}
                or through the details on our{" "}
                <a
                  href="#"
                  style={{ color: "var(--color-forest)", fontWeight: 600 }}
                  onClick={(e) => { e.preventDefault(); nav("/contact"); }}
                >
                  Contact page
                </a>.
              </p>
            </section>
        </div>
      </div>
    </div>
  )
}
