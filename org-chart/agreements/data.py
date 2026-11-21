"""The YV agreement templates, one per role, in English. Built for international use: governing law and
the arbitration seat are Chart variables (V-18, V-19), not a fixed country. Made from the LTP agreements
(Desktop/ltp-daily/org-chart/build/data.py) without their Indonesian terms (Seonso, 2026-11-21:
"don't need indonesia, make these fit more international agreements")."""

CHART = "YV Organisation Chart & Protocols"

YV_PARTY = ("the YV Group company named on the cover, with the registration details stated there (“YV”)")


def chart_article(party):
    return [
        f"The {CHART} (“the Chart”), in the version stated on the cover, is part of this Agreement. Capitalised terms have the meanings given in the Chart, including General Managing Partner (“GMP”).",
        f"Chart Parts A and C, and every variable that sets pay or share terms, change for the {party} only when the {party} signs the new version. Chart Part B and the other variables in Part D change by Formal Notice given at least 30 days in advance (Chart P18).",
        "Where this Agreement and the Chart conflict, the Chart prevails, except that clause 1.3 always applies.",
        "Brand and residency: the founder owns the brand. A residency is YV’s mandate, under YV’s Residency Agreement with the brand, to take that brand to market with its people, seasons and gatherings. Each residency is held in the portfolio of exactly one Custodian, or by YV while it has none. The Partner Share, Fee Income and seasons are counted per brand (Chart A3).",
    ]


def notices(party_word="the other party"):
    return [
        f"A notice from YV is valid only as a Formal Notice (Chart P13): an email from an official YV address, or a signed document on YV letterhead, sent to {party_word}’s registered email or address on the signature page.",
        "A notice to YV is valid when sent by email to YV’s official address, or delivered in writing to YV’s address, both stated on the signature page. Messages in chat apps are not valid notices in either direction.",
    ]


DISPUTES = [
    "The parties first try to settle a dispute by good-faith negotiation within 30 days of a Formal Notice of the dispute.",
    "If unresolved, the dispute is finally settled by arbitration under the rules and at the seat set by Chart variable V-19 as it stood when this Agreement was signed, before one arbitrator, in English. The award is final and binding. Either party may seek urgent interim relief from any competent court.",
    "This Agreement is governed by the law set by Chart variable V-18 as it stood when this Agreement was signed. It is made in English; a translation is for convenience only.",
]


def general(extra=None):
    rows = [
        "This Agreement and the Chart are the whole agreement on their subject and take priority over every earlier agreement, form, policy, announcement, message and verbal arrangement on the same subject between the parties.",
        "Changes are valid only in writing signed by the parties, except changes made under clause 1.3. If a clause is unenforceable, the rest stays in force.",
    ]
    if extra:
        rows += extra
    rows.append("This Agreement may be signed in counterparts and by electronic signature. Each counterpart is an original, and together they are one agreement.")
    return rows


