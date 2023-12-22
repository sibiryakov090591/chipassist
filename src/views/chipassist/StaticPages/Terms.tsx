import React, { useEffect } from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

const Terms = () => {
  const { t } = useI18n("terms");
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div style={{ padding: "30px 50px" }}>
      <h1 style={{ fontSize: 26, color: "#000000" }}>{t("h")}</h1>

      <p style={{ color: "#595959", fontSize: 14, fontWeight: 600 }}>{t("last_updated")}</p>
      <br />
      <p>
        {t("p1.p1")} ChipAssist AG {t("p1.p2")} <a href="https://chipassist.com">https://chipassist.com</a> {t("p1.p3")}
      </p>
      <p>{t("p2")}</p>
      <p>{t("p3")}</p>
      <p>{t("p4")}</p>
      <p>{t("p5")}</p>

      <h2 style={{ fontSize: 19, color: "#000000" }}>{t("intellectual_property")}</h2>
      <p>{t("p6")}</p>
      <p>{t("p7")}</p>

      <h2 style={{ fontSize: 19, color: "#000000" }}>{t("user_permission")}</h2>
      <p>{t("p8")}</p>
      <p>{t("p9")}</p>
      <p>{t("p10")}</p>
      <p>{t("p11")}</p>

      <h2 style={{ fontSize: 19, color: "#000000" }}>{t("user_registration")}</h2>
      <p>{t("p12")}</p>

      <h2 style={{ fontSize: 19, color: "#000000" }}>{t("marketplace")}</h2>
      <p>{t("p13")}</p>
      <p>{t("p14")}</p>

      <h2 style={{ fontSize: 19, color: "#000000" }}>{t("purchases")}</h2>
      <p>{t("p15")}:</p>
      <ul style={{ marginLeft: 40 }}>
        <li>{t("p_list.li1")}</li>
        <li>{t("p_list.li2")}</li>
      </ul>
      <br />
      <p>{t("p16")}</p>
      <p>{t("p17")}</p>
      <p>{t("p18")}</p>

      <h2 style={{ fontSize: 19, color: "#000000" }}>{t("return")}</h2>
      <p>{t("p19")}</p>

      <h2 style={{ fontSize: 19, color: "#000000" }}>{t("prohibited")}</h2>
      <p>{t("p20")}</p>
      <p>{t("p21")}:</p>
      {/*  <ol style={{ marginLeft: 40 }}> */}
      {/*    <li> */}
      {/*      Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a */}
      {/*      collection, compilation, database, or directory without written permission from us. */}
      {/*    </li> */}
      {/*    <li> */}
      {/*      Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account */}
      {/*      information such as user passwords. */}
      {/*    </li> */}
      {/*    <li> */}
      {/*      Circumvent, disable, or otherwise interfere with security-related features of the Site, including features */}
      {/*      that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site */}
      {/*      and/or the Content contained therein. */}
      {/*    </li> */}
      {/*    <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.</li> */}
      {/*    <li>Use any information obtained from the Site in order to harass, abuse, or harm another person.</li> */}
      {/*    <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li> */}
      {/*    <li>Use the Site in a manner inconsistent with any applicable laws or regulations.</li> */}
      {/*    <li>Engage in unauthorized framing of or linking to the Site.</li> */}
      {/*    <li> */}
      {/*      Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including */}
      {/*      excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with */}
      {/*      any party’s uninterrupted use and enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes */}
      {/*      with the use, features, functions, operation, or maintenance of the Marketplace Offerings. */}
      {/*    </li> */}
      {/*    <li> */}
      {/*      Engage in any automated use of the system, such as using scripts to send comments or messages, or using any */}
      {/*      data mining, robots, or similar data gathering and extraction tools. */}
      {/*    </li> */}
      {/*    <li>Delete the copyright or other proprietary rights notice from any Content.</li> */}
      {/*    <li>Attempt to impersonate another user or person or use the username of another user.</li> */}
      {/*    <li> */}
      {/*      Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active */}
      {/*      information collection or transmission mechanism, including without limitation, clear graphics interchange */}
      {/*      formats (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as “spyware” */}
      {/*      or “passive collection mechanisms” or “pcms”). */}
      {/*    </li> */}
      {/*    <li> */}
      {/*      Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the */}
      {/*      Site. */}
      {/*    </li> */}
      {/*    <li> */}
      {/*      Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the */}
      {/*      Marketplace Offerings to you. */}
      {/*    </li> */}
      {/*    <li> */}
      {/*      Attempt to bypass any measures of the Site designed to prevent or restrict access to the Site, or any portion */}
      {/*      of the Site. */}
      {/*    </li> */}
      {/*    <li> */}
      {/*      Copy or adapt the Site’s software, including but not limited to Flash, PHP, HTML, JavaScript, or other code. */}
      {/*    </li> */}
      {/*    <li> */}
      {/*      Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the */}
      {/*      software comprising or in any way making up a part of the Site. */}
      {/*    </li> */}
      {/*    <li> */}
      {/*      Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or */}
      {/*      distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or */}
      {/*      offline reader that accesses the Site, or using or launching any unauthorized script or other software. */}
      {/*    </li> */}
      {/*    <li>Use a buying agent or purchasing agent to make purchases on the Site.</li> */}
      {/*    <li> */}
      {/*      Make any unauthorized use of the Marketplace Offerings, including collecting usernames and/or email addresses */}
      {/*      of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts */}
      {/*      by automated means or under false pretenses. */}
      {/*    </li> */}
      {/*    <li> */}
      {/*      Use the Marketplace Offerings as part of any effort to compete with us or otherwise use the Site and/or the */}
      {/*      Content for any revenue-generating endeavor or commercial enterprise. */}
      {/*    </li> */}
      {/*  </ol> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>USER GENERATED CONTRIBUTIONS</h2> */}
      {/*  <p> */}
      {/*    The Site does not offer users to submit or post content. We may provide you with the opportunity to create, */}
      {/*    submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on */}
      {/*    the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, */}
      {/*    suggestions, or personal information or other material (collectively, `Contributions`). Contributions may be */}
      {/*    viewable by other users of the Site and through third-party websites. As such, any Contributions you transmit */}
      {/*    may be treated in accordance with the Site Privacy Policy. When you create or make available any Contributions, */}
      {/*    you thereby represent and warrant that: */}
      {/*  </p> */}
      {/*  <ol style={{ marginLeft: 40 }}> */}
      {/*    <li> */}
      {/*      The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or */}
      {/*      copying of your Contributions do not and will not infringe the proprietary rights, including but not limited */}
      {/*      to the copyright, patent, trademark, trade secret, or moral rights of any third party. */}
      {/*    </li> */}
      {/*    <li> */}
      {/*      You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions */}
      {/*      to use and to authorize us, the Site, and other users of the Site to use your Contributions in any manner */}
      {/*      contemplated by the Site and these Terms of Use. */}
      {/*    </li> */}
      {/*    <li> */}
      {/*      You have the written consent, release, and/or permission of each and every identifiable individual person in */}
      {/*      your Contributions to use the name or likeness of each and every such identifiable individual person to enable */}
      {/*      inclusion and use of your Contributions in any manner contemplated by the Site and these Terms of Use. */}
      {/*    </li> */}
      {/*    <li>Your Contributions are not false, inaccurate, or misleading.</li> */}
      {/*    <li> */}
      {/*      Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, */}
      {/*      chain letters, spam, mass mailings, or other forms of solicitation. */}
      {/*    </li> */}
      {/*    <li> */}
      {/*      Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or */}
      {/*      otherwise objectionable (as determined by us). */}
      {/*    </li> */}
      {/*    <li>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</li> */}
      {/*    <li> */}
      {/*      Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and */}
      {/*      to promote violence against a specific person or class of people. */}
      {/*    </li> */}
      {/*    <li>Your Contributions do not violate any applicable law, regulation, or rule.</li> */}
      {/*    <li>Your Contributions do not violate the privacy or publicity rights of any third party.</li> */}
      {/*    <li> */}
      {/*      Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to */}
      {/*      protect the health or well-being of minors. */}
      {/*    </li> */}
      {/*    <li> */}
      {/*      Your Contributions do not include any offensive comments that are connected to race, national origin, gender, */}
      {/*      sexual preference, or physical handicap. */}
      {/*    </li> */}
      {/*    <li> */}
      {/*      Your Contributions do not otherwise violate, or link to material that violates, any provision of these Terms */}
      {/*      of Use, or any applicable law or regulation. */}
      {/*    </li> */}
      {/*  </ol> */}
      {/*  <p> */}
      {/*    Any use of the Site or the Marketplace Offerings in violation of the foregoing violates these Terms of Use and */}
      {/*    may result in, among other things, termination or suspension of your rights to use the Site and the Marketplace */}
      {/*    Offerings. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>CONTRIBUTION LICENSE</h2> */}
      {/*  <p> */}
      {/*    You and the Site agree that we may access, store, process, and use any information and personal data that you */}
      {/*    provide following the terms of the Privacy Policy and your choices (including settings). */}
      {/*  </p> */}
      {/*  <p> */}
      {/*    By submitting suggestions or other feedback regarding the Site, you agree that we can use and share such */}
      {/*    feedback for any purpose without compensation to you. */}
      {/*  </p> */}
      {/*  <p> */}
      {/*    We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions */}
      {/*    and any intellectual property rights or other proprietary rights associated with your Contributions. We are not */}
      {/*    liable for any statements or representations in your Contributions provided by you in any area on the Site. You */}
      {/*    are solely responsible for your Contributions to the Site and you expressly agree to exonerate us from any and */}
      {/*    all responsibility and to refrain from any legal action against us regarding your Contributions. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>SUBMISSIONS</h2> */}
      {/*  <p> */}
      {/*    You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information */}
      {/*    regarding the Site or the Marketplace Offerings (`Submissions`) provided by you to us are non-confidential and */}
      {/*    shall become our sole property. We shall own exclusive rights, including all intellectual property rights, and */}
      {/*    shall be entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, */}
      {/*    commercial or otherwise, without acknowledgment or compensation to you. You hereby waive all moral rights to any */}
      {/*    such Submissions, and you hereby warrant that any such Submissions are original with you or that you have the */}
      {/*    right to submit such Submissions. You agree there shall be no recourse against us for any alleged or actual */}
      {/*    infringement or misappropriation of any proprietary right in your Submissions. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>THIRD-PARTY WEBSITES AND CONTENT</h2> */}
      {/*  <p> */}
      {/*    The Site may contain (or you may be sent via the Site or the Marketplace Offerings) links to other websites */}
      {/*    (`Third-Party Websites`) as well as articles, photographs, text, graphics, pictures, designs, music, sound, */}
      {/*    video, information, applications, software, and other content or items belonging to or originating from third */}
      {/*    parties (`Third-Party Content`). Such Third-Party Websites and Third-Party Content are not investigated, */}
      {/*    monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any */}
      {/*    Third Party Websites accessed through the Site or any Third-Party Content posted on, available through, or */}
      {/*    installed from the Site, including the content, accuracy, offensiveness, opinions, reliability, privacy */}
      {/*    practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion */}
      {/*    of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content */}
      {/*    does not imply approval or endorsement thereof by us. If you decide to leave the Site and access the Third-Party */}
      {/*    Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these */}
      {/*    Terms of Use no longer govern. You should review the applicable terms and policies, including privacy and data */}
      {/*    gathering practices, of any website to which you navigate from the Site or relating to any applications you use */}
      {/*    or install from the Site. Any purchases you make through Third-Party Websites will be through other websites and */}
      {/*    from other companies, and we take no responsibility whatsoever in relation to such purchases which are */}
      {/*    exclusively between you and the applicable third party. You agree and acknowledge that we do not endorse the */}
      {/*    products or services offered on Third-Party Websites and you shall hold us harmless from any harm caused by your */}
      {/*    purchase of such products or services. Additionally, you shall hold us harmless from any losses sustained by you */}
      {/*    or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with */}
      {/*    Third-Party Websites. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>ADVERTISERS</h2> */}
      {/*  <p> */}
      {/*    We allow advertisers to display their advertisements and other information in certain areas of the Site, such as */}
      {/*    sidebar advertisements or banner advertisements. If you are an advertiser, you shall take full responsibility */}
      {/*    for any advertisements you place on the Site and any services provided on the Site or products sold through */}
      {/*    those advertisements. Further, as an advertiser, you warrant and represent that you possess all rights and */}
      {/*    authority to place advertisements on the Site, including, but not limited to, intellectual property rights, */}
      {/*    publicity rights, and contractual rights. We simply provide the space to place such advertisements, and we have */}
      {/*    no other relationship with advertisers. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>SITE MANAGEMENT</h2> */}
      {/*  <p> */}
      {/*    We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Use; (2) */}
      {/*    take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of */}
      {/*    Use, including without limitation, reporting such user to law enforcement authorities; (3) in our sole */}
      {/*    discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the */}
      {/*    extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion */}
      {/*    and without limitation, notice, or liability, to remove from the Site or otherwise disable all files and content */}
      {/*    that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Site in a */}
      {/*    manner designed to protect our rights and property and to facilitate the proper functioning of the Site and the */}
      {/*    Marketplace Offerings. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>PRIVACY POLICY</h2> */}
      {/*  <p> */}
      {/*    We care about data privacy and security. By using the Site or the Marketplace Offerings, you agree to be bound */}
      {/*    by our Privacy Policy posted on the Site, which is incorporated into these Terms of Use. Please be advised the */}
      {/*    Site and the Marketplace Offerings are hosted in Germany. If you access the Site or the Marketplace Offerings */}
      {/*    from any other region of the world with laws or other requirements governing personal data collection, use, or */}
      {/*    disclosure that differ from applicable laws in Germany, then through your continued use of the Site, you are */}
      {/*    transferring your data to Germany, and you agree to have your data transferred to and processed in Germany. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>TERM AND TERMINATION</h2> */}
      {/*  <p> */}
      {/*    These Terms of Use shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER */}
      {/*    PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR */}
      {/*    LIABILITY, DENY ACCESS TO AND USE OF THE SITE AND THE MARKETPLACE OFFERINGS (INCLUDING BLOCKING CERTAIN IP */}
      {/*    ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY */}
      {/*    REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION. WE */}
      {/*    MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SITE AND THE MARKETPLACE OFFERINGS OR DELETE YOUR ACCOUNT AND ANY */}
      {/*    CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION. */}
      {/*  </p> */}
      {/*  <p> */}
      {/*    If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new */}
      {/*    account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on */}
      {/*    behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take */}
      {/*    appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>MODIFICATIONS AND INTERRUPTIONS</h2> */}
      {/*  <p> */}
      {/*    We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our */}
      {/*    sole discretion without notice. However, we have no obligation to update any information on our Site. We also */}
      {/*    reserve the right to modify or discontinue all or part of the Marketplace Offerings without notice at any time. */}
      {/*    We will not be liable to you or any third party for any modification, price change, suspension, or */}
      {/*    discontinuance of the Site or the Marketplace Offerings. */}
      {/*  </p> */}
      {/*  <p> */}
      {/*    We cannot guarantee the Site and the Marketplace Offerings will be available at all times. We may experience */}
      {/*    hardware, software, or other problems or need to perform maintenance related to the Site, resulting in */}
      {/*    interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or */}
      {/*    otherwise modify the Site or the Marketplace Offerings at any time or for any reason without notice to you. You */}
      {/*    agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to */}
      {/*    access or use the Site or the Marketplace Offerings during any downtime or discontinuance of the Site or the */}
      {/*    Marketplace Offerings. Nothing in these Terms of Use will be construed to obligate us to maintain and support */}
      {/*    the Site or the Marketplace Offerings or to supply any corrections, updates, or releases in connection */}
      {/*    therewith. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>GOVERNING LAW</h2> */}
      {/*  <p> */}
      {/*    These conditions are governed by and interpreted following the laws of Switzerland, and the use of the United */}
      {/*    Nations Convention of Contracts for the International Sales of Goods is expressly excluded. If your habitual */}
      {/*    residence is in the EU, and you are a consumer, you additionally possess the protection provided to you by */}
      {/*    obligatory provisions of the law in your country to residence. ChipAssist AG and yourself both agree to submit */}
      {/*    to the non-exclusive jurisdiction of the courts of Zug, which means that you may make a claim to defend your */}
      {/*    consumer protection rights in regards to these Conditions of Use in Switzerland, or in the EU country in which */}
      {/*    you reside. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>DISPUTE RESOLUTION</h2> */}
      {/*  <h3 style={{ fontSize: 17, color: "#000000" }}>Informal Negotiations</h3> */}
      {/*  <p> */}
      {/*    To expedite resolution and control the cost of any dispute, controversy, or claim related to these Terms of Use */}
      {/*    (each `Dispute` and collectively, the `Disputes`) brought by either you or us (individually, a `Party` and */}
      {/*    collectively, the `Parties`), the Parties agree to first attempt to negotiate any Dispute (except those Disputes */}
      {/*    expressly provided below) informally for at least thirty (30) days before initiating arbitration. Such informal */}
      {/*    negotiations commence upon written notice from one Party to the other Party. */}
      {/*  </p> */}
      {/*  <h3 style={{ fontSize: 17, color: "#000000" }}>Binding Arbitration</h3> */}
      {/*  <p> */}
      {/*    Any dispute arising from the relationships between the Parties to this contract shall be determined by one */}
      {/*    arbitrator who will be chosen in accordance with the Arbitration and Internal Rules of the European Court of */}
      {/*    Arbitration being part of the European Centre of Arbitration having its seat in Strasbourg, and which are in */}
      {/*    force at the time the application for arbitration is filed, and of which adoption of this clause constitutes */}
      {/*    acceptance. The seat of arbitration shall be Switzerland. The language of the proceedings shall be __________. */}
      {/*    Applicable rules of substantive law shall be the law of Switzerland. */}
      {/*  </p> */}
      {/*  <h3 style={{ fontSize: 17, color: "#000000" }}>Restrictions</h3> */}
      {/*  <p> */}
      {/*    The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the */}
      {/*    full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no */}
      {/*    right or authority for any Dispute to be arbitrated on a class-action basis or to utilize class action */}
      {/*    procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative */}
      {/*    capacity on behalf of the general public or any other persons. */}
      {/*  </p> */}
      {/*  <h3 style={{ fontSize: 17, color: "#000000" }}>Exceptions to Informal Negotiations and Arbitration</h3> */}
      {/*  <p> */}
      {/*    The Parties agree that the following Disputes are not subject to the above provisions concerning informal */}
      {/*    negotiations and binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity */}
      {/*    of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations */}
      {/*    of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief. If this */}
      {/*    provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute */}
      {/*    falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be */}
      {/*    decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties */}
      {/*    agree to submit to the personal jurisdiction of that court. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>CORRECTIONS</h2> */}
      {/*  <p> */}
      {/*    There may be information on the Site that contains typographical errors, inaccuracies, or omissions that may */}
      {/*    relate to the Marketplace Offerings, including descriptions, pricing, availability, and various other */}
      {/*    information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the */}
      {/*    information on the Site at any time, without prior notice. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>DISCLAIMER</h2> */}
      {/*  <p> */}
      {/*    THE SITE AND THE MARKETPLACE OFFERINGS ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE */}
      {/*    OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL */}
      {/*    WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND THE MARKETPLACE OFFERINGS AND YOUR USE THEREOF, */}
      {/*    INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND */}
      {/*    NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE’S */}
      {/*    CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR */}
      {/*    ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF */}
      {/*    ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE */}
      {/*    OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) */}
      {/*    ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SITE OR THE MARKETPLACE OFFERINGS, (5) ANY BUGS, */}
      {/*    VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY, AND/OR */}
      {/*    (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A */}
      {/*    RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SITE. WE DO NOT */}
      {/*    WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A */}
      {/*    THIRD PARTY THROUGH THE SITE, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY */}
      {/*    BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY */}
      {/*    TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT */}
      {/*    OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION */}
      {/*    WHERE APPROPRIATE. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>LIMITATIONS OF LIABILITY</h2> */}
      {/*  <p> */}
      {/*    IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, */}
      {/*    INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST */}
      {/*    REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE OR THE MARKETPLACE OFFERINGS, EVEN IF */}
      {/*    WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED */}
      {/*    HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL */}
      {/*    TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF */}
      {/*    ACTION ARISING. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR */}
      {/*    THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS */}
      {/*    OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>INDEMNIFICATION</h2> */}
      {/*  <p> */}
      {/*    You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our */}
      {/*    respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or */}
      {/*    demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) */}
      {/*    use of the Marketplace Offerings; (2) breach of these Terms of Use; (3) any breach of your representations and */}
      {/*    warranties set forth in these Terms of Use; (4) your violation of the rights of a third party, including but not */}
      {/*    limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Site or the */}
      {/*    Marketplace Offerings with whom you connected via the Site. Notwithstanding the foregoing, we reserve the right, */}
      {/*    at your expense, to assume the exclusive defense and control of any matter for which you are required to */}
      {/*    indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use */}
      {/*    reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this */}
      {/*    indemnification upon becoming aware of it. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>USER DATA</h2> */}
      {/*  <p> */}
      {/*    We will maintain certain data that you transmit to the Site for the purpose of managing the performance of the */}
      {/*    Marketplace Offerings, as well as data relating to your use of the Marketplace Offerings. Although we perform */}
      {/*    regular routine backups of data, you are solely responsible for all data that you transmit or that relates to */}
      {/*    any activity you have undertaken using the Marketplace Offerings. You agree that we shall have no liability to */}
      {/*    you for any loss or corruption of any such data, and you hereby waive any right of action against us arising */}
      {/*    from any such loss or corruption of such data. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h2> */}
      {/*  <p> */}
      {/*    Visiting the Site, sending us emails, and completing online forms constitute electronic communications. You */}
      {/*    consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other */}
      {/*    communications we provide to you electronically, via email and on the Site, satisfy any legal requirement that */}
      {/*    such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND */}
      {/*    OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR */}
      {/*    COMPLETED BY US OR VIA THE SITE. You hereby waive any rights or requirements under any statutes, regulations, */}
      {/*    rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or */}
      {/*    retention of non-electronic records, or to payments or the granting of credits by any means other than */}
      {/*    electronic means. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>CALIFORNIA USERS AND RESIDENTS</h2> */}
      {/*  <p> */}
      {/*    If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the */}
      {/*    Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market */}
      {/*    Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>MISCELLANEOUS</h2> */}
      {/*  <p> */}
      {/*    These Terms of Use and any policies or operating rules posted by us on the Site or in respect to the Marketplace */}
      {/*    Offerings constitute the entire agreement and understanding between you and us. Our failure to exercise or */}
      {/*    enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision. */}
      {/*    These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and */}
      {/*    obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure */}
      {/*    to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Terms */}
      {/*    of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed */}
      {/*    severable from these Terms of Use and does not affect the validity and enforceability of any remaining */}
      {/*    provisions. There is no joint venture, partnership, employment or agency relationship created between you and us */}
      {/*    as a result of these Terms of Use or use of the Marketplace Offerings. You agree that these Terms of Use will */}
      {/*    not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have */}
      {/*    based on the electronic form of these Terms of Use and the lack of signing by the parties hereto to execute */}
      {/*    these Terms of Use. */}
      {/*  </p> */}

      {/*  <h2 style={{ fontSize: 19, color: "#000000" }}>CONTACT US</h2> */}
      {/*  <p> */}
      {/*    In order to resolve a complaint regarding the Site or the Marketplace Offerings or to receive further */}
      {/*    information regarding use of the Site or the Marketplace Offerings, please contact us at: */}
      {/*  </p> */}

      {/*  <div style={{ fontWeight: 600, color: "#595959 " }}>ChipAssist AG</div> */}
      {/*  <div style={{ fontWeight: 600, color: "#595959 " }}> */}
      {/*    Gubelstrasse 11, c/o Bratschi AG, Zweigniederlassung Zug, 6300 Zug, Switzerland */}
      {/*  </div> */}
      {/*  <div style={{ fontWeight: 600, color: "#595959 " }}>Zug</div> */}
      {/*  <div style={{ fontWeight: 600, color: "#595959 " }}>Switzerland</div> */}
      {/*  <div style={{ fontWeight: 600, color: "#595959 " }}>Phone: +41 79 713 78 81</div> */}
      {/*  <div style={{ fontWeight: 600, color: "#595959 " }}>info@chipassist.com</div> */}
      {/* </div> */}
      <span dangerouslySetInnerHTML={{ __html: t("other_part") }}></span>
    </div>
  );
};

export default Terms;
