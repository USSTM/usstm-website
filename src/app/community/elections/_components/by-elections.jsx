"use client";
import { useId, useState } from "react";
import Image from "next/image";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

/*
 * 2026 By-Elections candidates.
 * Headshots live in /public/images/elections/byelections-2026/.
 * Empty `socials` / `email` values render as muted "coming soon" icons so
 * every candidate keeps the same layout.
 * Candidates are sorted alphabetically within each position for fairness.
 */
const POSITIONS = [
	{
		title: "Vice President Externals",
		candidates: [
			{
				name: "Saaruca Rasakumar",
				position: "VP Externals",
				image: "saaruca-rasakumar.jpg",
				imagePosition: "50% 30%",
				email: "saaruca.rasakumar@torontomu.ca",
				socials: {
					instagram: "https://www.instagram.com/_saaruca/",
					linkedin: "https://www.linkedin.com/in/saaruca/",
				},
				bio: [
					"Hi everyone! My name is Saaruca Rasakumar, and I'm a Biomedical Science student at Toronto Metropolitan University running for VP Externals of the Undergraduate Science Society (USSTM)!",
					"As a science student, I understand how important it is to have access to meaningful opportunities, supportive communities, and connections that extend beyond the classroom. I'm passionate about bringing people together, encouraging student involvement, and helping students make the most of their university experience.",
					"As VP Externals, I hope to strengthen connections between USSTM and external organizations, create more opportunities for networking and professional development, and help bridge the gap between academic learning and real-world experiences.",
					"My goal is to ensure that science students feel connected, represented, and empowered to explore the opportunities available to them. I'm excited for the chance to contribute to our science community and make a positive impact!",
					"I'd love to have your support as your next VP Externals!",
				],
			},
		],
	},
	{
		title: "Computer Science Director",
		candidates: [
			{
				name: "Aayan Areejo",
				position: "CS Director",
				image: "aayan-areejo.jpg",
				imagePosition: "50% 44%",
				email: "aayan.areejo@torontomu.ca",
				socials: {
					instagram: "https://www.instagram.com/aayanareejo/",
					linkedin: "https://www.linkedin.com/in/aayanareejo/",
				},
				bio: [
					"Hey, I'm Aayan! Big on photography, new tech, and the odd casual game to unwind. Most days you'll catch me with a camera in hand or a fun side project in the works.",
				],
			},
			{
				name: "Azeem Cochinwala",
				position: "CS Director",
				image: "azeem-cochinwala.jpg",
				imagePosition: "50% 26%",
				email: "azeem.cochinwala@torontomu.ca",
				socials: {
					instagram: "https://www.instagram.com/azeem_40/",
					linkedin: "https://www.linkedin.com/in/azeem-cochinwala/",
				},
				bio: [
					"Hello there!",
					"My name is Azeem Cochinwala, and I am the previously elected CS Director for the 2025/2026 Academic Year, running for re-election.",
					"Having previously served in this role, I bring experience in advocating for students, supporting and guiding student groups, and understanding the needs of the Computer Science community.",
					"During my time on the board, I also served as the Deputy VP Finance of USSTM, where our committee was honoured with the \"Best Committee\" Recognition Award.",
					"Furthermore, as the current VP Finance of CSCU, I believe I can step back into this position with the experience, knowledge, and dedication needed to continue advocating for Computer Science students and student groups, ensuring their voices are heard, their initiatives are supported, and their interests are represented.",
					"Thank you!",
				],
			},
		],
	},
];

const SOCIALS = [
	{ key: "instagram", label: "Instagram", Icon: FaInstagram },
	{ key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn },
];

const byName = (a, b) => a.name.localeCompare(b.name);

function initials(name) {
	return name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2);
}