PARTNER = {
    "id": "partner",
    "code": "YV / PA",
    "title": "Partner Agreement",
    "sub": "For Contractors and Partners, Tier 1 and above",
    "summary": "Every contractor signs this on entry. It carries them through Partner, Managing Partner and General Managing Partner.",
    "fields": ["Date", "Agreement No.", "Chart version", "YV company and registration", "Partner", "ID or passport No.", "Country of residence", "Tax residence"],
    "signers": [("For YV", "Director or authorised signatory"), ("The Partner", "Full name")],
    "attachment": "Attachment: training record (Chart P9).",
    "articles": [
        ("Parties and the Chart", [
            f"This Agreement is between {YV_PARTY} and the person named on the cover (“the Partner”). “The Partner” includes a Contractor.",
            *chart_article("Partner"),
        ]),
        ("Term", [
            "Two (2) years from signing.",
            "Renewable by mutual written consent, with no limit on the number of renewals.",
        ]),
        ("Status", [
            "The Partner is a Contractor (Tier 1) from signing. The Partner confirms that the 40 hours of training in Chart P9 were completed before signing; the training record is attached.",
            "A Contractor may buy a share from 6 months after signing, and becomes a Partner (Tier 2) once the share is bought (Chart A5) and the advancement review is passed (Chart P15).",
            "Advancement to Managing Partner (Tier 3) and General Managing Partner (Tier 4) follows Chart A2. No separate agreement is signed for those tiers.",
        ]),
        ("What YV provides", [
            "The YV brand, platforms and tools; training; introductions; and marketing of YV’s brand residencies.",
            "Weekly statements and Friday withdrawals from the Portfolio Account (Chart P8); invoices for gatherings (Chart P7); and the member ledger (Chart P2).",
            "YV keeps no desk between the Partner and a brand: the Partner is the brand’s direct relation at YV (Chart P3).",
        ]),
        ("What the Partner does", [
            "Sources brands for YV: introduces founders and obtains a signed Residency Agreement (Chart P4).",
            "Acts as Custodian for every brand in their portfolio: runs its seasons (Chart P1), keeps its members (Chart P2), cares for the founder (Chart P3), answers concerns (Chart P5), handles disputes and stakeholder relations (Chart P6), and books gatherings within the season plan (Chart P7).",
            "Follows every protocol in Chart Part B.",
            "Acts in YV’s interest in all dealings with YV’s brands, founders, members and partners.",
        ]),
        ("Pay", [
            "The Partner is paid from the Partner Share: 25% of Fee Income. Fee Income is the residency fee, season fees and any success fee actually received by YV for a brand. It is never the brand’s own sales. Equity or tokens a brand grants YV are treated as Chart variable V-16 sets.",
            "The Partner Share splits as follows (Chart A4): (a) the Sourcing Share, 12.5% of Fee Income, goes to the brand’s Sourcer; (b) the Custodian Share, 12.5% of Fee Income, goes to the brand’s Custodian.",
            "A Partner who is both Sourcer and Custodian of a brand receives both shares, credited together: 25% of its Fee Income.",
            "At each weekly consolidation (Chart V-12), every share the Partner earns is credited to the Partner’s Portfolio Account, with a statement. The Partner may withdraw from the Portfolio Account on Fridays (Chart P8).",
            "While a brand is in dispute or its residency is suspended, its shares are held, and are credited at the first consolidation after that ends, on Fee Income actually received.",
            "No base pay unless set under Chart variable V-07.",
            "The Partner is responsible for their own taxes, social contributions and registrations in every country where they are due, and for issuing any invoice the law requires. YV withholds tax only where the law that applies to YV requires it.",
        ]),
        ("Leaving", [
            "The Partner may leave by written notice to YV at least 30 days before the leaving date.",
            "“Leaving” means resignation, expiry of this Agreement without renewal, or ending by mutual agreement.",
            "A Partner who leaves by their own choice within 6 months of signing pays YV the training cost contribution set by Chart variable V-20, if one is set.",
            "On leaving, the Partner’s shares of Fee Income follow Chart A4: (a) a Partner who holds a YV share keeps the Sourcing Share for as long as the brand stays with YV and the Partner holds the share and keeps the shareholder obligations; it goes to YV from the date any of these stops. A Partner without a YV share loses it from the leaving date; (b) the Custodian Share goes to the next Custodian, or to YV while there is none.",
            "The Portfolio Account balance is paid out on the Friday after the final consolidation.",
            "The Partner follows Chart P17 on the last day.",
        ]),
        ("Termination for cause", [
            "YV may end this Agreement by Formal Notice: (a) for a breach of this Agreement or a protocol that is not fixed by the fix-by date of a warning given under Chart P14; or immediately for (b) a breach of Chart Part C; (c) abandoning the portfolio for 30 or more consecutive days without notice; (d) fraud, misrepresentation or dishonest conduct; (e) conduct that materially damages YV’s reputation or interests.",
            "On termination for cause: (a) shares earned up to the termination date are credited and paid out within 30 days; (b) the Sourcing Share on brands the Partner sourced goes to YV from the termination date, whether or not the Partner holds a YV share; (c) the Partner keeps any YV share, subject to the buy-back option in the Share Purchase & Shareholder Agreement; (d) the Partner follows Chart P17.",
        ]),
        ("Restrictions and work product", [
            "Chart Part C binds the Partner: confidentiality for 3 years after this Agreement ends; no competing and no poaching for 2 years after it ends, in the markets set by Chart variable V-17; all work product made for YV belongs to YV.",
            "The residencies and founder relationships in the Partner’s portfolio are YV’s assets. The Partner holds them for YV.",
            "Each restriction applies only as far as is reasonable to protect YV’s business. A breach of this article entitles YV to seek an injunction and damages.",
        ]),
        ("Independent contractor", [
            "The Partner is an independent contractor, not an employee, agent or joint-venture partner of YV, and has no authority to bind YV.",
            "The Partner decides their own hours, place and methods, except where a protocol in Chart Part B sets a standard that protects brands, founders, members or the YV brand. Team meetings are open and never compulsory (Chart P10).",
            "The Partner holds every permit, registration and insurance the law of the place where they work requires for this engagement.",
        ]),
        ("Notices", notices()),
        ("Disputes and governing law", DISPUTES),
        ("General", general()),
    ],
}