function ContactIcon({ href, label, name, Icon }) {
	const base =
		"flex items-center justify-center w-9 h-9 rounded-full border text-base transition ease-in-out duration-300";

	if (!href) {
		return (
			<span
				className={`${base} border-highlight-dark/25 text-highlight-dark/40 cursor-default`}
				title={`${label} coming soon`}
				aria-label={`${name}'s ${label} coming soon`}
				role="img"
			>
				<Icon aria-hidden="true" />
			</span>
		);
	}

	return (
		<a
			href={href}
			target={href.startsWith("mailto:") ? undefined : "_blank"}
			rel="noopener noreferrer"
			className={`link-button ${base} border-highlight-dark text-highlight-dark hover:bg-highlight-dark hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight`}
			aria-label={`${name} on ${label}`}
			title={label}
		>
			<Icon aria-hidden="true" />
		</a>
	);
}

function Bio({ name, bio }) {
	const [open, setOpen] = useState(false);
	const id = useId();

	if (bio.length === 0) {
		return (
			<p className="italic text-foreground/70 text-center">
				{name.split(" ")[0]}&apos;s statement is coming soon.
			</p>
		);
	}

	// Show a short greeting together with the paragraph that follows it.
	const leadCount = bio[0].length < 60 ? 2 : 1;
	const lead = bio.slice(0, leadCount);
	const rest = bio.slice(leadCount);

	return (
		<div>
			{lead.map((paragraph, i) => (
				<p key={i} className={i > 0 ? "pt-3" : undefined}>
					{paragraph}
				</p>
			))}
			{rest.length > 0 && (
				<>
					<div id={id} hidden={!open}>
						{rest.map((paragraph, i) => (
							<p key={i} className="pt-3">
								{paragraph}
							</p>
						))}
					</div>
					<button
						type="button"
						aria-expanded={open}
						aria-controls={id}
						onClick={() => setOpen(!open)}
						className="mt-4 font-semibold text-highlight-dark underline underline-offset-4 decoration-highlight decoration-2 hover:decoration-highlight-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight rounded-sm"
					>
						{open ? "Show less" : "Read full statement"}
					</button>
				</>
			)}
		</div>
	);
}