SHARE = {
    "id": "share",
    "code": "YV / SH",
    "title": "Share Purchase & Shareholder Agreement",
    "sub": "Signed with every share purchase",
    "summary": "The share purchase, the obligations of a shareholder, and the buy-back option.",
    "fields": ["Date", "Agreement No.", "Chart version", "YV company and registration", "Buyer", "ID or passport No.", "Number of shares", "Price per share and currency"],
    "signers": [("For YV", "Director or authorised signatory"), ("The Buyer", "Full name"), ("The Transferor", "Where an existing share is transferred")],
    "articles": [
        ("Parties and purpose", [
            f"This Agreement is between {YV_PARTY}; the person named on the cover (“the Buyer”); and, where an existing share is transferred, the shareholder transferring it (“the Transferor”).",
            f"It sets the terms of the share purchase and the obligations the Buyer takes on as a shareholder. It builds on the Buyer’s Partner Agreement and the {CHART} (“the Chart”); capitalised terms have the meanings given there. Where this Agreement and the Chart conflict, the Chart prevails, except clause 1.3.",
            "The share price, lock-up length and buy-back price (Chart V-02, V-03, V-14) are fixed for this Agreement at the values in force when it is signed.",
        ]),
        ("The purchase", [
            "The number of shares and the price per share are stated on the cover, as in YV’s written share offer (Chart A5, P16). The price may not be below any minimum the law of YV’s place of incorporation sets.",
            "The Buyer pays the price in full within 14 days of signing, to the account YV names in writing.",
            "The share is issued by YV, or transferred by the Transferor, under YV’s constitutional documents and the law of its place of incorporation, with every approval, filing and notarisation that law requires. The Buyer becomes a shareholder when entered in YV’s register of members.",
        ]),
        ("Lock-up and sale", [
            "The Buyer may not sell, transfer, pledge or otherwise encumber the share during the lock-up period (Chart V-03), counted from the date the Buyer signed the Partner Agreement, except under Article 5.",
            "After the lock-up, a Buyer who wants to sell first offers the share to a person YV names, or to YV itself where the law allows, at fair value set by the GMP from the latest financial statements. If the offer is declined or not answered within 30 days, the Buyer may offer it to others, as YV’s constitutional documents allow.",
        ]),
        ("Shareholder obligations", [
            "For as long as the Buyer holds the share, the Buyer: (a) acts in YV’s interest and never against it; (b) keeps YV’s confidential information confidential (Chart Part C); (c) does not damage YV’s reputation; (d) uses reasonable efforts to keep the founder relationships on brands they sourced in good standing, so those brands stay with YV.",
            "The Buyer does not compete with YV or poach its brands, members, partners or people (Chart Part C), during engagement and for 2 years after the Buyer’s YV engagement ends, whether or not the Buyer still holds the share.",
        ]),
        ("What the share secures, and the buy-back option", [
            "Good standing: while the Buyer keeps the obligations in Article 4, the Buyer keeps the share and, after leaving YV, keeps the Sourcing Share on brands they sourced for as long as those brands stay with YV and the Buyer holds at least one share (Chart A4). When the Buyer no longer holds any share, the Sourcing Share goes to YV from that date.",
            "Termination for cause under the Partner Agreement: the Sourcing Share goes to YV from the termination date. The Buyer keeps the share unless the buy-back option is used.",
            "Buy-back option: if the Buyer breaks an obligation in Article 4, a person YV names, or YV itself where the law allows, may buy the share by Formal Notice at the buy-back price set by the GMP (Chart V-14), and the Buyer must sell and transfer it. The Sourcing Share continues until that notice and goes to YV from its date.",
            "Before using the buy-back option, YV gives a written warning under Chart P14 with a fix-by date, unless the breach cannot be fixed, such as a disclosure of confidential information.",
            "To secure the buy-back option, the Buyer appoints YV, irrevocably and to the extent the governing law allows, as the Buyer’s attorney to sign the transfer of the share if the option is used and the Buyer does not sign within 30 days of the Formal Notice. Where the law requires the appointment in a separate form, the Buyer signs it with this Agreement.",
        ]),
        ("Effect on the Buyer’s role", [
            "Buying the share does not change the Buyer’s pay or duties, except as the Chart sets for their tier.",
        ]),
        ("Notices", notices("each other party")),
        ("Disputes and governing law", DISPUTES + [
            "YV uses its best efforts to keep its constitutional documents consistent with Articles 3 and 5.",
        ]),
        ("General", general()),
    ],
}