function CandidateCard({ candidate }) {
	const { name, position, image, imagePosition, email, socials, bio } =
		candidate;

	return (
		<article className="flex flex-col h-full bg-white rounded-2xl shadow-[0_6px_24px_-12px_rgba(0,41,86,0.35)] border border-highlight-blue px-6 py-8 sm:px-8">
			<div className="flex flex-col items-center text-center">
				<div className="w-36 sm:w-40 lg:w-44 aspect-square relative overflow-hidden rounded-full shadow-md bg-highlight-blue ring-4 ring-background">
					{image ? (
						<Image
							src={`/images/elections/byelections-2026/${image}`}
							alt={`Headshot of ${name}`}
							fill
							sizes="(min-width: 1024px) 11rem, 10rem"
							className="object-cover"
							style={{ objectPosition: imagePosition || "50% 35%" }}
						/>
					) : (
						<span
							className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-highlight-dark tracking-wider"
							aria-label={`Headshot for ${name} coming soon`}
							role="img"
						>
							{initials(name)}
						</span>
					)}
				</div>

				<h4 className="pt-5 text-2xl lg:text-3xl font-serif font-semibold tracking-wide text-balance">
					{name}
				</h4>
				<p className="pt-1 text-lg text-highlight-dark">
					{position} Candidate
				</p>

				<div className="flex gap-2 pt-4">
					{SOCIALS.map(({ key, label, Icon }) => (
						<ContactIcon
							key={key}
							href={socials?.[key]}
							label={label}
							name={name}
							Icon={Icon}
						/>
					))}
					<ContactIcon
						href={email ? `mailto:${email}` : ""}
						label="Email"
						name={name}
						Icon={MdOutlineEmail}
					/>
				</div>
			</div>

			<div className="mt-6 pt-6 border-t border-highlight-blue flex-1 text-base lg:text-lg leading-relaxed text-foreground">
				<h5 className="pb-2 [font-family:inherit] text-lg lg:text-xl font-bold text-highlight-dark">
					Why I&apos;m running
				</h5>
				<Bio name={name} bio={bio} />
			</div>
		</article>
	);
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function ByElections() {
	return (
		<div id="by-elections-2026" className="px-2 sm:px-6 pb-6">
			<p className="mx-auto max-w-6xl pt-4 text-center text-lg lg:text-xl">
				USSTM is holding by-elections to fill open seats on the Board of
				Directors and represent undergraduate science students at TMU. Get to know the candidates below, then vote.{" "}
				<span className="font-semibold">
					Voting happens by email:
				</span>{" "}
				every eligible undergraduate science student will receive a ballot at their
				TMU email address, so keep an eye on your inbox.
			</p>

			<dl className="mt-10 grid sm:grid-cols-2 overflow-hidden rounded-2xl bg-highlight-dark text-background shadow-[0_10px_30px_-15px_rgba(0,41,86,0.6)]">
				<div className="px-6 py-7 sm:px-10 lg:py-9 text-center">
					<dt className="text-base lg:text-lg text-highlight-blue">
						Voting period
					</dt>
					<dd className="pt-1 font-serif text-2xl min-[360px]:text-3xl lg:text-4xl xl:text-5xl tracking-wide whitespace-nowrap">
						November 12 &ndash; 16
					</dd>
					<dd className="pt-2 text-highlight-blue">
						Ballots close November 16 at{" "}
						<span className="whitespace-nowrap">4:00 PM</span>
					</dd>
				</div>
				<div className="px-6 py-7 sm:px-10 lg:py-9 text-center border-t sm:border-t-0 sm:border-l border-background/20">
					<dt className="text-base lg:text-lg text-highlight-blue">
						Results ratified
					</dt>
					<dd className="pt-1 font-serif text-2xl min-[360px]:text-3xl lg:text-4xl xl:text-5xl tracking-wide whitespace-nowrap">
						November 20
					</dd>
					<dd className="pt-2 text-highlight-blue">
						Questions? Email the CRO at{" "}
						<a
							href="mailto:cro@usstm.ca"
							className="link-button text-background underline underline-offset-4 hover:text-highlight-blue"
						>
							cro@usstm.ca
						</a>
					</dd>
				</div>
			</dl>

			<div className="pt-12 lg:pt-14 text-center">
				<h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-semibold tracking-wide">
					Meet the Candidates
				</h2>
				<nav aria-label="Positions" className="pt-5 flex flex-wrap justify-center gap-3">
					{POSITIONS.map(({ title }) => (
						<a
							key={title}
							href={`#${slug(title)}`}
							className="link-button rounded-full border border-highlight-dark px-5 py-2 text-highlight-dark hover:bg-highlight-dark hover:text-background transition ease-in-out duration-300"
						>
							{title}
						</a>
					))}
				</nav>
			</div>

			{POSITIONS.map(({ title, candidates }) => {
				const sorted = [...candidates].sort(byName);
				return (
					<section
						key={title}
						id={slug(title)}
						className="pt-14 lg:pt-16 scroll-mt-24"
					>
						<hr className="border border-gray-400 w-11/12 md:w-4/5 mx-auto" />
						<h3 className="py-2 pt-4 text-2xl lg:text-3xl font-serif font-semibold tracking-wide text-center">
							{title}
						</h3>
						<hr className="border border-gray-400 w-11/12 md:w-4/5 mx-auto mb-10" />
						<div
							className={`grid gap-8 lg:gap-10 grid-cols-1 items-stretch mx-auto ${
								sorted.length > 1
									? "md:grid-cols-2 max-w-6xl"
									: "max-w-xl"
							}`}
						>
							{sorted.map((candidate) => (
								<CandidateCard
									key={candidate.name}
									candidate={candidate}
								/>
							))}
						</div>
					</section>
				);
			})}
		</div>
	);
}