RESIDENCY = {
    "id": "residency",
    "code": "YV / RA",
    "title": "Residency Agreement",
    "sub": "Between YV and a brand taken into residence",
    "summary": "The founder signs this for the brand. It sets the seasons, the Custodian, the fees, and who owns what.",
    "fields": ["Date", "Agreement No.", "Chart version", "YV company and registration", "Brand (legal name and registration)", "Founder signing for the brand", "Seasons committed", "Fees (residency, season, success)"],
    "signers": [("For YV", "Director or authorised signatory"), ("For the Brand", "Founder or authorised signatory")],
    "attachment": "Attachment: Brand Packet (Chart P4) and the first season plan.",
    "articles": [
        ("Parties", [
            f"This Agreement is between {YV_PARTY} and the company named on the cover as the Brand (“the Brand”), signed by its founder or another authorised signatory.",
            f"YV runs residencies under the {CHART} (“the Chart”). The Chart binds YV and its people; it binds the Brand only where this Agreement says so.",
        ]),
        ("The residency", [
            "YV takes the Brand into residence: it takes the Brand to market with its people, seasons and gatherings, and builds a membership around the Brand.",
            "The Brand owns its name, marks, product and business. YV holds the residency, which is its mandate under this Agreement.",
            "YV assigns one Custodian to the Brand, named in writing, as the Brand’s one contact at YV. YV may replace the Custodian by notice to the Brand; there is never a period without a Custodian or YV holding the residency.",
        ]),
        ("Term", [
            "From the date on the cover for the number of seasons stated there. Season length is set in each season plan.",
            "The residency continues season by season after that unless either party gives notice at least 30 days before the close of the current season.",
        ]),
        ("What YV provides", [
            "The Custodian opens a group of the founder, YV’s official account and the Custodian within the days set by Chart V-09, answers the founder within the hours set by Chart V-10, and checks in every week of a season (Chart P3).",
            "Each season, YV runs the seven steps of a season with the Brand: warm circle, focus group, gathering, story beat, early access, badges and perks, and season close (Chart P1), to a season plan both parties approve in writing before it starts.",
            "YV books the venues, production, food and printing the season plan calls for, and invoices them as Article 6 sets (Chart P7).",
            "YV keeps the member ledger: everyone who joins through a season, with the season they joined and the badges they earned (Chart P2).",
        ]),
        ("What the Brand provides", [
            "A complete Brand Packet before the residency starts: the Brand story as the founder tells it, the product’s state, what the first season should reach, the Brand’s name, marks and assets, and any known limits (Chart P4).",
            "Access to the product for the focus group and early-access members, as the season plan sets.",
            "The perks it commits to in a season plan. Perks are the Brand’s to give; an early member’s perks and benefits carry into every later season, and the Brand honours perks already granted after this Agreement ends.",
            "Answers and approvals within 5 business days of a request from the Custodian, unless the season plan sets another time.",
        ]),
        ("Fees and costs", [
            "The Brand pays the residency fee, season fees and any success fee stated on the cover or in a season plan. Success fees are measured as the season plan sets.",
            "Gathering costs in an approved season plan are invoiced at cost, without mark-up unless the season plan says otherwise. Costs above the plan need the Brand’s written approval first.",
            "Invoices are payable within 14 days, in the currency they state. Late amounts carry interest at the rate the governing law allows for commercial debts.",
            "Any equity, tokens or similar interest the Brand grants YV is agreed in a separate written instrument.",
            "Fees exclude taxes. Each party bears its own taxes; the Brand pays any sales tax the law adds to an invoice.",
        ]),
        ("Ownership and licences", [
            "The Brand grants YV a non-exclusive, royalty-free licence to use the Brand’s name, marks and assets during the residency, for the residency only.",
            "Story materials, case studies and the member ledger made by YV belong to YV (Chart Part C). YV grants the Brand a non-exclusive, perpetual, royalty-free licence to use the story materials and case studies made about the Brand for its own marketing.",
            "A case study naming the Brand is published only with the Brand’s written consent.",
        ]),
        ("Members and personal data", [
            "Each party complies with the data protection law that applies to it. Members join with clear notice of who holds their data and why.",
            "YV gives the Brand each member record the member has agreed to share with the Brand. Neither party sells member data.",
        ]),
        ("Confidentiality", [
            "Each party keeps the other’s confidential information confidential during the residency and for 3 years after, and uses it only for the residency. This does not cover information that is public, already known to the receiving party, or required by law to be disclosed.",
        ]),
        ("Ending", [
            "Either party may end this Agreement by Formal Notice if the other commits a material breach and does not fix it within 14 days of a Formal Notice describing it, or immediately if the other becomes insolvent or ceases business.",
            "On ending: (a) fees and approved costs earned up to the ending date are payable; (b) the Brand honours perks and badges already granted to members; (c) the licence to YV in clause 7.1 ends, except for materials already published; (d) the Brand’s licence in clause 7.2 continues.",
        ]),
        ("Liability", [
            "Neither party is liable for indirect or consequential loss, or for loss of profit, revenue or goodwill.",
            "Each party’s total liability under this Agreement is limited to the fees paid and payable in the 12 months before the claim arose.",
            "Nothing limits liability for fraud, wilful misconduct, a breach of confidentiality, or anything the governing law does not allow to be limited.",
        ]),
        ("People", [
            "During the residency and for 12 months after, the Brand does not hire or engage a YV Partner or Contractor who worked on its residency, except with YV’s written consent.",
        ]),
        ("Notices", notices("the Brand")),
        ("Disputes and governing law", DISPUTES),
        ("General", general([
            "Neither party may assign this Agreement without the other’s written consent, except that YV may assign it to another YV Group company by notice.",
        ])),
    ],
}

DOCS = [PARTNER, RESIDENCY, SHARE]
